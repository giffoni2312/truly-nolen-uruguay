# Door logo as ONE fixed plate (Colombia 31-oct, fixes the flicker of logo-puerta.py):
# frame 0 is cleaned ONCE (old AI logo erased, including its arc tail down to the chrome sill) and the real emblem is
# printed on it. That plate is pasted on every frame, moved only by the door's own motion (phase correlation on the
# door handle area), with feathered edges and the frame's local brightness. Nothing is re-inpainted per frame, so the
# area cannot shimmer: the logo is glued to the door.
# Usage: python logo-placa.py <in.mp4> <out.mp4> <emblem.png> <ffmpeg>
#   LOGO="cx,cy,h"  BORRAR="x0,y0,x1,y1"  SILL="xa,ya,xb,yb"  DOOR="x0,y0,x1,y1"  SQUEEZE TILT  (pixels of frame 0)
import os, sys, subprocess, cv2, numpy as np
from PIL import Image
src, out, emb_path, FF = sys.argv[1:5]
cx, cy, H = [float(v) for v in os.environ['LOGO'].split(',')]
bx0, by0, bx1, by1 = [int(v) for v in os.environ['BORRAR'].split(',')]
xa, ya, xb, yb = [float(v) for v in os.environ['SILL'].split(',')]
dx0, dy0, dx1, dy1 = [int(v) for v in os.environ['DOOR'].split(',')]
SQ = float(os.environ.get('SQUEEZE', '0.72')); TILT = float(os.environ.get('TILT', '-2'))

cap = cv2.VideoCapture(src); fps = cap.get(cv2.CAP_PROP_FPS); frames = []
while True:
    ok, f = cap.read()
    if not ok: break
    frames.append(f)
Hh, W = frames[0].shape[:2]
yy, xx = np.mgrid[0:Hh, 0:W]
above_sill = yy < ya + (xx - xa) * (yb - ya) / (xb - xa) - 2

