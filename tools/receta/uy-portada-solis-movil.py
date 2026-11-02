# Uruguay hero, Teatro Solís version (2-nov-2026): Gemini still (official car base + CC0 photo of Teatro Solís as
# reference). Prints the real door emblem over the AI letters and renders an 8 s clip with a slow, steady push-in
# (like a camera on a slider) so the page keeps its car -> world film. No invented motion on the road.
# Usage: python uy-portada-solis.py <still 2752x1536> <emblem.png> <out.mp4> <ffmpeg>
import sys, subprocess, cv2, numpy as np
from PIL import Image

src, emb_path, out, FF = sys.argv[1:5]
img = cv2.imread(src); H, W = img.shape[:2]
assert (W, H) == (1536, 2752), (W, H)   # vertical (phone) version

# ---------- AI leftover: fake letters on the cornice, right of the real "TEATRO SOLIS" sign ----------
junk = np.zeros((H, W), np.uint8)
img = cv2.inpaint(img, junk, 6, cv2.INPAINT_TELEA)

# ---------- real door logo ----------
# erase ONLY the old logo pixels (anything that is not the yellow door paint) inside the logo area
box = np.zeros((H, W), bool); box[1752:1872, 722:792] = True
gy, gx = np.mgrid[0:H, 0:W]
sill = 1862 + (gx - 664) * 0.22                             # top of the chrome sill (measured on the vertical)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
paint_px = (hsv[..., 0] >= 12) & (hsv[..., 0] <= 32) & (hsv[..., 1] > 110) & (hsv[..., 2] > 110)
er = (box & ~paint_px & (gy < sill - 2)).astype(np.uint8) * 255
er = cv2.dilate(er, np.ones((7, 7), np.uint8)); er[gy > sill - 2] = 0
dark_tail = np.zeros((H, W), bool); dark_tail[0:0, 0:0] = True     # end of the old arc, on the sill edge
er[dark_tail & (hsv[..., 2] < 95) & (gy < sill + 8)] = 255
img = cv2.inpaint(img, er, 7, cv2.INPAINT_TELEA)
img = np.where(er[..., None] > 0, cv2.GaussianBlur(img, (0, 0), 2), img)
paint = cv2.GaussianBlur(img, (0, 0), 6)
e = Image.open(emb_path).convert('RGBA'); e = e.crop(e.getbbox())
EH = 122; SQ = 0.70; TILT = -2
ew = max(1, round(e.width * EH / e.height * SQ))
e = e.resize((ew * 3, EH * 3), Image.LANCZOS).rotate(TILT, Image.BICUBIC, expand=True)
e = np.array(e.resize((e.width // 3, e.height // 3), Image.LANCZOS)).astype(np.float32)
eh_, ew_ = e.shape[:2]; cx, cy = 757, 1812
x0, y0 = cx - ew_ // 2, cy - eh_ // 2
roi = img[y0:y0 + eh_, x0:x0 + ew_].astype(np.float32)
lum = cv2.cvtColor(paint[y0:y0 + eh_, x0:x0 + ew_], cv2.COLOR_BGR2GRAY).astype(np.float32)
shade = (lum / max(1.0, np.median(lum)))[..., None] * 0.9
bgr = e[..., 2::-1].copy()
sat = bgr.max(-1) - bgr.min(-1)
bgr = np.where(((sat < 40) & (bgr.mean(-1) > 60))[..., None], bgr * 0.28, bgr)   # grey ears -> black
a = e[..., 3:4] / 255 * 0.96
img[y0:y0 + eh_, x0:x0 + ew_] = (roi * (1 - a) + bgr * np.clip(shade, 0.55, 1.15) * a).clip(0, 255).astype(np.uint8)
cv2.imwrite(out.replace('.mp4', '-logo.jpg'), img[1700:1920, 680:840], [cv2.IMWRITE_JPEG_QUALITY, 95])
cv2.imwrite(out.replace('.mp4', '-limpia.png'), img)

# ---------- 8 s slow push-in toward the car (3 %), 3840x2144 ----------
FPS, N, ZOOM = 24, 192, 0.03
OW, OH = 2160, 3840
fx, fy = 900.0, 1800.0                                     # zoom toward the car
enc = subprocess.Popen([FF, '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{OW}x{OH}', '-r', str(FPS), '-i', '-',
                        '-an', '-c:v', 'libx264', '-crf', '16', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out],
                       stdin=subprocess.PIPE)
base = OW / W                                               # 1536 -> 2160
for n in range(N):
    t = n / (N - 1); ease = t * t * (3 - 2 * t) * 0.35 + t * 0.65   # steady, soft start
    s = base * (1 + ZOOM * ease)
    M = np.float32([[s, 0, OW / 2 - (W / 2 + (fx - W / 2) * ZOOM * ease * 0) * s],
                    [0, s, OH / 2 - (H / 2) * s]])
    # keep the focus point (car) at a fixed screen spot while scaling
    M[0, 2] = fx * base - fx * s + (OW / 2 - W / 2 * base)
    M[1, 2] = fy * base - fy * s + (OH / 2 - H / 2 * base)
    f = cv2.warpAffine(img, M, (OW, OH), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REFLECT)
    enc.stdin.write(f.tobytes())
enc.stdin.close(); enc.wait(); print('ok', out, N)
