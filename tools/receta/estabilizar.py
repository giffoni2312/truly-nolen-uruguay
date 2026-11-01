# El carro fijo en pantalla, como el de globaltni.com/es (receta truly-inbound, ruta 6). Midjourney hace que el carro se
# acerque a la cámara: crece ~40 % en el clip y, al repetirse, brinca de grande a pequeño y PARECE QUE SE DEVUELVE.
# Este paso reencuadra cada cuadro con la nariz roja como guía para que el carro quede del mismo tamaño y en el mismo
# punto todo el video; el fondo sigue corriendo. Va al final (después de bigotes, vidrios y velocidad), antes del bucle.
# Uso (Mac y Windows):
#   uv run --no-project --with numpy --with opencv-python-headless==4.10.0.84 --with imageio-ffmpeg \
#     python estabilizar.py <video.mp4> <salida.mp4>
# TAM=max (tamaño del carro de referencia: max = el más grande del clip; o un número de 0 a 1 entre el menor y el mayor).
import cv2, numpy as np, subprocess, sys, os
try:
    import imageio_ffmpeg; FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    FFMPEG = 'ffmpeg'
if len(sys.argv) != 3: print('Uso: estabilizar.py <video.mp4> <salida.mp4>'); sys.exit(2)
ENT, SAL = sys.argv[1], sys.argv[2]
cap = cv2.VideoCapture(ENT); fps = cap.get(cv2.CAP_PROP_FPS); cuadros = []
while True:
    ok, f = cap.read()
    if not ok: break
    cuadros.append(f)
cap.release(); h, w = cuadros[0].shape[:2]
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
k = 9; suav = lambda v: np.convolve(np.pad(v, (k, k), mode='edge'), np.ones(2 * k + 1) / (2 * k + 1), mode='valid')
s = suav(tam); cx = suav([c[0] for c in centros]); cy = suav([c[1] for c in centros])
t = os.environ.get('TAM', 'max'); S = s.max() if t == 'max' else s.min() + float(t) * (s.max() - s.min())
# punto fijo de la nariz: donde está cuando el carro tiene el tamaño de referencia
i = int(np.argmin(np.abs(s - S))); C = np.array([cx[i], cy[i]])
# zoom extra para que ningún cuadro muestre bordes negros
extra = 1.0
for n in range(len(cuadros)):
    z = S / s[n]; c = np.array([cx[n], cy[n]])
    # esquinas del cuadro original llevadas a la salida: tienen que cubrir todo [0,w]x[0,h]
    x0 = C[0] - c[0] * z; y0 = C[1] - c[1] * z; x1 = x0 + w * z; y1 = y0 + h * z
    for zz in np.arange(1.0, 2.0, 0.005):
        X0 = C[0] + (x0 - C[0]) * zz; Y0 = C[1] + (y0 - C[1]) * zz; X1 = C[0] + (x1 - C[0]) * zz; Y1 = C[1] + (y1 - C[1]) * zz
        if X0 <= 0 and Y0 <= 0 and X1 >= w and Y1 >= h: break
    extra = max(extra, zz)
proc = subprocess.Popen([FFMPEG, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{w}x{h}', '-r', str(fps), '-i', '-',
                         '-an', '-c:v', 'libx264', '-crf', '12', '-preset', 'slow', '-pix_fmt', 'yuv420p', SAL], stdin=subprocess.PIPE)
for n, f in enumerate(cuadros):
    z = S / s[n] * extra; c = np.array([cx[n], cy[n]])
    M = np.array([[z, 0, C[0] - c[0] * z + (C[0] * (1 - extra)) * 0], [0, z, C[1] - c[1] * z]], np.float32)
    # la nariz va a C y todo escala desde ella
    M[0, 2] = C[0] - c[0] * z; M[1, 2] = C[1] - c[1] * z
    proc.stdin.write(cv2.warpAffine(f, M, (w, h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REFLECT).tobytes())
proc.stdin.close(); assert proc.wait() == 0
print(f'listo: {SAL} · tamaño del carro {s.min():.1f}–{s.max():.1f} px → fijo en {S*extra:.1f} · zoom máximo {S/s.min()*extra:.2f}x')
