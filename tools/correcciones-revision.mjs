// One-off edit: fixes from the final independent review (sources attributed correctly, broken link, leftovers).
import { readFileSync, writeFileSync } from 'node:fs';
const path = (p) => new URL('../' + p, import.meta.url);
const edit = (file, pairs) => {
  let s = readFileSync(path(file), 'utf8');
  for (const [a, b] of pairs) {
    if (!s.includes(a)) { console.error(`FALTA en ${file}: ${a.slice(0, 100)}`); process.exit(1); }
    s = s.split(a).join(b);
  }
  writeFileSync(path(file), s);
};

const MENDOZA_ARCHIVO = 'https://web.archive.org/web/20240305000000*/https://www.mendoza.gov.ar/salud/wp-content/uploads/sites/16/2014/05/Recomendaciones-Envenenamiento-por-Aracnidos-de-Cuyo-20171.pdf';

edit('src/blog-uy.mjs', [
  // 5) broken link -> archived copy
  ["'https://www.mendoza.gov.ar/salud/wp-content/uploads/sites/16/2014/05/Recomendaciones-Envenenamiento-por-Aracnidos-de-Cuyo-20171.pdf'", `'${MENDOZA_ARCHIVO}'`],
  ['Recomendaciones ante envenenamiento por arácnidos (referencia regional)', 'Recomendaciones ante envenenamiento por arácnidos (referencia regional; copia archivada)'],
  // 5) claims the Mendoza PDF does not contain -> our own practical advice, no attribution
  ['<p>Si encontrás una y podés atraparla sin tocarla, por ejemplo con un frasco, guardala: las recomendaciones sanitarias de la región indican que identificar al animal ayuda al médico a decidir el tratamiento.</p>',
   '<p>Si encontrás una y podés atraparla sin tocarla, por ejemplo con un frasco, guardala: así se puede mostrar qué araña era.</p>'],
  ['<p>Las recomendaciones del Ministerio de Salud de Mendoza (Argentina), que comparte la misma especie con Uruguay, describen sus lugares favoritos: sitios oscuros y poco movidos, como galpones, altillos y sótanos, y dentro de la casa, detrás de cuadros y muebles, entre la ropa colgada y en los rincones de las habitaciones.</p>\n<p>En una casa de acá eso se traduce en lugares muy concretos:</p>',
   '<p>Busca lugares oscuros, secos y poco movidos. En una casa de acá conviene mirar estos lugares:</p>'],
  ['<p>Muchas picaduras pasan al vestirse o al acostarse, cuando la araña quedó atrapada entre la ropa o las sábanas y se siente apretada contra la piel.</p>',
   '<p>Muchas picaduras pasan al dormir o al vestirse: según las recomendaciones del Ministerio de Salud de Mendoza (Argentina), que trabaja con la misma especie, el 38 % de los casos ocurrió durmiendo y el 32 % al vestirse.</p>'],
  // 4) who recommends 1722
  ['Es el Centro de Información y Asesoramiento Toxicológico, y es el número que recomienda la nota del MSP citada por Montevideo Portal.',
   'Es el Centro de Información y Asesoramiento Toxicológico, el número que recomienda el reptiliario Alternatus en la nota de Montevideo Portal.'],
  ['<p>Las recomendaciones de Mendoza coinciden en tres hábitos simples:</p>', '<p>Tres hábitos simples ayudan mucho:</p>'],
  ['<li><strong>Limpiar seguido los rincones</strong>, detrás de muebles y cuadros. La aspiradora ayuda a sacar telas y huevos.</li>',
   '<li><strong>Limpiar seguido los rincones</strong>, detrás de muebles y cuadros.</li>'],
  // 1) "tienen memoria" is Bollazzi (La Mañana); the late rejection is in Revista INIA
  ['<p>Tampoco es infalible. La cartilla del INIA explica que las obreras «tienen memoria» y pueden rechazar los cebos después de una aplicación fallida, un fenómeno que la Facultad de Agronomía y el INIA investigan juntos.',
   '<p>Tampoco es infalible. Bollazzi contó en La Mañana que las obreras «tienen memoria», y la Revista INIA explica que pueden rechazar los cebos después de una aplicación fallida, un fenómeno que la Facultad de Agronomía y el INIA investigan juntos.'],
  ['mata algunas obreras y baja el corte por unos días, pero la colonia sigue.', 'mata algunas obreras y baja el corte, pero la colonia sigue.'],
  ["'Las obreras pueden rechazar cebos después de una aplicación fallida. La Facultad de Agronomía y el INIA investigan ese rechazo; por eso conviene que el control llegue bien al nido la primera vez.'",
   "'Según la Revista INIA, las obreras pueden rechazar los cebos después de una aplicación fallida, algo que investigan la Facultad de Agronomía y el INIA. Por eso conviene que el control llegue bien al nido la primera vez.'"],
]);

