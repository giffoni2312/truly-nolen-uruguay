from pathlib import Path
import cv2,numpy as np,json,subprocess
S=4
cv2.setNumThreads(4)
U=np.linspace(0,1,65);T=U[:,None]
# Cylindrical, tapered whiskers. XYZ is in the nose-relative reference pose.
CURVES=[[(0,-3,3),(-29,-2,5),(-68,-13,9),(-95,-24,11)],[(0,1,3),(-30,4,5),(-73,4,10),(-101,-2,12)],[(0,5,3),(-29,10,6),(-69,18,9),(-96,17,10)],[(0,-3,3),(21,-4,5),(42,-10,8),(61,-17,9)],[(0,1,3),(21,3,6),(46,2,9),(65,-5,10)],[(0,5,3),(21,9,5),(44,16,8),(61,13,9)]]
BASE=[(1-T)**3*np.array(p)[0]+3*(1-T)**2*T*np.array(p)[1]+3*(1-T)*T*T*np.array(p)[2]+T**3*np.array(p)[3]for p in CURVES]

def geometry(j,time):
 q=2*np.pi*time/5;phase=j*.92;u=U
 # Slow shared gust + independently phased elastic modes. Integer cycles close the loop.
 amp=(.83+.17*np.sin(q+.7))*float(__import__('os').environ.get('MOVIMIENTO','1'))
 motion=amp*(4.6*np.sin(3*q+phase-.7*u)+1.45*np.sin((7+j%3)*q+phase*1.7-1.1*u)+.65*np.sin(13*q+phase*2-.5*u))
 p=BASE[j].copy();bend=u*u*(1.4-.4*u)
 p[:,1]+=bend*motion
 p[:,0]+=bend*(.7*np.sin(2*q+phase)+.45*np.sin(9*q+phase*.4))
 p[:,2]+=bend*(1.2*np.sin(3*q+phase-.4)+.5*np.sin(8*q+phase))
 assert np.allclose(p[0],BASE[j][0]),'Root moved relative to nose'
 return p

def stroke_layer(paths,radii,shape,color,offset=0):
 layer=np.zeros((*shape,4),np.uint8)
 for path,rad in zip(paths,radii):
  p=path.copy()
  if offset:
   tangent=np.gradient(p,axis=0);normal=np.column_stack((tangent[:,1],-tangent[:,0]));normal/=np.maximum(np.linalg.norm(normal,axis=1)[:,None],.001)
   # Highlight on upper edge, not alternately above and below left/right rods.
   normal[normal[:,1]>0]*=-1;p+=normal*(rad*offset)[:,None]
  tangent=np.gradient(p,axis=0);normal=np.column_stack((tangent[:,1],-tangent[:,0]));normal/=np.maximum(np.linalg.norm(normal,axis=1)[:,None],.001)
  # A continuous silhouette avoids beads at the joints of short line segments.
  polygon=np.concatenate((p+normal*rad[:,None],(p-normal*rad[:,None])[::-1]))
  cv2.fillPoly(layer,[np.rint(polygon*S*256).astype(np.int32)],(*color,255),cv2.LINE_AA,shift=8)
  for k in (0,-1):cv2.circle(layer,tuple(np.rint(p[k]*S*256).astype(int)),round(float(rad[k])*S*256),(*color,255),-1,cv2.LINE_AA,shift=8)
 return cv2.resize(layer,(shape[1]//S,shape[0]//S),interpolation=cv2.INTER_AREA).astype(np.float32)/255

def composite(f,center,M,mask,size,time):
 # Local crop keeps expensive supersampled geometry bounded to the face of the car.
 x=max(0,int(center[0]-160*size));y=max(0,int(center[1]-100*size));cw=min(f.shape[1]-x,int(310*size));ch=min(f.shape[0]-y,int(190*size));origin=np.array([x,y]);frame=f[y:y+ch,x:x+cw].astype(np.float32)/255
 acc=np.zeros_like(frame)
 for dt in [-1/96,0,1/96]:
  paths=[];shadows=[];radii=[]
  for j in range(6):
   p=geometry(j,time+dt);screen=p[:,:2].copy();screen[:,1]-=.55*p[:,2];screen[:,0]+=.05*p[:,2]
   shadow=p[:,:2].copy();shadow[:,0]+=.30*p[:,2];shadow[:,1]+=.32*p[:,2]
   paths.append((screen*size)@M[:,:2].T+center-origin);shadows.append((shadow*size)@M[:,:2].T+center-origin)
   radii.append((.25+.82*(1-U)**.75)*size*np.linalg.norm(M[:,0])*float(__import__('os').environ.get('GROSOR','1')))  # GROSOR: thinner whiskers (Colombia 31-oct)
  shape=(ch*S,cw*S)
  shade=stroke_layer(shadows,radii,shape,(0,0,0))[:,:,3];shade=cv2.GaussianBlur(shade,(0,0),.65*size)*.24
  # Continuous occlusion by the original nose preserves its original highlight and silhouette.
  hide=mask[y:y+ch,x:x+cw].astype(np.float32)/255;hide=cv2.GaussianBlur(hide,(3,3),.45)
  shade*=1-hide
  comp=frame*(1-shade[:,:,None])
  # Dark underside, softly lit graphite center, small warm specular edge.
  for color,mult,off in [((18,21,24),1,0),((39,44,49),.66,-.10),((88,97,108),.19,2.47)]:
   layer=stroke_layer(paths,[r*mult for r in radii],shape,color,offset=off);a=layer[:,:,3]*(1-hide)
   # Use straight RGB because antialiased layers carry premultiplied RGB from the zero canvas.
   rgb=np.divide(layer[:,:,:3],np.maximum(layer[:,:,3,None],1e-5));comp=comp*(1-a[:,:,None])+rgb*a[:,:,None]
  acc+=comp/3
 out=f.copy();out[y:y+ch,x:x+cw]=np.clip(np.rint(acc*255),0,255).astype(np.uint8)
 return out

