#!/usr/bin/env python3
"""Loop HD sin costura a partir de un loop de Midjourney (1280×720) y el still nítido (upscale 2×).

  hd-loop.py <still_2x.jpg> <loop_mj.mp4> <salida.mp4> [--ancho 1920] [--xfade 0.6] [--crf 22] [--umbral 10] [--lento]

1. Costura: los últimos `xfade` s se funden sobre los primeros (blend con T) → el reinicio no salta.
2. Envolvente de movimiento: máscara = máx_t |cuadro_t − cuadro_0| (luma, 320 px), suavizada y con
   umbral → 255 donde algo se movió alguna vez, 0 donde la escena es estática.
3. Composición: donde la máscara es 0 va el STILL nítido (2×); donde es 255 va el video reescalado
   (lanczos + unsharp suave). Bordes suaves por el desenfoque de la máscara.
--lento: interpola a media velocidad (minterpolate) antes de todo (agua, polvo, tela).
"""
import subprocess, sys, os, tempfile, argparse, re
# Receta truly-inbound: usa el ffmpeg de imageio-ffmpeg (Mac y Windows, sin ffmpeg instalado).
try:
    import imageio_ffmpeg; FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    FFMPEG = 'ffmpeg'

ap = argparse.ArgumentParser()
ap.add_argument('still'); ap.add_argument('loop'); ap.add_argument('salida')
ap.add_argument('--ancho', type=int, default=1920); ap.add_argument('--xfade', type=float, default=0.6)
ap.add_argument('--crf', type=int, default=22); ap.add_argument('--umbral', type=int, default=10)
ap.add_argument('--lento', action='store_true'); ap.add_argument('--blur', type=int, default=6)
a = ap.parse_args()

def run(cmd): subprocess.run(cmd, check=True)
def probe(f):
    err = subprocess.run([FFMPEG, '-i', f], capture_output=True, text=True).stderr
    w, h = map(int, re.search(r', (\d{2,5})x(\d{2,5})', err).groups())
    fps = float(re.search(r'([\d.]+) fps', err).group(1))
    hh, mm, ss = re.search(r'Duration: (\d+):(\d+):([\d.]+)', err).groups()
    return w, h, fps, int(hh) * 3600 + int(mm) * 60 + float(ss)

tmp = tempfile.mkdtemp(prefix='hdloop_')
src = a.loop
if a.lento:
    src = os.path.join(tmp, 'lento.mp4')
    run([FFMPEG, '-y', '-loglevel', 'error', '-i', a.loop, '-an', '-vf', 'minterpolate=fps=48:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,setpts=2*PTS', '-r', '24', '-c:v', 'libx264', '-preset', 'fast', '-crf', '16', '-pix_fmt', 'yuv420p', src])
w, h, fps, dur = probe(src)
alto = round(a.ancho * h / w / 2) * 2
xf = a.xfade

# 1) costura: [main]=[xf, dur) · [head]=[0,xf) · [tail]=[dur-xf,dur) → tail→head fundido
sin_costura = os.path.join(tmp, 'sin_costura.mp4')
fc = (f"[0:v]trim=start={xf},setpts=PTS-STARTPTS[main];"
      f"[0:v]trim=end={xf},setpts=PTS-STARTPTS[head];"
      f"[0:v]trim=start={dur-xf},setpts=PTS-STARTPTS[tail];"
      f"[tail][head]blend=all_expr='A*(1-T/{xf})+B*(T/{xf})'[x];"
      f"[main][x]concat=n=2:v=1:a=0[v]")
run([FFMPEG, '-y', '-loglevel', 'error', '-i', src, '-filter_complex', fc, '-map', '[v]', '-c:v', 'libx264', '-preset', 'fast', '-crf', '16', '-pix_fmt', 'yuv420p', sin_costura])

# 2) envolvente de movimiento (máx diff contra el primer cuadro), en 320 px de ancho
import numpy as np
mw = 320; mh = round(mw * h / w)
raw = subprocess.run([FFMPEG, '-loglevel', 'error', '-i', sin_costura, '-vf', f'scale={mw}:{mh},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
frames = np.frombuffer(raw, dtype=np.uint8).reshape(-1, mh, mw).astype(np.int16)
env = np.abs(frames - frames[0]).max(axis=0)          # 0..255
mask = (env >= a.umbral).astype(np.uint8) * 255
mask_png = os.path.join(tmp, 'mask.png')
subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'gray', '-s', f'{mw}x{mh}', '-i', '-', '-vf', f'scale={a.ancho}:{alto}:flags=bicubic,boxblur={a.blur}:2', mask_png], input=mask.tobytes(), check=True)
cobertura = float((mask > 0).mean())

