import {
  U, A, PESTS, PEST_ORDER, pestGrid, detailHero, tabla, dato, cols, faqSection, fuentes,
  servicesCards, contacto, DEFAULT_PROMPTS, GENERAL_FAQ, SRC,
} from './helpers.mjs';
import { POSTS_UY, CUERPOS, SRC_BLOG } from './blog-uy.mjs';
import {
  flat, intro, leadPair, flow, rowsProse, datoProse, pestLinks, serviceLinks, preguntas, sFuentes, closing,
  pestMaster, articleParts, articleFaq, ctPage,
} from './master.mjs';

const arrow = '<span aria-hidden="true">→</span>';

// ---------------------------------------------------------------- HOME
// Corporate sections of the master (globaltni.com/es, read 3-nov-2026), in its order:
// sanitization -> TEPS -> international network -> history. No franchise block: an office does not sell
// franchises (recipe, round 9). Texts adapted to Uruguayan voseo; links go to the master's own pages.
const GT = 'https://globaltni.com/es';
const ext = (href, label) => `<a class="g-link" href="${href}" target="_blank" rel="noopener noreferrer">${label}${arrow}</a>`;
// Same markup and classes as the master (globaltni.com/es) and the Argentina office draft: sanitization, teps,
// network, history and a short sources list. Split in two because the master puts 'Cómo trabajamos' between TEPS and the network.
const blank = 'target="_blank" rel="noopener noreferrer"';
const CORP_A = `<section class="sanitization wrap" id="sanitizacion"><div class="sanitization-copy"><span>Virus, hongos y bacterias</span><h2>Sanitización de ambientes interiores.</h2><p>La sanitización reúne estrategias para prevenir y controlar la contaminación por virus, hongos y bacterias, según el tipo de ambiente interior.</p><a class="button button-line" href="${GT}/services/sanitization/" ${blank}>Conocé el servicio de sanitización →</a></div><div class="sanitization-visual"><h3>Un protocolo según el ambiente.</h3><p>Entrevista e identificación del entorno. Selección de producto, aplicación y tiempo de contacto. Medidas de prevención y control para cada instalación.</p></div></section>
<section class="teps wrap" id="teps"><div class="teps-intro"><img class="teps-seal" src="${A}/teps-sello.webp" width="900" height="900" alt="" decoding="async" loading="lazy"><div class="teps-heading"><span>Truly Elite Protection System</span><h2>TEPS: un programa con seguimiento.</h2></div><div class="teps-description"><p>Inspección, plan de control, registro de cada visita y revisión de tendencias. Un programa de Manejo Integrado de Plagas con trazabilidad y estándares auditados.</p><a class="button" href="${GT}/services/teps/" ${blank}>Conocé el sistema TEPS&nbsp;→</a></div></div><ol class="teps-flow"><li><span>01</span><h3>Inspeccionar</h3><strong>Evaluamos la instalación y su entorno</strong><p>Identificamos actividad de plagas, puntos de acceso, condiciones favorables y prácticas operativas para determinar las necesidades del programa.</p></li><li><span>02</span><h3>Desarrollar el programa</h3><strong>Un plan específico para la instalación</strong><p>El entorno, la estacionalidad, la actividad observada, las prácticas de operación y las plagas identificadas determinan el programa.</p></li><li><span>03</span><h3>Registrar cada visita</h3><strong>El trabajo queda documentado</strong><p>Después de cada servicio, el técnico registra las actividades realizadas y los hallazgos identificados en la instalación.</p></li><li><span>04</span><h3>Revisar las tendencias</h3><strong>Informes mensuales y recomendaciones</strong><p>Los datos registrados sobre la actividad de plagas permiten analizar tendencias y dar seguimiento a las acciones.</p></li></ol><details class="program-overview"><summary><span>Formación, supervisión y respuesta durante el programa</span><span aria-hidden="true">+</span></summary><div class="program-items"><div><h3>Capacitación personalizada</h3><p>Formación para clientes y empleados, con el respaldo del equipo técnico internacional.</p></div><div><h3>Centro de formación virtual</h3><p>Capacitación a distancia para profundizar en los conocimientos del programa y sus protocolos.</p></div><div><h3>Supervisión de calidad</h3><p>Informe de auditoría y lista de verificación específica para el tipo de establecimiento, con un indicador de rendimiento.</p></div><div><h3>Educación para el cliente</h3><p>Formación sobre manejo integrado de plagas, biología, ecología, aspectos regulatorios y soporte de auditoría.</p></div><div><h3>Protocolos específicos</h3><p>Programas personalizados para las necesidades de cada cliente, especialmente instalaciones auditadas.</p></div><div><h3>Respuesta y seguimiento</h3><p>Se definen umbrales de acción con la administración. Si se superan, se aplica un protocolo de escalamiento hasta establecer el control.</p></div></div></details></section>`;
const CORP_B = `<section class="network" id="oficinas"><div class="wrap network-layout"><div><span>Una red internacional</span><h2>Una red internacional. Atención en tu país.</h2><p>Buscá tu país en el directorio internacional. La oficina que atiende tu zona te ayuda a conocer el servicio y el programa adecuado para tu espacio. En Uruguay te atiende Truly AI.</p><div class="network-actions"><a class="button" href="${GT}/offices/" ${blank}>Abrir el directorio de oficinas →</a><a class="text-link" href="${GT}/contact/#formulario" ${blank}>Escribinos desde el formulario de contacto →</a></div><p class="network-brands">La confianza de marcas reconocidas en todo el mundo.</p><p class="network-note">Trabajamos con hogares y empresas a través de nuestra red internacional de oficinas.</p></div><div><h3>Conectá con una oficina local.</h3><p>Accesos a sitios locales del directorio internacional.</p><div class="network-links"><div><h4>Américas</h4><ul><li><a href="http://www.trulynolenargentina.com.ar" ${blank}>Argentina ↗</a></li><li><a href="https://www.trulynolen.com.br" ${blank}>Brasil ↗</a></li></ul></div><div><h4>Europa</h4><ul><li><a href="https://www.trulyespana.com/" ${blank}>España ↗</a></li><li><a href="https://www.trulynolen.fr/" ${blank}>Francia ↗</a></li></ul></div><div><h4>Asia</h4><ul><li><a href="https://trulynolenindia.com/" ${blank}>India ↗</a></li><li><a href="https://www.trulynolen.com.ph/" ${blank}>Filipinas ↗</a></li></ul></div></div><a class="text-link" href="${GT}/offices/" ${blank}>Ver todos los países y contactos →</a><div class="network-stats"><p>Alcance internacional</p><div><div><strong>65+</strong><span>países</span></div><div><strong>300+</strong><span>oficinas</span></div><div><strong>6</strong><span>continentes</span></div></div></div></div></div></section>
<section class="history" id="historia"><div class="wrap history-layout"><div><span>Más de 80 años de experiencia</span><h2>Prevenir las plagas. Una idea desde 1938.</h2><p>En 1938, Truly Wheatfield Nolen propuso proteger los edificios sellando las entradas de los roedores. La prevención estaba en el origen.</p><p>Hoy, esa visión se expresa en formación, métodos de control y protocolos diseñados para reducir el impacto en el entorno.</p><div class="history-links"><a class="text-link" href="${GT}/company/story/" ${blank}>Nuestra historia hasta ahora →</a><a class="text-link" href="${GT}/company/team/" ${blank}>Conocé a nuestro equipo →</a></div></div><div class="history-visual"><a class="history-car-link" href="${GT}/company/story/" ${blank}><img src="${A}/carro-truly.png" width="600" height="386" alt="El auto amarillo con orejas de ratón de Truly Nolen" loading="lazy"/></a><ol class="history-timeline"><li><strong>1938</strong><p>Una idea centrada en la prevención.</p></li><li><strong>1987</strong><p>La visión llega a Argentina.</p></li><li><strong>1989</strong><p>Nace Truly Nolen International.</p></li></ol></div></div></section>`;

