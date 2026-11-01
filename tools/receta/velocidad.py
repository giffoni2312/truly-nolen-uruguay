# Fluidez del carrito de Truly (receta truly-inbound, ruta 6): desenfoque de movimiento en la calle y el fondo, con el
# carro nítido. Sin él, el asfalto se ve nítido saltando de cuadro en cuadro y el ojo lo lee como tirones (medido el
# 31-oct-2026: nitidez del asfalto 296 en globaltni contra 1.577 en el nuestro).
# El desenfoque es el promedio de VENTANA cuadros seguidos (lo que hace una cámara real con el obturador abierto).
# El carro se protege con un polígono marcado en cuadros clave, amarrado a la nariz roja (como vidrios.py).
# Uso (Mac y Windows):
#   uv run --no-project --with numpy --with opencv-python-headless==4.10.0.84 --with imageio-ffmpeg \
#     python velocidad.py <video.mp4> <salida.mp4> "0=x,y x,y ..." "40=..." "79=..."
# Cada clave: «N=» y el contorno del carro (orejas incluidas) en píxeles de ese cuadro, mismo número de puntos en cada
# clave. VENTANA=7 (impar; más alto = más corrido). INTERP=4 inventa cuadros intermedios antes de promediar (sin eso
# los árboles quedan con copias escalonadas). FONDO=0.35: cuánto desenfoque arriba (horizonte); abajo (asfalto) es 1.
# Revisar con fluidez.py: la nitidez del asfalto tiene que bajar, y mirar los árboles y el borde del carro de cerca.
import cv2, numpy as np, subprocess, sys, os
try:
    import imageio_ffmpeg; FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    FFMPEG = 'ffmpeg'
if len(sys.argv) < 4: print('Uso: velocidad.py <video> <salida> "0=x,y ..." ["40=..."]'); sys.exit(2)
ENT, SAL = sys.argv[1], sys.argv[2]
CLAVES = {int(a.split('=', 1)[0]): np.array([[float(v) for v in p.split(',')] for p in a.split('=', 1)[1].split()], np.float32) for a in sys.argv[3:]}
VENTANA = int(os.environ.get('VENTANA', '7')); r = VENTANA // 2
INTERP = int(os.environ.get('INTERP', '4')); FONDO = float(os.environ.get('FONDO', '0.35'))
# NITIDEZ: enfoque SOLO del carro (0 = nada). Con 720p de origen, 1.2 lleva el carro cerca del de globaltni.
NITIDEZ = float(os.environ.get('NITIDEZ', '0')); RADIO = float(os.environ.get('RADIO', '1.4'))
import tempfile
def leer(ruta):
    c = cv2.VideoCapture(ruta); out = []
    while True:
        ok, f = c.read()
        if not ok: break
        out.append(f)
    c.release(); return out
cap = cv2.VideoCapture(ENT); fps = cap.get(cv2.CAP_PROP_FPS); cuadros = []
while True:
    ok, f = cap.read()
    if not ok: break
    cuadros.append(f)
cap.release(); h, w = cuadros[0].shape[:2]; N = len(cuadros)
centros, tam, prev = [], [], None
for f in cuadros:
    b, g, rr = cv2.split(f.astype(np.float32)); m = ((rr > 65) & (rr > g * 2.8) & (rr > b * 1.6)).astype(np.uint8) * 255
    roi = np.zeros_like(m)
    if prev is None: cv2.rectangle(roi, (int(w * .4), int(h * .3)), (int(w * .95), int(h * .85)), 255, -1)
    else: cv2.circle(roi, tuple(np.rint(prev).astype(int)), round(w * .07), 255, -1)
    m &= roi; cc, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cc = [c for c in cc if cv2.contourArea(c) > w * w * .0003]; assert cc, 'no encontré la nariz roja'
    c = max(cc, key=cv2.contourArea); mo = cv2.moments(c); prev = np.array([mo['m10'] / mo['m00'], mo['m01'] / mo['m00']])
    centros.append(prev); tam.append((cv2.contourArea(c) / np.pi) ** .5)
suav = lambda v: np.convolve(np.pad(v, (3, 3), mode='edge'), np.ones(7) / 7, mode='valid')
tam = suav(tam); cx = suav([c[0] for c in centros]); cy = suav([c[1] for c in centros])
rel = {n: (p - np.array([cx[n], cy[n]])) / tam[n] for n, p in CLAVES.items()}; ks = sorted(rel)
def poli(n):
    if n <= ks[0]: q = rel[ks[0]]
    elif n >= ks[-1]: q = rel[ks[-1]]
    else:
        a = max(k for k in ks if k <= n); b = min(k for k in ks if k > n); t = (n - a) / (b - a); q = rel[a] * (1 - t) + rel[b] * t
    return np.array([cx[n], cy[n]]) + q * tam[n]
F = np.stack([f.astype(np.float32) for f in cuadros])
fino = cuadros
if INTERP > 1:
    tmp = os.path.join(tempfile.mkdtemp(prefix='velocidad_'), 'fino.mp4')
    subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', ENT, '-vf', f'minterpolate=fps={fps*INTERP}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1',
                    '-an', '-c:v', 'libx264', '-crf', '10', '-pix_fmt', 'yuv420p', tmp], check=True)
    fino = leer(tmp)
FF_ = np.stack([f.astype(np.float32) for f in fino]); acum = np.cumsum(np.concatenate([np.zeros_like(FF_[:1]), FF_]), axis=0); M = len(fino)
yy = np.linspace(0, 1, h)[:, None, None]; rampa = np.clip((yy - .38) / (.80 - .38), 0, 1); peso = FONDO + (1 - FONDO) * rampa
proc = subprocess.Popen([FFMPEG, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{w}x{h}', '-r', str(fps), '-i', '-',
                         '-an', '-c:v', 'libx264', '-crf', '12', '-preset', 'slow', '-pix_fmt', 'yuv420p', SAL], stdin=subprocess.PIPE)
for n in range(N):
    m = min(M - 1, n * INTERP); R = r * INTERP; a, b = max(0, m - R), min(M, m + R + 1); corrido = (acum[b] - acum[a]) / (b - a)
    corrido = F[n] * (1 - peso) + corrido * peso
    mask = np.zeros((h, w), np.uint8); cv2.fillPoly(mask, [np.rint(poli(n)).astype(np.int32)], 255)
    mask = cv2.dilate(mask, np.ones((17, 17), np.uint8)); mask = cv2.GaussianBlur(mask.astype(np.float32) / 255, (0, 0), 7)[..., None]
    carro = F[n] if NITIDEZ <= 0 else F[n] * (1 + NITIDEZ) - cv2.GaussianBlur(F[n], (0, 0), RADIO) * NITIDEZ
    out = carro * mask + corrido * (1 - mask)
    proc.stdin.write(np.clip(out, 0, 255).astype(np.uint8).tobytes())
proc.stdin.close(); assert proc.wait() == 0
print(f'listo: {SAL} · {N} cuadros · ventana {VENTANA}')
