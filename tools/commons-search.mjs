// Search Wikimedia Commons for high-resolution, freely licensed photos and build a contact sheet.
// Usage: node commons-search.mjs  → writes ../site/_candidatas.html and candidatas.json
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
const Q = {
  calles_para_el_carro: ['Rambla Montevideo avenue', 'Rambla Punta del Este', 'Ruta Interbalnearia Uruguay', 'Avenida Rambla Montevideo sunset', 'Rambla Mahatma Gandhi Montevideo', 'Punta Ballena Uruguay road'],
  industria: ['Puerto de Montevideo', 'Montevideo port containers ship', 'Barrio Anglo Fray Bentos', 'viñedo Uruguay', 'Bodega Garzón', 'forestación eucalipto Uruguay', 'arrozales Uruguay', 'ganado Uruguay campo'],
  animales: ['Aedes aegypti CDC Gathany', 'Rattus norvegicus brown rat', 'Blattella germanica adult', 'Periplaneta americana adult', 'Acromyrmex leaf cutting', 'Linepithema humile', 'Reticulitermes flavipes', 'Loxosceles laeta'],
};
const OK = /^(CC0|Public domain|CC BY(-SA)? [0-9.]+)/i;
const prev = existsSync("candidatas.json") ? JSON.parse(readFileSync("candidatas.json","utf8")) : {};
const out = {calles_para_el_carro: [], ...prev};
for (const [group, qs] of Object.entries(Q)) {
  if (!process.argv.includes('--all') && out[group]?.length && !['industria','animales','calles_para_el_carro'].includes(group)) continue;
  out[group] = [];
  for (const q of qs) {
    await new Promise((r) => setTimeout(r, 6000));
    const u = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q + ' filetype:bitmap')}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|extmetadata|size|mime&iiurlwidth=420&format=json`;
    let j; try { j = await (await fetch(u, { headers: { 'User-Agent': 'TrulyUY-draft/1.0' } })).json(); } catch { console.log('fail', q); continue; }
    for (const p of Object.values(j.query?.pages || {})) {
      const i = p.imageinfo?.[0]; if (!i) continue;
      const m = i.extmetadata || {}; const lic = m.LicenseShortName?.value || '';
      if (i.width < (group==="animales"?1800:2800) || !/jpeg|png/.test(i.mime) || !OK.test(lic)) continue;
      out[group].push({ q, title: p.title.replace('File:', ''), w: i.width, h: i.height, lic, licUrl: m.LicenseUrl?.value || '', artist: (m.Artist?.value || '').replace(/<[^>]+>/g, '').trim().slice(0, 60), thumb: i.thumburl, page: i.descriptionurl });
    }
  }
  console.log(group, out[group].length);
}
writeFileSync('candidatas.json', JSON.stringify(out, null, 1));
let n = 0; const idx = [];
const html = `<!doctype html><meta charset=utf-8><title>Candidatas</title><style>body{font:11px sans-serif;margin:8px;background:#fff}h2{margin:14px 0 4px}div.g{display:grid;grid-template-columns:repeat(8,1fr);gap:6px}figure{margin:0}img{width:100%;height:110px;object-fit:cover;display:block}b{font-size:14px;background:#ffd900;padding:0 4px}</style>` +
  Object.entries(out).map(([g, arr]) => `<h2>${g}</h2><div class=g>${arr.map((x) => { n++; idx.push({ n, g, ...x }); return `<figure><img src="${x.thumb}"><figcaption><b>${n}</b> ${x.w}×${x.h}</figcaption></figure>`; }).join('')}</div>`).join('');
writeFileSync('../site/_candidatas.html', html);
writeFileSync('candidatas-index.json', JSON.stringify(idx, null, 1));
console.log('total', n);
