import sys, cv2, numpy as np
from PIL import Image
src, emb, out = sys.argv[1:4]; cx, cy, h, ang = int(sys.argv[4]), int(sys.argv[5]), int(sys.argv[6]), float(sys.argv[7])
x0,y0,x1,y1 = [int(v) for v in sys.argv[8].split(',')]; wx = int(sys.argv[9]) if len(sys.argv) > 9 else None
img = cv2.imread(src)
m = np.zeros(img.shape[:2], np.uint8); cv2.ellipse(m, ((x0+x1)//2, (y0+y1)//2), ((x1-x0)//2, (y1-y0)//2), 0, 0, 360, 255, -1)
img = cv2.inpaint(img, m, 9, cv2.INPAINT_TELEA)
if wx is not None:  # reflejo amarillo en la pared: baja solo la saturación media (pared 40-60, reflejo 90-110, camisa >150)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV).astype(np.float32); s = hsv[...,1]
    peso = np.clip((140 - s) / 30, 0, 1); peso[:, :wx] = 0; peso = cv2.GaussianBlur(peso, (0,0), 2)
    s_obj = np.minimum(s, 48 + (s - 48) * 0.15); hsv[...,1] = s*(1-peso) + s_obj*peso
    img = cv2.cvtColor(hsv.clip(0,255).astype(np.uint8), cv2.COLOR_HSV2BGR)
e = Image.open(emb).convert('RGBA'); e = e.crop(e.getbbox()); w = round(e.width*h/e.height)
e = e.resize((w*2, h*2), Image.LANCZOS).rotate(ang, Image.BICUBIC, expand=True); e = e.resize((e.width//2, e.height//2), Image.LANCZOS)
e = np.array(e).astype(np.float32); eh, ew = e.shape[:2]; ex, ey = cx - ew//2, cy - eh//2
col = cv2.GaussianBlur(e[...,:3][..., ::-1], (0,0), float(__import__('os').environ.get('BLUR','0.6'))); a = cv2.GaussianBlur(e[...,3]/255, (0,0), float(__import__('os').environ.get('BLUR','0.6')))[...,None]*0.88
reg = img[ey:ey+eh, ex:ex+ew].astype(np.float32)
luma = cv2.cvtColor(reg.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32); shade = np.clip(luma/max(luma.mean(),1), 0.6, 1.1)[...,None]*float(__import__('os').environ.get('LUZ','1'))
gris = col.mean(axis=2, keepdims=True); col = gris + (col - gris)*0.85  # bordado: un poco menos saturado que la impresión
rng = np.random.default_rng(7); col = col*shade*0.95 + rng.normal(0, 5, col.shape)
img[ey:ey+eh, ex:ex+ew] = (col*a + reg*(1-a)).clip(0,255).astype(np.uint8)
cv2.imwrite(out, img); print('ok', out, ew, eh)
