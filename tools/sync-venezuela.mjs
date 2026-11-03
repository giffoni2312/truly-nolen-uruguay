// Refreshes the Venezuela template pages and every shared asset they reference from the live draft.
// Usage: node tools/sync-venezuela.mjs
// Why: build.mjs uses site/oficinas/venezuela/** as layout templates; when the draft changes design,
// the local copy must match it byte for byte (pages, CSS, JS, fonts).
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const BASE = 'https://borrador-venezuela.truly-inbound-borrador.pages.dev';
const ROOT = new URL('../site/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const PAGES = ['', 'servicios/hogares/', 'servicios/comercios/', 'servicios/industria/', 'plagas/zancudos/',
  'plagas/cucarachas-y-chiripas/', 'plagas/hormigas-y-bachacos/', 'plagas/comejen/', 'plagas/ratas-y-ratones/',
  'plagas/alacranes/', 'blog/', 'blog/como-eliminar-el-comejen/', 'blog/como-acabar-con-los-zancudos-en-casa/',
  'privacidad/', 'terminos/', 'accesibilidad/'];

const seen = new Set();
const changed = [];
async function get(path, binary) {
  const res = await fetch(BASE + path);
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return binary ? Buffer.from(await res.arrayBuffer()) : await res.text();
}
function save(path, data) {
  const file = join(ROOT, path);
  const old = existsSync(file) ? readFileSync(file) : null;
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
  if (old && old.equals(buf)) return;
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, buf);
  changed.push(`${old ? 'changed' : 'new'} ${path}`);
}
async function asset(raw, from) {
  let path = new URL(raw, BASE + from).pathname;
  if (!/^\/(machotes|landing|oficinas\/assets|oficinas\/venezuela\/assets)\//.test(path) && path !== '/tn-emblema.png') return;
  if (seen.has(path)) return;
  seen.add(path);
  const isText = /\.(css|js|json|svg)$/.test(path);
  const data = await get(path, !isText);
  save(path, data);
  if (path.endsWith('.css')) {
    for (const m of data.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) if (!m[1].startsWith('data:')) await asset(m[1], path);
  }
}
for (const p of PAGES) {
  const path = `/oficinas/venezuela/${p}`;
  const html = await get(path);
  save(`${path}index.html`, html);
  const refs = [...html.matchAll(/(?:src|href|data-src|data-src-movil|poster)="([^"#]+)"/g), ...html.matchAll(/srcset="([^" ]+)/g)].map((m) => m[1]);
  for (const m of html.matchAll(/url\(\s*["']?(\/[^"')]+)["']?\s*\)/g)) refs.push(m[1]);
  for (const r of refs) if (r.startsWith('/')) await asset(r.split('?')[0], path);
}
console.log(changed.join('\n') || 'nothing changed');
console.log(`${changed.length} file(s) written, ${seen.size} asset(s) checked`);
