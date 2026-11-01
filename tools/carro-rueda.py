# Uruguay hero: the approved Gemini still, animated as a tracking shot. The car (with its real door logo) and its shadow
# never move; the asphalt streams toward the vanishing point, the lane dashes slide past, the wheels spin and the
# background (beach, La Mano, buildings, sky) drifts slowly for parallax. No AI video: the still stays exactly as approved.
# Usage: python carro-rueda.py <still 2752x1536> <out.mp4> <ffmpeg> [seconds]
import sys, subprocess, cv2, numpy as np
src, out, FF = sys.argv[1:4]
SECS = float(sys.argv[4]) if len(sys.argv) > 4 else 8.0
FPS = 24; N = round(SECS * FPS)
full = cv2.imread(src)
W = 1920; S = W / full.shape[1]; H = round(full.shape[0] * S) // 2 * 2
img = cv2.resize(full, (W, H), interpolation=cv2.INTER_AREA)
P = lambda *v: np.array(v, np.float32) * S                  # coordinates measured on the 2752 px still
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
VP = P(-300, 675); M = 0.2149                               # vanishing point and slope of the dashed lane line
rng = np.random.default_rng(5)
dbg = out.replace('.mp4', '')

# ---------- 1) car mask (GrabCut) + its shadow: never moves ----------
# hand-traced outline (1920 px frame, measured on a crop starting at 560,330), refined by GrabCut in a thin band
outline = np.array([(45, 470), (40, 360), (55, 300), (80, 250), (115, 205), (160, 175), (230, 160), (300, 152), (380, 150),
                    (470, 155), (540, 170), (580, 215), (600, 240), (612, 262), (650, 280), (700, 300), (730, 330), (745, 370),
                    (752, 420), (746, 462), (722, 500), (690, 525), (560, 528), (420, 540), (310, 558), (250, 552), (170, 472),
                    (120, 478), (60, 476)], np.float32) + (560, 330)
outline = (outline * (W / 1920)).astype(np.int32)
poly_m = np.zeros((H, W), np.uint8); cv2.fillPoly(poly_m, [outline], 255)
for (ex, ey, er) in ((298, 95, 55), (455, 98, 53)):                   # the two ears
    cv2.circle(poly_m, (int((ex + 560) * W / 1920), int((ey + 330) * W / 1920)), int(er * W / 1920), 255, -1)
cv2.rectangle(poly_m, (int((560 + 270) * W / 1920), int((330 + 120) * W / 1920)), (int((560 + 480) * W / 1920), int((330 + 160) * W / 1920)), 255, -1)
band = 10
gc = np.full((H, W), cv2.GC_BGD, np.uint8)
gc[cv2.dilate(poly_m, np.ones((2 * band + 1,) * 2, np.uint8)) > 0] = cv2.GC_PR_BGD
gc[poly_m > 0] = cv2.GC_PR_FGD
gc[cv2.erode(poly_m, np.ones((2 * band + 1,) * 2, np.uint8)) > 0] = cv2.GC_FGD
bgm, fgm = np.zeros((1, 65)), np.zeros((1, 65))
cv2.grabCut(img, gc, None, bgm, fgm, 6, cv2.GC_INIT_WITH_MASK)
car = ((gc == cv2.GC_FGD) | (gc == cv2.GC_PR_FGD)).astype(np.uint8) * 255
car = cv2.morphologyEx(car, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
car = cv2.morphologyEx(car, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(car)
car = (lab == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])).astype(np.uint8) * 255
shadow = np.zeros((H, W), np.uint8)
poly = P(380, 1120, 860, 1105, 1000, 1150, 1120, 1265, 1300, 1270, 1880, 1225, 1890, 1285, 1400, 1305,
         1150, 1335, 950, 1368, 750, 1342, 560, 1282, 380, 1232).reshape(-1, 2).astype(np.int32)
