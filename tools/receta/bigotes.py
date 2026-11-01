# Bigotes del carrito de Truly sobre el video del país (receta truly-inbound, ruta 6). Misma geometría aprobada que
# Guatemala (docs/design/hero-whiskers del repo Catalizadora-Labs/trulynolen), adaptada para recibir CUALQUIER video.
# Uso (Mac y Windows):
#   uv run --no-project --with numpy --with opencv-python-headless==4.10.0.84 --with imageio-ffmpeg \
#     python ~/.claude/skills/truly-inbound/herramientas/bigotes.py <video-del-pais.mp4> <carpeta-de-salida>
# Deja <salida>/hero-desktop-whiskers-v1.mp4, desktop-first.png (cuadro 0) y desktop-audit-*.jpg (hoja de cuadros para
# revisar a ojo). Más chico: anteponer BIGOTE=0.8 (20 % menos). Si falla «inliers» (pocos puntos para seguir el carro), recortar el clip a los primeros segundos.
from pathlib import Path
import cv2,numpy as np,json,subprocess,os,sys
SCRIPT_DIR=Path(__file__).resolve().parent
if len(sys.argv)!=3:print('Uso: bigotes.py <video.mp4> <carpeta-de-salida>');sys.exit(2)
ENTRADA=Path(sys.argv[1]);OUT=Path(sys.argv[2])
# BIGOTE=0.8 lo deja un 20 % más chico (1 = tamaño de Guatemala). Escala todo el bigote alrededor de la nariz.
ESCALA=float(os.environ.get('BIGOTE','1'))
# MIN_PUNTOS: puntos mínimos para seguir el carro (12). Bajarlo a 10 solo si falla cerca del final y la hoja de cuadros se ve bien.
MIN_PUNTOS=int(os.environ.get('MIN_PUNTOS','12'))
# HUECOS=1: en los cuadros con pocos puntos se mantiene el giro anterior en vez de detenerse (revisar la hoja).
try:
 import imageio_ffmpeg;FFMPEG=imageio_ffmpeg.get_ffmpeg_exe()
