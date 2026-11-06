// Prints computed styles of master (globaltni.com/en) selectors, to copy exact values into src/replica.css.
// Usage: node tools/medir-master.mjs <url> <width> <selector> [selector...]
import { pathToFileURL } from 'node:url';
const PW = process.env.PW_CORE || 'C:/Users/carlos/Desktop/truly-cali/node_modules/playwright-core/index.mjs';
const { chromium } = await import(pathToFileURL(PW).href);
const [url, width, ...sels] = process.argv.slice(2);
const PROPS = ['display', 'grid-template-columns', 'gap', 'padding', 'margin', 'border-top', 'border-bottom', 'border-left', 'border-radius', 'background-color', 'color', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'text-transform', 'max-width', 'width', 'height', 'position', 'top', 'list-style-type', 'content'];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +width, height: 900 } });
await p.goto(url, { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(900);
const res = await p.evaluate(({ sels, PROPS }) => sels.map((sel) => {
  const pseudo = sel.match(/::(before|after|marker)$/);
  const base = pseudo ? sel.slice(0, -pseudo[0].length) : sel;
  const e = document.querySelector(base);
  if (!e) return `${sel}: NONE`;
  const s = getComputedStyle(e, pseudo ? pseudo[0] : null);
  const r = e.getBoundingClientRect();
  const v = PROPS.map((k) => [k, s.getPropertyValue(k)]).filter(([, x]) => x && !/^(normal|none|auto|0px|rgba\(0, 0, 0, 0\)|0px none rgb\(.*\)|static)$/.test(x));
  return `${sel} [x${Math.round(r.left)} y${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)}]\n  ` + v.map(([k, x]) => `${k}: ${x}`).join('; ');
}), { sels, PROPS });
console.log(res.join('\n'));
await b.close();
