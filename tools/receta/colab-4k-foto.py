# Hero video to 4K in Google Colab (free T4 GPU) with Real-ESRGAN x4plus, the photo model the recipe asks for
# (animevideov3 makes the car look like a cartoon). Paste the whole file in one Colab cell and run it:
# it asks for the video, upscales x4, scales to 3840 wide and downloads <name>-4k.mp4.
!pip -q install spandrel
!wget -q -nc https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth
import torch, subprocess, numpy as np, json, time
from spandrel import ModelLoader
from google.colab import files
up = files.upload()
src = '/content/' + list(up.keys())[0]
dst = src.replace('.mp4', '-4k.mp4')
info = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'json', src], capture_output=True, text=True).stdout)['streams'][0]
W, H = info['width'], info['height']
model = ModelLoader().load_from_file('RealESRGAN_x4plus.pth').cuda().eval().half()
S = model.scale
reader = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
writer = subprocess.Popen(['ffmpeg', '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W*S}x{H*S}', '-r', '24', '-i', '-', '-vf', 'scale=3840:-2:flags=lanczos', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-pix_fmt', 'yuv420p', dst], stdin=subprocess.PIPE)
n = 0; t0 = time.time()
while True:
    b = reader.stdout.read(W * H * 3)
    if len(b) < W * H * 3:
        break
    x = torch.from_numpy(np.frombuffer(b, np.uint8).reshape(H, W, 3).copy()).cuda().permute(2, 0, 1)[None].half() / 255
    with torch.no_grad():
        y = model(x).clamp(0, 1)
    writer.stdin.write((y[0].permute(1, 2, 0) * 255).round().byte().cpu().numpy().tobytes())
    n += 1
writer.stdin.close(); writer.wait()
print('cuadros:', n, 'segundos:', round(time.time() - t0))
files.download(dst)
