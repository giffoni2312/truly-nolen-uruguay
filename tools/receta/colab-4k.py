# Carro 4K en Google Colab GRATIS (receta truly-inbound, paso i). Probado el 31-oct-2026 con el carro de Venezuela.
# 1) colab.research.google.com → nuevo cuaderno → Entorno de ejecución → Cambiar tipo → GPU T4 → Guardar.
# 2) Panel «Archivos» (carpeta a la izquierda) → subir el video HD final (ya con bigote y vidrios) → se llama
#    /content/<nombre>.mp4. Cambiar ENTRADA abajo si el nombre es otro.
# 3) Pegar TODO este archivo en una celda y Shift+Enter (si hay otras ventanas de Claude abiertas, revisar que lo pegado
#    sea este código: comparten el portapapeles y una puede pisar a la otra). Al terminar descarga <nombre>-4k.mp4 (3840 de ancho).
!pip -q install spandrel
!wget -q -nc https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesr-animevideov3.pth
import torch, subprocess, numpy as np, json, time
from spandrel import ModelLoader
ENTRADA = '/content/carro-hd.mp4'
SALIDA = ENTRADA.replace('.mp4', '-4k.mp4')
info = json.loads(subprocess.run(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','json',ENTRADA],capture_output=True,text=True).stdout)['streams'][0]
W, H = info['width'], info['height']
modelo = ModelLoader().load_from_file('realesr-animevideov3.pth').cuda().eval().half()
S = modelo.scale
leer = subprocess.Popen(['ffmpeg','-v','error','-i',ENTRADA,'-f','rawvideo','-pix_fmt','rgb24','-'], stdout=subprocess.PIPE)
# preset medium: «slow» con cuadros de 4800 px tarda más que la propia IA
escribir = subprocess.Popen(['ffmpeg','-y','-v','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W*S}x{H*S}','-r','24','-i','-','-vf','scale=3840:-2:flags=lanczos','-c:v','libx264','-crf','16','-preset','medium','-pix_fmt','yuv420p',SALIDA], stdin=subprocess.PIPE)
n = 0; t0 = time.time()
while True:
    b = leer.stdout.read(W*H*3)
    if len(b) < W*H*3: break
    x = torch.from_numpy(np.frombuffer(b, np.uint8).reshape(H, W, 3).copy()).cuda().permute(2,0,1)[None].half() / 255
    with torch.no_grad():
        y = modelo(x).clamp(0, 1)
    escribir.stdin.write((y[0].permute(1,2,0) * 255).round().byte().cpu().numpy().tobytes())
    n += 1
escribir.stdin.close(); escribir.wait()
print('cuadros:', n, '· segundos:', round(time.time()-t0))
from google.colab import files; files.download(SALIDA)