const homeFaq = GENERAL_FAQ;
const home = {
  out: '', template: '', title: 'Truly Nolen Uruguay | Control de plagas',
  description: 'Control de plagas en Uruguay para hogares, comercios e industrias. Escribile a Truly AI y te orientamos en el siguiente paso.',
  faq: homeFaq,
  main: `<section class="cinema" id="inicio"><div class="film"><picture><source media="(max-width:760px)" srcset="${A}/uruguay-movil.webp?v=6"/><img src="${A}/uruguay-desktop.webp?v=8" alt="Auto amarillo de Truly Nolen andando frente al Teatro Solís de Montevideo al atardecer"/></picture><video data-src-movil="${A}/uruguay-movil.mp4?v=6" muted loop playsinline preload="none" aria-hidden="true" data-src="${A}/uruguay-desktop.mp4?v=9"></video></div><div class="hero-text"><p class="eyebrow">Truly Nolen · <span data-preview-office>Uruguay</span></p><h1>Tu mundo. Protegido.</h1><p>Prevención y atención para que vivas tranquilo en tu casa.</p><a class="button" href="#contacto">Hablemos <span class="office-mark" aria-hidden="true"></span></a><span class="hero-premium">Servicio premium · Visión internacional</span></div><div class="hero-routes"><a href="#residencial">Tu hogar <span aria-hidden="true">↓</span></a><a href="#comercial">Tu negocio <span aria-hidden="true">↓</span></a><a href="#metodo">Cómo trabajamos <span aria-hidden="true">↓</span></a></div></section><script src="/oficinas/assets/video-movil.js"></script>
<section id="nosotros" class="g-cifras" aria-label="Truly Nolen en el mundo"><div class="g-cifras-in"><div><b>65</b> <span>países</span><small>presencia internacional</small></div><div><b>300+</b> <span>oficinas</span><small>en el mundo</small></div><div><b>80+</b> <span>años</span><small>de experiencia</small></div><div class="g-cifra-carro"><img src="${A}/carro-truly.png" alt="" width="100" height="65"/><span>El auto con orejas de ratón<small>así nos reconocen en la calle</small></span></div></div><p class="g-cifras-fuente">Cifras de Truly Nolen International (globaltni.com, 2026).</p></section>
<section id="servicios" class="section g g-programa"><header class="g-cab"><p class="g-ey">Truly Nolen · Uruguay</p><h2>Un programa para tu espacio.</h2><p class="g-intro">De la inspección de una vivienda a los registros de una instalación auditada. Elegí el servicio que necesitás conocer.</p></header>
<div class="service-index"><a href="#teps"><span>Monitoreo y control auditado</span><strong>TEPS</strong><span aria-hidden="true">↓</span><small>Estándares globales, seguimiento y reportes.</small><i aria-hidden="true" class="service-icon"><img alt="" decoding="async" height="900" loading="lazy" src="${A}/teps-sello.webp" width="900"/></i></a><a href="#comercial"><span>Programas según tu sector y actividad.</span><strong>Comercial</strong><span aria-hidden="true">↓</span><i aria-hidden="true" class="service-icon"><svg viewBox="0 0 24 24"><path d="M4 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15"/><path d="M12 21V11h7a1 1 0 0 1 1 1v9"/><path d="M3 21h18"/><path d="M7 9h2M7 13h2M7 17h2M15 15h2M15 18h2"/></svg></i></a><a href="#residencial"><span>Inspección y cuidado en tres zonas.</span><strong>Residencial</strong><span aria-hidden="true">↓</span><i aria-hidden="true" class="service-icon"><svg viewBox="0 0 24 24"><path d="M4 11.5 12 4.5l8 7"/><path d="M6 10.5V20h12v-9.5"/><path d="M10 20v-5h4v5"/></svg></i></a><a href="#sanitizacion"><span>Control microbiano en interiores.</span><strong>Sanitización</strong><span aria-hidden="true">↓</span><i aria-hidden="true" class="service-icon"><svg viewBox="0 0 24 24"><rect height="11" rx="2" width="7" x="9" y="10"/><path d="M11 10V6h3"/><path d="M14 6h-3"/><path d="M8 5H6M8 7.5H5.5M8 10H6"/></svg></i></a></div></section>
<section id="residencial" class="section g g-zonas"><div class="g-zonas-grid"><figure class="g-zonas-fig"><img src="${A}/uruguay-casa-zonas.webp?v=3" alt="Casa moderna en Punta del Este vista desde arriba: el interior en rojo, el perímetro en amarillo y el jardín en verde, con sus etiquetas" loading="lazy"/></figure><div><header class="g-cab"><p class="g-ey">Protocolo de las Tres Zonas</p><h2>Cada rincón<br/>cuenta.</h2><p class="g-intro">En cada visita revisamos tres zonas: adentro, el perímetro y el jardín.</p></header><ul class="g-zonas-lista"><li class="g-z-rojo"><h3>Interior</h3><p>Cocina, baños y donde guardás la comida.</p></li><li class="g-z-amarillo"><h3>Perímetro</h3><p>Puertas, ventanas, rejillas y grietas: por donde entran.</p></li><li class="g-z-verde"><h3>Patio y jardín</h3><p>Macetas, canteros, la azotea y lo de afuera que atrae plagas.</p></li></ul><a class="g-link" href="${U}/servicios/hogares/">Conocé el servicio para hogares${arrow}</a></div></div></section>
<section id="comercial" class="section g g-comercial"><header class="g-cab"><p class="g-ey">Comercio e industria</p><h2>Control de plagas para tu negocio.</h2><p class="g-intro">Almacenes, panaderías, parrilladas, plantas y depósitos: cada actividad tiene sus puntos críticos.</p></header><div class="g-com-grid"><a class="g-com-foto" href="${U}/servicios/comercios/"><img src="${A}/uy-operacion.webp?v=2" alt="Técnica fumigando los zócalos de un depósito (imagen ilustrativa)" loading="lazy"/><span><b>La prevención es parte de tu operación.</b><em>Conocé el servicio para comercios&nbsp;→</em></span></a><div class="g-sectores">
<a class="g-sector" href="${U}/servicios/comercios/"><span><h3>Almacenes y autoservicios</h3><p>Mercadería que entra y sale todos los días: depósito, góndolas y zona de residuos.</p></span>${arrow}</a>
<a class="g-sector" href="${U}/servicios/comercios/"><span><h3>Panaderías y restaurantes</h3><p>Recepción, elaboración, depósito y salón: bolsas de harina, hornos, parrilla y desagües de cocina.</p></span>${arrow}</a>
<a class="g-sector" href="${U}/servicios/comercios/"><span><h3>Farmacias, policlínicas y oficinas</h3><p>Espacios con público y protocolos de higiene: depósitos, archivos y cocinas del personal.</p></span>${arrow}</a>
<a class="g-sector" href="${U}/servicios/industria/"><span><h3>Industria</h3><p>Frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística.</p></span>${arrow}</a>
</div></div></section>
${CORP_A}
<section id="metodo" class="section g g-metodo"><header class="g-cab"><p class="g-ey">Cómo trabajamos</p><h2>Cuatro pasos, de la consulta<br/>al seguimiento.</h2></header><div class="g-cols g-cols-4"><article><span class="g-n">01</span><h3>Nos contás</h3><p>Decinos qué viste, dónde y desde cuándo.</p></article><article><span class="g-n">02</span><h3>Revisamos</h3><p>Buscamos qué le da agua, comida y refugio a la plaga.</p></article><article><span class="g-n">03</span><h3>Te explicamos</h3><p>Antes de empezar sabés qué vamos a hacer y cómo preparar el lugar.</p></article><article><span class="g-n">04</span><h3>Volvemos</h3><p>Después volvemos a revisar lo que haga falta.</p></article></div></section>
${CORP_B}
${pestGrid({ ey: 'Guía de plagas', h2: 'Reconocé la plaga.<br/>Entendé sus hábitos.', intro: 'Seis plagas que conviene conocer en Uruguay. Cada guía explica las señales y qué hacer, con sus fuentes.' })}
<section class="section g g-ayuda"><header class="g-cab"><p class="g-ey">Blog y preguntas</p><h2>Lo que conviene saber<br/>de las plagas de acá.</h2><p class="g-intro">Consejos para prevenir plagas y cómo trabajamos.</p></header><div class="g-ayuda-grid"><div class="g-blog-doble"><article class="g-blog"><div class="g-blog-top"><img src="${POSTS_UY[0].img}" alt="" loading="lazy"/><p class="g-ey">Del blog</p></div><h3><a href="${U}/blog/${POSTS_UY[0].slug}/">${POSTS_UY[0].title}</a></h3><p>${POSTS_UY[0].lead}</p><a class="g-link" href="${U}/blog/${POSTS_UY[0].slug}/">Leer el artículo${arrow}</a></article><a class="g-link g-link-2" href="${U}/blog/">Ver todo el blog${arrow}</a></div><div class="g-faq" id="preguntas"><h3>Lo que más nos preguntan.</h3>${homeFaq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></div></section>
${sFuentes([SRC.msp2016, SRC.maldonado2025, SRC.imAlimentos, SRC.inia, SRC.laManana, SRC.constantino, SRC.arana, ['Truly Nolen International. Sanitización de ambientes interiores', `${GT}/#sanitizacion`], ['Truly Nolen International. TEPS: un programa con seguimiento', `${GT}/#teps`], ['Truly Nolen International. Una red internacional', `${GT}/#oficinas`], ['Truly Nolen International. Prevenir las plagas: una idea desde 1938', `${GT}/#nosotros`]])}
${contacto(DEFAULT_PROMPTS, { zona: true })}`,
};

// ---------------------------------------------------------------- PESTS
const SVC = {
  mosquitos: 'Revisemos dónde<br/>se está criando.',
  'ratas-y-ratones': 'Cerremos el paso<br/>por donde entran.',
  cucarachas: 'Encontremos dónde<br/>se esconden.',
  hormigas: 'Sigamos la fila<br/>hasta el nido.',
  termitas: 'Revisemos la madera<br/>de tu casa.',
  'arana-de-los-rincones': 'Revisemos los rincones<br/>de tu casa.',
};
// Master layout (globaltni pest guide): masthead, families, index and prose sections. No FAQ block,
// so no FAQ structured data either (Google only accepts FAQ markup for visible questions).
// Species shown in each guide's photo block (the page's own photo)
// One card per species, as the master (/en/pests/cockroaches/): photo box, h3 and its text.
// rows = indexes of the guide's first-table rows that describe that species; the rest go after the cards.
const SPECIES = {
  mosquitos: [{ name: 'Aedes aegypti', rows: [0, 1, 2] }],
  'ratas-y-ratones': [{ name: 'Rata noruega', rows: [0, 1, 2] }],
  cucarachas: [
    { name: 'Cucaracha alemana', img: `${A}/uy-plaga-cucaracha-alemana-truly.webp`, alt: 'Cucaracha alemana, foto de identificación de Truly Nolen International', rows: [0] },
    { name: 'Cucaracha americana', rows: [1] },
  ],
  hormigas: [
    { name: 'Hormiga de la cocina', img: `${A}/uy-plaga-hormiga-argentina-truly.webp`, alt: 'Hormiga de la cocina, foto de identificación de Truly Nolen International', rows: [0] },
    { name: 'Hormiga cortadora', rows: [1, 2] },
  ],
  termitas: [{ name: 'Termita subterránea', rows: [0, 1, 2] }],
  'arana-de-los-rincones': [{ name: 'Loxosceles laeta', rows: [0, 1, 2] }],
};
function speciesCards(slug, rows) {
  const p = PESTS[slug];
  const used = new Set();
  const cards = SPECIES[slug].map((c) => {
    c.rows.forEach((i) => used.add(i));
    const text = c.rows.length === 1 ? `<p>${rows[c.rows[0]][1]}</p>` : rowsProse(c.rows.map((i) => rows[i]));
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
    out: `plagas/${slug}/`, template: 'plagas/zancudos/', title: `${p.name} en Uruguay · Truly Nolen`, description, crumb: p.name,
    main: [pestMaster(slug, { lead: hero.p, sections }), sFuentes(src), closing()].join('\n'),
  };
}

const mosquitos = pestPage('mosquitos', {
  description: 'El mosquito Aedes aegypti transmite el dengue y se cría en el agua quieta de casa. Señales, datos del MSP y cómo prevenirlo en Uruguay.',
  hero: { h1: 'El criadero está más cerca<br/>de lo que pensás.', p: 'El mosquito Aedes aegypti transmite el dengue y se cría en el agua quieta: baldes, platos de macetas y bebederos. Según una lista de verificación del MSP (sin fecha), dos de cada tres criaderos están en las casas.' },
  t1: { ey: 'Dónde se cría', h2: 'Donde queda agua quieta.', rows: [
    ['Agua en casa', 'Baldes, floreros, platos de macetas y bebederos de mascotas: cualquier recipiente con agua quieta puede ser un criadero.'],
    ['Fondo y azotea', 'Cubiertas viejas, canaletas tapadas, juguetes y botellas que juntan agua de lluvia.'],
    ['El dengue', 'Lo transmite principalmente el Aedes aegypti (OMS).'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que registró<br/>el MSP.', items: [
    ['1997', 'año en que se volvió a detectar el Aedes aegypti en Uruguay. Se había declarado erradicado en 1958.', 'MSP, Boletín epidemiológico (2016)'],
    ['2016', 'primer brote de dengue autóctono en 100 años: 19 casos, 18 en Montevideo, con epicentro en Pocitos.', 'MSP, Boletín epidemiológico (2016)'],
    ['2024', 'el 1 de marzo el MSP informó el primer contagio de dengue dentro del país en el año, en una persona que no había viajado.', 'Montevideo Portal, con datos del MSP (2024)'],
  ] },
  t2: { ey: 'Rutina de cada semana', h2: 'Tapá, vaciá<br/>y limpiá.', rows: [
    ['Recipientes con agua', 'Lo que guardás o se llena solo.', ['Baldes y tanques bien tapados.', 'Bebederos de mascotas con agua cambiada seguido.']],
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
  description: 'Ratas y ratones en casas y comercios de Uruguay: señales, qué las atrae y cómo prevenirlas, con datos de las intendencias.',
  hero: { h1: 'Donde hay comida y refugio,<br/>aparecen.', p: 'Ratas y ratones buscan lo mismo: comida, agua y un lugar donde esconderse. En Punta del Este se esconden arriba de las palmeras y se las ve mucho por los restos de comida que dejan los restaurantes de noche, según la Intendencia de Maldonado (2025).' },
  t1: { ey: 'Las señales', h2: 'Lo que dejan<br/>a su paso.', rows: [
    ['Excrementos', 'Pequeños y oscuros, cerca de la comida, en los muebles de cocina o en los rincones.'],
    ['Roeduras', 'Marcas en bolsas, cables, madera y envases.'],
    ['Ruidos y caminos', 'Ruidos de noche en el cielorraso o en el entretecho, y manchas de grasa por donde pasan.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que contaron<br/>las intendencias.', items: [
    ['2025', 'la Intendencia de Maldonado describió como «complicado» el control de ratas en el Centro de Maldonado y en Punta del Este.', 'Montevideo Portal (15/10/2025)'],
    ['3', 'veces tuvo que intervenir la Intendencia de Montevideo en un cantero del Parque Rodó por roedores.', 'Montevideo Portal (27/01/2026)'],
    ['4', 'personas forman la cuadrilla de la Intendencia de Maldonado que combate ratas, pulgas, mosquitos y garrapatas, entre otras plagas.', 'Montevideo Portal (15/10/2025)'],
  ] },
  t2: { ey: 'Prevención', h2: 'Sin comida,<br/>sin refugio.', rows: [
    ['Comida', 'Lo que las atrae.', ['Alimentos y ración de mascotas en envases cerrados.', 'Bolsas de residuos cerradas hasta llevarlas al contenedor.']],
    ['Refugio', 'Donde se esconden.', ['Leña, escombros y cosas guardadas en el fondo.', 'Enredaderas y plantas pegadas a la pared.']],
    ['Entradas', 'Por donde entran.', ['Rejillas y desagües sin tapa.', 'Huecos en puertas, paredes y pasos de caños.']],
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
    ['Cucaracha alemana', 'Chica y marrón clara, con dos rayas oscuras detrás de la cabeza. Vive en la cocina: detrás de la heladera, en los muebles y cerca del calor de los motores.'],
    ['Cucaracha americana', 'Grande y rojiza. Sube desde desagües, cámaras y sótanos.'],
    ['La señal', 'Son de hábitos nocturnos: si ves una de día, puede haber muchas escondidas.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que pide<br/>la norma.', items: [
    ['En Montevideo', 'las empresas alimentarias deben tener un programa de control preventivo de plagas, que se tramita ante el Servicio de Salubridad Pública.', 'Intendencia de Montevideo, trámites'],
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
  hero: { h1: 'En la cocina o en el jardín,<br/>no son la misma hormiga.', p: 'En la cocina aparecen en fila; en el jardín, la hormiga cortadora (Acromyrmex) deja sin hojas los rosales y la huerta.' },
  t1: { ey: 'Cómo distinguirlas', h2: 'Dos hormigas,<br/>dos problemas.', rows: [
    ['Hormiga de la cocina', 'Chica, marrón, en filas largas.'],
    ['Hormiga cortadora', 'Corta hojas y las lleva al hormiguero, donde cultiva el hongo del que se alimenta.'],
    ['El hormiguero', 'El nido de las cortadoras está bajo tierra: el daño se ve en las plantas, a veces lejos del nido.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que dicen<br/>los investigadores.', items: [
    ['12-14', 'especies de hormigas cortadoras del género Acromyrmex hay en Uruguay: 12 según la cartilla del INIA (2014) y unas 14 según Martín Bollazzi, de la Facultad de Agronomía, en La Mañana (2023).', 'INIA, cartilla N.º 36 (2014) · La Mañana (2023)'],
    ['Jardín', 'Acromyrmex es el género que más preocupa, porque causa problemas en jardines y campos, según Martín Bollazzi (Facultad de Agronomía, UdelaR).', 'La Mañana (2023)'],
  ] },
  t2: { ey: 'Prevención', h2: 'Seguí la fila<br/>hasta la entrada.', rows: [
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
  description: 'La termita subterránea Reticulitermes en Uruguay: señales, qué se sabe en el país y cómo prevenir daños en la madera de tu casa.',
  hero: { h1: 'Comen la madera<br/>desde adentro.', p: 'Según Constantino (2002), en Uruguay la termita plaga es la subterránea del género Reticulitermes, que llegó desde afuera. Lo importante es detectarla a tiempo en tu casa.' },
  t1: { ey: 'Las señales', h2: 'Lo que hay<br/>que mirar.', rows: [
    ['Tubos de tierra', 'Caminos de barro entre el suelo y la madera: así llega la termita subterránea, según la Universidad de California (EE. UU.).'],
    ['Madera hueca', 'Marcos, zócalos o pisos que suenan huecos o se hunden al apretarlos.'],
    ['Insectos con alas', 'Enjambres cerca de ventanas y luces. Según la Universidad de California (EE. UU.), verlos «no siempre significa» que la casa esté infestada.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que se sabe<br/>en el país.', items: [
    ['1', 'Reticulitermes es la única termita plaga seria del país.', 'Constantino (2002), Journal of Applied Entomology'],
    ['2023', 'Un estudio de 2023 sobre su primer registro en Argentina menciona a Reticulitermes flavipes como ya establecida en Uruguay.', 'Carrijo y col. (2023), Journal of Economic Entomology'],
  ] },
  t2: { ey: 'Prevención', h2: 'Madera seca<br/>y lejos del suelo.', rows: [
    ['Madera y suelo', 'La puerta de entrada.', ['Madera que no toque la tierra.', 'Leña y restos de madera lejos de la casa.']],
    ['Humedad', 'Lo que la atrae.', ['Reparar pérdidas de agua y filtraciones.', 'Ventilar sótanos y espacios bajos.']],
    ['Antes de tratar', 'Lo que conviene hacer.', ['No usar productos a ciegas: según la Universidad de California (EE. UU.), los caseros «generalmente no son efectivos».', 'Fotografiar las señales y anotar dónde están.']],
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
  hero: { h1: 'Tranquila, escondida<br/>y peligrosa.', p: 'La araña de los rincones (Loxosceles laeta) vive en rincones oscuros, detrás de cuadros y muebles. Según un boletín del MSP de 2013, citado por Montevideo Portal (2022), es la de mayor importancia para la salud pública en Uruguay. Ante una picadura, llamá al CIAT: 1722.' },
  t1: { ey: 'Cómo reconocerla', h2: 'Patas largas<br/>y un violín en el lomo.', rows: [
    ['Aspecto', 'Marrón, de patas largas y finas, con una mancha en forma de violín sobre el cuerpo. Por eso también le dicen «araña violinista».'],
    ['Dónde vive', 'Según Montevideo Portal, detrás de cuadros, en esquinas y en muebles de madera. La guía de Mendoza (Argentina) suma roperos, ropa poco usada y zapatos.'],
    ['La picadura', 'Su veneno es necrosante: puede dañar la piel y los tejidos. Ante la sospecha, llamá al CIAT (1722) o consultá a tu prestador de salud.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que hay<br/>que saber.', items: [
    ['1722', 'es el teléfono del CIAT (Centro de Información y Asesoramiento Toxicológico) para consultar por una picadura.', 'Montevideo Portal (2022)'],
    ['MSP', 'le asigna el primer lugar en importancia sanitaria entre las arañas del país.', 'Boletín del MSP (2013), citado por Montevideo Portal (2022)'],
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
const hogares = {
  out: 'servicios/hogares/', template: 'servicios/hogares/', title: 'Control de plagas para hogares en Uruguay · Truly Nolen', crumb: 'Hogares',
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
const comercios = {
  out: 'servicios/comercios/', template: 'servicios/comercios/', title: 'Control de plagas para comercios en Uruguay · Truly Nolen', crumb: 'Comercios',
  description: 'Control de plagas para almacenes, panaderías, parrilladas, rotiserías, farmacias y oficinas en Uruguay. Qué pide la norma en Montevideo.',
  faq: comerciosFaq,
  main: [
    ctPage({ crumb: 'Servicio comercial', kicker: 'Servicio comercial', h1: 'Tu negocio,<br/>protegido.', intro: 'Un programa que tiene en cuenta tu local, a tus clientes y el ritmo de tu operación: almacenes, panaderías, parrilladas, rotiserías, farmacias y oficinas.', img: `${A}/uy-comercios.webp`, alt: 'Panadería y confitería moderna en Montevideo, con vitrinas de bizcochos y medialunas', navLabel: 'Elegí el tema', bands: [
      { id: 'servicio', kicker: 'El servicio', h2: 'Control para tu negocio.', html: '<p><strong>¿Qué incluye?</strong> Inspección de las áreas de trabajo y del depósito, control según el rubro y coordinación de horarios y accesos con el encargado.</p><p><strong>¿Cómo sigue?</strong> Registro de hallazgos y recomendaciones. Si tenés varias sucursales, se acuerda el alcance de cada una.</p><p>Antes de empezar recibís una propuesta con el alcance y las condiciones para tu negocio.</p>',
        aside: { h3: '¿Quién se beneficia?', items: ['Almacenes y autoservicios', 'Panaderías y confiterías', 'Rotiserías, parrilladas y restaurantes', 'Farmacias y policlínicas', 'Oficinas'] } },
      { id: 'rubros', kicker: 'Cada rubro', h2: 'Cada punto del proceso.', html: '<p>Cada rubro tiene sus puntos críticos. La inspección los reconoce y define qué hace falta en cada uno.</p>' + rowsProse([
        ['Panaderías y confiterías', 'Recepción, elaboración, depósito y mostrador son una sola operación.'],
        ['Parrilladas y restaurantes', 'Cocina, parrilla y salón.'],
        ['Almacenes y autoservicios', 'Mercadería que entra y sale todos los días.'],
        ['Farmacias, policlínicas y oficinas', 'Espacios con público y protocolos de higiene.'],
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
    ] }),
    flow('Qué conviene contarnos.', rowsProse([
      ['Tu negocio', 'Contanos el rubro, el tamaño del local y si tenés depósito.'],
      ['Tus horarios', 'Decinos cuándo abrís y cerrás, y en qué horario conviene la visita.'],
      ['Lo que ves', 'Describí las señales, dónde aparecen y desde cuándo.'],
    ])),
    preguntas(comerciosFaq),
    sFuentes([SRC.imAlimentos, SRC.imRegistro, SRC.mspEmpresas, SRC.guiaPlan, SRC.resistencia, SRC.leptoSeguimiento, SRC.leptoLluvia]),
    closing(),
  ].join('\n'),
};

const industriaFaq = [
  ['¿Trabajan con registros para auditorías?', 'El programa incluye registros de hallazgos y recomendaciones. Contanos qué auditorías tenés que cumplir y el equipo te explica cómo se documenta.'],
  ['¿Atienden palomas?', 'Contanos el caso: también se evalúan. Como referencia, la Intendencia de Montevideo usó cetrería contra las palomas en el Centro y la Ciudad Vieja (El Observador, 2012).'],
  ['¿Con una visita alcanza?', 'En una planta, el control es un programa con monitoreo y seguimiento. El alcance se define después de la evaluación.'],
  ['¿Llegan a mi departamento?', 'Decinos el departamento, la localidad y el tipo de instalación. Te confirmamos si podemos atenderte y cómo coordinar.'],
];
const industria = {
  out: 'servicios/industria/', template: 'servicios/industria/', title: 'Control de plagas para la industria en Uruguay · Truly Nolen', crumb: 'Industria',
  description: 'Manejo integrado de plagas para frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística en Uruguay.',
  faq: industriaFaq,
  main: [
    ctPage({ crumb: 'Servicio industrial', kicker: 'Servicio industrial', h1: 'Control de plagas<br/>para tu industria.', intro: 'Un programa que parte de conocer tu operación, de la recepción al despacho: frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística.', img: `${A}/uy-industria.webp`, alt: 'Planta láctea moderna en Uruguay, con el campo verde detrás de los ventanales', navLabel: 'Elegí el tema', bands: [
      { id: 'servicio', kicker: 'El servicio', h2: 'Manejo integrado de plagas.', html: rowsProse([
        ['Diagnóstico', 'Recorrida de la planta, el perímetro y los depósitos para entender qué favorece a cada plaga.'],
        ['Programa', 'Monitoreo con estaciones numeradas, control según tu actividad y registro de cada visita para tus auditorías.'],
        ['Seguimiento', 'Informes de hallazgos, tendencias por zona y medidas correctivas, con visitas según el programa acordado.'],
      ]) + '<p>Antes de empezar recibís una propuesta con el alcance, la frecuencia y los registros para tu planta.</p>',
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
      ]), aside: { h3: 'Qué revisamos', items: ['Andenes, puertas de carga y camiones', 'Equipos, desagües y zonas húmedas', 'Áreas con restos de producto', 'Granos, bolsas y pallets', 'Grietas y acumulación de polvo', 'Residuos, pastizales y cercos'] } },
      { id: 'por-que', kicker: 'Por qué', h2: 'Por qué fumigar no basta.', html: rowsProse([
        ['Resistencia', 'Una revisión de 102 estudios en 23 países reporta cucarachas alemanas resistentes a 60 ingredientes activos, sobre todo piretroides y organofosforados.'],
        ['Registros', 'En Montevideo, el programa preventivo de una empresa alimentaria tiene que dejar anotado el control, quién lo hizo y las medidas correctivas.'],
        ['Lluvias', 'En 2025 el MSP informó una muerte por leptospirosis en Montevideo; según la OPS, citada en la nota, el riesgo sube después de los días de lluvia.'],
      ]), aside: { h3: 'Plagas que vigilamos en la industria', items: [`<a href="${U}/plagas/ratas-y-ratones/">${PESTS['ratas-y-ratones'].name}</a>`, `<a href="${U}/plagas/cucarachas/">${PESTS['cucarachas'].name}</a>`, `<a href="${U}/plagas/hormigas/">${PESTS['hormigas'].name}</a>`] } },
    ] }),
    flow('Qué conviene contarnos.', rowsProse([
      ['Tu planta', 'Rubro, superficie y cantidad de edificios.'],
      ['Tus auditorías', 'Contanos qué normas o auditorías tenés que cumplir.'],
      ['Lo que ves', 'Dónde aparecen las señales y desde cuándo.'],
    ])),
    preguntas(industriaFaq),
    sFuentes([SRC.exportaciones, SRC.palomas, SRC.resistencia, SRC.imAlimentos, SRC.leptoLluvia]),
    closing(),
  ].join('\n'),
};

// ---------------------------------------------------------------- BLOG
const POSTS = POSTS_UY;
const card = (p, featured = false) => `<article class="blog-card${featured ? ' blog-featured' : ''}"><a href="${U}/blog/${p.slug}/" tabindex="-1" aria-hidden="true"><img src="${p.img}" alt="" loading="lazy"/></a><div><p class="eyebrow">${p.tag} · <time datetime="2026-10-31">31 de octubre de 2026</time></p><h2><a href="${U}/blog/${p.slug}/">${p.title}</a></h2><p>${p.lead}</p><a class="text-link" href="${U}/blog/${p.slug}/">Leer el artículo →</a></div></article>`;

const blog = {
  out: 'blog/', template: 'blog/', title: 'Blog de control de plagas en Uruguay · Truly Nolen', crumb: 'Blog',
  description: 'Guías sobre plagas de Uruguay: la araña de los rincones, la hormiga cortadora y más, con cada dato respaldado por su fuente abierta.',
  main: [
    `<section class="wrap journal-wrap"><nav class="journal-breadcrumb" aria-label="Ruta"><a href="${U}/">Inicio</a><span aria-hidden="true">/</span><span>Blog</span></nav><header class="journal-heading"><h1>Blog</h1><p class="s-prose">Guías sobre las plagas de acá, con cada dato respaldado por su fuente.</p></header></section>`,
    `<section class="wrap journal-wrap"><div class="journal-stories">${POSTS.map((p, i) => `<article class="journal-story"><div class="story-edition"><span>${String(i + 1).padStart(2, '0')}</span><time datetime="2026-10-31">31 de octubre de 2026</time><span>${p.tag}</span></div><div class="story-copy"><h2><a href="${U}/blog/${p.slug}/">${p.title}</a></h2><p>${p.lead}</p><a class="text-link" href="${U}/blog/${p.slug}/" aria-label="Leer: ${p.title}">Leer el artículo</a></div><a class="story-image-link" href="${U}/blog/${p.slug}/" tabindex="-1" aria-hidden="true"><figure class="story-image"><img src="${p.img}" alt="" loading="lazy"/></figure></a></article>`).join('')}</div></section>`,
    closing(),
  ].join('\n'),
};

function article(post, { body, faq, src, prompts, related }) {
  return {
    out: `blog/${post.slug}/`, template: 'blog/como-eliminar-el-comejen/', title: `${post.title} · Truly Nolen Uruguay`, description: post.desc || post.lead,
    crumb: post.tag, crumbParent: ['Blog', `${U}/blog/`], faq, article: post,
    main: (() => {
      const { html, index } = articleParts(body);
      return [
        intro([`<a href="${U}/blog/">Blog</a>`, post.tag], post.title, `<figure class="s-figure"><img src="${post.img}" alt="${post.alt}"/><figcaption>${post.alt}</figcaption></figure>`),
        `<section class="wrap s-section s-prose"><p class="s-note">Truly Nolen Uruguay · 31 de octubre de 2026 · 5 min de lectura</p><p class="s-entrada">${post.lead}</p></section>`,
        index,
        `<section class="wrap s-section s-article"><div class="article-body">${html}${articleFaq(faq)}</div></section>`,
        sFuentes(src),
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
  '<p>Lo que escribas en el chat de este sitio o por WhatsApp lo recibe y responde Truly AI, el asistente de Truly Nolen International. Usalo para tu consulta sobre control de plagas y no compartas datos sensibles, como contraseñas, datos bancarios o información médica.</p>');

const terminos = legal('terminos/', 'Términos de uso', 'Términos de uso',
  '<p>Este sitio informa sobre control de plagas en Uruguay. Las guías tienen información general con sus fuentes y no reemplazan la evaluación de un técnico.</p><p>Ante una picadura o una posible intoxicación, llamá al CIAT (Centro de Información y Asesoramiento Toxicológico) al 1722 o consultá a tu prestador de salud.</p><p>Las respuestas de Truly AI son orientativas. El alcance, las condiciones y el costo de cada servicio se confirman en la propuesta.</p>');

const accesibilidad = legal('accesibilidad/', 'Accesibilidad', 'Accesibilidad',
  '<p>Queremos que este sitio se pueda usar con teclado, con lector de pantalla y en cualquier tamaño de pantalla. Las imágenes que transmiten información tienen su descripción.</p><p>Si encontrás una barrera, contanos dónde por el chat o por WhatsApp y la revisamos.</p>');

const CREDITS = [
  ['Teatro Solís, Montevideo (foto real usada como referencia del lugar de la portada)', 'Ypsilon from Finland', 'CC0 (dominio público)', 'https://creativecommons.org/publicdomain/zero/1.0/', 'https://commons.wikimedia.org/wiki/File:Teatro_Solis_Montevideo_2.JPG'],
  ['Rata noruega, Rattus norvegicus', 'Лариса Артемьева', 'CC0 (dominio público)', 'https://creativecommons.org/publicdomain/zero/1.0/', 'https://commons.wikimedia.org/wiki/File:Rattus_norvegicus_-_%D0%9B%D0%B0%D1%80%D0%B8%D1%81%D0%B0_%D0%90%D1%80%D1%82%D0%B5%D0%BC%D1%8C%D0%B5%D0%B2%D0%B0_-_601255327.jpeg'],
  ['Termita subterránea, Reticulitermes flavipes (soldados)', 'Departamento de Agricultura de EE. UU. (USDA ARS), imagen K8085-6', 'Dominio público', '', 'https://commons.wikimedia.org/wiki/File:Reticulitermes_flavipes_K8085-6.jpg'],
  ['Hormigas cortadoras Atta cephalotes llevando hojas, zoológico de Bristol (también portada del artículo del blog)', 'Adrian Pingstone', 'Dominio público', '', 'https://commons.wikimedia.org/wiki/File:Leaf_cutter_ants_arp.jpg'],
  ['Araña de los rincones, Loxosceles laeta (también portada del artículo del blog)', 'Mampato', 'Dominio público', '', 'https://commons.wikimedia.org/wiki/File:Loxosceles_laeta.jpg'],
];
const creditos = legal('creditos/', 'Créditos de imágenes', 'Créditos de imágenes',
  `<p>Las fotos reales de este sitio que no son de Truly Nolen vienen de Wikimedia Commons, en dominio público o CC0.</p><ul>${CREDITS.map(([t, a, l, lu, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>, por ${a}. ${lu ? `<a href="${lu}" target="_blank" rel="noopener noreferrer">${l}</a>` : l}.</li>`).join('')}</ul><p>Las fotos del mosquito y de la cucaracha americana son fotos de Truly Nolen, las mismas que usan los otros sitios de oficina. Las de la cucaracha alemana y la hormiga argentina son las fotos de identificación de Truly Nolen International en globaltni.com.</p><p>La portada usa como referencia esa foto real del Teatro Solís: el auto oficial se ubicó frente al teatro con IA (Gemini). La casa de las tres zonas, los espacios de hogares, comercios e industria, la foto de la técnica y la acuarela del pie son imágenes generadas con IA (Gemini) para este borrador.</p>`);

export const PAGES = [home, mosquitos, ratas, cucarachas, hormigas, termitas, arana, hogares, comercios, industria, blog, postTermitas, postMosquito, privacidad, terminos, accesibilidad, creditos];
