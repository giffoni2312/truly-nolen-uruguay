import {
  U, A, PESTS, PEST_ORDER, pestGrid, detailHero, tabla, dato, cols, faqSection, fuentes,
  servicesCards, contacto, DEFAULT_PROMPTS, GENERAL_FAQ, SRC,
} from './helpers.mjs';
import { POSTS_UY, CUERPOS, SRC_BLOG } from './blog-uy.mjs';
import {
  flat, intro, leadPair, flow, rowsProse, datoProse, pestLinks, serviceLinks, preguntas, sFuentes, closing,
  pestMaster, articleParts, articleFaq, ctPage, contactBand,
} from './master.mjs';

const arrow = '<span aria-hidden="true">→</span>';

// ---------------------------------------------------------------- HOME
// 5-nov-2026 (recipe 5-nov, same as Cali): the home is the Venezuela reference <main> (the globaltni.com/es replica,
// in usted) with Uruguay's own content swapped in: hero film, commercial photo, the six Uruguay pests, the blog and
// the coverage answer. Corporate texts (programs, zones, sectors, sanitization, TEPS, network, history) stay as globaltni's.
// The 4-nov home (voseo, own zones image, coverage form) is in respaldos/2026-11-05-antes-receta-5nov/src/pages.mjs.
const homeFaq = [
  ['¿Cómo comienza el servicio?', 'El equipo revisa su consulta, confirma si podemos atenderle y coordina la evaluación que corresponda.'],
  ['¿Puedo solicitar atención para mi negocio?', 'Sí. El tipo de actividad, los horarios y las condiciones del espacio ayudan a definir el programa.'],
  ['¿Qué debo preparar antes de la visita?', 'Le indicaremos las medidas que se aplican al servicio y las precauciones para personas y mascotas.'],
  ['¿Cómo consulto la cobertura?', 'Indique su departamento, su barrio o localidad y si es casa, apartamento o local. Le confirmaremos si podemos atenderle y cómo coordinar.'],
  ['¿La evaluación tiene costo?', 'Pregúntele al equipo antes de coordinar la visita. El costo y las condiciones dependen de la ubicación y del servicio que necesite.'],
  ['¿Una visita es suficiente?', 'El equipo define el alcance y el seguimiento después de evaluar su situación. Las visitas y condiciones se explican en la propuesta.'],
];
const HOME_FILM = `<div class="film"><picture><source media="(max-width:760px)" srcset="${A}/uruguay-movil.webp?v=6"/><img src="${A}/uruguay-desktop.webp?v=10" alt="Auto amarillo de Truly Nolen andando frente al Teatro Solís de Montevideo al atardecer"/></picture><video data-src-movil="${A}/uruguay-movil.mp4?v=6" muted loop playsinline preload="none" aria-hidden="true" data-src="${A}/uruguay-desktop.mp4?v=10"></video></div>`;
const HOME_PLAGAS = `<section id="plagas" class="section g g-plagas"><header class="g-cab"><h2>Reconozca la plaga.<br/>Entienda sus hábitos.</h2><p class="g-intro">Seis plagas que conviene conocer en Uruguay. Cada guía explica las señales y qué hacer, con sus fuentes.</p></header><div class="g-plagas-grid" style="--n:${PEST_ORDER.length}">${PEST_ORDER.map((s) => { const p = PESTS[s]; return `<article><a class="g-pl-fig" href="${U}/plagas/${s}/"><img src="${p.img}" alt="${p.alt}" loading="lazy"/></a><h3>${p.name}</h3><p class="g-pl-sub">${p.sub}</p><p>${p.corto}</p><a class="g-mas" href="${U}/plagas/${s}/">Ver la guía<span aria-hidden="true">→</span></a></article>`; }).join('')}</div></section>`;
const HOME_BLOG = ((p) => `<article class="g-blog"><div class="g-blog-top"><img src="${p.img}" alt="" loading="lazy"/><p class="g-ey">Del blog · 31 de octubre de 2026</p></div><h3><a href="${U}/blog/${p.slug}/">${p.title}</a></h3><p>${p.lead}</p><a class="g-link" href="${U}/blog/${p.slug}/">Leer el artículo<span aria-hidden="true">→</span></a><a class="g-link g-link-2" href="${U}/blog/">Ver todo el blog<span aria-hidden="true">→</span></a></article>`)(POSTS_UY[0]);
const VEC = '/oficinas/venezuela/servicios/comercios/';
const GT = 'https://globaltni.com/es'; // used by the unused 4-nov Comercios content
const home = {
  out: '', template: '', title: 'Control de plagas · Truly Nolen Uruguay',
  // Recipe owner exception (6-nov-2026): on the phone the hero text is white with NO cream/white veil; a soft dark
  // shade at the top and a text shadow keep it readable. Desktop keeps its light veil (recipe section I).
  // Short phones (360x640): let the hero grow instead of stacking the copy on the links. Tablet 761-899: the title
  // column was 162-206 px and split «Protegi/do.»; give it room.
  css: '@media(max-width:760px) and (max-height:760px){html body.country-site[data-oficina] section#inicio#inicio{height:max(100svh,767px)!important;min-height:0!important}}@media(min-width:761px) and (max-width:899px){html body.country-site[data-oficina] section#inicio#inicio .hero-text{max-width:none!important;width:min(42vw,340px)!important}html body.country-site[data-oficina] section#inicio#inicio h1{overflow-wrap:normal!important}}@media(max-width:760px){html body.country-site[data-oficina] section#inicio#inicio.cinema::after{background:linear-gradient(180deg,rgba(12,28,34,.74) 0,rgba(12,28,34,.52) 25%,transparent 46%),linear-gradient(0deg,rgba(16,24,32,.94) 0,rgba(16,24,32,.64) 22%,transparent 41%)!important}html body.country-site[data-oficina] section#inicio#inicio :is(.eyebrow,.eyebrow *,h1,h1 *){color:#fff!important;text-shadow:0 1px 2px rgba(0,0,0,.45),0 3px 16px rgba(0,0,0,.4)!important}}',
  description: 'Control de plagas en Uruguay para hogares, comercios e industrias. Escriba a Truly AI: le orienta en el siguiente paso.',
  faq: homeFaq,
  replace: [
    [/<div class="film">[\s\S]*?<\/video><\/div>/, HOME_FILM],
    // recipe 6c / R9: each sector row goes to its own anchor in the globaltni copy of Comercios; Industria keeps its own page
    [`<a class="g-sector" href="${VEC}"><span><h3>Salud</h3>`, `<a class="g-sector" href="${U}/servicios/comercios/#healthcare"><span><h3>Salud</h3>`],
    [`<a class="g-sector" href="${VEC}"><span><h3>Comercio de alimentos</h3>`, `<a class="g-sector" href="${U}/servicios/comercios/#food-processing"><span><h3>Comercio de alimentos</h3>`],
    [`<a class="g-sector" href="${VEC}"><span><h3>Logística</h3>`, `<a class="g-sector" href="${U}/servicios/comercios/#logistics"><span><h3>Logística</h3>`],
    // Uruguay's own commercial photo, approved by Carlos on 4-nov (Venezuela's Unsplash photo is not reused)
    ['<img src="/oficinas/venezuela/assets/ve-operacion-unsplash-u7egjbn8tzk.webp?v=d0b31cb363c3" alt="" loading="lazy"/>', `<img src="${A}/uy-operacion.webp?v=3" alt="Técnico de Truly Nolen con mascarilla fumigando la base de la pared de una casa en Montevideo (imagen ilustrativa)" loading="lazy"/>`],
    [/<section id="plagas" class="section g g-plagas">[\s\S]*?<\/section>/, HOME_PLAGAS],
    [/<article class="g-blog">[\s\S]*?<\/article>/, HOME_BLOG],
    ['Indique su estado, municipio y el tipo de espacio. Le confirmaremos si podemos atenderle y cómo coordinar la atención.', 'Indique su departamento, su barrio o localidad y si es casa, apartamento o local. Le confirmaremos si podemos atenderle y cómo coordinar.'],
  ],
};


