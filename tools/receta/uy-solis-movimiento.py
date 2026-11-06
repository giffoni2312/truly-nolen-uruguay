# Teatro Solís hero with real "tracking shot" motion, like globaltni.com: the car stays exactly as it is (same pixels,
# logo and whiskers) and fixed on screen, while the world moves past it:
#   - the road flows backward along its own perspective (rectified ground plane, dashes repeat every PERIOD),
#   - the theatre, trees and sidewalk slide slowly to the left (far layer),
#   - the wheels spin.
# Usage: python uy-solis-movimiento.py <cuadro0.png> <mask.png> <mundo.png> <out.mp4> <ffmpeg> [width] [seconds]
# mundo.png = the same frame without the car (original pixels everywhere; Gemini fill only where the car was).
import sys
import subprocess
import cv2
import numpy as np

src, mask_path, world_path, out, FF = sys.argv[1:6]
OUT_W = int(sys.argv[6]) if len(sys.argv) > 6 else 3840
SECONDS = float(sys.argv[7]) if len(sys.argv) > 7 else 10.0
FPS = 24
N = int(round(SECONDS * FPS))

img = cv2.imread(src)
world = cv2.imread(world_path)
H, W = img.shape[:2]
car = cv2.imread(mask_path, cv2.IMREAD_GRAYSCALE).astype(np.float32) / 255
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)

# ---------- measured geometry (full size 3840x2144) ----------
HZ = 1159.0                 # horizon = crossing of the yellow and white lines (fitted on the pixels)
VPX = -313.0                # vanishing point of the road, left of the frame
PERIOD = 0.00123            # dash spacing in the rectified depth coordinate b = 1/(y - HZ)
ROAD_SPEED = PERIOD / 13.0  # one dash every 13 frames (~1.8 per second), like the asphalt in globaltni
FAR_SPEED = 1.3             # px per frame for the theatre / trees / sidewalk

def curb(x):
    # far edge of the asphalt: (0,1214) -> (1860,1340) -> (3380,1440) -> (3840,1500)
    return np.interp(x, [0, 1860, 3380, 3840], [1214, 1340, 1440, 1500])

road = (yy > curb(xx) + 2).astype(np.float32)
road = cv2.GaussianBlur(road, (0, 0), 2.0)

# ---------- car layer: the mask plus the contact shadow right under the body ----------
shadow = np.zeros((H, W), np.uint8)
pts = np.array([[1880, 1600], [2050, 1700], [2400, 1770], [2700, 1830], [3100, 1790], [3330, 1730], [3330, 1700], [3000, 1700], [2200, 1640], [1880, 1560]], np.int32)
cv2.fillPoly(shadow, [pts], 160)
cv2.ellipse(shadow, (1935, 1672), (95, 26), 0, 0, 360, 255, -1)
cv2.ellipse(shadow, (2560, 1812), (125, 32), 0, 0, 360, 255, -1)
shadow = cv2.GaussianBlur(shadow.astype(np.float32) / 255, (0, 0), 16)
alpha = car[..., None]

# ---------- far layer: the clean world (nothing hidden behind the car any more) ----------
far = world

