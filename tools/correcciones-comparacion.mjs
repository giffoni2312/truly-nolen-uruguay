// One-off edit: apply the differences found against the official draft (Venezuela) — sections, tables, sources, SEO.
import { readFileSync, writeFileSync } from 'node:fs';
const path = (p) => new URL('../' + p, import.meta.url);
const edit = (file, pairs) => {
  let s = readFileSync(path(file), 'utf8');
  for (const [a, b] of pairs) {
    if (!s.includes(a)) { console.error(`FALTA en ${file}: ${a.slice(0, 90)}`); process.exit(1); }
    s = s.replace(a, b);
  }
  writeFileSync(path(file), s);
};

// ---------- helpers.mjs: per-pest service heading + new open sources
edit('src/helpers.mjs', [
  ['export function servicesCards() {\n  return `<section class="section services"><div class="section-heading"><p class="eyebrow">Servicios</p><h2>Revisemos tu caso<br/>en tu espacio.</h2>',
   'export function servicesCards(h2 = \'Revisemos tu caso<br/>en tu espacio.\') {\n  return `<section class="section services"><div class="section-heading"><p class="eyebrow">Servicios</p><h2>${h2}</h2>'],
  ['export const SRC = {', `export const SRC = {
  resistencia: ['Revisión científica (2025). Estado y mecanismos de la resistencia a insecticidas de la cucaracha alemana en el mundo', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12677976/'],
  leptoSeguimiento: ['Revista do Instituto de Medicina Tropical de São Paulo (2012). Diez años de seguimiento de la leptospirosis humana en Uruguay: un problema de salud no resuelto', 'https://revistas.usp.br/rimtsp/article/view/31452'],
  leptoLluvia: ['Montevideo Portal. Murió una persona de leptospirosis en Montevideo: por qué la lluvia importa en el contagio', 'https://www.montevideo.com.uy/Modo-saludable/Murio-una-persona-de-leptospirosis-en-Montevideo-por-que-la-lluvia-importa-en-el-contagio-uc940202'],
  guiaPlan: ['gub.uy. Guía para elaborar el Plan de Control de Plagas de las empresas alimentarias', 'https://www.gub.uy/tramites/sites/catalogo-tramites/files/2025-11/Gu%C3%ADaContPlag%20-%201%20%28Plan%20de%20Control%20de%20Plagas%29_2.pdf'],`],
]);

