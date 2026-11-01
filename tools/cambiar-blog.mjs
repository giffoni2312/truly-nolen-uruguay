// One-off edit: swap the old blog posts (termites, dengue: same topics as other offices) for the Uruguay-only ones.
import { readFileSync, writeFileSync } from 'node:fs';
const f = new URL('../src/pages.mjs', import.meta.url);
let s = readFileSync(f, 'utf8');
const must = (cond, msg) => { if (!cond) { console.error('FALTA: ' + msg); process.exit(1); } };

// 1) import
must(s.includes("} from './helpers.mjs';"), 'import de helpers');
s = s.replace("} from './helpers.mjs';", "} from './helpers.mjs';\nimport { POSTS_UY, CUERPOS, SRC_BLOG } from './blog-uy.mjs';");

// 2) POSTS array
const a = s.indexOf('const POSTS = ['), b = s.indexOf('];', a);
must(a > 0 && b > a, 'POSTS');
s = s.slice(0, a) + 'const POSTS = POSTS_UY;' + s.slice(b + 2);

// 3) old articles -> new ones
const c = s.indexOf('const postTermitas = article(POSTS[0], {'), d = s.indexOf('// ---------------------------------------------------------------- LEGAL');
must(c > 0 && d > c, 'artículos viejos');
const nuevos = `const postDe = (i) => { const p = POSTS[i], k = CUERPOS[p.slug];
  return article(p, { body: k.body, faq: k.faq, src: k.src.map((x) => SRC_BLOG[x]), prompts: k.prompts, related: POSTS[1 - i] }); };
const postTermitas = postDe(0);
const postMosquito = postDe(1);

`;
s = s.slice(0, c) + nuevos + s.slice(d);

// 4) blog index description
s = s.replace("description: 'Guías sobre las plagas de Uruguay: termitas, mosquitos, ratas, cucarachas, hormigas y la araña de los rincones, con cada dato respaldado por su fuente.',",
  "description: 'Guías sobre plagas de Uruguay: la araña de los rincones, la hormiga cortadora y más, con cada dato respaldado por su fuente abierta.',");
writeFileSync(f, s);
console.log('ok');
