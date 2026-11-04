# Re-prints the real Truly Nolen emblem on the technician's shirt so it looks printed on the fabric, not a sticker:
# 1) erases the old pasted emblem (inpaint), 2) keeps only the black/red ink of tn-emblema.png (the yellow plate
# becomes the shirt itself), 3) multiplies the ink by the fabric shading so folds and light pass through it.
# Usage: uv run --with pillow==10.4.0 --with opencv-python-headless==4.10.0.84 --with numpy python uy-emblema-estampado.py
#        <photo> <emblem.png> <out> <erase x0,y0,x1,y1> <center x,y> <height px> [squeeze_x] [rotation_deg]
import sys
import cv2
import numpy as np
from PIL import Image, ImageFilter

photo, emblem_path, out = sys.argv[1:4]
ex0, ey0, ex1, ey1 = map(int, sys.argv[4].split(','))
cx, cy = map(float, sys.argv[5].split(','))
height = float(sys.argv[6])
squeeze = float(sys.argv[7]) if len(sys.argv) > 7 else 1.0
rot = float(sys.argv[8]) if len(sys.argv) > 8 else 0.0

img = np.array(Image.open(photo).convert('RGB'))
bgr = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

# 1) erase the old emblem
# Only the pixels that are not shirt fabric (ink, outline and the brighter plate) are erased, so the folds stay.
box = bgr[ey0:ey1, ex0:ex1]
hsv = cv2.cvtColor(box, cv2.COLOR_BGR2HSV).astype(np.float32)
ring = np.concatenate([box[:3].reshape(-1, 3), box[-3:].reshape(-1, 3), box[:, :3].reshape(-1, 3), box[:, -3:].reshape(-1, 3)])
fabric = np.median(cv2.cvtColor(ring[None].astype(np.uint8), cv2.COLOR_BGR2HSV)[0].astype(np.float32), 0)
off = (np.abs(hsv[..., 0] - fabric[0]) > 7) | (np.abs(hsv[..., 2] - fabric[2]) > 38) | (hsv[..., 1] < fabric[1] - 60)
local = (off.astype(np.uint8) * 255)
local = cv2.dilate(local, np.ones((5, 5), np.uint8), iterations=2)
mask = np.zeros(bgr.shape[:2], np.uint8)
mask[ey0:ey1, ex0:ex1] = local
bgr = cv2.inpaint(bgr, mask, 4, cv2.INPAINT_TELEA)
# give the patched pixels the fabric grain back
grain = np.random.default_rng(3).normal(0, 2.2, bgr.shape).astype(np.float32)
m = (cv2.GaussianBlur(mask.astype(np.float32) / 255, (0, 0), 1.2))[..., None]
bgr = np.clip(bgr.astype(np.float32) + grain * m, 0, 255).astype(np.uint8)

# 2) ink only: black and red parts of the emblem; yellow plate and transparent areas drop out
em = Image.open(emblem_path).convert('RGBA')
w = int(round(height * em.width / em.height * squeeze))
em = em.resize((max(1, w), int(round(height))), Image.LANCZOS)
if rot:
    em = em.rotate(rot, resample=Image.BICUBIC, expand=True)
e = np.array(em).astype(np.float32) / 255
r, g, b, a = e[..., 0], e[..., 1], e[..., 2], e[..., 3]
yellow = (r > 0.7) & (g > 0.5) & (b < 0.6) & (g > 0.62 * r)  # plate and its light fringe
ink_alpha = np.where(yellow, 0.0, a)
ink_alpha = cv2.GaussianBlur(ink_alpha, (0, 0), 0.45)
ink = np.stack([b, g, r], -1)  # to BGR

# 3) place it and multiply by the fabric shading
h_, w_ = ink.shape[:2]
x0, y0 = int(round(cx - w_ / 2)), int(round(cy - h_ / 2))
region = bgr[y0:y0 + h_, x0:x0 + w_].astype(np.float32) / 255
lum = cv2.cvtColor((region * 255).astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32) / 255
shade = lum / max(1e-3, float(np.median(lum)))
shade = np.clip(shade, 0.55, 1.25)[..., None]
printed = np.clip(ink * shade * 0.9, 0, 1)
printed = printed * 0.88 + printed.mean(-1, keepdims=True) * 0.12  # ink absorbed by the fabric, less glow
noise = np.random.default_rng(7).normal(0, 0.012, printed.shape).astype(np.float32)
printed = np.clip(printed + noise, 0, 1)
al = (ink_alpha * 0.93)[..., None]
region = region * (1 - al) + printed * al
bgr[y0:y0 + h_, x0:x0 + w_] = (region * 255).astype(np.uint8)

Image.fromarray(cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)).save(out, quality=92)
print('ok', out, 'emblema', w_, 'x', h_, 'en', x0, y0)
