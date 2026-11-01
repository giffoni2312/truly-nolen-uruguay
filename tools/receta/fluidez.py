# Fluidez del video del carro (receta truly-inbound): avance del asfalto por cuadro, su variación, tirones y nitidez del
# asfalto. Uso: python fluidez.py <video.mp4> [otro.mp4 ...]  (comparar siempre contra el carro de globaltni.com/es)
import cv2,numpy as np,sys
for f in sys.argv[1:]:
    c=cv2.VideoCapture(f);prev=None;mag=[];blur=[]
    while True:
        ok,x=c.read()
        if not ok:break
        g=cv2.cvtColor(cv2.resize(x,(640,int(640*x.shape[0]/x.shape[1]))),cv2.COLOR_BGR2GRAY);h,w=g.shape
        road=g[int(h*.78):,:]  # franja baja: asfalto
        blur.append(cv2.Laplacian(road,cv2.CV_64F).var())
        if prev is not None:
            fl=cv2.calcOpticalFlowFarneback(prev,road,None,.5,3,21,3,5,1.2,0);mag.append(np.median(np.hypot(fl[...,0],fl[...,1])))
        prev=road
    m=np.array(mag);d=np.abs(np.diff(m))
    print(f"{f.split('/')[-1]:24s} avance/cuadro {m.mean():5.2f}px · variación {100*m.std()/m.mean():4.0f}% · tirón medio {d.mean():.2f} · nitidez asfalto {np.mean(blur):6.0f} (más bajo = más corrido)")
