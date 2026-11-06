# Cuts the car (with ears, whiskers, logo and its contact shadow) out of the Teatro Solís hero frame.
# GrabCut on a 1/2 scale copy seeded with the yellow paint, the black ears and the tyres, then refined at full size.
# Usage: python uy-solis-mascara.py <cuadro0.png 3840x2144> <out_mask.png> <preview.jpg>
import sys
import cv2
import numpy as np

src, out, prev = sys.argv[1:4]
img = cv2.imread(src)
H, W = img.shape[:2]
s = 0.5
sm = cv2.resize(img, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
h, w = sm.shape[:2]
hsv = cv2.cvtColor(sm, cv2.COLOR_BGR2HSV)

# car box (full-size coords measured on the grid): x 1830..3400, y 880..1860
x0, y0, x1, y1 = int(1830 * s), int(880 * s), int(3400 * s), int(1860 * s)
mask = np.full((h, w), cv2.GC_BGD, np.uint8)
mask[y0:y1, x0:x1] = cv2.GC_PR_BGD
# probable foreground: the body silhouette core
yellow = (hsv[..., 0] >= 15) & (hsv[..., 0] <= 35) & (hsv[..., 1] > 120) & (hsv[..., 2] > 120)
inside = np.zeros((h, w), bool); inside[y0:y1, x0:x1] = True
mask[inside & yellow] = cv2.GC_FGD
# ears: two dark discs above the roof (full coords centres ~ (2450,1000) and (2700,1010), radius ~95)
for cx, cy in [(2450, 1000), (2700, 1010)]:
    cv2.circle(mask, (int(cx * s), int(cy * s)), int(70 * s), cv2.GC_FGD, -1)
# tyres and windows (dark) inside the body area
for cx, cy, r in [(1940, 1560, 70), (2530, 1680, 90), (2600, 1260, 60), (2200, 1260, 50)]:
    cv2.circle(mask, (int(cx * s), int(cy * s)), int(r * s), cv2.GC_FGD, -1)
bgd = np.zeros((1, 65), np.float64); fgd = np.zeros((1, 65), np.float64)
cv2.grabCut(sm, mask, None, bgd, fgd, 6, cv2.GC_INIT_WITH_MASK)
m = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
# keep the biggest blob (the car)
n, lab, st, _ = cv2.connectedComponentsWithStats(m)
if n > 1:
    big = 1 + np.argmax(st[1:, cv2.CC_STAT_AREA]); m = np.where(lab == big, 255, 0).astype(np.uint8)
m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
# fill holes
ff = m.copy(); cv2.floodFill(ff, None, (0, 0), 255); m = m | cv2.bitwise_not(ff)
full = cv2.resize(m, (W, H), interpolation=cv2.INTER_LINEAR)
# a piece of pink sidewalk right of the windscreen got in: inside that box keep only the yellow hood
hsv_full = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
box = np.zeros((H, W), bool); box[1240:1420, 3000:3320] = True
hood = (hsv_full[..., 0] >= 15) & (hsv_full[..., 0] <= 35) & (hsv_full[..., 1] > 110)
hood = cv2.dilate(hood.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool)
full[box & ~hood] = 0
full = cv2.GaussianBlur(full, (0, 0), 1.2)
cv2.imwrite(out, full)
pv = img.copy(); pv[full < 128] = (pv[full < 128] * 0.35).astype(np.uint8)
cv2.imwrite(prev, cv2.resize(pv, (1920, 1072)), [cv2.IMWRITE_JPEG_QUALITY, 85])
print('ok', out)
