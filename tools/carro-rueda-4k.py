# Uruguay hero in 4K: the approved still (real logo) placed on the right of a wider Gemini-extended scene, animated as a
# tracking shot. The car, its shadow and the solid lines never move; the asphalt streams toward the vanishing point, the
# centre dashes slide past and shrink toward the horizon, the wheels spin, the background drifts slowly for parallax.
# Usage: python carro-rueda-4k.py <composite 3840x2144> <out.mp4> <ffmpeg> [seconds]
# Coordinates measured on the 2752 px still are mapped with K, OX, OY (where the still sits inside the composite).
import sys, subprocess, cv2, numpy as np
src, out, FF = sys.argv[1:4]
SECS = float(sys.argv[4]) if len(sys.argv) > 4 else 8.0
FPS = 24; N = round(SECS * FPS)
img = cv2.imread(src); H, W = img.shape[:2]
K, OX, OY = 1.0465, 960.0, 321.0
F = K / (1920 / 2752)                                          # pixel constants were tuned for the still at 1920 px
def P(*v): return (np.array(v, np.float32).reshape(-1, 2) * K + (OX, OY)).reshape(-1)
def Px(x): return np.asarray(x, np.float64) * K + OX
def Py(y): return np.asarray(y, np.float64) * K + OY
def fs(v): return max(1, int(round(v * F)))
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
VP = P(-300, 675); M = 0.2149                                  # vanishing point and slope of the centre dashed line
rng = np.random.default_rng(5)
dbg = out.replace('.mp4', '')
gray0 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
line_top = VP[1] + (xx - VP[0]) * ((990 - 675) / (2752 + 300))    # grass-strip top edge, a ray from the VP
gzone = yy > line_top + 2

# ---------- 0) far stretch from Gemini: its dashed continuation of the solid line becomes a continuous solid line ----------
A = np.array([(704, 1044), (749, 1088), (796, 1117), (834, 1141), (861, 1156), (901, 1177), (961, 1209), (1023, 1242)], np.float32)
amask = np.zeros((H, W), np.uint8); cv2.polylines(amask, [A.astype(np.int32)], False, 255, 22)
erase = ((amask > 0) & (gray0 - cv2.blur(gray0, (41, 41)) > 25)).astype(np.uint8) * 255
img = cv2.inpaint(img, cv2.dilate(erase, np.ones((5, 5), np.uint8)), 5, cv2.INPAINT_TELEA)
lc = np.median(img[int(Py(1000)):int(Py(1100)), int(Px(150)):int(Px(400))][
    (gray0[int(Py(1000)):int(Py(1100)), int(Px(150)):int(Px(400))] > 200)], axis=0)    # colour of the photo's solid line
la = np.zeros((H * 4, W * 4), np.uint8)
for i in range(len(A) - 1):
    w = 2 + 10 * (i + 1) / (len(A) - 1)                      # thicker toward the camera
    cv2.line(la, tuple((A[i] * 4 * 8).astype(int)), tuple((A[i + 1] * 4 * 8).astype(int)), 255, int(w * 4), cv2.LINE_AA, 3)
la = cv2.GaussianBlur(cv2.resize(la, (W, H), interpolation=cv2.INTER_AREA).astype(np.float32) / 255, (0, 0), 0.8)[..., None] * 0.92
img = (img * (1 - la) + lc * la).clip(0, 255).astype(np.uint8)
gray0 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)

# ---------- 1) car mask (hand outline refined by GrabCut) + its long shadow: never move ----------
o19 = np.array([(45, 470), (40, 360), (55, 300), (80, 250), (115, 205), (160, 175), (230, 160), (300, 152), (380, 150),
                (470, 155), (540, 170), (580, 215), (600, 240), (612, 262), (650, 280), (700, 300), (730, 330), (745, 370),
                (752, 420), (746, 462), (722, 500), (690, 525), (560, 528), (420, 540), (310, 558), (250, 552), (170, 472),
                (120, 478), (60, 476)], np.float32) + (560, 330)
c19 = 2752 / 1920                                              # the outline was traced on the still shown at 1920 px
outline = P(*(o19 * c19).reshape(-1)).reshape(-1, 2).astype(np.int32)
poly_m = np.zeros((H, W), np.uint8); cv2.fillPoly(poly_m, [outline], 255)
for (ex, ey, er) in ((298, 95, 55), (455, 98, 53)):           # the two ears
    cx_, cy_ = P((ex + 560) * c19, (ey + 330) * c19); cv2.circle(poly_m, (int(cx_), int(cy_)), int(er * c19 * K), 255, -1)