except Exception:FFMPEG='ffmpeg'
OUT.mkdir(parents=True,exist_ok=True)
# Geometry adapted from the approved International version of 3 October 2026.
exec((SCRIPT_DIR/'bigotes-geometria.py').read_text(encoding='utf-8'))
for mode in ['desktop']:
 cap=cv2.VideoCapture(str(ENTRADA));fps=cap.get(cv2.CAP_PROP_FPS);frames=[]
 while True:
  ok,f=cap.read()
  if not ok:break
  frames.append(f)
 cap.release();h,w=frames[0].shape[:2];centers=[];masks=[];sizes=[];prev=None
 for f in frames:
  b,g,r=cv2.split(f.astype(np.float32));mask=((r>65)&(r>g*2.8)&(r>b*1.6)).astype(np.uint8)*255
  roi=np.zeros_like(mask)
  if prev is None:cv2.rectangle(roi,(int(w*.48),int(h*.4)),(int(w*.9),int(h*.75)),255,-1)
  else:cv2.circle(roi,tuple(np.rint(prev).astype(int)),round(w*.07),255,-1)
  mask&=roi;cc,_=cv2.findContours(mask,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE);cc=[c for c in cc if cv2.contourArea(c)>w*w*.0003];assert cc,'nose missing'
  c=max(cc,key=cv2.contourArea);m=cv2.moments(c);center=np.array([m['m10']/m['m00'],m['m01']/m['m00']]);clean=np.zeros_like(mask);cv2.drawContours(clean,[c],-1,255,-1)
  centers.append(center);masks.append(clean);sizes.append((cv2.contourArea(c)/np.pi)**.5/22);prev=center
 sizes=np.array(sizes);sizes=np.convolve(np.pad(sizes,(3,3),mode='edge'),np.ones(7)/7,mode='valid')
 # Track the whole front body for orientation. Nose segmentation anchors translation independently.
 c0=centers[0];g0=cv2.cvtColor(frames[0],cv2.COLOR_BGR2GRAY);mask=np.zeros((h,w),np.uint8);s=sizes[0];cx,cy=c0
 cv2.rectangle(mask,(int(cx-170*s),int(cy-65*s)),(int(cx+65*s),int(cy+65*s)),255,-1)
 pts=cv2.goodFeaturesToTrack(g0,100,.03,5,mask=mask);angles=[];counts=[]
 for f,center in zip(frames,centers):
  gray=cv2.cvtColor(f,cv2.COLOR_BGR2GRAY);obs,status,err=cv2.calcOpticalFlowPyrLK(g0,gray,pts,(pts+(center-c0).astype(np.float32)).copy(),winSize=(31,31),maxLevel=3,flags=cv2.OPTFLOW_USE_INITIAL_FLOW)
  good=(status.ravel()>0)&(err.ravel()<35);M,ins=cv2.estimateAffinePartial2D(pts[good],obs[good],method=cv2.RANSAC,ransacReprojThreshold=2)
  if M is None or int(ins.sum())<MIN_PUNTOS:
   # Pocos puntos: se mantiene el giro del cuadro anterior (la nariz se sigue igual por su color).
   assert angles and os.environ.get('HUECOS','0')=='1', f'pocos puntos para seguir el carro en el cuadro {len(angles)}: recortar el clip o HUECOS=1'
   angles.append(angles[-1]);counts.append(0 if ins is None else int(ins.sum()));continue
  angles.append(np.arctan2(M[1,0],M[0,0]));counts.append(int(ins.sum()))
 angles=np.convolve(np.pad(angles,(3,3),mode='edge'),np.ones(7)/7,mode='valid');angles-=angles[0]
 proc=subprocess.Popen([FFMPEG,'-y','-loglevel','error','-f','rawvideo','-pix_fmt','bgr24','-s',f'{w}x{h}','-r',str(fps),'-i','-','-an','-c:v','libx264','-threads','4','-crf','25','-preset','slow','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/f'hero-{mode}-whiskers-v1.mp4')],stdin=subprocess.PIPE)
 crops=[]
 for n,(f,center,mask,size,a) in enumerate(zip(frames,centers,masks,sizes,angles)):
  M=np.array([[np.cos(a),-np.sin(a),0],[np.sin(a),np.cos(a),0]])
  comp=composite(f,center,M,mask,float(size)*ESCALA,n/fps*5/(len(frames)/fps));proc.stdin.write(comp.tobytes())
  cx,cy=center;cw=round(260*size);ch=round(120*size);x=round(cx-cw*.6);y=round(cy-ch*.55);crop=cv2.resize(comp[y:y+ch,x:x+cw],(480,220));cv2.putText(crop,str(n),(8,22),cv2.FONT_HERSHEY_SIMPLEX,.65,(255,255,255),1);crops.append(crop)
  if n==0:cv2.imwrite(str(OUT/f'{mode}-first.png'),comp)
 proc.stdin.close();assert proc.wait()==0
 for k,start in enumerate(range(0,len(crops),25)):
  cells=crops[start:start+25]
  while len(cells)<25:cells.append(np.zeros_like(cells[0]))
  cv2.imwrite(str(OUT/f'{mode}-audit-{k}.jpg'),cv2.vconcat([cv2.hconcat(cells[j:j+5]) for j in range(0,25,5)]))
 (OUT/f'{mode}-tracking.json').write_text(encoding='utf-8',data=json.dumps({'fps':fps,'frames':len(frames),'size_range':[float(min(sizes)),float(max(sizes))],'angle_range':[float(min(angles)),float(max(angles))],'inliers_min':min(counts),'centers':[c.tolist()for c in centers]},indent=2))
 print(mode,'completed',len(frames),'frames; minimum tracking inliers',min(counts),flush=True)
