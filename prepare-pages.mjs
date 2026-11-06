// Prepares the site for GitHub Pages. Usage: node prepare-pages.mjs  (output: dist/)
// Why: the pages use root-absolute paths ("/oficinas/uruguay/..."), but a GitHub project site
// lives under "/<repo>/". We copy site/ to dist/ and prefix those paths, leaving site/ untouched
// so local preview (serve.mjs) keeps working as is.
import { cpSync, rmSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.BASE_PATH ?? '/truly-nolen-uruguay';
const here = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SRC = join(here, 'site');
const DIST = join(here, 'dist');

rmSync(DIST, { recursive: true, force: true });
cpSync(SRC, DIST, { recursive: true });

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
let files = 0;
for (const file of walk(DIST).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8')
    // href="/x", src="/x", data-src="/x", srcset="/x" — but not protocol-relative "//x"
    .replace(/(\s(?:href|src|data-src|data-src-movil|srcset)=")\/(?!\/)/g, `$1${BASE}/`)
    // url(/x) inside the inline <style> (office fonts): without the base they 404 and phones fall back to Arial
    .replace(/url\((['"]?)\/(?!\/)/g, `url($1${BASE}/`);
  writeFileSync(file, html);
  files++;
}

// The repo root has no page of its own: send visitors to the Uruguay site
const target = `${BASE}/oficinas/uruguay/`;
writeFileSync(join(DIST, 'index.html'), `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${target}"><title>Truly Nolen Uruguay</title></head><body><a href="${target}">Ir a Truly Nolen Uruguay</a></body></html>`);

console.log(`dist/ ready: ${files} HTML files rewritten with base "${BASE}"`);
