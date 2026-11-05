// Browser checks for the 5-nov-2026 recipe on Uruguay (stand-in for the owner's gates, which are not on this PC).
// Uses the playwright-core already installed in the Cali folder (nothing new is installed) and Chrome without a window.
// Needs the local server: PORT=8095 node serve.mjs  (it also serves the Venezuela reference in site/oficinas/venezuela/).
//  1. every Uruguay page at 360/390/768/961/1024/1100/1280/1366/1440: no horizontal scroll, one h1, no broken image,
//     0 console errors
//  2. every internal link answers 200 and every #anchor exists on its target page
//  3. magnifier opens the search (not the chat) and finds «cucarachas»; sticky header top after scrolling (−44 / 0),
//     compared with Venezuela
//  4. Hogares and Comercios: boxes of every element of <main> with and without <style id="copia-sin-desborde">
//     at 1440, 1024, 768 and 390 (the fix must not move anything where nothing overflowed)
//  5. side-by-side screenshots Uruguay | Venezuela (home, Hogares, Comercios at 1440 and 390) in capturas/5nov/
// Usage: node tools/comprobar-5nov.mjs
import { chromium } from 'file:///C:/Users/carlos/Desktop/truly-cali/node_modules/playwright-core/index.mjs';
import { readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'http://127.0.0.1:8095';
const UY = `${HOST}/oficinas/uruguay/`;
const VE = `${HOST}/oficinas/venezuela/`;
const WIDTHS = [360, 390, 768, 961, 1024, 1100, 1280, 1366, 1440];
const SITE = fileURLToPath(new URL('../site/oficinas/uruguay/', import.meta.url));
const SHOTS = fileURLToPath(new URL('../capturas/5nov/', import.meta.url));
const pages = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) { if (f !== 'assets') walk(p); } else if (f === 'index.html') pages.push(relative(SITE, d).split('\\').join('/')); } })(SITE);
pages.sort();

const exe = process.env.CHROME_BIN || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ executablePath: exe, headless: true });
const errors = [];
const log = [];
const url = (p) => UY + (p ? `${p}/` : '');

// ---------- 1. pages × widths
let combos = 0;
for (const p of pages) {
  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    const consola = [];
    page.on('console', (m) => { if (m.type() === 'error') consola.push(m.text()); });
    page.on('pageerror', (e) => consola.push(String(e)));
    await page.goto(url(p), { waitUntil: 'load' });
    for (let y = 0; y < 40000; y += 900) { const done = await page.evaluate((yy) => { scrollTo(0, yy); return yy > document.body.scrollHeight; }, y); await page.waitForTimeout(25); if (done) break; }
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const sw = document.documentElement.scrollWidth;
      const wide = sw > vw + 1 ? [...document.querySelectorAll('main *, header *, footer *')].filter((e) => {
        const b = e.getBoundingClientRect();
        if (b.right <= vw + 1 || b.width === 0) return false;
        for (let q = e.parentElement; q; q = q.parentElement) { const o = getComputedStyle(q).overflowX; if (o !== 'visible') return false; }
        return true;
      }).slice(0, 4).map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}`) : [];
      return {
        sw, vw, wide,
        h1: document.querySelectorAll('h1').length,
        rotas: [...document.images].filter((i) => i.getAttribute('src') && i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')),
      };
    });
    combos++;
    if (r.sw > r.vw + 1) errors.push(`${p || 'portada'} @${w}: scroll horizontal ${r.sw}>${r.vw} ${r.wide.join(', ')}`);
    if (r.h1 !== 1) errors.push(`${p || 'portada'} @${w}: ${r.h1} h1`);
    for (const x of r.rotas) errors.push(`${p || 'portada'} @${w}: imagen rota ${x}`);
    for (const c of consola) errors.push(`${p || 'portada'} @${w}: consola: ${c.slice(0, 160)}`);
    await page.close();
  }
}
log.push(`1. ${pages.length} páginas × ${WIDTHS.length} anchos = ${combos} combinaciones revisadas`);

// ---------- 2. links and anchors
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const status = new Map();
const ids = new Map();
let nLinks = 0;
for (const p of pages) {
  const page = await ctx.newPage();
  await page.goto(url(p), { waitUntil: 'domcontentloaded' });
  const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => h.startsWith(location.origin)));
  for (const l of links) {
    nLinks++;
    const [u, hash] = l.split('#');
    if (!status.has(u)) {
      const res = await ctx.request.get(u);
      status.set(u, res.status());
      const body = res.status() === 200 && /html/.test(res.headers()['content-type'] || '') ? await res.text() : '';
      ids.set(u, new Set([...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
    }
    if (status.get(u) !== 200) errors.push(`${p || 'portada'}: enlace ${l} → ${status.get(u)}`);
    else if (hash && !ids.get(u).has(decodeURIComponent(hash))) errors.push(`${p || 'portada'}: ancla #${hash} sin destino en ${u.replace(HOST, '')}`);
  }
  await page.close();
}
log.push(`2. ${nLinks} enlaces internos, ${status.size} direcciones distintas revisadas`);

