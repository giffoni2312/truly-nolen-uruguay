import sys, cv2, numpy as np
for f in sys.argv[1:]:
    cap = cv2.VideoCapture(f); prev = None; res = []
    while True:
        ok, fr = cap.read()
        if not ok: break
        g = cv2.cvtColor(cv2.resize(fr, (640, 360)), cv2.COLOR_BGR2GRAY)
        if prev is not None:
            fl = cv2.calcOpticalFlowFarneback(prev, g, None, 0.5, 3, 21, 3, 5, 1.2, 0)
            izq = fl[250:360, 0:180]; der = fl[250:360, 460:640]; cielo = fl[0:120, :]
            res.append((izq[...,1].mean(), der[...,1].mean(), cielo[...,0].mean()))
        prev = g
    r = np.array(res); n = len(r)
    print(f.split('/')[-1], n+1, 'cuadros  (asfalto izq/der y fondo x: el asfalto tiene que tener el MISMO signo en todos los tramos; si cambia, el carro se devuelve)')
    for a in range(0, n, 12): print(f'  {a:3d}-{min(a+12,n):3d}', np.round(r[a:a+12].mean(0), 2))
