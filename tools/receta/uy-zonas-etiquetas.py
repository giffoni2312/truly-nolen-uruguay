# Adds the three zone labels (red interior, yellow perimeter, green garden) as pills on the house image,
# like the Argentina office draft. Usage: python uy-zonas-etiquetas.py <in> <out.webp> <width>
#   "x,y" for each label center: --rojo x,y --amarillo x,y --verde x,y (in input pixels)
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

src, out, width = sys.argv[1], sys.argv[2], int(sys.argv[3])
args = dict(zip(sys.argv[4::2], sys.argv[5::2]))
im = Image.open(src).convert('RGB')
W, H = im.size
font = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', int(W * 0.0165))
LABELS = [
    ('--rojo', 'Zona roja · interior', (226, 38, 43), (255, 255, 255)),
    ('--amarillo', 'Zona amarilla · perímetro', (255, 216, 0), (20, 20, 20)),
    ('--verde', 'Zona verde · jardín', (46, 158, 69), (255, 255, 255)),
]
shadow = Image.new('RGBA', im.size, (0, 0, 0, 0))
pills = Image.new('RGBA', im.size, (0, 0, 0, 0))
ds, dp = ImageDraw.Draw(shadow), ImageDraw.Draw(pills)
for key, text, bg, fg in LABELS:
    cx, cy = map(float, args[key].split(','))
    l, t, r, b = dp.textbbox((0, 0), text, font=font)
    tw, th = r - l, b - t
    px, py = th * 0.9, th * 0.55
    box = (cx - tw / 2 - px, cy - th / 2 - py, cx + tw / 2 + px, cy + th / 2 + py)
    rad = (box[3] - box[1]) / 2
    ds.rounded_rectangle((box[0], box[1] + 4, box[2], box[3] + 6), rad, fill=(0, 0, 0, 110))
    dp.rounded_rectangle(box, rad, fill=bg + (255,))
    dp.text((cx - tw / 2 - l, cy - th / 2 - t), text, font=font, fill=fg + (255,))
shadow = shadow.filter(ImageFilter.GaussianBlur(W * 0.004))
im = Image.alpha_composite(Image.alpha_composite(im.convert('RGBA'), shadow), pills).convert('RGB')
im = im.resize((width, round(H * width / W)), Image.LANCZOS)
im.save(out, 'WEBP', quality=84)
print('ok', out, im.size)