# road lighting field (without lane markings): recycled asphalt takes the light of where it is shown, so no bands
small = cv2.resize(world, (W // 8, H // 8), interpolation=cv2.INTER_AREA)
small = np.dstack([cv2.medianBlur(small[..., c], 31) for c in range(3)])
light = cv2.GaussianBlur(cv2.resize(small, (W, H), interpolation=cv2.INTER_CUBIC).astype(np.float32), (0, 0), 25)
light = np.maximum(light, 8.0)
world_norm = world.astype(np.float32) / light

# ---------- road sampling in the rectified ground plane ----------
gy = np.maximum(yy - HZ, 1.0)
A = (xx - VPX) / gy         # lateral position (constant along lines through the vanishing point)
B = 1.0 / gy                # depth coordinate
car_bin = np.zeros((H, W), bool)   # the world has no car: only out-of-frame samples need the fallback

def road_maps(shift):
    """dest pixel shows the asphalt that was `shift` nearer at time 0; fall back one dash period farther when
    that place is outside the frame or hidden by the car (the road repeats every PERIOD)."""
    bs = B - shift
    mx = np.full_like(B, -1); my = np.full_like(B, -1)
    todo = np.ones_like(B, bool)
    for k in range(0, 6):
        b = bs + k * PERIOD
        ok_b = b > 1.0 / (H + 400 - HZ)
        y = np.where(ok_b, 1.0 / np.maximum(b, 1e-6) + HZ, -1)
        x = A / np.maximum(b, 1e-6) * 0 + A * (y - HZ) + VPX
        inside = ok_b & (x >= 0) & (x < W - 1) & (y >= 0) & (y < H - 1)
        xi = np.clip(x, 0, W - 1).astype(np.int32); yi = np.clip(y, 0, H - 1).astype(np.int32)
        good = todo & inside & ~car_bin[yi, xi]
        mx[good] = x[good]; my[good] = y[good]
        todo &= ~good
        if not todo.any():
            break
    # anything still missing (far left corner): plain reflection of the original
    mx[todo] = xx[todo]; my[todo] = yy[todo]
    return mx.astype(np.float32), my.astype(np.float32)

# ---------- wheels: rotate the rims inside their ellipses ----------
WHEELS = [  # centre x, centre y, semi-axis x, semi-axis y (rim, measured)
    (1930, 1555, 52, 94),
    (2540, 1665, 77, 124),
]
def spin(frame, base, angle):
    for cx, cy, ax, ay in WHEELS:
        r = max(ax, ay) + 6
        x0, y0, x1, y1 = cx - r, cy - r, cx + r, cy + r
        patch = base[y0:y1, x0:x1].astype(np.float32)
        # ellipse -> circle, rotate (with a little rotational blur), circle -> ellipse
        S = np.float32([[ay / ax, 0, (1 - ay / ax) * r], [0, 1, 0]])
        Si = cv2.invertAffineTransform(S)
        circ = cv2.warpAffine(patch, S, (2 * r, 2 * r), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
        acc = np.zeros_like(circ)
        for d in (-6, -3, 0, 3, 6):
            R = cv2.getRotationMatrix2D((r, r), -(angle + d), 1.0)
            acc += cv2.warpAffine(circ, R, (2 * r, 2 * r), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
        rot = cv2.warpAffine(acc / 5, Si, (2 * r, 2 * r), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
        m = np.zeros((2 * r, 2 * r), np.float32)
        cv2.ellipse(m, (r, r), (int(ax * 0.97), int(ay * 0.97)), 0, 0, 360, 1.0, -1)
        m = cv2.GaussianBlur(m, (0, 0), 1.2)[..., None]
        region = frame[y0:y1, x0:x1].astype(np.float32)
        frame[y0:y1, x0:x1] = (rot * m + region * (1 - m)).astype(np.uint8)
    return frame

OUT_H = int(round(H * OUT_W / W / 2) * 2)
enc = subprocess.Popen([FF, '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{OUT_W}x{OUT_H}', '-r', str(FPS), '-i', '-',
                        '-an', '-c:v', 'libx264', '-crf', '16', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out],
                       stdin=subprocess.PIPE)
for n in range(N):
    # far layer: slide left (sample to the right), mirrored past the right edge
    fx = xx + FAR_SPEED * n
    far_f = cv2.remap(far, fx, yy, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    # road: three sub-frames averaged = natural motion blur on the asphalt
    acc = np.zeros_like(img, np.float32)
    for sub in (0.0, 0.33, 0.66):
        mx, my = road_maps(ROAD_SPEED * (n + sub))
        acc += cv2.remap(world_norm, mx, my, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    road_f = acc / 3 * light
    frame = far_f.astype(np.float32) * (1 - road[..., None]) + road_f * road[..., None]
    frame = frame * (1 - shadow[..., None] * 0.72)
    frame = frame * (1 - alpha) + img.astype(np.float32) * alpha
    frame = frame.clip(0, 255).astype(np.uint8)
    frame = spin(frame, img, n * 23.0)
    if OUT_W != W:
        frame = cv2.resize(frame, (OUT_W, OUT_H), interpolation=cv2.INTER_AREA)
    enc.stdin.write(frame.tobytes())
    if n % 24 == 0:
        print('cuadro', n, 'de', N, flush=True)
enc.stdin.close(); enc.wait()
print('ok', out, N, 'cuadros')