# 1) clean plate from frame 0: erase the whole old logo (ellipse + its dark strokes nearby), never below the sill
f0 = frames[0].copy()
m = np.zeros((Hh, W), np.uint8)
cv2.ellipse(m, ((bx0 + bx1) // 2, (by0 + by1) // 2), ((bx1 - bx0) // 2, (by1 - by0) // 2), 0, 0, 360, 255, -1)
gray = cv2.cvtColor(f0, cv2.COLOR_BGR2GRAY)
near = cv2.dilate(m, np.ones((25, 25), np.uint8)) > 0
dark = (gray < 110) & near & (yy > by0 + 40)      # old arc tail / letters outside the ellipse (never the window above)
m[dark] = 255; m = cv2.dilate(m, np.ones((5, 5), np.uint8)); m[~above_sill] = 0
clean = cv2.inpaint(f0, m, 9, cv2.INPAINT_TELEA)
# soften the inpainted patch so it reads as smooth painted metal (no inpaint streaks)
blur = cv2.GaussianBlur(clean, (0, 0), 3); mk = cv2.GaussianBlur(m.astype(np.float32) / 255, (0, 0), 2)[..., None]
clean = (clean * (1 - mk) + blur * mk).astype(np.uint8)

# 2) print the real emblem on the clean plate
e = Image.open(emb_path).convert('RGBA'); e = e.crop(e.getbbox()); w = max(1, round(e.width * H / e.height * SQ))
e = e.resize((w * 3, round(H) * 3), Image.LANCZOS).rotate(TILT, Image.BICUBIC, expand=True)
e = np.array(e.resize((e.width // 3, e.height // 3), Image.LANCZOS)).astype(np.float32)
eh, ew = e.shape[:2]; px, py = int(round(cx - ew / 2)), int(round(cy - eh / 2))
reg = clean[py:py + eh, px:px + ew].astype(np.float32)
luma = cv2.GaussianBlur(cv2.cvtColor(reg.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32), (0, 0), 3)
light = np.clip(luma / max(np.percentile(luma, 60), 1), 0.6, 1.15)[..., None]
col = e[..., :3][..., ::-1]; g = col.mean(axis=2, keepdims=True); col = (g + (col - g) * float(os.environ.get("SAT", "0.78"))) * light * float(os.environ.get("BRILLO", "0.9"))
a = cv2.GaussianBlur(e[..., 3] / 255, (0, 0), 0.6)[..., None] * 0.97
clean[py:py + eh, px:px + ew] = cv2.GaussianBlur(col * a + reg * (1 - a), (0, 0), 0.75).clip(0, 255).astype(np.uint8)

# plate = bounding box around erase mask + logo, with a feathered alpha
lm = np.zeros((Hh, W), np.uint8); lm[py:py + eh, px:px + ew] = (e[..., 3] > 10).astype(np.uint8) * 255
cover = cv2.dilate(cv2.bitwise_or(m, lm), np.ones((9, 9), np.uint8)); cover[~above_sill] = 0
ys, xs = np.where(cover > 0); X0, Y0, X1, Y1 = xs.min() - 12, ys.min() - 12, xs.max() + 12, ys.max() + 12
plate = clean[Y0:Y1, X0:X1].astype(np.float32)
alpha = cv2.GaussianBlur(cover[Y0:Y1, X0:X1].astype(np.float32) / 255, (0, 0), 3)[..., None]
ring = (cv2.dilate(cover, np.ones((31, 31), np.uint8)) > 0) & (cover == 0) & above_sill
ring_box = ring[Y0 - 20:Y1 + 20, X0 - 20:X1 + 20]
def ring_mean(img, dx, dy):
    sub = img[Y0 - 20 + int(round(dy)):Y1 + 20 + int(round(dy)), X0 - 20 + int(round(dx)):X1 + 20 + int(round(dx))]
    return sub[ring_box].astype(np.float32).mean(axis=0)
base = ring_mean(f0, 0, 0)

# 3) door motion (phase correlation on the handle area), lightly smoothed
ref = None; sh = []
win = None
for f in frames:
    gg = cv2.cvtColor(f[dy0:dy1, dx0:dx1], cv2.COLOR_BGR2GRAY).astype(np.float32)
    if win is None: win = cv2.createHanningWindow(gg.shape[::-1], cv2.CV_32F)
    gg *= win
    if ref is None: ref = gg
    sh.append(cv2.phaseCorrelate(ref, gg)[0])
sh = np.array(sh); K = int(os.environ.get('SUAVE', '5')); p = K // 2
sh = np.column_stack([np.convolve(np.pad(sh[:, i], (p, p), mode='edge'), np.ones(K) / K, mode='valid') for i in range(2)])
if os.environ.get('QUIETO') == '1': sh[:] = 0   # logo fixed on screen: it never moves (the door moves under 2 px)

enc = subprocess.Popen([FF, '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{Hh}', '-r', str(fps), '-i', '-',
                        '-an', '-c:v', 'libx264', '-crf', '12', '-preset', 'medium', '-pix_fmt', 'yuv420p', out], stdin=subprocess.PIPE)
pw, ph = X1 - X0, Y1 - Y0
for n, f in enumerate(frames):
    dx, dy = sh[n]
    gain = ring_mean(f, dx, dy) / np.maximum(base, 1)          # follow the frame's light on the door
    M = np.float32([[1, 0, X0 + dx], [0, 1, Y0 + dy]])
    pl = cv2.warpAffine(plate * gain, M, (W, Hh), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)
    al = cv2.warpAffine(alpha[..., 0], M, (W, Hh), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)[..., None]
    sl = slice(Y0 - 4, Y1 + 4), slice(X0 - 4, X1 + 4)
    f[sl] = (pl[sl] * al[sl] + f[sl].astype(np.float32) * (1 - al[sl])).clip(0, 255).astype(np.uint8)
    enc.stdin.write(f.tobytes())
enc.stdin.close(); enc.wait(); print('ok', len(frames), 'cuadros', out, 'placa', pw, 'x', ph)