// ---------------------------------------------------------------- PESTS
const SVC = {
  mosquitos: 'Revisemos dónde<br/>se está criando.',
  'ratas-y-ratones': 'Cerremos el paso<br/>por donde entran.',
  cucarachas: 'Encontremos dónde<br/>se esconden.',
  hormigas: 'Sigamos la fila<br/>hasta el nido.',
  termitas: 'Revisemos la madera<br/>de su casa.',
  'arana-de-los-rincones': 'Revisemos los rincones<br/>de su casa.',
};
// Master layout (globaltni pest guide): masthead, families, index and prose sections. No FAQ block,
// so no FAQ structured data either (Google only accepts FAQ markup for visible questions).
// Species shown in each guide's photo block (the page's own photo)
// One card per species, as the master (/en/pests/cockroaches/): photo box, h3 and its text.
// rows = indexes of the guide's first-table rows that describe that species; the rest go after the cards.
const SPECIES = {
  mosquitos: [{ name: '<em>Aedes aegypti</em>', rows: [0, 1, 2] }],
  'ratas-y-ratones': [{ name: 'Rata noruega', rows: [0, 1, 2] }],
  cucarachas: [
    { name: 'Cucaracha alemana', img: `${A}/uy-plaga-cucaracha-alemana-truly.webp`, alt: 'Cucaracha alemana, foto de identificación de Truly Nolen International', rows: [0] },
    { name: 'Cucaracha americana', rows: [1] },
  ],
  hormigas: [
    { name: 'Hormiga de la cocina', img: `${A}/uy-plaga-hormiga-argentina-truly.webp`, alt: 'Hormiga argentina (hormiga de la cocina), foto de identificación de Truly Nolen International', rows: [0] },
    { name: 'Hormiga cortadora', rows: [1, 2] },
  ],
  termitas: [{ name: 'Termita subterránea', rows: [0, 1, 2] }],
  'arana-de-los-rincones': [{ name: '<em>Loxosceles laeta</em>', rows: [0, 1, 2] }],
};
function speciesCards(slug, rows) {
  const p = PESTS[slug];
  const used = new Set();
  const cards = SPECIES[slug].map((c) => {
    c.rows.forEach((i) => used.add(i));
    // the card title already names the species: its first row goes without its own bold title (no «Hormiga cortadora» twice)
    const text = `<p>${rows[c.rows[0]][1]}</p>${c.rows.length > 1 ? rowsProse(c.rows.slice(1).map((i) => rows[i])) : ''}`;
    return `<div class="species-section"><div class="species-specimen"><img src="${c.img || p.img}" alt="${c.alt || p.alt}" loading="lazy"/></div><div class="species-description"><h3>${c.name}</h3>${text}</div></div>`;
  }).join('');
  return cards + rowsProse(rows.filter((_, i) => !used.has(i)));
}
function pestPage(slug, { description, hero, t1, d, t2, src }) {
  const p = PESTS[slug];
  // The master guide ends with the species and goes straight to the closing (no loose service links)
  const sections = [
    { h2: t1.h2, html: speciesCards(slug, t1.rows) },
    { h2: d.h2, html: datoProse(d.items) },
    { h2: t2.h2, html: rowsProse(t2.rows) + (t2.nota ? `<p>${t2.nota}</p>` : '') },
  ];
  return {
    out: `plagas/${slug}/`, template: 'plagas/zancudos/', title: `${p.name} · Truly Nolen Uruguay`, description, crumb: p.name,
    main: [pestMaster(slug, { lead: hero.p, sections }), sFuentes(src), closing()].join('\n'),
  };
}