# 2b) alineación still↔video: el video de MJ puede venir con un zoom/desplazamiento leve respecto al
#     still; se busca (escala, dx, dy) que minimiza el error contra el cuadro 0 en 320 px y se aplica
#     al still. Si el mejor error sigue alto, avisa (la composición saldría con fantasmas).
def luma_still(scale):
    ww = int(round(mw * scale)); hh = int(round(mh * scale))
    raw2 = subprocess.run([FFMPEG, '-loglevel', 'error', '-i', a.still, '-vf', f'scale={ww}:{hh},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
    return np.frombuffer(raw2, dtype=np.uint8).reshape(hh, ww).astype(np.int16)
f0 = frames[0]
def busca(base_w, base_h, f0b, escalas, rango, paso, dx0=0, dy0=0):
    mejor = (1e18, 1.0, 0, 0)
    for s in escalas:
        ww = int(round(base_w * s)); hh = int(round(base_h * s))
        raw2 = subprocess.run([FFMPEG, '-loglevel', 'error', '-i', a.still, '-vf', f'scale={ww}:{hh},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
        im = np.frombuffer(raw2, dtype=np.uint8).reshape(hh, ww).astype(np.int16)
        for dy in range(dy0 - rango, dy0 + rango + 1, paso):
            for dx in range(dx0 - rango, dx0 + rango + 1, paso):
                y0 = (hh - base_h) // 2 + dy; x0 = (ww - base_w) // 2 + dx
                if y0 < 0 or x0 < 0 or y0 + base_h > hh or x0 + base_w > ww: continue
                err = float(np.abs(im[y0:y0 + base_h, x0:x0 + base_w] - f0b).mean())
                if err < mejor[0]: mejor = (err, s, dx, dy)
    return mejor
# etapa gruesa en 320 px · etapa fina en 960 px (±3 px, escala en pasos de 0,25 %)
err, s, dx, dy = busca(mw, mh, f0, [0.97, 0.98, 0.99, 1.0, 1.01, 1.02, 1.03], 8, 2)
fw = 960; fh = round(fw * h / w)
rawf = subprocess.run([FFMPEG, '-loglevel', 'error', '-i', sin_costura, '-vframes', '1', '-vf', f'scale={fw}:{fh},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
f0f = np.frombuffer(rawf, dtype=np.uint8).reshape(fh, fw).astype(np.int16)
esc_finas = [round(s + k * 0.0025, 4) for k in range(-4, 5)]
err, s, dx, dy = busca(fw, fh, f0f, esc_finas, 4, 1, dx * 3, dy * 3)
mw, mh = fw, fh   # a partir de aquí dx/dy están en la escala fina
print(f'alineación: escala {s} · dx {dx} · dy {dy} (en {fw} px) · error medio {err:.1f}')
if err > 18: print('⚠️ el still y el video NO coinciden bien: la composición puede mostrar fantasmas en los bordes estáticos')
# aplicar al still en la resolución de salida: escalar por s y recortar/centrar con el desplazamiento
fx = a.ancho / mw
sw = int(round(a.ancho * s)); sh = int(round(alto * s))
ox = int(round((sw - a.ancho) / 2 + dx * fx)); oy = int(round((sh - alto) / 2 + dy * fx))
ox = max(0, min(ox, sw - a.ancho)); oy = max(0, min(oy, sh - alto))
still_filtro = f"scale={sw}:{sh}:flags=lanczos,crop={a.ancho}:{alto}:{ox}:{oy}"

# 3) composición: still nítido donde no hay movimiento, video reescalado donde sí
fc = (f"[0:v]scale={a.ancho}:{alto}:flags=lanczos,unsharp=5:5:0.4:5:5:0[vid];"
      f"[1:v]{still_filtro},format=yuv420p[st];"
      f"[2:v]format=gray[mk];"
      f"[st][vid][mk]maskedmerge,format=yuv420p[out]")
run([FFMPEG, '-y', '-loglevel', 'error', '-i', sin_costura, '-loop', '1', '-i', a.still, '-loop', '1', '-i', mask_png, '-filter_complex', fc, '-map', '[out]', '-t', f'{dur:.3f}', '-r', str(int(round(fps))), '-c:v', 'libx264', '-preset', 'slow', '-crf', str(a.crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', a.salida])
w2, h2, fps2, dur2 = probe(a.salida)
print(f'✓ {a.salida}: {w2}×{h2} · {dur2:.2f} s · {os.path.getsize(a.salida)/1e6:.1f} MB · zona en movimiento {cobertura*100:.0f} % · máscara {mask_png}')
