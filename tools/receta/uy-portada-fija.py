# Uruguay hero still (adapted from Colombia's portada-fija.py + logo-placa.py):
#  1) erase the AI-garbled door logo (inpaint, never below the chrome sill)
#  2) print the REAL emblem (tn-emblema.png) on the door, following the door's light
#  3) add the thin animated-style whiskers from bigotes-geometria.py (static, BIGOTE=0.7 like the recipe)
# Usage (from tools/receta): python uy-portada-fija.py <in.jpg> <out.png> <emblem.png>
#   env: LOGO="cx,cy,h"  BORRAR="x0,y0,x1,y1"  SILL="xa,ya,xb,yb"  NARIZ="x,y,r"  (pixels of the input image)
import os, sys, cv2, numpy as np
from PIL import Image
exec(open('bigotes-geometria.py', encoding='utf-8').read())
src, out, emb_path = sys.argv[1:4]
img = cv2.imread(src); Hh, W = img.shape[:2]
cx, cy, H = [float(v) for v in os.environ['LOGO'].split(',')]
bx0, by0, bx1, by1 = [int(v) for v in os.environ['BORRAR'].split(',')]
xa, ya, xb, yb = [float(v) for v in os.environ['SILL'].split(',')]
yy, xx = np.mgrid[0:Hh, 0:W]
above_sill = yy < ya + (xx - xa) * (yb - ya) / (xb - xa) - float(os.environ.get("MARGEN", "2"))

# 1) erase old logo: ellipse over the box + dark/red strokes nearby, never under the sill
m = np.zeros((Hh, W), np.uint8)
cv2.ellipse(m, ((bx0 + bx1) // 2, (by0 + by1) // 2), ((bx1 - bx0) // 2, (by1 - by0) // 2), 0, 0, 360, 255, -1)
b, g, r = cv2.split(img.astype(np.int32)); gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
near = cv2.dilate(m, np.ones((31, 31), np.uint8)) > 0
ink = ((gray < 120) | ((r > 120) & (g < 90))) & near & (yy > by0 - 10)
m[ink] = 255; m = cv2.dilate(m, np.ones((7, 7), np.uint8)); m[~above_sill] = 0
clean = cv2.inpaint(img, m, 11, cv2.INPAINT_TELEA)
blur = cv2.GaussianBlur(clean, (0, 0), 4); mk = cv2.GaussianBlur(m.astype(np.float32) / 255, (0, 0), 2.5)[..., None]
clean = (clean * (1 - mk) + blur * mk).astype(np.uint8)

# 2) real emblem, slightly narrowed (door seen at an angle), lit like the door
SQ = float(os.environ.get('SQUEEZE', '0.80')); TILT = float(os.environ.get('TILT', '-2'))
e = Image.open(emb_path).convert('RGBA'); e = e.crop(e.getbbox()); w = max(1, round(e.width * H / e.height * SQ))
e = e.resize((w * 3, round(H) * 3), Image.LANCZOS).rotate(TILT, Image.BICUBIC, expand=True)
e = np.array(e.resize((e.width // 3, e.height // 3), Image.LANCZOS)).astype(np.float32)
eh, ew = e.shape[:2]; px, py = int(round(cx - ew / 2)), int(round(cy - eh / 2))
reg = clean[py:py + eh, px:px + ew].astype(np.float32)
luma = cv2.GaussianBlur(cv2.cvtColor(reg.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32), (0, 0), 3)
light = np.clip(luma / max(np.percentile(luma, 60), 1), 0.6, 1.15)[..., None]
col = e[..., :3][..., ::-1]; gg = col.mean(axis=2, keepdims=True)
col = (gg + (col - gg) * float(os.environ.get('SAT', '0.85'))) * light * float(os.environ.get('BRILLO', '0.92'))
a = cv2.GaussianBlur(e[..., 3] / 255, (0, 0), 0.6)[..., None] * 0.97
clean[py:py + eh, px:px + ew] = cv2.GaussianBlur(col * a + reg * (1 - a), (0, 0), 0.6).clip(0, 255).astype(np.uint8)
img = clean

# 3) whiskers around the red nose (auto-detected inside a circle around NARIZ)
nx, ny, nr = [float(v) for v in os.environ['NARIZ'].split(',')]
b, g, r = cv2.split(img.astype(np.float32)); red = ((r > 90) & (r > g * 2.4) & (r > b * 1.6)).astype(np.uint8) * 255
roi = np.zeros_like(red); cv2.circle(roi, (int(nx), int(ny)), int(nr), 255, -1); red &= roi
cc, _ = cv2.findContours(red, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE); c = max(cc, key=cv2.contourArea); mo = cv2.moments(c)
center = np.array([mo['m10'] / mo['m00'], mo['m01'] / mo['m00']]); rad = (cv2.contourArea(c) / np.pi) ** .5
nose = np.zeros_like(red); cv2.drawContours(nose, [cv2.convexHull(c)], -1, 255, -1)
nose = cv2.dilate(nose, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (6, 6)))
M = np.array([[1., 0, 0], [0, 1., 0]]); size = rad / 22 * float(os.environ.get('BIGOTE', '0.7'))
img = composite(img, center, M, nose, size, 0.0)
cv2.imwrite(out, img)
print('ok', out, 'nariz', center.round(1), 'radio', round(rad, 1), 'logo', (px, py, ew, eh))