r0 = P((560 + 270) * c19, (330 + 120) * c19, (560 + 480) * c19, (330 + 160) * c19).astype(int)
cv2.rectangle(poly_m, (r0[0], r0[1]), (r0[2], r0[3]), 255, -1)
band = fs(10)
gc = np.full((H, W), cv2.GC_BGD, np.uint8)
gc[cv2.dilate(poly_m, np.ones((2 * band + 1,) * 2, np.uint8)) > 0] = cv2.GC_PR_BGD
gc[poly_m > 0] = cv2.GC_PR_FGD
gc[cv2.erode(poly_m, np.ones((2 * band + 1,) * 2, np.uint8)) > 0] = cv2.GC_FGD
x0, y0, x1, y1 = cv2.boundingRect(cv2.dilate(poly_m, np.ones((2 * band + 41,) * 2, np.uint8)))
sub = gc[y0:y0 + y1, x0:x0 + x1].copy(); bgm, fgm = np.zeros((1, 65)), np.zeros((1, 65))
cv2.grabCut(img[y0:y0 + y1, x0:x0 + x1], sub, None, bgm, fgm, 6, cv2.GC_INIT_WITH_MASK); gc[y0:y0 + y1, x0:x0 + x1] = sub
car = ((gc == cv2.GC_FGD) | (gc == cv2.GC_PR_FGD)).astype(np.uint8) * 255
car = cv2.morphologyEx(car, cv2.MORPH_OPEN, np.ones((fs(3),) * 2, np.uint8))
car = cv2.morphologyEx(car, cv2.MORPH_CLOSE, np.ones((fs(7),) * 2, np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(car)
car = (lab == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])).astype(np.uint8) * 255
shadow = np.zeros((H, W), np.uint8)
poly = P(380, 1120, 860, 1105, 1000, 1150, 1120, 1265, 1300, 1270, 1880, 1225, 1890, 1285, 1400, 1305,
         1150, 1335, 950, 1368, 750, 1342, 560, 1282, 380, 1232).reshape(-1, 2).astype(np.int32)
cv2.fillPoly(shadow, [poly], 255)
Lum = cv2.GaussianBlur(cv2.cvtColor(img, cv2.COLOR_BGR2LAB)[..., 0].astype(np.float32), (0, 0), 12 * F)
dark = ((Lum < 98) & (yy > line_top + 40 * F) & (xx < Px(1880))).astype(np.uint8) * 255
dark = cv2.morphologyEx(dark, cv2.MORPH_OPEN, np.ones((fs(15),) * 2, np.uint8))
dark = cv2.morphologyEx(dark, cv2.MORPH_CLOSE, np.ones((fs(31),) * 2, np.uint8))
nl, labl = cv2.connectedComponents(dark)
ids = set(np.unique(labl[shadow > 0])) - {0}
shadow = np.maximum(shadow, np.isin(labl, list(ids)).astype(np.uint8) * 255)
shadow = cv2.morphologyEx(shadow, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (fs(45),) * 2))
# solid white lines (edge lines, the long line through the shadow, the line drawn above) look the same moving or not
lineB = VP[1] + (xx - VP[0]) * M
bright = ((gray0 - cv2.blur(gray0, (fs(61),) * 2) > 35) & (gray0 > 140) & gzone &
          (np.abs(yy - lineB) > 6 + (xx - VP[0]) * 0.012)).astype(np.uint8) * 255
nb, labb, stb, _ = cv2.connectedComponentsWithStats(bright)
longc = [i for i in range(1, nb) if max(stb[i, cv2.CC_STAT_WIDTH], stb[i, cv2.CC_STAT_HEIGHT]) > fs(60) and stb[i, cv2.CC_STAT_HEIGHT] > fs(40)]
solid = np.isin(labb, longc).astype(np.uint8) * 255
solid = np.maximum(solid, (la[..., 0] > 0.05).astype(np.uint8) * 255)
solid = cv2.dilate(solid, np.ones((fs(7),) * 2, np.uint8))
keep = np.maximum(cv2.GaussianBlur(car.astype(np.float32) / 255, (0, 0), 1.2 * F),
                  cv2.GaussianBlur(shadow.astype(np.float32) / 255, (0, 0), 14 * F))