// ---------- 3. behaviour (magnifier, sticky header, chat button), Uruguay vs Venezuela
async function conducta(base, w) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  if (w <= 960) { const t = page.locator('.menu-toggle'); if (await t.isVisible()) { await t.click(); await page.waitForTimeout(300); } }
  const lupa = page.locator('.gt-buscar').first();
  let busca = 'sin lupa visible';
  if (await lupa.isVisible()) {
    await lupa.click();
    await page.waitForTimeout(400);
    const dlg = await page.evaluate(() => document.querySelector('.search-dialog')?.open === true);
    const chat = await page.evaluate(() => document.querySelector('.tia-panel')?.getAttribute('aria-hidden') === 'false');
    await page.fill('#site-search', 'cucarachas').catch(() => {});
    await page.waitForTimeout(300);
    const res = await page.evaluate(() => [...document.querySelectorAll('.search-results a')].map((a) => a.getAttribute('href')));
    busca = `búsqueda ${dlg ? 'abre' : 'NO abre'}, chat ${chat ? 'SE ABRE' : 'cerrado'}, «cucarachas» → ${res.length} ${res.join(' ')}`;
    await page.keyboard.press('Escape');
  }
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(900);
  const head = await page.evaluate(() => { const h = document.querySelector('header.site-nav'); const r = h.getBoundingClientRect(); return `${getComputedStyle(h).position} top=${Math.round(r.top)}`; });
  const fab = await page.evaluate(() => { const b = document.querySelector('.tia-fab'); if (!b) return 'sin botón'; const r = b.getBoundingClientRect(); return `${Math.round(r.width)}×${Math.round(r.height)}`; });
  await page.close();
  return { busca, head, fab };
}
for (const w of [390, 768, 1024, 1440]) {
  const [u, v] = [await conducta(UY, w), await conducta(VE, w)];
  for (const k of ['busca', 'head', 'fab']) {
    log.push(`3. ${w} ${k}: UY ${u[k]} · VE ${v[k]}`);
    if (k !== 'busca' && u[k] !== v[k]) errors.push(`${w} ${k}: UY ${u[k]} · VE ${v[k]}`);
  }
  if (!/abre, chat cerrado, «cucarachas» → [1-9]/.test(u.busca) || !u.busca.includes('/oficinas/uruguay/plagas/cucarachas/')) errors.push(`${w}: la lupa no encuentra cucarachas (${u.busca})`);
  if (/venezuela/.test(u.busca)) errors.push(`${w}: la lupa lleva a Venezuela`);
}

// ---------- 4. boxes with and without the overflow fix (copies)
for (const p of ['servicios/hogares', 'servicios/comercios']) {
  for (const w of [1440, 1024, 768, 390]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(url(p), { waitUntil: 'load' });
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => {
      const boxes = () => [...document.querySelectorAll('main *')].map((e) => { const b = e.getBoundingClientRect(); return [b.x + scrollX, b.y + scrollY, b.width, b.height]; });
      const con = boxes();
      document.getElementById('copia-sin-desborde')?.remove();
      document.body.offsetHeight;
      const sin = boxes();
      let n = 0;
      for (let i = 0; i < con.length; i++) if (con[i].some((v, k) => Math.abs(v - sin[i][k]) > 0.5)) n++;
      return { total: con.length, cambiadas: n, desbordaSin: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 };
    });
    log.push(`4. ${p} @${w}: ${r.cambiadas} de ${r.total} cajas cambian con el arreglo (sin arreglo ${r.desbordaSin ? 'desborda' : 'no desborda'})`);
    if (r.cambiadas) errors.push(`${p} @${w}: el arreglo mueve ${r.cambiadas} cajas`);
    await page.close();
  }
}
// where the copy overflows without the fix (the reason for the fix)
for (const p of ['servicios/hogares', 'servicios/comercios']) {
  const malos = [];
  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(url(p), { waitUntil: 'load' });
    const d = await page.evaluate(() => { document.getElementById('copia-sin-desborde')?.remove(); document.body.offsetHeight; return document.documentElement.scrollWidth - document.documentElement.clientWidth; });
    if (d > 1) malos.push(`${w} (+${d})`);
    await page.close();
  }
  log.push(`4. ${p} sin el arreglo desborda en: ${malos.join(', ') || 'ningún ancho'}`);
}

// ---------- 5. side-by-side screenshots
mkdirSync(SHOTS, { recursive: true });
for (const [name, p, pv] of [['portada', '', ''], ['hogares', 'servicios/hogares/', 'servicios/hogares/'], ['comercios', 'servicios/comercios/', 'servicios/comercios/']]) {
  for (const w of [1440, 390]) {
    const shot = async (u) => {
      const page = await browser.newPage({ viewport: { width: w, height: 900 } });
      await page.goto(u, { waitUntil: 'load' });
      for (let y = 0; y < 40000; y += 900) { const done = await page.evaluate((yy) => { scrollTo(0, yy); return yy > document.body.scrollHeight; }, y); await page.waitForTimeout(40); if (done) break; }
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(600);
      const b = await page.screenshot({ fullPage: true, type: 'jpeg', quality: 70 });
      await page.close();
      return b.toString('base64');
    };
    const [a, b] = [await shot(UY + p), await shot(VE + pv)];
    const page = await browser.newPage({ viewport: { width: w * 2 + 40, height: 900 } });
    await page.setContent(`<body style="margin:0;display:flex;gap:40px;background:#888;align-items:flex-start"><div><p style="font:700 20px sans-serif;margin:8px">Uruguay</p><img style="width:${w}px;display:block" src="data:image/jpeg;base64,${a}"></div><div><p style="font:700 20px sans-serif;margin:8px">Venezuela</p><img style="width:${w}px;display:block" src="data:image/jpeg;base64,${b}"></div></body>`);
    await page.waitForTimeout(300);
    writeFileSync(join(SHOTS, `${name}-${w}-uruguay-venezuela.jpg`), await page.screenshot({ fullPage: true, type: 'jpeg', quality: 60 }));
    await page.close();
  }
}
log.push(`5. capturas lado a lado en capturas/5nov/`);

await browser.close();
for (const l of log) console.log(l);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`${errors.length} error(es)`);
process.exit(errors.length ? 1 : 0);
