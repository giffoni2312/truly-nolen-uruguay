// Builds the Truly Nolen Uruguay site from the Venezuela pages used as layout templates.
// Usage: node build.mjs
// Why a generator: nav, footer and chat repeat on every page. Changing them in one place
// (this file + src/helpers.mjs) and regenerating avoids 17 hand-edited copies drifting apart.
//
// 5-nov-2026 (recipe «truly-inbound» 5-nov, same as Cali): the Venezuela reference is already the globaltni.com/es
// replica (grey strip, sticky header, dropdowns, search magnifier, official zones diagram, globaltni footer, chat
// button). Three kinds of page:
//   - page.replace: the Venezuela <main> with Uruguay content swapped in (home);
//   - page.copy:    the Venezuela <main> as it is, links moved to Uruguay (Hogares and Comercios = globaltni pages, R17);
//   - page.main:    Uruguay's own <main> (pests, industry, blog, legal), built with the Venezuela markup.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { PAGES } from './src/pages.mjs';
import { U, A, SITE, PESTS, PEST_ORDER } from './src/helpers.mjs';
import { POSTS_UY } from './src/blog-uy.mjs';
import { ORTOGRAFIA, corregir } from './src/ortografia.mjs';

const ROOT = new URL('./site/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const VE = join(ROOT, 'oficinas/venezuela');
const OUT = join(ROOT, 'oficinas/uruguay');
const USADOS = new Set();

// src/replica.css (3-nov) measured the master for the old Venezuela draft. Its general rules (header, footer, home,
// inner pages) would now override the new replica (recipe R19), so only the rules for Uruguay's own blocks stay:
// the species cards of the pest guides (species-*), the industry page bands (ct-*) and the small source line (s-fuente).
const KEEP_RULE = /species-|\.ct-|s-fuente/;
function filterCss(css) {
  let out = '';
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf('{', i);
    if (open < 0) break;
    const sel = css.slice(i, open).trim();
    if (sel.startsWith('@')) {
      // block at-rule (@media, @supports): find its matching brace and filter the inside
      let depth = 1; let j = open + 1;
      while (depth && j < css.length) { if (css[j] === '{') depth++; else if (css[j] === '}') depth--; j++; }
      const inner = filterCss(css.slice(open + 1, j - 1));
      if (inner) out += `${sel}{${inner}}`;
      i = j;
    } else {
      const close = css.indexOf('}', open);
      if (KEEP_RULE.test(sel)) out += `${sel}{${css.slice(open + 1, close)}}`;
      i = close + 1;
    }
  }
  return out;
}
const REPLICA_CSS = filterCss(readFileSync(new URL('./src/replica.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, ''));

// The globaltni copies of Hogares and Comercios carry exact-size rules (fixed widths measured on globaltni) that overflow
// the window at in-between widths (1280, 961, 360 px). Same fix as Bogotá (herramientas-colombia/armar-copias-globaltni.mjs):
// cap each section at the window width minus the page gutters; at the widths where nothing overflowed, boxes do not move.
const COPIA_SIN_DESBORDE = `<style id="copia-sin-desborde">
html body.country-site[data-oficina][data-oficina][data-oficina] div.gt-copia > section:nth-of-type(n){max-width:calc(100vw - 128px)!important}
html body.country-site[data-oficina][data-oficina][data-oficina] div.gt-copia > section#zonas:nth-of-type(n){grid-template-columns:minmax(0,1fr)!important}
html body.country-site[data-oficina][data-oficina][data-oficina] div.gt-copia > section:nth-of-type(n) :is(nav,h1,h2,p,article,figure,img):nth-of-type(n){max-width:100%!important}
@media (min-width:1200px){html body.country-site[data-oficina][data-oficina][data-oficina] div.gt-copia > section.s-lead-pair:nth-of-type(n){grid-template-columns:minmax(0,688.594fr) minmax(0,563.406fr)!important}}
@media (max-width:389px){html body.country-site[data-oficina][data-oficina][data-oficina][data-oficina][data-oficina][data-oficina][data-oficina] div.ct-commercial .ct-documentary > figure:nth-of-type(n) > figcaption:nth-of-type(n){width:auto!important;max-width:100%!important}}
@media (min-width:961px) and (max-width:1199px){html body.country-site[data-oficina][data-oficina][data-oficina] div.gt-copia > section.s-lead-pair:nth-of-type(n){grid-template-columns:minmax(0,486.188fr) minmax(0,397.812fr)!important}}
@media (max-width:1199px){html body.country-site[data-oficina][data-oficina][data-oficina] div.gt-copia > section:nth-of-type(n){max-width:calc(100vw - 80px)!important}}
@media (max-width:760px){html body.country-site[data-oficina][data-oficina][data-oficina] div.gt-copia > section:nth-of-type(n){max-width:calc(100vw - 44px)!important}}
</style>`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plain = (s) => s.replace(/<br\/>/g, ' ').replace(/<[^>]+>/g, '');

const PEST_SLUGS = {
  zancudos: 'mosquitos', 'cucarachas-y-chiripas': 'cucarachas', 'hormigas-y-bachacos': 'hormigas',
  comejen: 'termitas', alacranes: 'arana-de-los-rincones',
};
const PEST_LABELS = {
  '>Zancudos<': '>Mosquitos<', '>Cucarachas y chiripas<': '>Cucarachas<', '>Hormigas y bachacos<': '>Hormigas<',
  '>Comején<': '>Termitas<', '>Alacranes<': '>Araña de los rincones<',
};

// Recipe R3: always usted. Same texts as the Venezuela reference, with Uruguay's name.
const CHAT_TEXTS = {
  nombre: 'Truly AI', enLinea: 'En línea ahora', escribiendo: 'Truly AI está escribiendo…',
  saludo: '¡Hola! Soy Truly AI, de Truly Nolen Uruguay. Cuénteme qué necesita proteger y le oriento en el siguiente paso.',
  campo: 'Escríbale a Truly AI…', enviar: 'Enviar', abrir: 'Abrir el chat con Truly AI', cerrar: 'Cerrar el chat',
  nueva: 'Conversación nueva', invita: '¿Hablamos?', invitaSub: 'Truly AI le responde', descartar: 'Descartar invitación',
  atajos: ['Vi una plaga en mi casa', 'Necesito proteger mi negocio'],
  wa: 'Seguir por WhatsApp',
  caido: 'No pude conectarme. Intente enviar su mensaje de nuevo en unos instantes.',
  trabado: 'No pude conectarme. Intente enviar su mensaje de nuevo en unos instantes.',
  noLeidos: 'Respuesta nueva',
};
// Uruguay has no published office: the assistant must not invent one (no address, no phone).
const CHAT_CONTEXT = 'Truly Nolen Uruguay public website. Truly Nolen has NO published local office in Uruguay: never claim or imply a local office, address, local phone, coverage area, technicians, schedules, availability, prices or guarantees in Uruguay unless the Truly Nolen team confirms them. Help visitors describe their pest situation (homes, businesses or industry): what they see, where, since when, type of space, departamento and barrio or localidad, children or pets. Explain the general Truly Nolen approach (listen, evaluate, propose, follow up) and what information helps. For service requests explain that Truly Nolen will review the request and confirm whether and how it can be attended. If someone mentions a possible spider bite (araña de los rincones, Loxosceles), a sting or a poisoning, tell them first to call CIAT at 1722 or contact their health provider. My Truly opens the separate VIP portal; Inside Truly opens the internal portal. No access to customer account data. Do not claim the chat stores no data. Language: Uruguayan Spanish, always usted, never tú or voseo; warm and professional. Use Uruguayan words: mosquito (not zancudo), termitas (not comején), cucaracha (not chiripa), hormiga cortadora (not bachaco), apartamento, fondo, azotea, heladera, canilla, pileta, departamento and barrio.';

// Search index (recipe R4: the magnifier opens the site search, like globaltni.com), built from Uruguay's own pages only.
function indiceBusqueda() {
  const items = [
    ['Hogares', '', `${U}/servicios/hogares/`, 'Servicios'],
    ['Comercios', '', `${U}/servicios/comercios/`, 'Servicios'],
    ['Industria', '', `${U}/servicios/industria/`, 'Servicios'],
    ...PEST_ORDER.map((s) => [PESTS[s].name, '', `${U}/plagas/${s}/`, 'Guía de plagas']),
    ...POSTS_UY.map((p) => [p.title, p.desc, `${U}/blog/${p.slug}/`, 'Blog']),
    ['Cobertura', '', `${U}/#cobertura`, 'Inicio'],
    ['Nosotros', '', `${U}/#nosotros`, 'Inicio'],
    ['Preguntas frecuentes', '', `${U}/#preguntas`, 'Inicio'],
    ['Contacto', '', `${U}/#contacto`, 'Inicio'],
  ];
  return JSON.stringify({ items, textos: { uno: '1 resultado', varios: '{n} resultados', cero: 'Sin resultados. Pruebe con otra palabra.' } }).replace(/</g, '\\u003c');
}

function chrome(s) {
  s = s.replace(/<script type="application\/json" id="gt-buscar-indice">[\s\S]*?<\/script>/, () => `<script type="application/json" id="gt-buscar-indice">${indiceBusqueda()}</script>`);
  s = s.replaceAll('/oficinas/venezuela/', '/oficinas/uruguay/');
  for (const [k, v] of Object.entries(PEST_SLUGS)) s = s.replaceAll(`/oficinas/uruguay/plagas/${k}/`, `/oficinas/uruguay/plagas/${v}/`);
  for (const [k, v] of Object.entries(PEST_LABELS)) s = s.replaceAll(k, v);
  s = s.replace('placeholder="Por ejemplo: comercios o alacranes"', 'placeholder="Por ejemplo: comercios o cucarachas"')
    // Uruguayan word for the car
    .replaceAll('nuestro carro emblemático', 'nuestro auto emblemático')
    .replaceAll('y un carro amarillo de servicio', 'y un auto amarillo de servicio')
    .replace('<a href="/oficinas/uruguay/accesibilidad/">Accesibilidad</a>', '<a href="/oficinas/uruguay/accesibilidad/">Accesibilidad</a><a href="/oficinas/uruguay/creditos/">Créditos de imágenes</a>');
  s = s.replace(/<script id="tia-textos" type="application\/json">[\s\S]*?<\/script>/, () => `<script id="tia-textos" type="application/json">${JSON.stringify(CHAT_TEXTS)}</script>`);
  s = s.replace(/<div class="tia-atajos" data-atajos>[\s\S]*?<\/div>/, () => `<div class="tia-atajos" data-atajos>${CHAT_TEXTS.atajos.map((t) => `<button type="button" class="tia-atajo">${t}</button>`).join('')}</div>`);
  s = s.replace(/<script id="tia-contexto" type="text\/plain">[\s\S]*?<\/script>/, () => `<script id="tia-contexto" type="text/plain">${CHAT_CONTEXT}</script>`);
  // owner request: the hero always moves (loads before preview.js / escenas.js)
  s = s.replace('<script defer src="/machotes/assets/preview.js', '<script src="/oficinas/uruguay/assets/forzar-movimiento.js"></script><script defer src="/machotes/assets/preview.js');
  return s.replaceAll('Venezuela', 'Uruguay').replaceAll('venezuela', 'uruguay');
}

function jsonLd(page, url) {
  const blocks = [{
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Truly Nolen Uruguay', url: `${SITE}${U}/`,
    logo: `${SITE}/tn-emblema.png`, image: `${SITE}${A}/uruguay-desktop.webp`, areaServed: { '@type': 'Country', name: 'Uruguay' },
  }];
  if (!page.out) {
    blocks.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Truly Nolen Uruguay', url, inLanguage: 'es-UY' });
  } else {
    const items = [{ name: 'Inicio', item: `${SITE}${U}/` }];
    if (page.crumbParent) items.push({ name: page.crumbParent[0], item: `${SITE}${page.crumbParent[1]}` });
    items.push({ name: page.crumb, item: url });
    blocks.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, ...x })) });
  }
  if (page.faq) {
    blocks.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faq.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })) });
  }
  if (page.article) {
    blocks.push({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: page.article.title, description: page.article.lead, image: `${SITE}${page.article.img}`, datePublished: '2026-10-31', dateModified: '2026-10-31', mainEntityOfPage: url, inLanguage: 'es-UY', author: { '@type': 'Organization', name: 'Truly Nolen Uruguay' }, publisher: { '@type': 'Organization', name: 'Truly Nolen Uruguay', logo: { '@type': 'ImageObject', url: `${SITE}/tn-emblema.png` } } });
  }
  return blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`).join('\n');
}

function head(pre, page) {
  const url = `${SITE}${U}/${page.out}`;
  const ogImg = `${SITE}${A}/uruguay-social.jpg`;
  const set = (key, val) => { pre = pre.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(")`), `$1${esc(val)}$2`); };
  pre = pre.replace(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
  pre = pre.replace(/<link rel="canonical" href="[^"]*"\/>/, `<link rel="canonical" href="${url}"/>`);
  // Tab icon: the Venezuela template has none, so browsers asked for /favicon.ico and got a 404
  if (!/<link rel="icon"/.test(pre)) pre = pre.replace(`<link rel="canonical" href="${url}"/>`, `$&<link rel="icon" href="/tn-emblema.png" type="image/png"/>`);
  set('description', page.description);
  set('og:site_name', 'Truly Nolen Uruguay');
  set('og:locale', 'es_UY');
  set('og:url', url);
  set('og:title', page.title);
  set('og:description', page.description);
  set('og:image', ogImg);
  set('og:image:alt', 'Auto de Truly Nolen frente al Teatro Solís de Montevideo, Uruguay');
  set('twitter:title', page.title);
  set('twitter:description', page.description);
  set('twitter:image', ogImg);
  pre = pre.replace(/(<meta property="og:image:width" content=")[^"]*/, '$11200').replace(/(<meta property="og:image:height" content=")[^"]*/, '$1630');
  // Uruguay's own blocks only (species cards, industry bands); home and the globaltni copies do not need them.
  if (page.main && REPLICA_CSS) pre = pre.replace('</head>', `<style id="uruguay-bloques">${REPLICA_CSS}</style></head>`);
  // Page-level fixes (e.g. the Industria h1 measured on Comercios)
  if (page.css) pre = pre.replace('</head>', `<style id="uruguay-pagina">${page.css}</style></head>`);
  pre = pre.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  pre = pre.replace(/(<meta name="twitter:image" content="[^"]*"\/>)/, `$1\n${jsonLd(page, url)}`);
  return pre;
}

for (const page of PAGES) {
  const tpl = readFileSync(join(VE, page.template ?? page.out, 'index.html'), 'utf8');
  const a = tpl.indexOf('<main id="contenido">');
  const b = tpl.indexOf('</main>');
  if (a < 0 || b < 0) throw new Error(`Template without <main>: ${page.template}`);
  const pre = chrome(head(tpl.slice(0, a), page));
  let post = chrome(tpl.slice(b + '</main>'.length));
  let main;
  if (page.main) {
    main = `<main id="contenido">\n${page.main}\n</main>`;
  } else {
    main = tpl.slice(a, b + '</main>'.length);
    for (const [from, to] of page.replace || []) {
      const found = typeof from === 'string' ? main.includes(from) : from.test(main);
      if (!found) throw new Error(`[${page.out || 'portada'}] no encontré el texto a cambiar: ${String(from).slice(0, 90)}`);
      main = typeof from === 'string' ? main.split(from).join(to) : main.replace(from, () => to);
    }
    main = chrome(main);
    if (page.copy) post = post.replace('</body>', `${COPIA_SIN_DESBORDE}\n</body>`);
  }
  // "38 %" must never break between the number and the sign (no-break space)
  let html = `${pre}${main.replace(/(\d) %/g, '$1&nbsp;%')}${post}`;
  html = corregir(html, USADOS); // spelling fixes (src/ortografia.mjs)
  const file = join(OUT, page.out, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`✓ ${U}/${page.out}`);
}

// sitemap.xml with every Uruguay page (like the official draft)
const urls = PAGES.map((p) => `  <url><loc>${SITE}${U}/${p.out}</loc></url>`).join('\n');
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`✓ ${U}/sitemap.xml (${PAGES.length} direcciones)`);
const sinUso = ORTOGRAFIA.filter(([x]) => !USADOS.has(x)).map(([x]) => x);
if (sinUso.length) console.log(`AVISO: correcciones que ya no encuentran su texto: ${sinUso.join(' | ')}`);