// ---------- pages.mjs
const SVC = `const SVC = {
  mosquitos: 'Revisemos dónde<br/>se está criando.',
  'ratas-y-ratones': 'Cerremos el paso<br/>por donde entran.',
  cucarachas: 'Encontremos dónde<br/>se esconden.',
  hormigas: 'Sigamos la fila<br/>hasta el nido.',
  termitas: 'Revisemos la madera<br/>de tu casa.',
  'arana-de-los-rincones': 'Revisemos los rincones<br/>de tu casa.',
};
function pestPage(`;
edit('src/pages.mjs', [
  // all 6 FAQs on pest pages + per-pest service heading
  ['function pestPage(slug, { title, description, hero, t1, d, t2, faq = GENERAL_FAQ.slice(0, 4), src, prompts }) {',
   SVC + 'slug, { title, description, hero, t1, d, t2, faq = GENERAL_FAQ, src, prompts }) {'],
  ['servicesCards(), faqSection(faq)', 'servicesCards(SVC[slug]), faqSection(faq)'],
  // home details
  ['alt="Carro amarillo de Truly Nolen"', 'alt=""'],
  // cucarachas: drop the unverified "5 años" figure, use a sourced one
  ["['5 años', 'dura la habilitación bromatológica que otorga el Servicio de Regulación Alimentaria de la Intendencia.', 'Intendencia de Montevideo, trámites'],",
   "['60', 'ingredientes activos de insecticidas tienen reportes de resistencia en la cucaracha alemana, según una revisión de 102 estudios en 23 países.', 'Revisión científica (2025)'],"],
  ['src: [SRC.imAlimentos, SRC.cucarachasMP],', 'src: [SRC.imAlimentos, SRC.cucarachasMP, SRC.resistencia],'],
  // comercios: norm table without the unverified figure + official guide
  ["['Habilitación bromatológica', 'La otorga el Servicio de Regulación Alimentaria de la Intendencia de Montevideo y dura 5 años.'],",
   "['Registros', 'El programa preventivo de Montevideo tiene que dejar anotado el control que se hizo, quién lo hizo y las medidas correctivas.'],\n      ['Guía oficial', 'gub.uy publica una guía para elaborar el Plan de Control de Plagas de las empresas alimentarias.'],"],
  // comercios: the two sections Venezuela has (big figure + health risk)
  ["    tabla({ ey: 'Lo que dice la norma', h2: 'Si vendés alimentos,<br/>la norma lo pide.', rows: [",
   `    dato({ ey: 'Un dato que pesa', h2: 'Lo que encontró<br/>la ciencia.', items: [
      ['60', 'ingredientes activos de insecticidas tienen reportes de resistencia en la cucaracha alemana, según una revisión de 102 estudios en 23 países.', 'Revisión científica (2025)'],
    ] }),
    tabla({ ey: 'Por qué importa', h2: 'En un negocio de alimentos,<br/>una plaga es un riesgo de salud.', rows: [
      ['Roedores y leptospirosis', 'Un seguimiento de diez años describió la leptospirosis humana en Uruguay como un problema de salud no resuelto.'],
      ['Las lluvias', 'En Montevideo, el MSP informó una muerte por leptospirosis y la vinculó con las lluvias.'],
      ['Insecticidas que no alcanzan', 'Con tantos reportes de resistencia, aplicar siempre el mismo producto no basta: hay que encontrar dónde se esconde la plaga.'],
    ] }),
    tabla({ ey: 'Lo que dice la norma', h2: 'Si vendés alimentos,<br/>la norma lo pide.', rows: [`],
  ['fuentes([SRC.imAlimentos, SRC.imRegistro, SRC.mspEmpresas]),',
   'fuentes([SRC.imAlimentos, SRC.imRegistro, SRC.mspEmpresas, SRC.guiaPlan, SRC.resistencia, SRC.leptoSeguimiento, SRC.leptoLluvia]),'],
  // industria: integrated management as a table (like Venezuela) + "por qué fumigar no basta"
  ["    cols({ ey: 'Qué podés esperar', h2: 'Manejo integrado<br/>de plagas.', items: [\n      ['Diagnóstico', 'Recorrida de la planta, el perímetro y los depósitos para entender qué favorece a cada plaga.'],\n      ['Programa', 'Monitoreo, control y registros según tu actividad y las auditorías que tenés que cumplir.'],\n      ['Seguimiento', 'Informes de hallazgos, tendencias y recomendaciones, con visitas según el programa acordado.'],\n    ] }),",
   `    tabla({ ey: 'Qué podés esperar', h2: 'Manejo integrado<br/>de plagas.', rows: [
      ['Diagnóstico', 'Recorrida de la planta, el perímetro y los depósitos para entender qué favorece a cada plaga.', ['Accesos, desagües y zonas húmedas.', 'Depósitos, silos y residuos.']],
      ['Programa', 'Monitoreo, control y registros según tu actividad y las auditorías que tenés que cumplir.', ['Estaciones de monitoreo numeradas.', 'Registro de cada visita.']],
      ['Seguimiento', 'Informes de hallazgos, tendencias y recomendaciones, con visitas según el programa acordado.', ['Tendencias por zona.', 'Medidas correctivas y su control.']],
    ], nota: 'Antes de empezar recibís una propuesta con el alcance, la frecuencia y los registros para tu planta.' }),`],
  ["    pestGrid({ ey: 'Guía de plagas', h2: 'Plagas que vigilamos<br/>en la industria.'",
   `    tabla({ ey: 'Lo que se sabe', h2: 'Por qué fumigar<br/>no basta.', rows: [
      ['Resistencia', 'Una revisión de 102 estudios en 23 países reporta cucarachas alemanas resistentes a 60 ingredientes activos, sobre todo piretroides y organofosforados.'],
      ['Registros', 'En Montevideo, el programa preventivo de una empresa alimentaria tiene que dejar anotado el control, quién lo hizo y las medidas correctivas.'],
      ['Roedores y lluvias', 'En Montevideo, el MSP vinculó con las lluvias una muerte por leptospirosis, una enfermedad que transmiten los roedores.'],
    ] }),
    pestGrid({ ey: 'Guía de plagas', h2: 'Plagas que vigilamos<br/>en la industria.'`],
  ['fuentes([SRC.exportaciones, SRC.uruguayXXI, SRC.palomas]),',
   'fuentes([SRC.exportaciones, SRC.uruguayXXI, SRC.palomas, SRC.resistencia, SRC.imAlimentos, SRC.leptoLluvia]),'],
]);

// "Lo que más nos preguntan." with the final period, like the official draft
{ let s = readFileSync(path('src/pages.mjs'), 'utf8'); s = s.replace('<h3>Lo que más nos preguntan</h3>', '<h3>Lo que más nos preguntan.</h3>'); writeFileSync(path('src/pages.mjs'), s); }

// ---------- build.mjs: BlogPosting, keep og:image size, real footer height, sitemap.xml
edit('build.mjs', [
  ["'@type': 'Article'", "'@type': 'BlogPosting'"],
  ['  pre = pre.replace(/<meta property="og:image:(width|height)" content="[^"]*"\\/>/g, \'\');',
   '  pre = pre.replace(/(<meta property="og:image:width" content=")[^"]*/, \'$11200\').replace(/(<meta property="og:image:height" content=")[^"]*/, \'$1630\');'],
  ["  return s.replaceAll('Venezuela', 'Uruguay')",
   "  s = s.replaceAll('width=\"1774\" height=\"887\"', 'width=\"1774\" height=\"877\"');\n  return s.replaceAll('Venezuela', 'Uruguay')"],
]);
{ let s = readFileSync(path('build.mjs'), 'utf8');
  if (!s.includes('sitemap.xml')) {
    s += `
// sitemap.xml with every Uruguay page (like the official draft)
const urls = PAGES.map((p) => \`  <url><loc>\${SITE}\${U}/\${p.out}</loc></url>\`).join('\\n');
writeFileSync(join(OUT, 'sitemap.xml'), \`<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n\${urls}\\n</urlset>\\n\`);
console.log(\`✓ \${U}/sitemap.xml (\${PAGES.length} direcciones)\`);
`;
    writeFileSync(path('build.mjs'), s);
  } }
console.log('ok');
