# Colombia hero still: user's Gemini image + Pablo's model (dark windows, door logo, thin long whiskers). Everything fixed.
import os, cv2, numpy as np
from PIL import Image
exec(open('bigotes-geometria.py', encoding='utf-8').read())
img = cv2.imread('base.jpg'); H0, W0 = img.shape[:2]
# 1) dark tinted windows (Pablo / recipe: OSCURO 0.22 with a soft reflection)
win = np.zeros((H0, W0), np.uint8)
cv2.fillPoly(win, [np.array([(1262,700),(1612,700),(1705,742),(1792,840),(1268,843)])], 255)
cv2.fillPoly(win, [np.array([(1000,846),(1075,745),(1110,724),(1232,719),(1246,843)])], 255)
a = cv2.GaussianBlur(win.astype(np.float32) / 255, (0, 0), 1.6)[..., None]
f = img.astype(np.float32); refl = cv2.GaussianBlur(f, (0, 0), 6)
dark = f * 0.22 + refl * 0.10
img = (f * (1 - a) + dark * a).clip(0, 255).astype(np.uint8)
# 2) whiskers (same geometry as the video tool), static
b, g, r = cv2.split(img.astype(np.float32)); m = ((r > 65) & (r > g * 2.8) & (r > b * 1.6)).astype(np.uint8) * 255
roi = np.zeros_like(m); cv2.circle(roi, (1855, 985), 90, 255, -1); m &= roi
cc, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE); c = max(cc, key=cv2.contourArea); mo = cv2.moments(c)
center = np.array([mo['m10'] / mo['m00'], mo['m01'] / mo['m00']]); rad = (cv2.contourArea(c) / np.pi) ** .5
nose = np.zeros_like(m); cv2.drawContours(nose, [cv2.convexHull(c)], -1, 255, -1); nose = cv2.dilate(nose, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (6, 6)))
M = np.array([[1., 0, 0], [0, 1., 0]]); size = rad / 22 * float(os.environ.get('BIGOTE', '1.0'))
img = composite(img, center, M, nose, size, 0.0)
print('nariz', center.round(1), 'radio', round(rad, 1))
# 3) door logo, centred on the door, printed look
e = Image.open('../emblema/emblema-limpio.png').convert('RGBA'); e = e.crop(e.getbbox()); Hl = 168
w = round(e.width * Hl / e.height * 0.8); e = e.resize((w * 3, Hl * 3), Image.LANCZOS).rotate(-2, Image.BICUBIC, expand=True)
e = np.array(e.resize((e.width // 3, e.height // 3), Image.LANCZOS)).astype(np.float32)
cx, cy = int(os.environ.get('LX', '1142')), int(os.environ.get('LY', '990'))
eh, ew = e.shape[:2]; px, py = cx - ew // 2, cy - eh // 2
reg = img[py:py+eh, px:px+ew].astype(np.float32)
luma = cv2.GaussianBlur(cv2.cvtColor(reg.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32), (0, 0), 4)
light = np.clip(luma / max(np.percentile(luma, 60), 1), 0.6, 1.15)[..., None]
col = e[..., :3][..., ::-1]; gg = col.mean(axis=2, keepdims=True); col = (gg + (col - gg) * 0.75) * light * 0.86
al = cv2.GaussianBlur(e[..., 3] / 255, (0, 0), 0.5)[..., None] * 0.97
img[py:py+eh, px:px+ew] = (col * al + reg * (1 - al)).clip(0, 255).astype(np.uint8)
cv2.imwrite('portada.png', img); print('ok')