keep = np.maximum(keep, cv2.GaussianBlur(solid.astype(np.float32) / 255, (0, 0), 2 * F))[..., None]
cv2.imwrite(dbg + '-mascara.jpg', cv2.resize(np.maximum(np.maximum(car, shadow // 2), solid // 3), (W // 2, H // 2)))
ov = img.copy(); cnts, _ = cv2.findContours(car, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
cv2.drawContours(ov, cnts, -1, (255, 0, 255), 3); cv2.imwrite(dbg + '-borde.jpg', cv2.resize(ov, (W // 2, H // 2)))

# ---------- 2) regions: ground flows, everything above it drifts ----------
ground = cv2.GaussianBlur(gzone.astype(np.float32), (0, 0), 1.5 * F)[..., None]

# ---------- 3) plates: car filled, centre dashes erased (redrawn moving), ground under car + shadow rebuilt ----------
hole = cv2.dilate(car, np.ones((fs(5),) * 2, np.uint8))
k = 4; small = cv2.resize(img, (W // k, H // k), interpolation=cv2.INTER_AREA)
fill = cv2.resize(cv2.inpaint(small, cv2.resize(hole, (W // k, H // k), interpolation=cv2.INTER_NEAREST), 9, cv2.INPAINT_TELEA), (W, H))
near_line = (np.abs(yy - lineB) < (4 * F + (xx - VP[0]) * 0.012)) & (xx > VP[0] + 10)
dash_px = (near_line & (gray0 - cv2.blur(gray0, (fs(61),) * 2) > 30)).astype(np.uint8) * 255
dash_px[hole > 0] = 0
dash_px = cv2.dilate(dash_px, np.ones((fs(7),) * 2, np.uint8))
dash_col = np.median(img[(dash_px > 0) & (gray0 > 150)], axis=0)
plate = img.copy(); plate[hole > 0] = fill[hole > 0]
plate = cv2.inpaint(plate, dash_px, 7, cv2.INPAINT_TELEA)
fillz = ((hole > 0) | (cv2.dilate(shadow, np.ones((fs(9),) * 2, np.uint8)) > 0)) & gzone
ys, xs = np.nonzero(fillz)
uxs = (xs - VP[0]); uys = (ys - VP[1]); nn = np.hypot(uxs, uys); uxs /= nn; uys /= nn
done = np.zeros(len(xs), bool); src_x = xs.astype(np.float32).copy(); src_y = ys.astype(np.float32).copy()
for step in range(4, int(900 * F), max(1, int(3 * F))):
    cx_ = np.clip((xs + uxs * step).round().astype(int), 0, W - 1); cy_ = np.clip((ys + uys * step).round().astype(int), 0, H - 1)
    ok = ~done & ~fillz[cy_, cx_]
    src_x[ok] = cx_[ok]; src_y[ok] = cy_[ok]; done |= ok
    if done.all(): break
plate[ys, xs] = plate[src_y.astype(int), src_x.astype(int)]
tone_mask = (fillz | ~gzone).astype(np.uint8) * 255
lr = 8
tone = cv2.inpaint(cv2.resize(img, (W // lr, H // lr), interpolation=cv2.INTER_AREA),
                   cv2.dilate(cv2.resize(tone_mask, (W // lr, H // lr), interpolation=cv2.INTER_NEAREST), np.ones((3, 3), np.uint8)), 5, cv2.INPAINT_TELEA)
tone = cv2.GaussianBlur(cv2.resize(tone, (W, H), interpolation=cv2.INTER_CUBIC).astype(np.float32), (0, 0), 6 * F)
pf = plate.astype(np.float32); detail = pf - cv2.GaussianBlur(pf, (0, 0), 25 * F)
zf = np.maximum(cv2.GaussianBlur(fillz.astype(np.float32), (0, 0), 12 * F), fillz.astype(np.float32))[..., None]
plate = (pf * (1 - zf) + (tone + detail) * zf).clip(0, 255).astype(np.uint8)
bg_hole = ((hole > 0) & ~gzone).astype(np.uint8) * 255
if bg_hole.any():
    src_ok = cv2.dilate(bg_hole, np.ones((fs(15),) * 2, np.uint8))
    half = cv2.resize(plate, (W // 2, H // 2), interpolation=cv2.INTER_AREA)
    sm = cv2.inpaint(half, cv2.resize(src_ok, (W // 2, H // 2), interpolation=cv2.INTER_NEAREST), 7, cv2.INPAINT_TELEA)
    plate[bg_hole > 0] = cv2.resize(sm, (W, H))[bg_hole > 0]
dist_car = cv2.distanceTransform((car == 0).astype(np.uint8), cv2.DIST_L2, 5)
wdrift = cv2.GaussianBlur(np.clip((dist_car - 15 * F) / (160 * F), 0, 1).astype(np.float32), (0, 0), 25 * F)
cv2.imwrite(dbg + '-plato.jpg', cv2.resize(plate, (W // 2, H // 2)))
platef = plate.astype(np.float32); imgf = img.astype(np.float32)

# ---------- 4) dash rhythm: measured on the still; toward the horizon it follows perspective (1/distance) ----------
kx = Px([56, 110, 186, 294, 468, 782, 1976, 2876, 3776]); ks = np.array([0, 1, 2, 3, 4, 5, 7, 8, 9], np.float64)
CP = 2652 * K                                                  # perspective constant fitted on the far dashes
def pchip(x, y):
    h = np.diff(x); dl = np.diff(y) / h; m = np.zeros_like(y)
    for i in range(1, len(y) - 1):
        if dl[i - 1] * dl[i] > 0:
            w1, w2 = 2 * h[i] + h[i - 1], h[i] + 2 * h[i - 1]; m[i] = (w1 + w2) / (w1 / dl[i - 1] + w2 / dl[i])
    m[0], m[-1] = dl[0], dl[-1]
    def f(t):
        t = np.asarray(t, np.float64); tc = np.clip(t, x[0], x[-1]); i = np.clip(np.searchsorted(x, tc) - 1, 0, len(h) - 1)
        u = (tc - x[i]) / h[i]
        v = (y[i] * (2*u**3 - 3*u**2 + 1) + h[i] * m[i] * (u**3 - 2*u**2 + u) + y[i+1] * (-2*u**3 + 3*u**2) + h[i] * m[i+1] * (u**3 - u**2))
        left = y[0] - CP * (1 / np.maximum(t - VP[0], 1e-3) - 1 / (x[0] - VP[0]))
        return np.where(t < x[0], left, v + np.where(t > x[-1], (t - x[-1]) * m[-1], 0))
    return f
s_of_x = pchip(kx, ks)
xs_dense = np.linspace(VP[0] + 30, Px(3770), 40000); ss_dense = np.maximum.accumulate(s_of_x(xs_dense))
x_of_s = lambda s: np.interp(s, ss_dense, xs_dense)
frac_of_x = lambda x: np.interp(x, [Px(900), Px(1900)], [0.30, 0.65])
def width_at(x): return max(1.0, (x - VP[0]) * 0.0042)
DASH_SPEED = 1.0
SMIN = float(np.floor(s_of_x(VP[0] + 40)))
def draw_dashes(canvas, phase):
    acc = np.zeros((H, W), np.float32)
    subs = np.linspace(0, DASH_SPEED / FPS * 0.6, 6)
    for sub in subs:
        quads = []
        for k0 in range(int(SMIN) - 1, 16):
            s0 = k0 - phase - sub
            xa = x_of_s(s0); fr = frac_of_x(xa); xb = x_of_s(s0 + fr)
            if xb < VP[0] + 40 or xa > W or xb <= xa: continue
            ya, yb = VP[1] + (xa - VP[0]) * M, VP[1] + (xb - VP[0]) * M
            wa, wb = width_at(xa), width_at(xb)
            quads.append(np.round(np.array([[xa, ya - wa/2], [xb, yb - wb/2], [xb, yb + wb/2], [xa, ya + wa/2]]) * 8).astype(np.int32))
        tmp = np.zeros((H, W), np.uint8)
        if quads: cv2.fillPoly(tmp, quads, 255, lineType=cv2.LINE_AA, shift=3)
        acc += tmp.astype(np.float32) / (255 * len(subs))
    al = cv2.GaussianBlur(acc, (0, 0), 0.9 * F)[..., None] * 0.9
    return canvas * (1 - al) + dash_col * al

# ---------- 5) asphalt flow toward the VP, speed matched to the dashes (two phases blended) ----------
rv = np.stack([xx - VP[0], yy - VP[1]], -1); r = np.linalg.norm(rv, axis=-1) + 1e-3; u = rv / r[..., None]
xq = np.clip((yy - VP[1]) / M + VP[0], VP[0] + 5, Px(3400))
ds = s_of_x(xq + 1) - s_of_x(xq)
v_line = DASH_SPEED / np.maximum(ds, 1e-5) * np.sqrt(1 + M * M)
rq = np.hypot(xq - VP[0], (xq - VP[0]) * M) + 1e-3
v = np.where(yy > VP[1] + 3, v_line * r / rq, 0).astype(np.float32)
v = np.minimum(v, 900 * F)
T = 0.6
def flow(tau):
    d = v * tau
    sx, sy = xx + u[..., 0] * d, yy + u[..., 1] * d
    kx_ = np.where(sx > W - 2, (W - 2 - VP[0]) / np.maximum(sx - VP[0], 1e-3), 1.0)
    kx2 = np.where(sx < 1, (1 - VP[0]) / np.minimum(sx - VP[0], -1e-3), 1.0)
    ky_ = np.where(sy > H - 2, (H - 2 - VP[1]) / np.maximum(sy - VP[1], 1e-3), 1.0)
    kk = np.minimum(np.minimum(kx_, ky_), kx2)
    sx, sy = VP[0] + (sx - VP[0]) * kk, VP[1] + (sy - VP[1]) * kk
    return cv2.remap(platef, sx.astype(np.float32), sy.astype(np.float32), cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)

# ---------- 6) background drift (slow parallax) ----------
prof = np.interp(np.arange(H), Py([0, 420, 600, 660, 720, 1536]), np.array([2.0, 2.0, 4.0, 6.5, 9.0, 9.0]) * K).astype(np.float32)
prof = cv2.GaussianBlur(prof[:, None], (0, 0), 12 * F)[:, 0]
def drift(t):
    return cv2.remap(platef, xx + prof[:, None] * t * wdrift, yy, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

# ---------- 7) wheels ----------
wheels = [(902, 1047, 33, 82), (1212, 1137, 44, 106)]
def spin(frame, t):
    for (cx, cy, rx, ry) in wheels:
        cx, cy = P(cx, cy); rx, ry = rx * K, ry * K
        R = int(ry) + 3; sz = 2 * R + 1
        A1 = np.float32([[R / rx, 0, R - cx * R / rx], [0, R / ry, R - cy * R / ry]])
        circ = cv2.warpAffine(imgf, A1, (sz, sz), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
        acc = np.zeros_like(circ); ang = -t * 520
        for j in range(9):
            Rm = cv2.getRotationMatrix2D((R, R), ang - j * 3.2, 1)
            acc += cv2.warpAffine(circ, Rm, (sz, sz), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
        acc /= 9
        bx0, by0 = int(cx - rx) - 4, int(cy - ry) - 4; bw, bh = int(2 * rx) + 9, int(2 * ry) + 9
        A2 = cv2.invertAffineTransform(A1); A2[:, 2] += A2[:, 0] * 0 + np.array([0, 0])
        A2b = A2.copy(); A2b[0, 2] -= bx0; A2b[1, 2] -= by0
        back = cv2.warpAffine(acc, A2b, (bw, bh), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)
        m = np.zeros((bh, bw), np.float32); cv2.ellipse(m, (int(cx - bx0), int(cy - by0)), (int(rx * 0.97), int(ry * 0.97)), 0, 0, 360, 1, -1)
        m = cv2.GaussianBlur(m, (0, 0), 1.2 * F)[..., None]
        frame[by0:by0 + bh, bx0:bx0 + bw] = frame[by0:by0 + bh, bx0:bx0 + bw] * (1 - m) + back * m
    return frame

# ---------- render ----------
enc = subprocess.Popen([FF, '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                        '-an', '-c:v', 'libx264', '-crf', '21', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out],
                       stdin=subprocess.PIPE)
cv2.imwrite(dbg + '-inicio.jpg', img, [cv2.IMWRITE_JPEG_QUALITY, 95])        # the still as used (poster)
for n in range(N):
    t = n / FPS
    ease = min(1.0, t / 0.6); te = t * ease
    p1 = (te / T + 0.5) % 1; p2 = (p1 + 0.5) % 1; w1 = 1 - abs(2 * p1 - 1)
    g = flow((p1 - 0.5) * T) * w1 + flow((p2 - 0.5) * T) * (1 - w1)
    g = draw_dashes(g, DASH_SPEED * te)
    f = g * ground + drift(te) * (1 - ground)
    f = f * (1 - keep) + imgf * keep
    f = spin(f, te) if te > 0 else f
    fb = f.clip(0, 255).astype(np.uint8)
    enc.stdin.write(fb.tobytes())
    if n in (0, N // 2, N - 1): cv2.imwrite(f'{dbg}-cuadro{n:03d}.jpg', fb, [cv2.IMWRITE_JPEG_QUALITY, 92])
enc.stdin.close(); enc.wait(); print('ok', out, W, H, N)
