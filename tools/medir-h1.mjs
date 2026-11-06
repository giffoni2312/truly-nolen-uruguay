// Measures the h1 (font family, weight, size) of Industria against Comercios and other inner pages at 1440, 1024 and 390.
// Usage: node tools/medir-h1.mjs  (needs PORT=8095 node serve.mjs)
import { chromium } from 'file:///C:/Users/carlos/Desktop/truly-cali/node_modules/playwright-core/index.mjs';
const H = 'http://127.0.0.1:8095/oficinas/';
const PAGES = ['uruguay/servicios/industria/', 'uruguay/servicios/comercios/', 'uruguay/servicios/hogares/', 'uruguay/plagas/mosquitos/', 'venezuela/servicios/comercios/', 'venezuela/servicios/industria/'];
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
for (const w of [1440, 1024, 390]) {
  for (const p of PAGES) {
    const page = await b.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(H + p, { waitUntil: 'load' });
    const r = await page.evaluate(() => { const h = document.querySelector('main h1'); const c = getComputedStyle(h); return `${c.fontFamily.split(',')[0]} ${c.fontWeight} ${c.fontSize} lh ${c.lineHeight} ls ${c.letterSpacing}`; });
    console.log(w, p.padEnd(32), r);
    await page.close();
  }
}
await b.close();
