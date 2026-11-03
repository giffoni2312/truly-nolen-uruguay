// Full-page screenshot of one page at one width (scrolls first so lazy images load).
// Usage: node tools/captura.mjs <url> <width> <out.png>
import { pathToFileURL } from 'node:url';
const PW = process.env.PW_CORE || 'C:/Users/carlos/Desktop/truly-cali/node_modules/playwright-core/index.mjs';
const { chromium } = await import(pathToFileURL(PW).href);
const [url, width, out] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +width, height: 900 } });
await p.goto(url, { waitUntil: 'domcontentloaded' });
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
await p.waitForTimeout(500);
await p.screenshot({ path: out, fullPage: true });
await b.close();
