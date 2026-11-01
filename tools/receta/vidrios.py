# Vidrios oscuros del carrito de Truly (receta truly-inbound, ruta 6): oscurece el parabrisas y las ventanas en cada
# cuadro para que no se vea a nadie adentro. La máscara se marca UNA vez sobre el cuadro 0 y se mueve con la nariz roja
# (posición y tamaño), igual que los bigotes.
# Uso (Mac y Windows):
#   uv run --no-project --with numpy --with opencv-python-headless==4.10.0.84 --with imageio-ffmpeg \
#     python vidrios.py <video.mp4> <salida.mp4> "0=x,y x,y ...;x,y ..." ["40=..." "79=..."]
# Cada argumento es un cuadro clave: «N=» y sus polígonos (parabrisas; ventana lateral...) separados por «;», en
# píxeles de ese cuadro y con el MISMO número de puntos en cada clave. Si el carro gira al acercarse, marcar 3 claves
# (inicio, medio, final): entre claves se interpola amarrado a la nariz. Para ubicarlos, sacar el cuadro con rejilla. OSCURO=0.22 (cuánto queda de la imagen original; aprobado) y REFLEJO=0.10 se pueden cambiar.
import cv2, numpy as np, subprocess, sys, os
try:
    import imageio_ffmpeg; FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    FFMPEG = 'ffmpeg'
if len(sys.argv) < 4: print(__doc__ or 'Uso: vidrios.py <video> <salida> "<x,y ...>" ...'); sys.exit(2)
ENT, SAL = sys.argv[1], sys.argv[2]
CLAVES = {}
for a in sys.argv[3:]:
    n, resto = a.split('=', 1)
    CLAVES[int(n)] = [np.array([[float(v) for v in p.split(',')] for p in poli.split()], np.float32) for poli in resto.split(';')]
OSCURO = float(os.environ.get('OSCURO', '0.22')); REFLEJO = float(os.environ.get('REFLEJO', '0.10'))  # 0.22 = aprobado por el dueño (31-oct-2026): polarizado, con reflejo
cap = cv2.VideoCapture(ENT); fps = cap.get(cv2.CAP_PROP_FPS); cuadros = []
while True:
    ok, f = cap.read()
    if not ok: break
    cuadros.append(f)
cap.release(); h, w = cuadros[0].shape[:2]
# nariz roja: misma detección que bigotes.py
centros, tam, prev = [], [], None
for f in cuadros:
    b, g, r = cv2.split(f.astype(np.float32)); m = ((r > 65) & (r > g * 2.8) & (r > b * 1.6)).astype(np.uint8) * 255
    roi = np.zeros_like(m)
    if prev is None: cv2.rectangle(roi, (int(w * .4), int(h * .3)), (int(w * .95), int(h * .85)), 255, -1)
    else: cv2.circle(roi, tuple(np.rint(prev).astype(int)), round(w * .07), 255, -1)
    m &= roi; cc, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cc = [c for c in cc if cv2.contourArea(c) > w * w * .0003]; assert cc, 'no encontré la nariz roja'
    c = max(cc, key=cv2.contourArea); mo = cv2.moments(c); prev = np.array([mo['m10'] / mo['m00'], mo['m01'] / mo['m00']])
    centros.append(prev); tam.append((cv2.contourArea(c) / np.pi) ** .5)
tam = np.convolve(np.pad(tam, (3, 3), mode='edge'), np.ones(7) / 7, mode='valid')
cx = np.convolve(np.pad([c[0] for c in centros], (3, 3), mode='edge'), np.ones(7) / 7, mode='valid')
cy = np.convolve(np.pad([c[1] for c in centros], (3, 3), mode='edge'), np.ones(7) / 7, mode='valid')
# cada clave se guarda relativa a la nariz de su cuadro (desplazamiento / tamaño)
rel = {n: [(p - np.array([cx[n], cy[n]])) / tam[n] for p in polis] for n, polis in CLAVES.items()}
ks = sorted(rel)
def polis_en(n):
    if n <= ks[0]: r = rel[ks[0]]
    elif n >= ks[-1]: r = rel[ks[-1]]
    else:
        a = max(k for k in ks if k <= n); b = min(k for k in ks if k > n); t = (n - a) / (b - a)
        r = [pa * (1 - t) + pb * t for pa, pb in zip(rel[a], rel[b])]
    c = np.array([cx[n], cy[n]]); return [c + q * tam[n] for q in r]
s0 = tam[0]
proc = subprocess.Popen([FFMPEG, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{w}x{h}', '-r', str(fps), '-i', '-',
                         '-an', '-c:v', 'libx264', '-crf', '12', '-preset', 'slow', '-pix_fmt', 'yuv420p', SAL], stdin=subprocess.PIPE)
for n, f in enumerate(cuadros):
    k = tam[n] / s0; mask = np.zeros((h, w), np.float32)
    for p in polis_en(n): cv2.fillPoly(mask, [np.rint(p).astype(np.int32)], 1.0)
    mask = cv2.GaussianBlur(mask, (0, 0), 2.2 * k)[..., None]
    gris = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY).astype(np.float32)[..., None]
    vidrio = np.clip(f.astype(np.float32) * OSCURO + gris * REFLEJO * (gris > 170), 0, 255)
    vidrio = np.clip(vidrio + np.array([14, 12, 10], np.float32), 0, 255)
    out = f.astype(np.float32) * (1 - mask) + vidrio * mask
    proc.stdin.write(np.clip(out, 0, 255).astype(np.uint8).tobytes())
proc.stdin.close(); assert proc.wait() == 0
print(f'listo: {SAL} · {len(cuadros)} cuadros · escala de la nariz {min(tam)/s0:.2f}–{max(tam)/s0:.2f}')