cv2.fillPoly(shadow, [poly], 255)
# the low sun throws a long shadow to the lower left: find all of it by brightness (it travels with the car)
Lum = cv2.GaussianBlur(cv2.cvtColor(img, cv2.COLOR_BGR2LAB)[..., 0].astype(np.float32), (0, 0), 12)
lt0 = VP[1] + (xx - VP[0]) * ((990 - 675) / (2752 + 300))
dark = ((Lum < 98) & (yy > lt0 + 40) & (xx < 1880 * S)).astype(np.uint8) * 255
dark = cv2.morphologyEx(dark, cv2.MORPH_OPEN, np.ones((15, 15), np.uint8))
dark = cv2.morphologyEx(dark, cv2.MORPH_CLOSE, np.ones((31, 31), np.uint8))
nl, labl = cv2.connectedComponents(dark)
ids = set(np.unique(labl[shadow > 0])) - {0}
shadow = np.maximum(shadow, np.isin(labl, list(ids)).astype(np.uint8) * 255)
shadow = cv2.morphologyEx(shadow, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (45, 45)))   # include the white line inside it
# the solid white line looks the same moving or not, and the AI drew it slightly off perspective: keep it still
g0 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
sl_y = (880 + 0.47 * (xx / S - 60)) * S
solid = ((np.abs(yy - sl_y) < 30 * S) & (g0 - cv2.blur(g0, (61, 61)) > 35)).astype(np.uint8) * 255
solid = cv2.dilate(solid, np.ones((7, 7), np.uint8))
keep = np.maximum(cv2.GaussianBlur(car.astype(np.float32) / 255, (0, 0), 1.2),
                  cv2.GaussianBlur(shadow.astype(np.float32) / 255, (0, 0), 14))
