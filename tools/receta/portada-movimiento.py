# Colombia hero in motion from ONE still (no new AI video): the car (with its door logo, whiskers, dark windows) stays
# exactly as in the picture, so the logo can never move. Around it, the road and the scenery flow backward like a
# tracking shot (flow-map animation: two phases blended, seamless loop) and the wheels spin.
# Usage: python portada-movimiento.py <still.png> <out.mp4> <ffmpeg>
import sys, subprocess, cv2, numpy as np
src, out, FF = sys.argv[1:4]
img = cv2.imread(src)
W = 1920; s = W / img.shape[1]; img = cv2.resize(img, (W, round(img.shape[0] * s)), interpolation=cv2.INTER_AREA)
if img.shape[0] % 2: img = img[:-1]
H = img.shape[0]
P = lambda *v: [round(x * s) for x in v]              # coordinates measured on the 2300 px still

# 1) car mask (GrabCut inside the car box) + its shadow on the road: this part never moves
mask = np.full((H, W), cv2.GC_BGD, np.uint8)
x0, y0, x1, y1 = P(850, 300, 2110, 1185)
mask[y0:y1, x0:x1] = cv2.GC_PR_FGD
bg, fg = np.zeros((1, 65)), np.zeros((1, 65))
small = 0.5; ms = cv2.resize(mask, None, fx=small, fy=small, interpolation=cv2.INTER_NEAREST)
cv2.grabCut(cv2.resize(img, None, fx=small, fy=small), ms, None, bg, fg, 6, cv2.GC_INIT_WITH_MASK)
car = cv2.resize(((ms == cv2.GC_FGD) | (ms == cv2.GC_PR_FGD)).astype(np.uint8) * 255, (W, H), interpolation=cv2.INTER_LINEAR)
car = cv2.morphologyEx(car, cv2.MORPH_CLOSE, np.ones((25, 25), np.uint8))
cnts, _ = cv2.findContours((car > 127).astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
car = np.zeros((H, W), np.uint8); cv2.drawContours(car, [max(cnts, key=cv2.contourArea)], -1, 255, -1)
sx, sy, sw, sh = cv2.boundingRect(max(cnts, key=cv2.contourArea))
shadow = np.zeros((H, W), np.uint8)
cv2.ellipse(shadow, (sx + sw // 2, sy + sh - round(10 * s)), (sw // 2 + round(30 * s), round(55 * s)), 0, 0, 360, 255, -1)
keep = cv2.GaussianBlur(np.maximum(car, (shadow * 0.0).astype(np.uint8) | cv2.bitwise_and(shadow, cv2.dilate(car, np.ones((90, 90), np.uint8)))).astype(np.float32) / 255, (0, 0), 2.5)
car_a = cv2.GaussianBlur(car.astype(np.float32) / 255, (0, 0), 1.2)
cv2.imwrite(out.replace('.mp4', '-mascara.png'), (car_a * 255).astype(np.uint8))

# 2) background plate without the car (only its edges are ever sampled)
hole = cv2.dilate(car, np.ones((15, 15), np.uint8))
lo = cv2.inpaint(cv2.resize(img, None, fx=.25, fy=.25), cv2.resize(hole, None, fx=.25, fy=.25, interpolation=cv2.INTER_NEAREST), 7, cv2.INPAINT_TELEA)
plate = img.copy(); hb = hole > 0; plate[hb] = cv2.resize(lo, (W, H))[hb]

# 3) flow field: points recede toward the far end of the road (upper left); near things faster, mountains ~still
VP = np.array(P(-250, 640), np.float32)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
fx, fy = VP[0] - xx, VP[1] - yy
horizon = P(0, 0, 0, 640)[3]
depth = np.clip((yy - P(0, 0, 0, 380)[3]) / (horizon - P(0, 0, 0, 380)[3]), 0.05, 1.0)   # sky/mountains move little
depth = np.where(yy > horizon, 1.0, depth * 0.55)
SPEED = 0.03                                                   # fraction of the distance per loop cycle
fx, fy = fx * SPEED * depth, fy * SPEED * depth

# 4) wheels: (cx, cy, rx, ry) of each rim on the 2300 px still; spun by unwarping the ellipse to a circle
wheels = [(925, 932, 42, 92), (1322, 992, 64, 125)]

T = 48; N = 240; fps = 24
enc = subprocess.Popen([FF, '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(fps), '-i', '-',
                        '-an', '-c:v', 'libx264', '-crf', '14', '-preset', 'slow', '-pix_fmt', 'yuv420p', out], stdin=subprocess.PIPE)
platef = plate.astype(np.float32); imgf = img.astype(np.float32)
def advect(ph):
    return cv2.remap(platef, xx - fx * ph, yy - fy * ph, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
for n in range(N):
    p1 = (n % T) / T; p2 = (p1 + .5) % 1
    w1 = 1 - abs(2 * p1 - 1)
    bgf = advect(p1) * w1 + advect(p2) * (1 - w1)
    bgf = cv2.GaussianBlur(bgf, (0, 0), 0.6)                     # a touch of motion softness
    f = bgf * (1 - keep[..., None]) + imgf * keep[..., None]    # car + shadow from the still, untouched
    for (cx, cy, rx, ry) in wheels:
        cx, cy, rx, ry = P(cx, cy, rx, ry); R = ry
        x0, y0 = cx - rx - 4, cy - ry - 4; x1, y1 = cx + rx + 4, cy + ry + 4
        patch = imgf[y0:y1, x0:x1]
        circ = cv2.resize(patch, (2 * R + 8, 2 * R + 8))
        acc = np.zeros_like(circ)
        base = -360 / 5 * (n % 24) / 24                        # 5 spokes: one spoke-step per second
        for k in range(-3, 4):                                  # rotational blur
            M = cv2.getRotationMatrix2D((R + 4, R + 4), base + k * 4, 1)
            acc += cv2.warpAffine(circ, M, circ.shape[1::-1], borderMode=cv2.BORDER_REFLECT)
        rim = cv2.resize(acc / 7, (x1 - x0, y1 - y0))
        m = np.zeros((y1 - y0, x1 - x0), np.float32); cv2.ellipse(m, (rx + 4, ry + 4), (rx - 2, ry - 2), 0, 0, 360, 1, -1)
        m = cv2.GaussianBlur(m, (0, 0), 2)[..., None]
        f[y0:y1, x0:x1] = rim * m + f[y0:y1, x0:x1] * (1 - m)
    enc.stdin.write(f.clip(0, 255).astype(np.uint8).tobytes())
enc.stdin.close(); enc.wait(); print('ok', out, W, H, N)
