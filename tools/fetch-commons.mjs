// Download chosen Commons photos at a given width and record license/credit data.
// Usage: node fetch-commons.mjs  (edit PICKS below)
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
const PICKS = [
  ["Uruguai - Maldonado - Punta Del Este - Punta Ballena - Piriápolis (Páez Vilaró) - panoramio (95).jpg", 'uy-hogar-casa-moderna.jpg', 2560, 'Casa moderna en Punta Ballena (hogares)'],
];
mkdirSync('out', { recursive: true });
const credits = existsSync('credits.json') ? JSON.parse(readFileSync('credits.json', 'utf8')) : {};
for (const [title, file, width, label] of PICKS) {
  if (existsSync(`out/${file}`) && credits[file] && credits[file].title.includes(title.slice(0,20))) { console.log('skip', file); continue; }
  await new Promise((r) => setTimeout(r, 3000));
  // Exact title may be truncated in search results: resolve with a search when needed
  let t = title;
  const api = (q) => `https://commons.wikimedia.org/w/api.php?action=query&${q}&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=${width}&format=json`;
  let j = await (await fetch(api(`titles=${encodeURIComponent('File:' + t)}`), { headers: { 'User-Agent': 'TrulyUY-draft/1.0' } })).json();
  let p = Object.values(j.query.pages)[0];
  if (!p.imageinfo) {
    j = await (await fetch(api(`generator=search&gsrnamespace=6&gsrlimit=1&gsrsearch=${encodeURIComponent(title.slice(0, 70))}`), { headers: { 'User-Agent': 'TrulyUY-draft/1.0' } })).json();
    p = Object.values(j.query?.pages || {})[0];
  }
  if (!p?.imageinfo) { console.log('NOT FOUND', title); continue; }
  const i = p.imageinfo[0], m = i.extmetadata;
  await new Promise((r) => setTimeout(r, 2000));
  const b = Buffer.from(await (await fetch(i.thumburl, { headers: { 'User-Agent': 'TrulyUY-draft/1.0' } })).arrayBuffer());
  writeFileSync(`out/${file}`, b);
  credits[file] = { label, title: p.title, artist: (m.Artist?.value || '').replace(/<[^>]+>/g, '').trim(), license: m.LicenseShortName?.value, licenseUrl: m.LicenseUrl?.value || '', page: i.descriptionurl };
  console.log('ok', file, b.length, i.thumbwidth + 'x' + i.thumbheight, '|', p.title.slice(0, 60), '|', credits[file].license);
}
writeFileSync('credits.json', JSON.stringify(credits, null, 1));
