// Minimal static server for local preview (no dependencies). Usage: node serve.mjs → http://localhost:8080/oficinas/uruguay/
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const ROOT = new URL('./site/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.json': 'application/json' };
const PORT = Number(process.env.PORT) || 8080;

const TOOLS = new URL('./tools/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  // Dev-only: image tools in /_tools/ can save their output (PNG/JPEG data) into tools/out/
  const save = path.match(/^\/_save\/([a-z0-9-]+\.(?:jpg|png))$/);
  if (req.method === 'POST' && save) {
    const chunks = []; for await (const c of req) chunks.push(c);
    const { writeFile } = await import('node:fs/promises');
    await writeFile(join(TOOLS, 'out', save[1]), Buffer.concat(chunks));
    res.writeHead(200).end('saved'); return;
  }
  let base = ROOT;
  if (path.startsWith('/_tools/')) { base = TOOLS; path = path.slice('/_tools'.length); }
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(base, path));
  if (!file.startsWith(normalize(base))) { res.writeHead(403).end(); return; } // block path traversal
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('404');
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}/oficinas/uruguay/`));