keep = np.maximum(keep, cv2.GaussianBlur(solid.astype(np.float32) / 255, (0, 0), 2))[..., None]
cv2.imwrite(dbg + '-mascara.png', (np.maximum(car, shadow // 2)).astype(np.uint8))
ov = img.copy(); cnts, _ = cv2.findContours(car, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
cv2.drawContours(ov, cnts, -1, (255, 0, 255), 2); cv2.imwrite(dbg + '-borde.jpg', ov)

# ---------- 2) regions: ground (road + curb + grass strip) flows; everything above it drifts ----------
line_top = VP[1] + (xx - VP[0]) * ((990 - 675) / (2752 + 300))     # grass-strip top edge, a ray from the VP
ground = cv2.GaussianBlur((yy > line_top + 2).astype(np.float32), (0, 0), 1.5)[..., None]

# ---------- 3) plates: the car is filled in, the lane dashes are erased (they are redrawn moving) ----------
hole = cv2.dilate(car, np.ones((5, 5), np.uint8))
k = 4; small = cv2.resize(img, (W // k, H // k), interpolation=cv2.INTER_AREA)
fill = cv2.resize(cv2.inpaint(small, cv2.resize(hole, (W // k, H // k), interpolation=cv2.INTER_NEAREST), 9, cv2.INPAINT_TELEA), (W, H))
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
line_y = VP[1] + (xx - VP[0]) * M
near_line = np.abs(yy - line_y) < (4 + (xx - VP[0]) * 0.012)
local = cv2.blur(gray, (61, 61))
dash_px = (near_line & (gray - local > 30)).astype(np.uint8) * 255
dash_px[hole > 0] = 0
dash_px = cv2.dilate(dash_px, np.ones((7, 7), np.uint8))
dash_col = np.median(img[(dash_px > 0) & (gray > 150)], axis=0)
plate = img.copy(); plate[hole > 0] = fill[hole > 0]
plate = cv2.inpaint(plate, dash_px, 7, cv2.INPAINT_TELEA)
# ground under the car and its shadow: copy the real asphalt from further out on the same ray from the VP,
# so the curb, the grass strip and the white line continue straight and no grey patch streams out
gzone = (yy > line_top + 2)
fillz = ((hole > 0) | (cv2.dilate(shadow, np.ones((9, 9), np.uint8)) > 0)) & gzone
ys, xs = np.nonzero(fillz)
uxs = (xs - VP[0]); uys = (ys - VP[1]); nn = np.hypot(uxs, uys); uxs /= nn; uys /= nn
done = np.zeros(len(xs), bool); src_x = xs.astype(np.float32).copy(); src_y = ys.astype(np.float32).copy()
for step in range(4, 900, 3):
    cx_ = np.clip((xs + uxs * step).round().astype(int), 0, W - 1); cy_ = np.clip((ys + uys * step).round().astype(int), 0, H - 1)
    ok = ~done & ~fillz[cy_, cx_]
    src_x[ok] = cx_[ok]; src_y[ok] = cy_[ok]; done |= ok
    if done.all(): break
plate[ys, xs] = plate[src_y.astype(int), src_x.astype(int)]
# keep the copied texture but take the tone from the asphalt around the zone (no lighter block, no seam behind the car)
tone_mask = (fillz | ~gzone).astype(np.uint8) * 255
lr = 8
tone = cv2.inpaint(cv2.resize(img, (W // lr, H // lr), interpolation=cv2.INTER_AREA),
                   cv2.dilate(cv2.resize(tone_mask, (W // lr, H // lr), interpolation=cv2.INTER_NEAREST), np.ones((3, 3), np.uint8)), 5, cv2.INPAINT_TELEA)
tone = cv2.GaussianBlur(cv2.resize(tone, (W, H), interpolation=cv2.INTER_CUBIC).astype(np.float32), (0, 0), 6)
pf = plate.astype(np.float32); detail = pf - cv2.GaussianBlur(pf, (0, 0), 25)
zf = np.maximum(cv2.GaussianBlur(fillz.astype(np.float32), (0, 0), 12), fillz.astype(np.float32))[..., None]
plate = (pf * (1 - zf) + (tone + detail) * zf).clip(0, 255).astype(np.uint8)
# background behind the car (above the ground line): inpaint from background pixels only
bg_hole = ((hole > 0) & ~gzone).astype(np.uint8) * 255
if bg_hole.any():
    src_ok = cv2.dilate(bg_hole, np.ones((15, 15), np.uint8))
    half = cv2.resize(plate, (W // 2, H // 2), interpolation=cv2.INTER_AREA)
    sm = cv2.inpaint(half, cv2.resize(src_ok, (W // 2, H // 2), interpolation=cv2.INTER_NEAREST), 7, cv2.INPAINT_TELEA)
    plate[bg_hole > 0] = cv2.resize(sm, (W, H))[bg_hole > 0]
# the background drifts only away from the car (sky, sea and sand right behind it stay put, nothing hidden is revealed)
dist_car = cv2.distanceTransform((car == 0).astype(np.uint8), cv2.DIST_L2, 5)
wdrift = np.clip((dist_car - 15) / 160, 0, 1).astype(np.float32)
wdrift = cv2.GaussianBlur(wdrift, (0, 0), 25)
cv2.imwrite(dbg + '-plato.jpg', plate)
platef = plate.astype(np.float32); imgf = img.astype(np.float32)

# ---------- 4) dash rhythm taken from the still (the AI photo is not strict perspective) ----------
kx = np.array([56, 110, 186, 294, 468, 782, 1976, 2876, 3776], np.float64) * S   # dash starts
ks = np.array([0, 1, 2, 3, 4, 5, 7, 8, 9], np.float64)
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
        return v + np.where(t < x[0], (t - x[0]) * m[0], 0) + np.where(t > x[-1], (t - x[-1]) * m[-1], 0)   # straight beyond the knots
    return f
s_of_x = pchip(kx, ks)
xs_dense = np.linspace(-280 * S, 3770 * S, 20000); ss_dense = np.maximum.accumulate(s_of_x(xs_dense))
x_of_s = lambda s: np.interp(s, ss_dense, xs_dense)
frac_of_x = lambda x: np.interp(x, [900 * S, 1900 * S], [0.30, 0.65])
def width_at(x): return max(1.0, (x - VP[0]) * 0.0042)       # dash thickness grows toward the camera
DASH_SPEED = 1.0                                            # dashes per second passing by
def draw_dashes(canvas, phase):
    acc = np.zeros((H * 2, W * 2), np.float32)
    for sub in np.linspace(0, DASH_SPEED / FPS * 0.6, 6):   # motion blur over 60 % of the frame time
        for k0 in range(-2, 16):
            s0 = k0 - phase - sub
            xa = x_of_s(s0); fr = frac_of_x(xa); xb = x_of_s(s0 + fr)
            if xb < 0 or xa > W or xb <= xa: continue
            ya, yb = VP[1] + (xa - VP[0]) * M, VP[1] + (xb - VP[0]) * M
            wa, wb = width_at(xa), width_at(xb)
            q = np.array([[xa, ya - wa/2], [xb, yb - wb/2], [xb, yb + wb/2], [xa, ya + wa/2]]) * 2
            tmp = np.zeros_like(acc); cv2.fillPoly(tmp, [np.round(q * 8).astype(np.int32)], 1.0, lineType=cv2.LINE_AA, shift=3)
            acc += tmp / 6
    al = cv2.resize(cv2.GaussianBlur(acc, (0, 0), 1.6), (W, H), interpolation=cv2.INTER_AREA)[..., None] * 0.9
    return canvas * (1 - al) + dash_col * al

# ---------- 5) asphalt flow toward the VP, speed matched to the dashes (two phases blended) ----------
rv = np.stack([xx - VP[0], yy - VP[1]], -1); r = np.linalg.norm(rv, axis=-1) + 1e-3; u = rv / r[..., None]
xq = (yy - VP[1]) / M + VP[0]                                 # point of the dashed line at the same depth (same row)
ds = np.gradient(s_of_x(np.clip(xq, kx[0], 3400 * S)), axis=1) * 0 + (s_of_x(np.clip(xq, kx[0], 3400 * S) + 1) - s_of_x(np.clip(xq, kx[0], 3400 * S)))
v_line = DASH_SPEED / np.maximum(ds, 1e-4) * np.sqrt(1 + M * M)   # px/s along the dashed line at that depth
rq = np.hypot(xq - VP[0], (xq - VP[0]) * M) + 1e-3
v = np.where(yy > VP[1] + 3, v_line * r / rq, 0).astype(np.float32)
v = np.minimum(v, 900)                                        # px per second, at 1920 px
T = 0.6
def flow(tau):
    d = v * tau
    sx, sy = xx + u[..., 0] * d, yy + u[..., 1] * d
    # outside the frame: slide the sample back along its own ray toward the VP (ground repeats, lines stay on their rays)
    kx_ = np.where(sx > W - 2, (W - 2 - VP[0]) / np.maximum(sx - VP[0], 1e-3), 1.0)
    ky_ = np.where(sy > H - 2, (H - 2 - VP[1]) / np.maximum(sy - VP[1], 1e-3), 1.0)
    kk = np.minimum(kx_, ky_)
    sx, sy = VP[0] + (sx - VP[0]) * kk, VP[1] + (sy - VP[1]) * kk
    return cv2.remap(platef, sx.astype(np.float32), sy.astype(np.float32), cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)

# ---------- 6) background drift (slow parallax), plate without the car ----------
prof = np.interp(np.arange(H), P(0, 420, 600, 660, 720, 1536)[[0, 1, 2, 3, 4, 5]] * 0 + np.array([0, 420, 600, 660, 720, 1536]) * S,
                 [2.0, 2.0, 4.0, 6.5, 9.0, 9.0]).astype(np.float32)          # px per second at 2752 px, by row
prof = cv2.GaussianBlur(prof[:, None], (0, 0), 12)[:, 0] * S
def drift(t):
    return cv2.remap(platef, xx + prof[:, None] * t * wdrift, yy, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

# ---------- 7) wheels: unwarp the rim ellipse to a circle, spin with rotational blur ----------
wheels = [(902, 1047, 33, 82), (1212, 1137, 44, 106)]         # cx, cy, rx, ry of the rims on the 2752 still
def spin(frame, t):
    for (cx, cy, rx, ry) in wheels:
        cx, cy, rx, ry = cx * S, cy * S, rx * S, ry * S
        R = int(ry) + 3; sz = 2 * R + 1
        A1 = np.float32([[R / rx, 0, R - cx * R / rx], [0, R / ry, R - cy * R / ry]])   # ellipse -> circle
        circ = cv2.warpAffine(imgf, A1, (sz, sz), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
        acc = np.zeros_like(circ); ang = -t * 520                                   # clockwise, deg
        for j in range(9):
            Rm = cv2.getRotationMatrix2D((R, R), ang - j * 3.2, 1)
            acc += cv2.warpAffine(circ, Rm, (sz, sz), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
        acc /= 9
        A2 = cv2.invertAffineTransform(A1)
        back = cv2.warpAffine(acc, A2, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)
        m = np.zeros((H, W), np.float32); cv2.ellipse(m, (int(cx), int(cy)), (int(rx * 0.97), int(ry * 0.97)), 0, 0, 360, 1, -1)
        m = cv2.GaussianBlur(m, (0, 0), 1.2)[..., None]
        frame = frame * (1 - m) + back * m
    return frame

# ---------- render ----------
enc = subprocess.Popen([FF, '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                        '-an', '-c:v', 'libx264', '-crf', '17', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out],
                       stdin=subprocess.PIPE)
# fade the motion in over the first 0.6 s so frame 0 is the still
for n in range(N):
    t = n / FPS
    ease = min(1.0, t / 0.6); te = t * ease
    # two phases, each shifted from -T/2 to +T/2; the phase at 0 has full weight, so frame 0 is the still
    p1 = (te / T + 0.5) % 1; p2 = (p1 + 0.5) % 1; w1 = 1 - abs(2 * p1 - 1)
    g = flow((p1 - 0.5) * T) * w1 + flow((p2 - 0.5) * T) * (1 - w1)
    g = draw_dashes(g, DASH_SPEED * te)
    bg = drift(te)
    f = g * ground + bg * (1 - ground)
    if n == 0: f0 = f.copy()
    f = f * (1 - keep) + imgf * keep
    f = spin(f, te) if te > 0 else f
    enc.stdin.write(f.clip(0, 255).astype(np.uint8).tobytes())
    if n in (0, N // 2, N - 1): cv2.imwrite(f'{dbg}-cuadro{n:03d}.jpg', f.clip(0, 255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 92])
enc.stdin.close(); enc.wait(); print('ok', out, W, H, N)
