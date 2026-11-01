# Replaces the AI-garbled Truly Nolen logo on the car door with the real emblem, in every frame of the hero video.
# The car barely moves in the frame (quieto.py 3 %), so the logo follows the red nose: same offset and scale per frame.
# Usage: python logo-puerta.py <in.mp4> <out.mp4> <emblem.png (transparent bg)> <ffmpeg>
#   LOGO="cx,cy,h"   centre and height of the logo in frame 0 (pixels of the video)   e.g. 1048,700,146
#   BORRAR="x0,y0,x1,y1"  box of the old logo to erase in frame 0                   e.g. 1008,622,1090,778
#   SQUEEZE=0.72 (narrower: the door is seen at an angle)  TILT=-2 (degrees)
import os, sys, subprocess, cv2, numpy as np
from PIL import Image
src, out, emb_path, FF = sys.argv[1:5]
cx0, cy0, H = [float(v) for v in os.environ['LOGO'].split(',')]
bx0, by0, bx1, by1 = [int(v) for v in os.environ['BORRAR'].split(',')]
SQ = float(os.environ.get('SQUEEZE', '0.72')); TILT = float(os.environ.get('TILT', '-2'))

def nose(f):
    b, g, r = cv2.split(f.astype(np.float32)); m = ((r > 65) & (r > g * 2.8) & (r > b * 1.6)).astype(np.uint8)
    h, w = m.shape; m[:int(h * .3)] = 0; m[:, :int(w * .45)] = 0
    cc, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE); k = max(cc, key=cv2.contourArea); mo = cv2.moments(k)
    return np.array([mo['m10'] / mo['m00'], mo['m01'] / mo['m00']]), (cv2.contourArea(k) / np.pi) ** .5

def emblem(height):
    e = Image.open(emb_path).convert('RGBA'); e = e.crop(e.getbbox()); w = max(1, round(e.width * height / e.height * SQ))
    e = e.resize((w * 3, round(height) * 3), Image.LANCZOS).rotate(TILT, Image.BICUBIC, expand=True)
    e = e.resize((e.width // 3, e.height // 3), Image.LANCZOS); return np.array(e).astype(np.float32)

cap = cv2.VideoCapture(src); fps = cap.get(cv2.CAP_PROP_FPS); W = int(cap.get(3)); Hh = int(cap.get(4))
enc = subprocess.Popen([FF, '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{Hh}', '-r', str(fps), '-i', '-',
                        '-an', '-c:v', 'libx264', '-crf', '12', '-preset', 'medium', '-pix_fmt', 'yuv420p', out], stdin=subprocess.PIPE)
# Pass 1: the car's path, from the red nose in every frame. The nose detection shakes ~0.5 px per frame, so the path
# is smoothed (moving average of ~2 s): the logo stays still on the door and only drifts with the car itself.
centers = []
while True:
    ok, f = cap.read()
    if not ok: break
    centers.append(nose(f)[0])
centers = np.array(centers)
# DOOR="x0,y0,x1,y1": a patch of the door itself (handle and seam, not the logo). If given, the logo follows the door's
# own motion (phase correlation against frame 0), so it stays glued to the door instead of sliding over it.
if os.environ.get('DOOR'):
    dx0, dy0, dx1, dy1 = [int(v) for v in os.environ['DOOR'].split(',')]
    cap.release(); cap = cv2.VideoCapture(src); ref = None; shifts = []
    while True:
        ok, f = cap.read()
        if not ok: break
        g = cv2.cvtColor(f[dy0:dy1, dx0:dx1], cv2.COLOR_BGR2GRAY).astype(np.float32)
        g = g * cv2.createHanningWindow(g.shape[::-1], cv2.CV_32F)
        if ref is None: ref = g
        shifts.append(cv2.phaseCorrelate(ref, g)[0])
    centers = np.array(shifts) + 0.0
K = int(os.environ.get('SUAVE', '49')); pad = K // 2
smooth = np.column_stack([np.convolve(np.pad(centers[:, i], (pad, pad), mode='edge'), np.ones(K) / K, mode='valid') for i in range(2)])
cap.release(); cap = cv2.VideoCapture(src)
s = 1.0; cache = {}; n = 0
emb_full = emblem(H)
while True:
    ok, f = cap.read()
    if not ok: break
    d = smooth[n] - smooth[0]
    # 1) erase the old logo: inpaint an ellipse around it (moved with the car)
    m = np.zeros(f.shape[:2], np.uint8)
    ex, ey = (bx0 + bx1) / 2 + d[0], (by0 + by1) / 2 + d[1]
    cv2.ellipse(m, (int(ex), int(ey)), (int((bx1 - bx0) / 2 * s), int((by1 - by0) / 2 * s)), 0, 0, 360, 255, -1)
    # SILL="xa,ya,xb,yb": the chrome sill under the logo; nothing below that line is erased (moved with the car)
    if os.environ.get('SILL'):
        xa, ya, xb, yb = [float(v) for v in os.environ['SILL'].split(',')]
        yy, xx = np.mgrid[0:m.shape[0], 0:m.shape[1]]
        m[yy > (ya + d[1]) + (xx - (xa + d[0])) * (yb - ya) / (xb - xa) - 3] = 0
    x0, y0 = int(ex - (bx1 - bx0)), int(ey - (by1 - by0)); x1, y1 = int(ex + (bx1 - bx0)), int(ey + (by1 - by0))
    roi = cv2.inpaint(f[y0:y1, x0:x1], m[y0:y1, x0:x1], 7, cv2.INPAINT_TELEA); f[y0:y1, x0:x1] = roi
    # 2) the real emblem, printed on the door: the door's light passes over it, soft edge like the photo
    # Sub-pixel placement: the emblem is shifted by the fractional part, so it never jumps a whole pixel.
    e0 = emb_full; fx, fy = cx0 + d[0] - e0.shape[1] / 2, cy0 + d[1] - e0.shape[0] / 2
    px, py = int(np.floor(fx)) - 2, int(np.floor(fy)) - 2
    e = cv2.warpAffine(cv2.copyMakeBorder(e0, 2, 2, 2, 2, cv2.BORDER_CONSTANT, value=0),
                       np.float32([[1, 0, fx - px - 2], [0, 1, fy - py - 2]]), (e0.shape[1] + 4, e0.shape[0] + 4), flags=cv2.INTER_LINEAR)
    eh, ew = e.shape[:2]
    reg = f[py:py + eh, px:px + ew].astype(np.float32)
    luma = cv2.GaussianBlur(cv2.cvtColor(reg.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32), (0, 0), 3)
    light = np.clip(luma / max(np.percentile(luma, 60), 1), 0.6, 1.15)[..., None]
    col = e[..., :3][..., ::-1]; gris = col.mean(axis=2, keepdims=True); col = (gris + (col - gris) * 0.78) * light * 0.9  # printed vinyl, a bit less saturated than the file
    a =cv2.GaussianBlur(e[..., 3] / 255, (0, 0), 0.6)[..., None] * 0.97
    mix = cv2.GaussianBlur(col * a + reg * (1 - a), (0, 0), 0.75)
    f[py:py + eh, px:px + ew] = mix.clip(0, 255).astype(np.uint8)
    enc.stdin.write(f.tobytes()); n += 1
enc.stdin.close(); enc.wait(); print('ok', n, 'cuadros', out)
