// Builds the Truly Nolen Uruguay site from the Venezuela pages used as layout templates.
// Usage: node build.mjs
// Why a generator: nav, footer and chat repeat on every page. Changing them in one place
// (this file + src/helpers.mjs) and regenerating avoids 17 hand-edited copies drifting apart.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { PAGES } from './src/pages.mjs';
import { U, A, SITE } from './src/helpers.mjs';

const ROOT = new URL('./site/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const VE = join(ROOT, 'oficinas/venezuela');
const OUT = join(ROOT, 'oficinas/uruguay');

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

const CHAT_TEXTS = {
  nombre: 'Truly AI', enLinea: 'En línea ahora', escribiendo: 'Truly AI está escribiendo…',
  saludo: '¡Hola! Soy Truly AI, de Truly Nolen Uruguay. Contame qué necesitás proteger y te oriento en el siguiente paso.',
  campo: 'Escribile a Truly AI…', enviar: 'Enviar', abrir: 'Abrir el chat con Truly AI', cerrar: 'Cerrar el chat',
  nueva: 'Conversación nueva', invita: '¿Hablamos?', invitaSub: 'Truly AI te responde al instante', descartar: 'Descartar invitación',
  atajos: ['Vi una plaga en mi casa', 'Necesito proteger mi negocio', 'No sé qué plaga encontré'],
  wa: 'Seguir por WhatsApp',
  caido: 'No pude conectarme. Probá enviar tu mensaje de nuevo en unos instantes.',
  trabado: 'No pude conectarme. Probá enviar tu mensaje de nuevo en unos instantes.',
  noLeidos: 'Respuesta nueva',
};
const CHAT_CONTEXT = 'Truly Nolen Uruguay public website. Never claim or imply a local office, address, local phone, coverage area, technicians, schedules, availability, prices or guarantees in Uruguay unless the Truly Nolen team confirms them. Help visitors describe their pest situation (homes, businesses or industry): what they see, where, since when, type of space, departamento and barrio or localidad, children or pets. Explain the general Truly Nolen approach (listen, evaluate, propose, follow up) and what information helps. For service requests explain that Truly Nolen will review the request and confirm whether and how it can be attended. If someone mentions a possible spider bite (araña de los rincones, Loxosceles), a sting or a poisoning, tell them first to call CIAT at 1722 or contact their health provider. My Truly opens the separate VIP portal; Inside Truly opens the internal portal. No access to customer account data. Do not claim the chat stores no data. Language: Uruguayan Spanish with voseo (contame, tenés, querés, escribinos), warm and professional; never tú verb forms, never usted. Use Uruguayan words: mosquito (not zancudo), termitas (not comején), cucaracha (not chiripa), hormiga negra or cortadora (not bachaco), apartamento, fondo, azotea, heladera, canilla, pileta, departamento and barrio.';

function chrome(s) {
  s = s.replaceAll('/oficinas/venezuela/', '/oficinas/uruguay/');
  for (const [k, v] of Object.entries(PEST_SLUGS)) s = s.replaceAll(`/oficinas/uruguay/plagas/${k}/`, `/oficinas/uruguay/plagas/${v}/`);
  for (const [k, v] of Object.entries(PEST_LABELS)) s = s.replaceAll(k, v);
  s = s.replaceAll('/oficinas/uruguay/assets/footer-venezuela.webp', `${A}/footer-uruguay.webp`)
    .replaceAll('Camino de la Felicidad, Falcón, Venezuela. Ilustración', 'La Mano y la Rambla de Punta del Este, Uruguay. Ilustración en acuarela')
    .replaceAll('Venezuela · Camino de la Felicidad, Falcón', 'Uruguay · La Mano, Punta del Este')
    .replaceAll('Conversemos', 'Hablemos')
    .replaceAll('Escríbele a Truly AI', 'Escribile a Truly AI')
    .replaceAll('Conversa aquí', 'Escribí acá')
    .replaceAll('Activa JavaScript', 'Activá JavaScript')
    .replaceAll('© Truly Nolen · Venezuela', `© ${new Date().getFullYear()} Truly Nolen International · Uruguay`)
    .replace('<a href="/oficinas/uruguay/accesibilidad/">Accesibilidad</a>', '<a href="/oficinas/uruguay/accesibilidad/">Accesibilidad</a><a href="/oficinas/uruguay/creditos/">Créditos de imágenes</a>');
  // Floating chat: same three shortcuts as the on-page box (Venezuela had two vs three)
  s = s.replace(/<div class="tia-atajos" data-atajos>[\s\S]*?<\/div>/, `<div class="tia-atajos" data-atajos>${CHAT_TEXTS.atajos.map((t) => `<button type="button" class="tia-atajo">${t}</button>`).join('')}</div>`);
  s = s.replace(/<script id="tia-textos" type="application\/json">[\s\S]*?<\/script>/, `<script id="tia-textos" type="application/json">${JSON.stringify(CHAT_TEXTS)}</script>`);
  s = s.replace(/<script id="tia-contexto" type="text\/plain">[\s\S]*?<\/script>/, `<script id="tia-contexto" type="text/plain">${CHAT_CONTEXT}</script>`);
  s = s.replaceAll('width="1774" height="887"', 'width="1774" height="877"');
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
  set('description', page.description);
  set('og:site_name', 'Truly Nolen Uruguay');
  set('og:locale', 'es_UY');
  set('og:url', url);
  set('og:title', page.title);
  set('og:description', page.description);
  set('og:image', ogImg);
  set('og:image:alt', 'Carro de Truly Nolen en la Rambla de Punta del Este, Uruguay');
  set('twitter:title', page.title);
  set('twitter:description', page.description);
  set('twitter:image', ogImg);
  pre = pre.replace(/(<meta property="og:image:width" content=")[^"]*/, '$11200').replace(/(<meta property="og:image:height" content=")[^"]*/, '$1630');
  pre = pre.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  pre = pre.replace(/(<meta name="twitter:image" content="[^"]*"\/>)/, `$1\n${jsonLd(page, url)}`);
  return pre;
}

for (const page of PAGES) {
  const tpl = readFileSync(join(VE, page.template || page.out, 'index.html'), 'utf8');
  const a = tpl.indexOf('<main id="contenido">');
  const b = tpl.indexOf('</main>');
  if (a < 0 || b < 0) throw new Error(`Template without <main>: ${page.template}`);
  const pre = chrome(head(tpl.slice(0, a), page));
  const post = chrome(tpl.slice(b + '</main>'.length));
  const html = `${pre}<main id="contenido">\n${page.main}\n</main>${post}`;
  const file = join(OUT, page.out, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`✓ ${U}/${page.out}`);
}

// sitemap.xml with every Uruguay page (like the official draft)
const urls = PAGES.map((p) => `  <url><loc>${SITE}${U}/${p.out}</loc></url>`).join('\n');
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`✓ ${U}/sitemap.xml (${PAGES.length} direcciones)`);