edit('src/helpers.mjs', [
  // 7) species count consistent with the blog
  ["card: 'En Uruguay hay 14 especies de hormigas cortadoras del género Acromyrmex: la «hormiga negra» que deja sin hojas el jardín y la huerta.',",
   "card: 'En Uruguay hay entre 12 y 14 especies de hormigas cortadoras del género Acromyrmex, según la fuente: la «hormiga negra» que deja sin hojas el jardín y la huerta.',"],
  ["inia: ['INIA (2014). Cartilla 36: hormigas cortadoras del género Acromyrmex',", "inia: ['INIA. Cartilla N.º 36: hormigas cortadoras del género Acromyrmex',"],
  // 3) source title as it is
  ["leptoLluvia: ['Montevideo Portal. Murió una persona de leptospirosis en Montevideo: por qué la lluvia importa en el contagio',",
   "leptoLluvia: ['Montevideo Portal (2025). Murió una persona de leptospirosis en Montevideo: por qué la lluvia importa en el contagio (con datos de la OPS)',"],
]);

edit('src/pages.mjs', [
  // 8) missing article in the spider stat
  ["['MSP', 'la considera la araña de mayor importancia para la salud pública en Uruguay.',", "['MSP', 'considera a la araña de los rincones la de mayor importancia para la salud pública en Uruguay.',"],
  // 3) leptospirosis + rain: MSP reported the death; the rain link comes from PAHO in the note
  ["['Las lluvias', 'En Montevideo, el MSP informó una muerte por leptospirosis y la vinculó con las lluvias.'],",
   "['Las lluvias', 'El MSP informó una muerte por leptospirosis en Montevideo. La nota explica, con datos de la OPS, que el riesgo sube después de las lluvias.'],"],
  ["['Roedores y lluvias', 'En Montevideo, el MSP vinculó con las lluvias una muerte por leptospirosis, una enfermedad que transmiten los roedores.'],",
   "['Lluvias', 'El MSP informó una muerte por leptospirosis en Montevideo; según la OPS, citada en la nota, el riesgo sube después de las lluvias.'],"],
  // 2) exports: figures the cited source actually gives
  ["['2.680', 'millones de dólares exportó la carne bovina en 2025: el primer rubro del país.', 'El Observador · Uruguay XXI (2025)'],",
   "['2.444', 'millones de dólares exportó la carne bovina de enero a noviembre de 2025: el primer rubro del país.', 'El Observador (2025)'],"],
  ["['2.307', 'millones de dólares exportó la celulosa en 2025.', 'El Observador · Uruguay XXI (2025)'],",
   "['2.103', 'millones de dólares exportó la celulosa de enero a noviembre de 2025.', 'El Observador (2025)'],"],
  ["['928', 'millones de dólares exportaron los lácteos en 2025.', 'El Observador · Uruguay XXI (2025)'],",
   "['848', 'millones de dólares exportaron los lácteos en 2024.', 'El Observador (2025)'],"],
  ['fuentes([SRC.exportaciones, SRC.uruguayXXI, SRC.palomas,', 'fuentes([SRC.exportaciones, SRC.palomas,'],
  // B) wording
  ['la Intendencia de Montevideo usa cetrería contra las palomas en el Centro y la Ciudad Vieja desde 2011.', 'la Intendencia de Montevideo usó cetrería contra las palomas en el Centro y la Ciudad Vieja (El Observador, 2012).'],
  ["'gub.uy publica una guía para elaborar el Plan de Control de Plagas de las empresas alimentarias.'", "'El portal gub.uy publica una guía para elaborar el Plan de Control de Plagas de las empresas alimentarias.'"],
  ['Leer guía →', 'Leer el artículo →'],
  // 6) credits: drop the old termite photo, add the blog covers
  ["  ['Termitas sobre madera (blog)', 'Editor abcdef', 'CC0', 'https://creativecommons.org/publicdomain/zero/1.0/', 'https://commons.wikimedia.org/wiki/File:Termites_on_wood.JPG'],\n", ''],
  ["['Araña de los rincones, Loxosceles laeta', 'Mampato', 'Dominio público', '', 'https://commons.wikimedia.org/wiki/File:Loxosceles_laeta.jpg'],",
   "['Araña de los rincones, Loxosceles laeta (también portada del artículo del blog)', 'Mampato', 'Dominio público', '', 'https://commons.wikimedia.org/wiki/File:Loxosceles_laeta.jpg'],"],
]);

// 7) hormigas pest page stat: say both figures
{ const f = path('src/pages.mjs'); let s = readFileSync(f, 'utf8');
  const a = "['14', 'especies de hormigas cortadoras del género Acromyrmex hay en Uruguay, según la Facultad de Agronomía.', 'La Mañana'],";
  if (!s.includes(a)) { console.error('FALTA dato de hormigas'); process.exit(1); }
  s = s.replace(a, "['12-14', 'especies de hormigas cortadoras del género Acromyrmex hay en Uruguay: 12 según el INIA y unas 14 según la Facultad de Agronomía.', 'INIA, cartilla N.º 36 · La Mañana'],");
  s = s.replace('src: [SRC.laManana, SRC.antwiki],', 'src: [SRC.inia, SRC.laManana, SRC.antwiki],');
  // credits note about the ant cover photo
  s = s.replace('<p>Las fotos del mosquito, la cucaracha y la hormiga cortadora son las mismas', '<p>Las fotos del mosquito, la cucaracha y la hormiga cortadora (también portada del artículo del blog) son las mismas');
  writeFileSync(f, s); }

// B) BlogPosting: dateModified + mainEntityOfPage
edit('build.mjs', [["datePublished: '2026-10-31',", "datePublished: '2026-10-31', dateModified: '2026-10-31', mainEntityOfPage: url,"]]);
console.log('ok');
