// Quality checks for the generated Uruguay site. Usage: node check.mjs
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('./site/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const OUT = join(ROOT, 'oficinas/uruguay');

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const pages = walk(OUT).filter((f) => f.endsWith('index.html'));

const LEFTOVER = /venezuela|zancudo|comej[eé]n|chiripa|bachaco|caracas|falc[oó]n|la guaira|quinta|bodeg[oó]n|abastos|alacr[aá]n|tityus|estado y municipio|truly inbound/i;
// Tú (non-voseo) verb forms that should not appear in Uruguayan copy
const TUTEO = /\b(Cuéntanos|Cuéntame|Escríbele|Escríbenos|Conversa|puedes|quieres|necesitas|tienes|prefieres|Elige|Descubre|Conoce|Indica|Comparte|Pregúntale|Avísanos|Intenta|Activa|crees|vives|guardas|has visto|observas|debo)\b/;

let problems = 0;
const fail = (page, msg) => { problems++; console.log(`✗ ${page.replace(ROOT, '/')}: ${msg}`); };

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');

  // The chat instructions intentionally say "mosquito (not zancudo)", so they are excluded
  const code = html.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script id="tia-contexto"[\s\S]*?<\/script>/, '');
  const lo = visible.match(LEFTOVER) || code.match(LEFTOVER);
  if (lo) fail(file, `leftover "${lo[0]}"`);
  const tu = visible.match(TUTEO);
  if (tu) fail(file, `tuteo "${tu[0]}"`);

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(file, `${h1} <h1>`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) fail(file, `duplicate ids ${[...new Set(dup)].join(', ')}`);

  for (const m of html.matchAll(/(?:href|src|srcset)="(\/[^"]*)"/g)) {
    const path = m[1].split(/[?#]/)[0];
    if (!path) continue;
    const target = join(ROOT, path.endsWith('/') ? `${path}index.html` : path);
    if (!existsSync(target)) fail(file, `broken ${m[1]}`);
  }
  // CSS selectors like a[href="#contacto"] live inside <style>: they are not links
  for (const m of code.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.includes(m[1])) fail(file, `anchor #${m[1]} has no target`);
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    // Decorative images inside a link that already has text, or the brand logo, may have alt=""
    if (!/alt="/.test(tag)) fail(file, `img without alt ${tag.slice(0, 80)}`);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail(file, 'invalid JSON-LD'); }
  }
  try { JSON.parse(html.match(/<script id="tia-textos" type="application\/json">([\s\S]*?)<\/script>/)[1]); } catch { fail(file, 'invalid chat JSON'); }

  // --- Rules added by the 3-nov-2026 recipe (master = globaltni.com/en) ---
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const mainText = main.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const isHome = /oficinas[\\/]uruguay[\\/]index\.html$/.test(file);
  const isBlogIndex = /blog[\\/]index\.html$/.test(file);
  // Inner pages: prose like the master, no tables, data strips, benefit blocks or forms
  if (!isHome && !isBlogIndex) {
    for (const [re, what] of [[/<table\b/, 'table'], [/class="[^"]*\bg-dato\b/, '.g-dato'], [/class="[^"]*\bg-benef\b/, '.g-benef'], [/<form\b/, 'form'], [/class="[^"]*\bg-tabla\b/, '.g-tabla']]) {
      if (re.test(main)) fail(file, `inner page has ${what} (the master uses prose)`);
    }
  }
  // Text broken letter by letter ("m i l í m e t r o s")
  const loose = mainText.match(/(?:^|\s)(?:[A-Za-zÁÉÍÓÚáéíóúñÑ] ){5,}[A-Za-zÁÉÍÓÚáéíóúñÑ](?=\s|$)/);
  if (loose) fail(file, `loose letters "${loose[0].trim()}"`);
  // No sentence of 8+ words twice on the same page
  const sentences = mainText.split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter((x) => x.split(/\s+/).length >= 8);
  const seenS = new Set();
  for (const x of sentences) { if (seenS.has(x)) { fail(file, `repeated sentence "${x.slice(0, 70)}…"`); break; } seenS.add(x); }
  // Every "Leer…" link must open an article
  for (const m of main.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>\s*Leer[^<]*/g)) {
    if (!/\/blog\/[^/]+\/$/.test(m[1])) fail(file, `"Leer" link goes to ${m[1]}`);
  }
  // WhatsApp link must be the same everywhere
  for (const m of html.matchAll(/href="(https:\/\/wa\.me\/[^"]*)"/g)) if (m[1] !== 'https://wa.me/15202145675') fail(file, `different WhatsApp link ${m[1]}`);
  // One percent format: "97 %" (with space), never "97%"
  const pct = mainText.match(/\d%/);
  if (pct) fail(file, `percent without space "${pct[0]}"`);
  // FAQ structured data only when the questions are visible on the page
  if (/"FAQPage"/.test(html) && !/<details\b/.test(main)) fail(file, 'FAQ structured data without visible questions');
}

console.log(`\n${pages.length} pages checked, ${problems} problem(s).`);
process.exit(problems ? 1 : 0);
