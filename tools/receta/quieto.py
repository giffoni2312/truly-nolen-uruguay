# Carro fijo como globaltni (receta truly-inbound): mide tamaño y posición de la nariz roja en todo el clip.
# Uso: python quieto.py <video> [...]  · globaltni: cambio de tamaño 19 %. Más de ~30 % se descarta.
import cv2,numpy as np,sys
# Mide si el carro queda fijo: tamaño y posición de la nariz roja a lo largo del clip.
for p in sys.argv[1:]:
    c=cv2.VideoCapture(p);t=[];x=[];y=[]
    while True:
        ok,f=c.read()
        if not ok:break
        b,g,r=cv2.split(f.astype(np.float32));m=((r>65)&(r>g*2.8)&(r>b*1.6)).astype(np.uint8)
        h,w=m.shape;m[:int(h*.3)]=0
        cc,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
        if not cc:continue
        k=max(cc,key=cv2.contourArea);mo=cv2.moments(k)
        if mo['m00']<30:continue
        t.append((cv2.contourArea(k)/np.pi)**.5);x.append(mo['m10']/mo['m00']/w*100);y.append(mo['m01']/mo['m00']/h*100)
    t=np.array(t)
    print(f"{p.split('/')[-1]:22s} nariz: tamaño {t.min():.1f}-{t.max():.1f} px (cambio {100*(t.max()/t.min()-1):.0f} %) · x {min(x):.0f}-{max(x):.0f} % · y {min(y):.0f}-{max(y):.0f} % · {len(t)} cuadros")