const mosquitos = pestPage('mosquitos', {
  description: 'El mosquito Aedes aegypti transmite el dengue y se cría en el agua quieta de casa. Señales, datos del MSP y cómo prevenirlo en Uruguay.',
  hero: { h1: 'El criadero está más cerca<br/>de lo que piensa.', p: 'El mosquito <em>Aedes aegypti</em> transmite el dengue y se cría en el agua quieta: baldes, platos de macetas y bebederos. Según una lista de verificación del MSP (sin fecha), dos de cada tres criaderos están en las casas.' },
  t1: { ey: 'Dónde se cría', h2: 'Donde queda agua quieta.', rows: [
    ['Agua en casa', 'Baldes, floreros, platos de macetas y bebederos de mascotas: cualquier recipiente con agua quieta puede ser un criadero.'],
    ['Fondo y azotea', 'Cubiertas viejas, canaletas tapadas, juguetes y botellas que juntan agua de lluvia.'],
    ['El dengue', 'Lo transmite principalmente el <em>Aedes aegypti</em> (OMS).'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que registró<br/>el MSP.', items: [
    ['1997', 'año en que se volvió a detectar el <em>Aedes aegypti</em> en Uruguay. Se había declarado erradicado en 1958.', 'MSP, Boletín epidemiológico (2016)'],
    ['2016', 'primer brote de dengue autóctono en cien años: 19 casos, 18 en Montevideo, con epicentro en Pocitos.', 'MSP, Boletín epidemiológico (2016)'],
    ['2024', 'el 1 de marzo el MSP informó el primer contagio de dengue dentro del país en el año, en una persona que no había viajado.', 'Montevideo Portal, con datos del MSP (2024)'],
  ] },
  t2: { ey: 'Rutina de cada semana', h2: 'Tape, vacíe<br/>y limpie.', rows: [
    ['Recipientes con agua', 'Lo que se guarda o se llena solo.', ['Baldes y tanques bien tapados.', 'Bebederos de mascotas con agua cambiada seguido.']],
    ['Fondo, patio y azotea', 'Todo lo que junta lluvia.', ['Platos de macetas y floreros.', 'Cubiertas, botellas y latas.', 'Canaletas y desagües destapados.']],
    ['Cubrir, vaciar y limpiar', 'La recomendación de la OMS.', ['Cubrir, vaciar y limpiar los recipientes donde se guarda agua.']],
  ], nota: 'En 2018 el MSP lanzó la campaña «Activate contra el mosquito», que pide dar vuelta o vaciar lo que junta agua.' },
  src: [SRC.oms, SRC.msp2016, SRC.mspCriaderos, SRC.mspActivate, SRC.dengue2024],
  prompts: [
    ['Tengo muchos mosquitos', 'Tengo muchos mosquitos en casa y quiero saber de dónde vienen.'],
    ['Junto agua en el fondo', 'Tengo baldes, macetas o cubiertas en el fondo. ¿Cómo evito que se críe el mosquito?'],
    ['Es en mi negocio', 'Hay mosquitos en mi negocio y quiero una evaluación.'],
  ],
});

const ratas = pestPage('ratas-y-ratones', {
  description: 'Ratas y ratones en casas y comercios de Uruguay: señales, qué los atrae y cómo prevenirlos, con datos de las intendencias.',
  hero: { h1: 'Donde hay comida y refugio,<br/>aparecen.', p: 'Ratas y ratones buscan lo mismo: comida, agua y un lugar donde esconderse. En Punta del Este se esconden arriba de las palmeras y se los ve mucho por los restos de comida que dejan los restaurantes de noche, según la Intendencia de Maldonado (2025).' },
  t1: { ey: 'Las señales', h2: 'Lo que dejan<br/>a su paso.', rows: [
    ['Excrementos', 'Excrementos pequeños y oscuros, cerca de la comida, en los muebles de cocina o en los rincones.'],
    ['Roeduras', 'Marcas en bolsas, cables, madera y envases.'],
    ['Ruidos y caminos', 'Ruidos de noche en el cielorraso o en el entretecho, y manchas de grasa por donde pasan.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que contaron<br/>las intendencias.', items: [
    ['2025', 'la Intendencia de Maldonado describió como «complicado» el control de ratas en el Centro de Maldonado y en Punta del Este.', 'Montevideo Portal (15/10/2025)'],
    ['3', 'veces tuvo que intervenir la Intendencia de Montevideo en un cantero del Parque Rodó por roedores.', 'Montevideo Portal (27/01/2026)'],
    ['4', 'personas forman la cuadrilla de la Intendencia de Maldonado que combate ratas, pulgas, mosquitos y garrapatas, entre otras plagas.', 'Montevideo Portal (15/10/2025)'],
  ] },
  t2: { ey: 'Prevención', h2: 'Sin comida,<br/>sin refugio.', rows: [
    ['Comida', 'Lo que los atrae.', ['Alimentos y ración de mascotas en envases cerrados.', 'Bolsas de residuos cerradas hasta llevarlas al contenedor.']],
    ['Refugio', 'Donde se esconden.', ['Leña, escombros y cosas guardadas en el fondo.', 'Enredaderas y plantas pegadas a la pared.']],
    ['Entradas', 'Por dónde pasan.', ['Rejillas y desagües sin tapa.', 'Huecos en puertas, paredes y pasos de caños.']],
  ] },
  src: [SRC.maldonado2025, SRC.parqueRodo],
  prompts: [
    ['Escucho ruidos en el techo', 'Escucho ruidos en el techo o el entretecho de noche. ¿Pueden ser ratas?'],
    ['Vi excrementos en la cocina', 'Encontré excrementos de roedor en la cocina. ¿Qué hago?'],
    ['Es en mi negocio', 'Tengo ratas o ratones en mi negocio y quiero una evaluación.'],
  ],
});

const cucarachas = pestPage('cucarachas', {
  description: 'Cucaracha alemana y cucaracha americana en Uruguay: cómo reconocerlas, dónde se esconden y qué pide la norma a los comercios de alimentos.',
  hero: { h1: 'De noche, en la cocina<br/>y en los desagües.', p: 'Dos cucarachas aparecen seguido en las ciudades: la alemana, chica y de cocina, y la americana, grande y de desagües. En Montevideo, los comercios de alimentos deben tener un programa preventivo de plagas.' },
  t1: { ey: 'Cómo reconocerlas', h2: 'Chica o grande,<br/>cada una en su lugar.', rows: [
    ['Cucaracha alemana', 'Chica y de color marrón claro, con dos rayas oscuras detrás de la cabeza. Vive en la cocina: detrás de la heladera, en los muebles y cerca del calor de los motores.'],
    ['Cucaracha americana', 'Grande y rojiza. Sube desde desagües, cámaras y sótanos.'],
    ['La señal', 'Son de hábitos nocturnos: si ve una de día, puede haber muchas escondidas.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que pide<br/>la norma.', items: [
    ['En Montevideo,', 'las empresas alimentarias deben tener un programa de control preventivo de plagas, que se tramita ante el Servicio de Salubridad Pública.', 'Intendencia de Montevideo, trámites'],
    ['60', 'ingredientes activos de insecticidas tienen reportes de resistencia en la cucaracha alemana, según una revisión de 102 estudios en 23 países.', 'Revisión científica (2025)'],
    ['2024', 'una «invasión de cucarachas» en la Costa de Oro y Montevideo resultó ser de belostomátidos, según Alternatus Uruguay: no eran cucarachas. Identificar bien es el primer paso.', 'Montevideo Portal (2024)'],
  ] },
  t2: { ey: 'Prevención', h2: 'Sin agua, sin migas,<br/>sin escondites.', rows: [
    ['Cocina', 'Lo que las alimenta.', ['Migas y grasa limpias al final del día.', 'Residuos tapados y sacados todas las noches.']],
    ['Agua', 'Lo que más buscan.', ['Canillas que gotean y piletas húmedas.', 'Rejillas de desagüe con tapa.']],
    ['Escondites', 'Donde pasan el día.', ['Grietas en zócalos y azulejos.', 'Cajas de cartón acumuladas.']],
  ] },
  src: [SRC.imAlimentos, SRC.cucarachasMP, SRC.resistencia],
  prompts: [
    ['Vi cucarachas en la cocina', 'Vi cucarachas en la cocina. ¿Cómo las controlo?'],
    ['Salen del desagüe', 'Salen cucarachas grandes del desagüe. ¿Qué hago?'],
    ['Es en mi negocio', 'Tengo cucarachas en mi negocio y quiero una evaluación.'],
  ],
});

const hormigas = pestPage('hormigas', {
  description: 'Hormigas de la cocina y hormiga cortadora (Acromyrmex) en Uruguay: cómo distinguirlas y proteger la cocina, el jardín y la huerta.',
  hero: { h1: 'En la cocina o en el jardín,<br/>no son la misma hormiga.', p: 'En la cocina aparecen en fila; en el jardín, la hormiga cortadora (<em>Acromyrmex</em>) deja sin hojas los rosales y la huerta.' },
  t1: { ey: 'Cómo distinguirlas', h2: 'Dos hormigas,<br/>dos problemas.', rows: [
    ['Hormiga de la cocina', 'Chica, marrón, en filas largas.'],
    ['Hormiga cortadora', 'Corta hojas y las lleva al hormiguero, donde cultiva el hongo del que se alimenta.'],
    ['El hormiguero', 'El nido de las cortadoras está bajo tierra: el daño se ve en las plantas, a veces lejos del nido.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que dicen<br/>los investigadores.', items: [
    ['En Uruguay', 'hay entre 12 y 14 especies de hormigas cortadoras del género <em>Acromyrmex</em>: 12 según la cartilla del INIA (2014) y unas 14 según Martín Bollazzi, de la Facultad de Agronomía, en La Mañana (2023).', 'INIA, cartilla N.º 36 (2014) · La Mañana (2023)'],
    ['Jardín', '<em>Acromyrmex</em> es el género que más preocupa, porque causa problemas en jardines y campos, según Martín Bollazzi (Facultad de Agronomía, Udelar).', 'La Mañana (2023)'],
  ] },
  t2: { ey: 'Prevención', h2: 'Siga la fila<br/>hasta la entrada.', rows: [
    ['Cocina', 'Lo que las atrae.', ['Azúcar, miel y ración en envases cerrados.', 'Seguir la fila para encontrar por dónde entran.']],
    ['Jardín y huerta', 'Las señales de la cortadora.', ['Caminos de hojas cortadas en el pasto.', 'Montículos de tierra suelta.']],
    ['Entradas', 'Por donde pasan.', ['Grietas en zócalos y marcos.', 'Plantas que tocan la pared.']],
  ] },
  src: [SRC.inia, SRC.laManana],
  prompts: [
    ['Tengo hormigas en la cocina', 'Tengo hormigas en la cocina. ¿Cómo las controlo?'],
    ['Me cortan las plantas', 'Las hormigas me están cortando las plantas del jardín. ¿Qué hago?'],
    ['Es en mi negocio', 'Tengo hormigas en mi negocio y quiero una evaluación.'],
  ],
});

const termitas = pestPage('termitas', {
  description: 'La termita subterránea Reticulitermes en Uruguay: señales, qué se sabe en el país y cómo prevenir daños en la madera de su casa.',
  hero: { h1: 'Comen la madera<br/>desde adentro.', p: 'Según Constantino (2002), en Uruguay la termita plaga es la subterránea del género <em>Reticulitermes</em>, que llegó desde afuera. Lo importante es detectarla a tiempo en su casa.' },
  t1: { ey: 'Las señales', h2: 'Lo que hay<br/>que mirar.', rows: [
    ['Tubos de tierra', 'Caminos de barro entre el suelo y la madera: así llega la termita subterránea, según la Universidad de California (EE. UU.).'],
    ['Madera hueca', 'Marcos, zócalos o pisos que suenan a hueco o se hunden al apretarlos.'],
    ['Insectos con alas', 'Enjambres cerca de ventanas y luces. Según la Universidad de California (EE. UU.), verlos «no siempre significa» que la casa esté infestada.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que se sabe<br/>en el país.', items: [
    ['1', '<em>Reticulitermes</em> es la única termita plaga seria del país.', 'Constantino (2002), Journal of Applied Entomology'],
    ['2023', 'un estudio sobre su primer registro en Argentina menciona a <em>Reticulitermes flavipes</em> como ya establecida en Uruguay.', 'Carrijo y col. (2023), Journal of Economic Entomology'],
  ] },
  t2: { ey: 'Prevención', h2: 'Madera seca<br/>y lejos del suelo.', rows: [
    ['Madera y suelo', 'La puerta de entrada.', ['Madera que no toque la tierra.', 'Leña y restos de madera lejos de la casa.']],
    ['Humedad', 'Lo que la atrae.', ['Reparar pérdidas de agua y filtraciones.', 'Ventilar sótanos y espacios bajos.']],
    ['Antes de tratar', 'Lo que conviene hacer.', ['No usar productos a ciegas: según la Universidad de California (EE. UU.), los productos caseros «generalmente no son efectivos».', 'Fotografiar las señales y anotar dónde están.']],
  ] },
  src: [SRC.ucipm, SRC.constantino, SRC.carrijo],
  prompts: [
    ['Encontré tubos de barro', 'Encontré tubos de barro en una pared o en la madera. ¿Pueden ser termitas?'],
    ['La madera suena hueca', 'Un marco o un zócalo suena hueco. ¿Cómo confirmo si hay termitas?'],
    ['Vi insectos con alas', 'Vi muchos insectos con alas cerca de una ventana. ¿Son termitas?'],
  ],
});

const arana = pestPage('arana-de-los-rincones', {
  description: 'La araña de los rincones (Loxosceles laeta) en Uruguay: cómo reconocerla, dónde se esconde y qué hacer ante una picadura (CIAT 1722).',
  hero: { h1: 'Tranquila, escondida<br/>y peligrosa.', p: 'La araña de los rincones (<em>Loxosceles laeta</em>) vive en rincones oscuros, detrás de cuadros y muebles. Según un boletín del MSP de 2013, citado por Montevideo Portal (2022), es la de mayor importancia para la salud pública en Uruguay. Ante una picadura, llame al CIAT al 1722.' },
  t1: { ey: 'Cómo reconocerla', h2: 'Patas largas<br/>y un violín en el lomo.', rows: [
    ['Aspecto', 'Marrón, de patas largas y finas, con una mancha en forma de violín sobre el cuerpo. Por eso también le dicen «araña violinista».'],
    ['Dónde vive', 'Según Montevideo Portal, detrás de cuadros, en esquinas y en muebles de madera. La guía de Mendoza (Argentina) suma roperos, ropa poco usada y zapatos.'],
    ['La picadura', 'Su veneno es necrosante: puede dañar la piel y los tejidos. Ante la sospecha, llame al CIAT al 1722 o consulte a su prestador de salud.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que hay<br/>que saber.', items: [
    ['1722', 'es el teléfono del CIAT (Centro de Información y Asesoramiento Toxicológico) para consultar por una picadura.', 'Montevideo Portal (2022)'],
    ['El MSP', 'le asigna el primer lugar en importancia sanitaria entre las arañas del país.', 'Boletín del MSP (2013), citado por Montevideo Portal (2022)'],
  ] },
  t2: { ey: 'Prevención', h2: 'Mover, sacudir<br/>y revisar.', rows: [
    ['Ropa y calzado', 'Donde más se esconden.', ['Sacudir la ropa y el calzado antes de usarlos.', 'Revisar la ropa de cama guardada.']],
    ['Muebles y cuadros', 'Rincones sin luz.', ['Separar camas y muebles de la pared.', 'Limpiar detrás de cuadros y muebles.']],
    ['Placares y depósitos', 'Lugares tranquilos.', ['Ordenar cajas y ropa acumulada.', 'Aspirar rincones y grietas.']],
  ], nota: 'Estas recomendaciones siguen la guía del Ministerio de Salud de Mendoza (Argentina), que trabaja con la misma especie: por ejemplo, separar la cama unos 20 cm de la pared.' },
  src: [SRC.arana, SRC_BLOG.mendoza],
  prompts: [
    ['Vi una araña violinista', 'Creo que vi una araña de los rincones en casa. ¿Qué hago?'],
    ['Quiero revisar mi casa', 'Quiero revisar si hay arañas de los rincones en mi casa.'],
    ['Es en mi negocio', 'Vi arañas en mi negocio y quiero una evaluación.'],
  ],
});

// ---------------------------------------------------------------- SERVICES
const hogaresFaq = [
  ['¿Y si en casa hay niños o una mascota?', 'Avisanos cuando coordinemos la visita. Según el tratamiento, te decimos qué hacer con ellos y por cuánto tiempo, antes de empezar.'],
  ['¿Me tengo que ir de casa durante el servicio?', 'No siempre. Depende de lo que haya que aplicar y dónde. Si hace falta, te avisamos con tiempo y te explicamos cuándo podés volver.'],
  ['¿Alcanza con una sola visita?', 'Depende de la plaga y de cuánto tiempo lleva. Después de revisar tu casa te proponemos cuántas visitas hacen falta y cada cuánto.'],
  ['¿Cómo sé si llegan a mi barrio?', 'Escribile a Truly AI tu departamento, tu barrio o localidad y si es casa o apartamento. Te confirmamos si podemos ir y cómo coordinar.'],
];
// Recipe R17 (5-nov-2026): Hogares shows the globaltni page as it is (copy of the Venezuela reference, see below).
// Uruguay's own Hogares content is no longer shown; it stays here (unused) and in respaldos/2026-11-05-antes-receta-5nov/.
const hogaresPropio = {
  out: 'servicios/hogares/', template: 'servicios/hogares/', title: 'Control de plagas para hogares · Truly Nolen Uruguay', crumb: 'Hogares',
  description: 'Revisamos tu casa, apartamento o casa de balneario por dentro y por fuera: interior, perímetro, fondo y azotea. Control de plagas en Uruguay.',
  faq: hogaresFaq,
  main: [
    intro(['Servicios', 'Servicio residencial'], 'Servicio residencial'),
    leadPair({ h2: 'Tu casa, sin visitas que no invitaste.', img: `${A}/uy-hogares.webp`, alt: 'Cocina moderna de un apartamento en Montevideo con vista a la Rambla', paras: [
      'Vamos de la cocina a la azotea buscando por dónde entran las plagas y qué las hace quedarse. Te explicamos todo antes de tocar nada, pensando en tu familia y en tus mascotas.',
      '<p><strong>¿Para quién?</strong> Casas con fondo, apartamentos en edificio, casas de balneario y chacras, tengan plaga o quieran adelantarse.</p>',
      '<p><strong>¿Qué incluye?</strong> Recorremos adentro, el contorno de la casa y el fondo. Tratamos solo lo que hace falta y te dejamos por escrito cómo preparar el lugar.</p>',
      '<p><strong>¿Cómo sigue?</strong> Te damos consejos para cerrar los accesos y volvemos a revisar según lo que hayamos acordado.</p>',
    ], note: 'Antes de arrancar te mandamos una propuesta: qué vamos a hacer en tu casa, cuántas visitas y en qué condiciones.' }),
    flow('Cada rincón cuenta.', `<p>Adentro, el contorno y el fondo: una plaga casi nunca está en un solo lugar, por eso miramos las tres zonas juntas.</p><p class="s-zona s-zona-rojo"><strong>Interior.</strong> Lo que se usa todos los días. El mueble de la pileta y el hueco de la heladera · Baños, rejillas y manchas de humedad · Lo que viste, en qué lugar y a qué hora.</p><p class="s-zona s-zona-amarillo"><strong>Perímetro.</strong> La puerta de entrada de las plagas. Rendijas bajo puertas y ventanas · Agujeros donde pasan caños y cables · Cajas y trastos apoyados en la pared.</p><p class="s-zona s-zona-verde"><strong>Fondo, patio y azotea.</strong> Donde muchas veces empieza todo. Canteros, huerta y enredaderas · Baldes, macetas y cualquier cosa que junte agua · Pilas de leña, escombros y hojas.</p>`),
    preguntas(hogaresFaq),
    closing(),
  ].join('\n'),
};

const comerciosFaq = [
  ['¿Pueden venir fuera del horario de atención?', 'Los horarios se coordinan con el encargado según el rubro y el movimiento del local.'],
  ['¿El servicio me sirve para la habilitación?', 'El equipo te explica qué registros entrega el servicio. Los requisitos de habilitación los definen la Intendencia de tu departamento y el MSP.'],
  ['Tengo varias sucursales, ¿cómo se organiza?', 'Se acuerda el alcance de cada local en la propuesta, según su actividad y sus condiciones.'],
  ['¿Cómo sé si llegan a mi zona?', 'Decinos tu departamento, tu barrio o localidad y el tipo de local. Te confirmamos si podemos atenderte y cómo coordinar.'],
];
// Recipe R17 (5-nov-2026): Comercios shows the globaltni page as it is. Uruguay's own Comercios content, including the four
// globaltni sectors written on 4-nov, is no longer shown; it stays here (unused) and in respaldos/2026-11-05-antes-receta-5nov/.
const comerciosPropio = {
  out: 'servicios/comercios/', template: 'servicios/comercios/', title: 'Control de plagas para comercios · Truly Nolen Uruguay', crumb: 'Comercios',
  description: 'Control de plagas para almacenes, panaderías, parrilladas, rotiserías, farmacias y oficinas en Uruguay. Qué pide la norma en Montevideo.',
  faq: comerciosFaq,
  main: [
    ctPage({ crumb: 'Servicio comercial', kicker: 'Servicio comercial', h1: 'Tu negocio,<br/>protegido.', intro: 'Un programa que tiene en cuenta tu local, tus clientes y el ritmo de tu operación: almacenes, panaderías, parrilladas, rotiserías, farmacias y oficinas.', img: `${A}/uy-comercios.webp`, alt: 'Panadería y confitería moderna en Montevideo, con vitrinas de bizcochos y medialunas', navLabel: 'Encontrá tu sector', navIds: ['sector-salud', 'sector-industria', 'sector-alimentos', 'sector-logistica'], bands: [
      { id: 'servicio', kicker: 'El servicio', h2: 'Control para tu negocio.', html: '<p><strong>¿Qué incluye?</strong> Inspección de las áreas de trabajo y del depósito, control según el rubro y coordinación de horarios y accesos con el encargado.</p><p><strong>¿Cómo sigue?</strong> Registro de hallazgos y recomendaciones. Si tenés varias sucursales, se acuerda el alcance de cada una.</p><p>Antes de empezar recibís una propuesta con el alcance y las condiciones para tu negocio.</p>',
        aside: { h3: '¿Quién se beneficia?', items: ['Almacenes y autoservicios', 'Panaderías y confiterías', 'Rotiserías, parrilladas y restaurantes', 'Farmacias y policlínicas', 'Oficinas'] } },
      { id: 'sector-salud', kicker: 'Salud', h2: 'El cuidado empieza con la prevención.', html: '<p>Quienes dirigen residenciales de larga estadía, centros de emergencia y centros de rehabilitación física o mental tienen que sostener el nivel más alto de higiene mientras atienden a personas vulnerables.</p><p>El Truly Elite Protection System (TEPS) se desarrolló para instalaciones de salud, donde el servicio tiene que ir más allá del control: prevenir y minimizar el riesgo de plagas y de contaminación química.</p><p>Cada servicio se puede auditar y deja la documentación que piden las normas del sector y los protocolos más exigentes.</p><p><a class="text-link" href="${GT}/services/teps/" target="_blank" rel="noopener noreferrer">Conocé el programa TEPS&nbsp;→</a></p>',
        aside: { h3: '¿Quién se beneficia?', items: ['Laboratorios de diagnóstico', 'Hospitales y sanatorios', 'Residenciales de larga estadía', 'Centros de emergencia', 'Centros de rehabilitación', 'Consultorios médicos', 'Centros de atención y tratamiento de pacientes', 'Depósitos de insumos médicos'] } },
      { id: 'sector-industria', kicker: 'Industrias', h2: 'Protección en cada operación.', html: '<p>En plantas, laboratorios y depósitos, TEPS suma prevención y baja la posibilidad de actividad de plagas o de contaminación química en la producción.</p><p>Es un servicio auditable de punta a punta: los registros quedan listos para lo que exija cada cliente.</p><p><a class="text-link" href="${U}/servicios/industria/">Ver el servicio para industrias&nbsp;→</a></p>',
        aside: { h3: '¿Quién se beneficia?', items: ['Plantas de procesamiento de alimentos', 'Almacenamiento y distribución de alimentos', 'Envasado y reenvasado de alimentos', 'Proveedores de la industria alimentaria', 'Laboratorios farmacéuticos', 'Catering', 'Hoteles', 'Hospitales', 'Cadenas de comida rápida', 'Supermercados', 'Archivo de documentos', 'Otras industrias'] } },
      { id: 'sector-alimentos', kicker: 'Venta de alimentos', h2: 'Cuidar donde se encuentran personas y alimentos.', html: '<p>Los locales que venden alimentos están entre los más difíciles al planificar higiene y manejo de plagas: tienen que entregar productos seguros en un lugar limpio y libre de plagas.</p><p>Para supermercados, panaderías y restaurantes, TEPS va más allá de una aplicación puntual y pone el foco en anticiparse a la plaga.</p><p>Las visitas quedan registradas y sirven para una inspección o para la auditoría de tu propia cadena.</p>',
        aside: { h3: '¿Quién se beneficia?', items: ['Supermercados', 'Hipermercados', 'Centros de distribución', 'Locales de comida rápida', 'Restaurantes', 'Panaderías y confiterías'] } },
      { id: 'sector-logistica', kicker: 'Logística', h2: 'Los productos viajan. La protección los acompaña.', html: '<p>Para toda empresa que mueve mercadería todos los días: si exportás, importás o trasladás productos de un lugar a otro, Truly Nolen International trabaja para que la carga no se contamine con plagas.</p><p>En depósitos, terminales y flotas, TEPS prioriza la prevención antes que la reacción.</p><p>Cada intervención deja constancia escrita, con el detalle que piden tus clientes y los estándares del rubro.</p>',
        aside: { h3: '¿Quién se beneficia?', items: ['Empresas de transporte', 'Agentes de carga', 'Transportistas', 'Operadores logísticos', 'Parques logísticos', 'Logística de abastecimiento', 'Logística de producto', 'Logística de ventas'] } },
      { id: 'rubros', kicker: 'Cada rubro', h2: 'Cada punto del proceso.', html: '<p>Cada rubro tiene sus puntos críticos. La inspección los reconoce y define qué hace falta en cada uno.</p>' + rowsProse([
        ['Panaderías y confiterías', 'Recepción, elaboración, depósito y mostrador son una sola operación.', null, 'sector-panaderias'],
        ['Parrilladas y restaurantes', 'Cocina, parrilla y salón.'],
        ['Almacenes y autoservicios', 'Mercadería que entra y sale todos los días.', null, 'sector-almacenes'],
        ['Farmacias, policlínicas y oficinas', 'Espacios con público y protocolos de higiene.', null, 'sector-farmacias'],
      ]), aside: { h3: 'Qué revisamos', items: ['Bolsas de harina y depósitos', 'Hornos, mesadas y zonas calientes', 'Leña y carbón guardados', 'Cámaras de frío y desagües de cocina', 'Depósito y góndolas', 'Zona de residuos y contenedores', 'Archivos, cocinas y áreas de descanso'] } },
      { id: 'norma', kicker: 'La norma', h2: 'Si vendés alimentos, la norma lo pide.', html: rowsProse([
        ['Programa preventivo', 'En Montevideo, las empresas alimentarias deben tener un programa de control preventivo de plagas ante el Servicio de Salubridad Pública.'],
        ['Registros', 'El programa preventivo de Montevideo tiene que dejar anotado el control que se hizo, quién lo hizo y las medidas correctivas.'],
        ['Guía oficial', 'El portal gub.uy tiene una guía oficial para que las empresas alimentarias armen su Plan de Control de Plagas.'],
        ['Empresa habilitada', 'En Montevideo, las empresas de control de plagas deben registrarse en el Servicio de Salubridad Pública y estar habilitadas por el MSP.'],
      ]) + '<p>Los requisitos pueden cambiar según el departamento. Consultá los de la Intendencia que corresponde a tu local.</p>' },
      { id: 'salud', kicker: 'La salud', h2: 'En un negocio de alimentos, una plaga es un riesgo de salud.', html: rowsProse([
        ['Roedores y leptospirosis', 'Un seguimiento de diez años, publicado en 2012, describió la leptospirosis humana en Uruguay como un problema de salud no resuelto.'],
        ['Las lluvias', 'En 2025 el MSP informó una muerte por leptospirosis en Montevideo. La nota explica, con datos de la OPS, que el riesgo sube después de los días de lluvia.'],
        ['Insecticidas que no alcanzan', 'Una revisión de 102 estudios en 23 países encontró reportes de resistencia a 60 ingredientes activos en la cucaracha alemana (2025): aplicar siempre el mismo producto no basta, hay que encontrar dónde se esconde la plaga.'],
      ]), aside: { h3: 'Las plagas que más afectan a un negocio', items: [`<a href="${U}/plagas/cucarachas/">${PESTS['cucarachas'].name}</a>`, `<a href="${U}/plagas/ratas-y-ratones/">${PESTS['ratas-y-ratones'].name}</a>`, `<a href="${U}/plagas/mosquitos/">${PESTS['mosquitos'].name}</a>`] } },
      { id: 'otros', kicker: 'Otros rubros', h2: 'Cada industria merece atención.', html: '<p>Si tu actividad no está en estos sectores, no te preocupes: Truly Nolen International también tiene clientes en turismo, educación, fabricación, catering y mucho más. Contanos qué hacés y te orientamos.</p>',
        aside: { h3: 'Más formas de proteger tu mundo', items: [`<a href="${U}/servicios/hogares/">Servicio para hogares</a>`, `<a href="${GT}/services/sanitization/" target="_blank" rel="noopener noreferrer">Sanitización</a>`, `<a href="${GT}/services/teps/" target="_blank" rel="noopener noreferrer">Programa TEPS</a>`] } },
    ] }),
    flow('Qué conviene contarnos.', rowsProse([
      ['Tu negocio', 'Contanos el rubro, el tamaño del local y si tenés depósito.'],
      ['Tus horarios', 'Decinos cuándo abrís y cerrás, y en qué horario conviene la visita.'],
      ['Lo que ves', 'Describí las señales, dónde aparecen y desde cuándo.'],
    ])),
    preguntas(comerciosFaq),
    sFuentes([SRC.gtComercial, SRC.imAlimentos, SRC.imRegistro, SRC.mspEmpresas, SRC.guiaPlan, SRC.resistencia, SRC.leptoSeguimiento, SRC.leptoLluvia]),
    closing(),
  ].join('\n'),
};

const industriaFaq = [
  ['¿Trabajan con registros para auditorías?', 'El programa incluye registros de hallazgos y recomendaciones. Cuéntenos qué auditorías tiene que cumplir y el equipo le explica cómo se documenta.'],
  ['¿Atienden palomas?', 'Cuéntenos el caso: también se evalúan. Como referencia, la Intendencia de Montevideo usó cetrería contra las palomas en el Centro y la Ciudad Vieja (El Observador, 2012).'],
  ['¿Con una visita alcanza?', 'En una planta, el control es un programa con monitoreo y seguimiento. El alcance se define después de la evaluación.'],
  ['¿Llegan a mi departamento?', 'Indíquenos el departamento, la localidad y el tipo de instalación. Le confirmaremos si podemos atenderle y cómo coordinar.'],
];
const industria = {
  out: 'servicios/industria/', template: 'servicios/industria/', title: 'Control de plagas para la industria · Truly Nolen Uruguay', crumb: 'Industria',
  description: 'Manejo integrado de plagas para frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística en Uruguay.',
  faq: industriaFaq,
  // Design review (5-nov-2026): the h1 like Comercios and the other inner pages (measured on the globaltni copy of Comercios:
  // MachoteDisplay 900, 43 px up to 960, 48.128 px from 961, 67.68 px from 1200; line-height 1.05; letter-spacing -0.012em).
  css: 'html body.country-site[data-oficina][data-oficina] main h1#ct-title{font-family:MachoteDisplay,Machote,Arial,sans-serif!important;font-weight:900!important;font-size:43px!important;line-height:1.05!important;letter-spacing:-.012em!important}@media (min-width:961px){html body.country-site[data-oficina][data-oficina] main h1#ct-title{font-size:48.128px!important}}@media (min-width:1200px){html body.country-site[data-oficina][data-oficina] main h1#ct-title{font-size:67.68px!important}}',
  main: [
    ctPage({ crumb: 'Servicio industrial', kicker: 'Servicio industrial', h1: 'Control de plagas<br/>para su industria.', intro: 'Un programa que parte de conocer su operación, de la recepción al despacho: frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística.', img: `${A}/uy-industria.webp`, alt: 'Planta láctea moderna en Uruguay, con el campo verde detrás de los ventanales', navLabel: 'Elija el tema', bands: [
      { id: 'servicio', kicker: 'El servicio', h2: 'Manejo integrado de plagas.', html: rowsProse([
        ['Diagnóstico', 'Recorrida de la planta, el perímetro y los depósitos para entender qué favorece a cada plaga.'],
        ['Programa', 'Monitoreo con estaciones numeradas, control según su actividad y registro de cada visita para sus auditorías.'],
        ['Seguimiento', 'Informes de hallazgos, tendencias por zona y medidas correctivas, con visitas según el programa acordado.'],
      ]) + '<p>Antes de empezar, usted recibe una propuesta con el alcance, la frecuencia y los registros para su planta.</p>',
        aside: { h3: '¿Quién se beneficia?', items: ['Frigoríficos', 'Lácteas', 'Molinos y acopio de granos', 'Celulosa', 'Puertos y logística'] } },
      { id: 'pais', kicker: 'El país', h2: 'Lo que exporta el país.', html: datoProse([
        ['2.444', 'millones de dólares exportó la carne bovina de enero a noviembre de 2025, más que cualquier otro rubro.', 'El Observador (2025)'],
        ['2.103', 'millones de dólares exportó la celulosa en el mismo período.', ''],
        ['848', 'millones de dólares exportaron los lácteos en esos meses.', ''],
      ]) },
      { id: 'planta', kicker: 'La planta', h2: 'De la recepción al despacho.', html: rowsProse([
        ['Recepción', 'Donde entra la materia prima.'],
        ['Proceso', 'Donde se trabaja el producto.'],
        ['Depósito y silos', 'Donde se guarda.'],
        ['Despacho y perímetro', 'Lo que rodea la planta.'],
      ]), aside: { h3: 'Qué revisamos', items: ['Andenes, puertas de carga y camiones', 'Equipos, desagües y zonas húmedas', 'Áreas con restos de producto', 'Granos, bolsas y palés', 'Grietas y acumulación de polvo', 'Residuos, pastizales y cercos'] } },
      { id: 'por-que', kicker: 'Por qué', h2: 'Por qué fumigar no basta.', html: rowsProse([
        ['Resistencia', 'Una revisión de 102 estudios en 23 países reporta cucarachas alemanas resistentes a 60 ingredientes activos, sobre todo piretroides y organofosforados.'],
        ['Registros', 'En Montevideo, el programa preventivo de una empresa alimentaria tiene que dejar anotado el control, quién lo hizo y las medidas correctivas.'],
        ['Lluvias', 'En 2025 el MSP informó una muerte por leptospirosis en Montevideo; según la OPS, citada en la nota, el riesgo sube después de los días de lluvia.'],
      ]), aside: { h3: 'Plagas que vigilamos en la industria', items: [`<a href="${U}/plagas/ratas-y-ratones/">${PESTS['ratas-y-ratones'].name}</a>`, `<a href="${U}/plagas/cucarachas/">${PESTS['cucarachas'].name}</a>`, `<a href="${U}/plagas/hormigas/">${PESTS['hormigas'].name}</a>`] } },
    ] }),
    flow('Qué conviene contarnos.', rowsProse([
      ['Su planta', 'Rubro, superficie y cantidad de edificios.'],
      ['Sus auditorías', 'Cuéntenos qué normas o auditorías tiene que cumplir.'],
      ['Lo que ve', 'Dónde aparecen las señales y desde cuándo.'],
    ])),
    preguntas(industriaFaq),
    sFuentes([SRC.exportaciones, SRC.palomas, SRC.resistencia, SRC.imAlimentos, SRC.leptoLluvia]),
    closing(),
  ].join('\n'),
};

// The globaltni copies (R17): the Venezuela reference <main> with its links moved to Uruguay and Uruguay's closing.
const hogares = {
  out: 'servicios/hogares/', template: 'servicios/hogares/', copy: true, replace: [], crumb: 'Hogares',
  title: 'Control de plagas para hogares · Truly Nolen Uruguay',
  description: 'Programa residencial de Truly Nolen en Uruguay: su casa completa en tres zonas de protección. Escríbale a Truly AI.',
};
const comercios = {
  out: 'servicios/comercios/', template: 'servicios/comercios/', copy: true, replace: [], crumb: 'Comercios',
  title: 'Control de plagas para comercios · Truly Nolen Uruguay',
  description: 'Servicio comercial de Truly Nolen en Uruguay: salud, industrias, venta de alimentos y logística, con el sistema TEPS.',
  // Shared text decisions (5-nov-2026): «Campos de la logística» is a label of globaltni, not a sector. It is hidden, not
  // removed, so the :nth-of-type measuring rules of the copy keep counting the same elements.
  css: 'html body.country-site[data-oficina] main li[data-source-facility="3-4"]{display:none!important}',
};
export const SIN_USO = { hogaresPropio, comerciosPropio };

// ---------------------------------------------------------------- BLOG
const POSTS = POSTS_UY;
const card = (p, featured = false) => `<article class="blog-card${featured ? ' blog-featured' : ''}"><a href="${U}/blog/${p.slug}/" tabindex="-1" aria-hidden="true"><img src="${p.img}" alt="" loading="lazy"/></a><div><p class="eyebrow">${p.tag} · <time datetime="2026-10-31">31 de octubre de 2026</time></p><h2><a href="${U}/blog/${p.slug}/">${p.title}</a></h2><p>${p.lead}</p><a class="text-link" href="${U}/blog/${p.slug}/">Leer el artículo →</a></div></article>`;

const blog = {
  out: 'blog/', template: 'blog/', title: 'Blog de control de plagas · Truly Nolen Uruguay', crumb: 'Blog',
  description: 'Guías sobre plagas de Uruguay: la araña de los rincones, la hormiga cortadora y más, con cada dato respaldado por su fuente abierta.',
  main: [
    // 5-nov-2026: same markup as the Venezuela blog index (journal list of globaltni) and its closing band
    `<section class="wrap journal-wrap"><nav aria-label="Ruta"><a href="${U}/">Inicio</a><span aria-hidden="true">/</span>Blog de control de plagas</nav><header class="journal-heading"><h1>Blog de control de plagas</h1><p class="s-prose">Guías sobre las plagas de Uruguay, con cada dato respaldado por su fuente.</p></header></section>`,
    `<section class="wrap journal-wrap"><div class="journal-stories">${POSTS.map((p, i) => `<article class="journal-story"><div class="story-edition"><span>${String(i + 1).padStart(2, '0')}</span><time datetime="2026-10-31">31 de octubre de 2026</time><span class="story-topic">${p.tag}</span></div><div class="story-copy"><h2><a href="${U}/blog/${p.slug}/">${p.title}</a></h2><p>${p.resumen || p.lead}</p><a class="text-link" href="${U}/blog/${p.slug}/">Leer el artículo <span aria-hidden="true">→</span></a></div><a class="story-image-link" href="${U}/blog/${p.slug}/" tabindex="-1" aria-hidden="true"><figure class="story-image"><img src="${p.img}" alt="" loading="lazy"/></figure></a></article>`).join('')}</div></section>`,
    contactBand(),
  ].join('\n'),
};

function article(post, { body, faq, src, prompts, related }) {
  return {
    out: `blog/${post.slug}/`, template: 'blog/como-eliminar-el-comejen/', title: `${post.title} · Truly Nolen Uruguay`, description: post.desc || post.lead,
    crumb: post.tag, crumbParent: ['Blog', `${U}/blog/`], faq, article: post,
    main: (() => {
      const { html, index } = articleParts(body);
      return [
        intro([`<a href="${U}/blog/">Blog</a>`, post.tag], post.title, `<figure class="s-figure"><img src="${post.img}" alt="${post.alt}"/><figcaption>${post.cap || post.alt}</figcaption></figure>`),
        `<section class="wrap s-section s-prose"><p class="s-note">Truly Nolen Uruguay · 31 de octubre de 2026 · 5 min de lectura</p><p class="s-entrada">${post.lead}</p></section>`,
        index,
        `<section class="wrap s-section s-article"><div class="article-body">${html}${articleFaq(faq)}</div></section>`,
        sFuentes(src, 'De dónde sale esta información'),
        `<section class="wrap closeout-blog-next"><div><p class="closeout-blog-eyebrow">Seguir leyendo</p><h2>${related.title}</h2><a class="text-link" href="${U}/blog/${related.slug}/">Leer el artículo →</a></div><a class="text-link" href="${U}/blog/">Ver todos los artículos →</a></section>`,
        closing(),
      ].join('\n');
    })(),
  };
}

const postDe = (i) => { const p = POSTS[i], k = CUERPOS[p.slug];
  return article(p, { body: k.body, faq: k.faq, src: k.src.map((x) => SRC_BLOG[x]), prompts: k.prompts, related: POSTS[1 - i] }); };
const postTermitas = postDe(0);
const postMosquito = postDe(1);

// ---------------------------------------------------------------- LEGAL
function legal(out, crumb, h1, html) {
  return {
    out, template: 'privacidad/', title: `${crumb} · Truly Nolen Uruguay`, crumb,
    description: `${crumb} del sitio de Truly Nolen Uruguay.`,
    main: [intro([crumb], h1), `<section class="wrap s-section s-prose">${html}</section>`, closing()].join('\n'),
  };
}

const privacidad = legal('privacidad/', 'Privacidad', 'Privacidad',
  '<p>Lo que escriba en el chat de este sitio o por WhatsApp lo recibe y responde Truly AI, el asistente de Truly Nolen International. Úselo para su consulta sobre control de plagas y no comparta datos sensibles, como contraseñas, datos bancarios o información médica.</p>');

const terminos = legal('terminos/', 'Términos de uso', 'Términos de uso',
  '<p>Este sitio informa sobre control de plagas en Uruguay. Las guías tienen información general con sus fuentes y no reemplazan la evaluación de un técnico.</p><p>Ante una picadura o una posible intoxicación, llame al CIAT (Centro de Información y Asesoramiento Toxicológico) al 1722 o consulte a su prestador de salud.</p><p>Las respuestas de Truly AI son orientativas. El alcance, las condiciones y el costo de cada servicio se confirman en la propuesta.</p>');

const accesibilidad = legal('accesibilidad/', 'Accesibilidad', 'Accesibilidad',
  '<p>Queremos que este sitio se pueda usar con teclado, con lector de pantalla y en cualquier tamaño de pantalla. Las imágenes que transmiten información tienen su descripción.</p><p>Si encuentra una barrera, cuéntenos dónde por el chat o por WhatsApp y la revisamos.</p>');

const CREDITS = [
  ['Teatro Solís, Montevideo (foto real usada como referencia del lugar de la portada)', 'Ypsilon (Finlandia)', 'CC0 (dominio público)', 'https://creativecommons.org/publicdomain/zero/1.0/', 'https://commons.wikimedia.org/wiki/File:Teatro_Solis_Montevideo_2.JPG'],
  ['Rata noruega, <em>Rattus norvegicus</em>', 'Лариса Артемьева', 'CC0 (dominio público)', 'https://creativecommons.org/publicdomain/zero/1.0/', 'https://commons.wikimedia.org/wiki/File:Rattus_norvegicus_-_%D0%9B%D0%B0%D1%80%D0%B8%D1%81%D0%B0_%D0%90%D1%80%D1%82%D0%B5%D0%BC%D1%8C%D0%B5%D0%B2%D0%B0_-_601255327.jpeg'],
  ['Termita subterránea, <em>Reticulitermes flavipes</em> (soldados)', 'Departamento de Agricultura de EE. UU. (USDA ARS), imagen K8085-6', 'Dominio público', '', 'https://commons.wikimedia.org/wiki/File:Reticulitermes_flavipes_K8085-6.jpg'],
  ['Hormigas cortadoras <em>Atta cephalotes</em> llevando hojas, zoológico de Bristol (también portada del artículo del blog)', 'Adrian Pingstone', 'Dominio público', '', 'https://commons.wikimedia.org/wiki/File:Leaf_cutter_ants_arp.jpg'],
  ['Araña de los rincones, <em>Loxosceles laeta</em> (también portada del artículo del blog)', 'Mampato', 'Dominio público', '', 'https://commons.wikimedia.org/wiki/File:Loxosceles_laeta.jpg'],
];
const creditos = legal('creditos/', 'Créditos de imágenes', 'Créditos de imágenes',
  `<p>Las fotos reales de este sitio que no son de Truly Nolen vienen de Wikimedia Commons, en dominio público o CC0.</p><ul>${CREDITS.map(([t, a, l, lu, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>, por ${a}. ${lu ? `<a href="${lu}" target="_blank" rel="noopener noreferrer">${l}</a>` : l}.</li>`).join('')}</ul><p>Las fotos del mosquito y de la cucaracha americana son fotos de Truly Nolen, las mismas que usan los otros sitios de oficina. Las de la cucaracha alemana y la hormiga argentina son las fotos de identificación de Truly Nolen International en globaltni.com.</p><p>La portada usa como referencia esa foto real del Teatro Solís: el auto oficial se ubicó frente al teatro con IA (Gemini). La foto del técnico de la portada y la planta de la página de industria son imágenes generadas con IA (Gemini). El diagrama de las tres zonas, la ilustración del pie, el sello TEPS y las fotos de la página de comercios son piezas oficiales de Truly Nolen International.</p>`);

export const PAGES = [home, mosquitos, ratas, cucarachas, hormigas, termitas, arana, hogares, comercios, industria, blog, postTermitas, postMosquito, privacidad, terminos, accesibilidad, creditos];
