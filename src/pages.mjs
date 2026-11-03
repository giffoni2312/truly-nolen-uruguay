import {
  U, A, PESTS, PEST_ORDER, pestGrid, detailHero, tabla, dato, cols, faqSection, fuentes,
  servicesCards, contacto, DEFAULT_PROMPTS, GENERAL_FAQ, SRC,
} from './helpers.mjs';
import { POSTS_UY, CUERPOS, SRC_BLOG } from './blog-uy.mjs';

const arrow = '<span aria-hidden="true">→</span>';

// ---------------------------------------------------------------- HOME
const homeFaq = GENERAL_FAQ;
const home = {
  out: '', template: '', title: 'Truly Nolen Uruguay | Control de plagas',
  description: 'Control de plagas en Uruguay para hogares, comercios e industrias. Escribile a Truly AI y te orientamos en el siguiente paso.',
  faq: homeFaq,
  main: `<section class="cinema" id="inicio"><div class="film"><picture><source media="(max-width:760px)" srcset="${A}/uruguay-movil.webp?v=6"/><img src="${A}/uruguay-desktop.webp?v=5" alt="Carro amarillo de Truly Nolen frente al Teatro Solís de Montevideo al atardecer"/></picture><video data-src-movil="${A}/uruguay-movil.mp4?v=6" muted loop playsinline preload="none" aria-hidden="true" data-src="${A}/uruguay-desktop.mp4?v=5"></video></div><div class="hero-text"><p class="eyebrow">Truly Nolen · <span data-preview-office>Uruguay</span></p><h1>Disfrutá tu espacio. Nosotros lo cuidamos.</h1><p>Prevención y atención para que vivas tranquilo en tu casa.</p><a class="button" href="#contacto">Hablemos</a></div><a class="discover" href="#servicios">Conocé el cuidado Truly Nolen ↓</a></section><script src="/oficinas/assets/video-movil.js"></script>
<section class="g-cifras" aria-label="Truly Nolen en el mundo"><div class="g-cifras-in"><div><b>65</b> <span>países</span><small>presencia internacional</small></div><div><b>300+</b> <span>oficinas</span><small>en el mundo</small></div><div><b>80+</b> <span>años</span><small>de experiencia</small></div><div class="g-cifra-carro"><img src="/oficinas/assets/truly-carrito-asistente.svg" alt=""/><span>una marca reconocible<small>nuestro carro emblemático</small></span></div></div></section>
<section id="servicios" class="section g g-programa"><header class="g-cab"><p class="g-ey">Truly Nolen · Uruguay</p><h2>Para tu casa, tu negocio o tu planta.</h2><p class="g-intro">Elegí el servicio que querés conocer.</p></header><div class="g-prog-fila">
<a class="g-prog g-prog-1" href="${U}/servicios/hogares/"><span class="g-prog-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5M6.5 10v9h11v-9M10 19v-5h4v5"/></svg></span><h3>Hogares</h3><p>Para tu casa, tu apartamento o tu casa de balneario.</p><span class="g-flecha" aria-hidden="true">↓</span></a>
<a class="g-prog" href="${U}/servicios/comercios/"><span class="g-prog-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h16l-1.5-4h-13zM5 9v10h14V9M9 19v-5h6v5M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"/></svg></span><h3>Comercios</h3><p>Para tu local, tu equipo y tus clientes.</p><span class="g-flecha" aria-hidden="true">↓</span></a>
<a class="g-prog" href="${U}/servicios/industria/"><span class="g-prog-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20V10l5 3V10l5 3V10l5 3V5h3v15zM7 17h2M12 17h2M17 17h2"/></svg></span><h3>Industria</h3><p>Un programa que parte de conocer tu operación.</p><span class="g-flecha" aria-hidden="true">↓</span></a>
</div></section>
<section class="section g g-zonas"><div class="g-zonas-grid"><figure class="g-zonas-fig"><img src="${A}/uruguay-casa-zonas.webp?v=2" alt="Casa moderna en Punta del Este vista desde arriba: el interior en rojo, el perímetro en amarillo y el jardín en verde" loading="lazy"/></figure><div><header class="g-cab"><p class="g-ey">Tres zonas para revisar</p><h2>Cada rincón<br/>cuenta.</h2><p class="g-intro">Revisamos tres partes de tu casa y en cada una miramos algo distinto.</p></header><ul class="g-zonas-lista"><li class="g-z-rojo"><h3>Interior</h3><p>Donde vivís y guardás la comida.</p></li><li class="g-z-amarillo"><h3>Perímetro</h3><p>Por donde entran.</p></li><li class="g-z-verde"><h3>Fondo, patio y azotea</h3><p>Lo que rodea tu casa.</p></li></ul><a class="g-link" href="${U}/servicios/hogares/">Conocé el servicio para hogares${arrow}</a></div></div></section>
<section class="section g g-comercial"><header class="g-cab"><p class="g-ey">Comercio e industria</p><h2>Control de plagas para tu negocio.</h2><p class="g-intro">Almacenes, panaderías, parrilladas, plantas y depósitos: cada actividad tiene sus puntos críticos.</p></header><div class="g-com-grid"><a class="g-com-foto" href="${U}/servicios/comercios/"><img src="${A}/uy-operacion.webp" alt="Técnica de Truly Nolen fumigando los zócalos de un depósito en Montevideo" loading="lazy"/><span><b>La prevención es parte de tu operación.</b><em>Conocé el servicio para comercios →</em></span></a><div class="g-sectores">
<a class="g-sector" href="${U}/servicios/comercios/"><span><h3>¿Para quién?</h3><p>Almacenes, autoservicios, panaderías y confiterías, rotiserías, parrilladas, restaurantes, farmacias, policlínicas y oficinas.</p></span>${arrow}</a>
<a class="g-sector" href="${U}/servicios/comercios/"><span><h3>¿Qué incluye?</h3><p>Inspección de las áreas de trabajo y del depósito, control según el rubro y coordinación de horarios y accesos con el encargado.</p></span>${arrow}</a>
<a class="g-sector" href="${U}/servicios/comercios/"><span><h3>¿Cómo sigue?</h3><p>Registro de hallazgos y recomendaciones. Si tenés varias sucursales, se acuerda el alcance de cada una.</p></span>${arrow}</a>
<a class="g-sector" href="${U}/servicios/industria/"><span><h3>Industria</h3><p>Frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística.</p></span>${arrow}</a>
</div></div></section>
<section id="metodo" class="section g g-metodo"><span id="nosotros"></span><header class="g-cab"><p class="g-ey">Cómo trabajamos</p><h2>Así trabajamos,<br/>paso a paso.</h2></header><div class="g-cols g-cols-4"><article><span class="g-n">01</span><h3>Escuchamos</h3><p>Contanos qué ves y qué querés proteger.</p></article><article><span class="g-n">02</span><h3>Evaluamos</h3><p>Revisamos el espacio y lo que favorece a las plagas.</p></article><article><span class="g-n">03</span><h3>Proponemos</h3><p>Te explicamos el plan y las indicaciones antes de empezar.</p></article><article><span class="g-n">04</span><h3>Acompañamos</h3><p>Después volvemos a revisar lo que haga falta.</p></article></div></section>
${pestGrid({ ey: 'Guía de plagas', h2: 'Reconocé la plaga.<br/>Entendé sus hábitos.', intro: 'Las que más vemos en Uruguay. Cada guía explica las señales y qué hacer, con sus fuentes.' })}
<section class="section g g-ayuda"><header class="g-cab"><p class="g-ey">Blog y preguntas</p><h2>Consejos y preguntas<br/>frecuentes.</h2><p class="g-intro">Consejos para prevenir plagas y cómo trabajamos.</p></header><div class="g-ayuda-grid"><article class="g-blog"><div class="g-blog-top"><img src="${POSTS_UY[0].img}" alt="" loading="lazy"/><p class="g-ey">Del blog · 31 de octubre de 2026</p></div><h3><a href="${U}/blog/${POSTS_UY[0].slug}/">${POSTS_UY[0].title}</a></h3><p>${POSTS_UY[0].lead}</p><a class="g-link" href="${U}/blog/${POSTS_UY[0].slug}/">Leer el artículo${arrow}</a><a class="g-link g-link-2" href="${U}/blog/">Ver todo el blog${arrow}</a></article><div class="g-faq" id="preguntas"><h3>Lo que más nos preguntan.</h3>${homeFaq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></div></section>
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
function pestPage(slug, { title, description, hero, t1, d, t2, faq = GENERAL_FAQ, src, prompts }) {
  const p = PESTS[slug];
  return {
    out: `plagas/${slug}/`, template: 'plagas/zancudos/', title: `${p.name} en Uruguay · Truly Nolen`, description, crumb: p.name, faq,
    main: [
      detailHero({ eyebrow: `${p.sub} · Uruguay`, h1: hero.h1, p: hero.p, img: p.img, alt: p.alt }),
      tabla(t1), dato(d), tabla(t2), servicesCards(SVC[slug]), faqSection(faq), fuentes(src), contacto(prompts),
    ].join('\n'),
  };
}

const mosquitos = pestPage('mosquitos', {
  description: 'El mosquito Aedes aegypti transmite el dengue y se cría en el agua quieta de casa. Señales, datos del MSP y cómo prevenirlo en Uruguay.',
  hero: { h1: 'El criadero está más cerca<br/>de lo que pensás.', p: 'El mosquito Aedes aegypti transmite el dengue y se cría en el agua quieta: baldes, platos de macetas y bebederos. Según el MSP, dos de cada tres criaderos están en las casas.' },
  t1: { ey: 'Dónde se cría', h2: 'Donde queda agua quieta.', rows: [
    ['Agua en casa', 'Baldes, floreros, platos de macetas y bebederos de mascotas: cualquier recipiente con agua quieta puede ser un criadero.'],
    ['Fondo y azotea', 'Cubiertas viejas, canaletas tapadas, juguetes y botellas que juntan agua de lluvia.'],
    ['El dengue', 'Lo transmite principalmente el Aedes aegypti (OMS).'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que registró<br/>el MSP.', items: [
    ['1997', 'año en que se volvió a detectar el Aedes aegypti en Uruguay. Se había declarado erradicado en 1958.', 'MSP, Boletín epidemiológico (2016)'],
    ['2016', 'primer brote de dengue autóctono en 100 años: 19 casos, 18 en Montevideo, con epicentro en Pocitos.', 'MSP, Boletín epidemiológico (2016)'],
    ['2024', 'volvió a circular el dengue: el primer caso autóctono del año se confirmó el 1 de marzo.', 'Montevideo Portal, con datos del MSP (2024)'],
  ] },
  t2: { ey: 'Rutina de cada semana', h2: 'Tapá, vaciá<br/>y limpiá.', rows: [
    ['Recipientes con agua', 'Lo que guardás o se llena solo.', ['Baldes y tanques bien tapados.', 'Bebederos de mascotas con agua cambiada seguido.']],
    ['Fondo, patio y azotea', 'Todo lo que junta lluvia.', ['Platos de macetas y floreros.', 'Cubiertas, botellas y latas.', 'Canaletas y desagües destapados.']],
    ['Cubrir, vaciar y limpiar', 'La recomendación de la OMS.', ['Cubrir, vaciar y limpiar los recipientes donde se guarda agua.']],
  ], nota: 'El MSP impulsa la campaña «Activate contra el mosquito» con esta misma rutina.' },
  src: [SRC.oms, SRC.msp2016, SRC.mspCriaderos, SRC.mspActivate, SRC.dengue2024],
  prompts: [
    ['Tengo muchos mosquitos', 'Tengo muchos mosquitos en casa y quiero saber de dónde vienen.'],
    ['Junto agua en el fondo', 'Tengo baldes, macetas o cubiertas en el fondo. ¿Cómo evito que se críe el mosquito?'],
    ['Es en mi negocio', 'Hay mosquitos en mi negocio y quiero una evaluación.'],
  ],
});

const ratas = pestPage('ratas-y-ratones', {
  description: 'Ratas y ratones en casas y comercios de Uruguay: señales, qué las atrae y cómo prevenirlas, con datos de las intendencias.',
  hero: { h1: 'Donde hay comida y refugio,<br/>aparecen.', p: 'Ratas y ratones buscan lo mismo: comida, agua y un lugar donde esconderse. En Punta del Este, la Intendencia de Maldonado las encontró refugiadas en las palmeras, cerca de los restaurantes.' },
  t1: { ey: 'Las señales', h2: 'Lo que dejan<br/>a su paso.', rows: [
    ['Excrementos', 'Pequeños y oscuros, cerca de la comida, en los muebles de cocina o en los rincones.'],
    ['Roeduras', 'Marcas en bolsas, cables, madera y envases.'],
    ['Ruidos y caminos', 'Ruidos de noche en el cielorraso o en el entretecho, y manchas de grasa por donde pasan.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que contaron<br/>las intendencias.', items: [
    ['2025', 'la Intendencia de Maldonado describió como «complicado» el control de ratas en el Centro de Maldonado y en Punta del Este.', 'Montevideo Portal (15/10/2025)'],
    ['3', 'veces tuvo que intervenir la Intendencia de Montevideo en un cantero del Parque Rodó por roedores.', 'Montevideo Portal (2026)'],
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
    ['IM', 'Las empresas alimentarias de Montevideo deben tener un programa de control preventivo de plagas, que se tramita ante el Servicio de Salubridad Pública.', 'Intendencia de Montevideo, trámites'],
    ['60', 'ingredientes activos de insecticidas tienen reportes de resistencia en la cucaracha alemana, según una revisión de 102 estudios en 23 países.', 'Revisión científica (2025)'],
    ['2024', 'una «invasión de cucarachas» en la Costa de Oro y Montevideo resultó ser de belostomátidos, insectos que viven en el agua. Identificar bien es el primer paso.', 'Montevideo Portal (2024)'],
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
  description: 'Hormiga argentina y hormiga negra cortadora (Acromyrmex) en Uruguay: cómo distinguirlas y proteger la cocina, el jardín y la huerta.',
  hero: { h1: 'En la cocina o en el jardín,<br/>no son la misma hormiga.', p: 'La hormiga argentina entra a la cocina en filas buscando dulce. La hormiga negra cortadora (Acromyrmex) deja sin hojas los rosales y la huerta.' },
  t1: { ey: 'Cómo distinguirlas', h2: 'Dos hormigas,<br/>dos problemas.', rows: [
    ['Hormiga argentina', 'Chica, marrón, en filas largas. Es nativa de la cuenca del Paraná, que incluye a Uruguay.'],
    ['Hormiga negra o cortadora', 'Corta hojas y las lleva al hormiguero, donde cultiva el hongo del que se alimenta.'],
    ['El hormiguero', 'El nido de las cortadoras está bajo tierra: el daño se ve en las plantas, a veces lejos del nido.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que dicen<br/>los investigadores.', items: [
    ['12-14', 'especies de hormigas cortadoras del género Acromyrmex hay en Uruguay: 12 según el INIA (2014) y 14 según la Facultad de Agronomía (2023).', 'INIA, cartilla N.º 36 (2014) · La Mañana (2023)'],
    ['Jardín', 'Acromyrmex es el género que más problemas causa en los jardines, según Martín Bollazzi (Facultad de Agronomía, UdelaR).', 'La Mañana'],
    ['Nativa', 'La hormiga argentina es nativa de la cuenca del Paraná, que incluye a Uruguay.', 'AntWiki'],
  ] },
  t2: { ey: 'Prevención', h2: 'Seguí la fila<br/>hasta la entrada.', rows: [
    ['Cocina', 'Lo que las atrae.', ['Azúcar, miel y ración en envases cerrados.', 'Seguir la fila para encontrar por dónde entran.']],
    ['Jardín y huerta', 'Las señales de la cortadora.', ['Caminos de hojas cortadas en el pasto.', 'Montículos de tierra suelta.']],
    ['Entradas', 'Por donde pasan.', ['Grietas en zócalos y marcos.', 'Plantas que tocan la pared.']],
  ] },
  src: [SRC.inia, SRC.laManana, SRC.antwiki],
  prompts: [
    ['Tengo hormigas en la cocina', 'Tengo hormigas en la cocina. ¿Cómo las controlo?'],
    ['Me cortan las plantas', 'Las hormigas me están cortando las plantas del jardín. ¿Qué hago?'],
    ['Es en mi negocio', 'Tengo hormigas en mi negocio y quiero una evaluación.'],
  ],
});

const termitas = pestPage('termitas', {
  description: 'La termita subterránea Reticulitermes en Uruguay: señales, qué se sabe en el país y cómo prevenir daños en la madera de tu casa.',
  hero: { h1: 'Comen la madera<br/>desde adentro.', p: 'En Uruguay, la termita que causa problemas es la subterránea del género Reticulitermes. Llegó desde afuera: lo importante es detectarla a tiempo en tu casa.' },
  t1: { ey: 'Las señales', h2: 'Lo que hay<br/>que mirar.', rows: [
    ['Tubos de tierra', 'Caminos de barro entre el suelo y la madera: así llega la termita subterránea (UC IPM).'],
    ['Madera hueca', 'Marcos, zócalos o pisos que suenan huecos o se hunden al apretarlos.'],
    ['Insectos con alas', 'Enjambres cerca de ventanas y luces. Según UC IPM, verlos «no siempre significa» que la casa esté infestada.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que se sabe<br/>en el país.', items: [
    ['1', 'Reticulitermes es la única termita plaga seria del país.', 'Constantino (2002), Journal of Applied Entomology'],
    ['2023', 'Un estudio sobre Reticulitermes flavipes, una de las termitas plaga más importantes del mundo, la menciona como establecida en Uruguay.', 'Carrijo y col. (2023), Journal of Economic Entomology'],
  ] },
  t2: { ey: 'Prevención', h2: 'Madera seca<br/>y lejos del suelo.', rows: [
    ['Madera y suelo', 'La puerta de entrada.', ['Madera que no toque la tierra.', 'Leña y restos de madera lejos de la casa.']],
    ['Humedad', 'Lo que la atrae.', ['Reparar pérdidas de agua y filtraciones.', 'Ventilar sótanos y espacios bajos.']],
    ['Antes de tratar', 'Lo que conviene hacer.', ['No usar productos a ciegas: los caseros «generalmente no son efectivos» (UC IPM).', 'Fotografiar las señales y anotar dónde están.']],
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
  hero: { h1: 'Tranquila, escondida<br/>y peligrosa.', p: 'La araña de los rincones (Loxosceles laeta) vive detrás de muebles y cuadros, en placares y rincones oscuros. Es la araña de mayor importancia sanitaria en Uruguay. Ante una picadura, llamá al CIAT: 1722.' },
  t1: { ey: 'Cómo reconocerla', h2: 'Patas largas<br/>y un violín en el lomo.', rows: [
    ['Aspecto', 'Marrón, de patas largas y finas, con una mancha en forma de violín sobre el cuerpo. Por eso también le dicen «araña violinista».'],
    ['Dónde vive', 'Rincones oscuros y tranquilos: detrás de cuadros y muebles, en placares, cajas y ropa guardada.'],
    ['La picadura', 'Su veneno es necrosante: puede dañar la piel y los tejidos. Ante la sospecha, llamá al CIAT (1722) o consultá a tu prestador de salud.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que hay<br/>que saber.', items: [
    ['1722', 'es el teléfono del CIAT (Centro de Información y Asesoramiento Toxicológico) para consultar por una picadura.', 'Montevideo Portal (2022)'],
    ['MSP', 'considera a la araña de los rincones la de mayor importancia para la salud pública en Uruguay.', 'Boletín del MSP (2013), citado por Montevideo Portal (2022)'],
  ] },
  t2: { ey: 'Prevención', h2: 'Mover, sacudir<br/>y revisar.', rows: [
    ['Ropa y calzado', 'Donde más se esconden.', ['Sacudir la ropa y el calzado antes de usarlos.', 'Revisar la ropa de cama guardada.']],
    ['Muebles y cuadros', 'Rincones sin luz.', ['Separar camas y muebles de la pared.', 'Limpiar detrás de cuadros y muebles.']],
    ['Placares y depósitos', 'Lugares tranquilos.', ['Ordenar cajas y ropa acumulada.', 'Aspirar rincones y grietas.']],
  ] },
  src: [SRC.arana],
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
    detailHero({ eyebrow: 'Hogares · Uruguay', h1: 'Tu casa, sin visitas<br/>que no invitaste.', p: 'Vamos de la cocina a la azotea buscando por dónde entran las plagas y qué las hace quedarse. Te explicamos todo antes de tocar nada, pensando en tu familia y en tus mascotas.', img: `${A}/uy-hogares.webp`, alt: 'Cocina moderna de un apartamento en Montevideo con vista a la Rambla' }),
    cols({ ey: 'Cómo es el servicio', h2: 'Pensado para cómo<br/>se vive acá.', items: [
      ['Dónde trabajamos', 'Casas con fondo, apartamentos en edificio, casas de balneario y chacras, tengan plaga o quieran adelantarse.'],
      ['Qué hacemos', 'Recorremos adentro, el contorno de la casa y el fondo. Tratamos solo lo que hace falta y te dejamos por escrito cómo preparar el lugar.'],
      ['Después', 'Te damos consejos para cerrar los accesos y volvemos a revisar según lo que hayamos acordado.'],
    ], nota: 'Antes de arrancar te mandamos una propuesta: qué vamos a hacer en tu casa, cuántas visitas y en qué condiciones.' }),
    `<section class="section g g-zonas"><div class="g-zonas-grid"><figure class="g-zonas-fig"><img src="${A}/uruguay-casa-zonas.webp?v=2" alt="Casa moderna en Punta del Este vista desde arriba: el interior en rojo, el perímetro en amarillo y el jardín en verde" loading="lazy"/></figure><div><header class="g-cab"><p class="g-ey">Tres zonas para revisar</p><h2>Cada rincón<br/>cuenta.</h2><p class="g-intro">Adentro, el contorno y el fondo: una plaga casi nunca está en un solo lugar, por eso miramos las tres zonas juntas.</p></header><ul class="g-zonas-lista"><li class="g-z-rojo"><h3>Interior</h3><p>Lo que se usa todos los días.</p><p class="g-z-det">El mueble de la pileta y el hueco de la heladera · Baños, rejillas y manchas de humedad · Lo que viste, en qué lugar y a qué hora.</p></li><li class="g-z-amarillo"><h3>Perímetro</h3><p>La puerta de entrada de las plagas.</p><p class="g-z-det">Rendijas bajo puertas y ventanas · Agujeros donde pasan caños y cables · Cajas y trastos apoyados en la pared.</p></li><li class="g-z-verde"><h3>Fondo, patio y azotea</h3><p>Donde muchas veces empieza todo.</p><p class="g-z-det">Canteros, huerta y enredaderas · Baldes, macetas y cualquier cosa que junte agua · Pilas de leña, escombros y hojas.</p></li></ul></div></div></section>`,
    pestGrid({ ey: 'Las de todos los días', h2: 'Lo que más aparece<br/>en las casas de acá.', nota: '<strong>Por dónde arrancamos.</strong> Cocina, baños, desagües, el entretecho, el fondo y la azotea: ahí aparecen primero las señales de cada plaga.' }),
    tabla({ ey: 'Para la primera charla', h2: 'Lo que nos ayuda saber.', rows: [
      ['Cómo es tu casa', 'Si es casa, apartamento o de balneario, cuántos ambientes tiene y cuáles te preocupan.'],
      ['Cuándo te queda bien', 'Los días y horarios en que alguien puede abrirnos.'],
      ['Qué viste', 'Qué apareció, en qué lugar y desde cuándo. Y si viven chicos o mascotas en la casa.'],
    ] }),
    faqSection(hogaresFaq),
    fuentes([SRC.msp2016, SRC.maldonado2025, SRC.imAlimentos, SRC.laManana, SRC.constantino, SRC.arana]),
    contacto([
      ['Hay mosquitos en casa', 'Tengo muchos mosquitos en mi casa y quiero saber de dónde vienen.'],
      ['Hay ratas o ratones', 'Tengo ratas o ratones en mi casa. ¿Cómo los saco?'],
      ['Vi cucarachas en la cocina', 'Vi cucarachas en la cocina. ¿Cómo las controlo?'],
      ['Tengo hormigas', 'Tengo hormigas en la casa o en el jardín. ¿Cómo las controlo?'],
      ['Creo que tengo termitas', 'Creo que tengo termitas en la madera de mi casa. ¿Cómo lo confirmo?'],
    ]),
  ].join('\n'),
};

const comerciosFaq = [
  ['¿Pueden venir fuera del horario de atención?', 'Los horarios se coordinan con el encargado según el rubro y el movimiento del local.'],
  ['¿El servicio me sirve para la habilitación?', 'El equipo te explica qué registros entrega el servicio. Los requisitos de habilitación los define la Intendencia de tu departamento.'],
  ['Tengo varias sucursales, ¿cómo se organiza?', 'Se acuerda el alcance de cada local en la propuesta, según su actividad y sus condiciones.'],
  ['¿Cómo sé si llegan a mi zona?', 'Decinos tu departamento, tu barrio o localidad y el tipo de local. Te confirmamos si podemos atenderte y cómo coordinar.'],
];
const comercios = {
  out: 'servicios/comercios/', template: 'servicios/comercios/', title: 'Control de plagas para comercios en Uruguay · Truly Nolen', crumb: 'Comercios',
  description: 'Control de plagas para almacenes, panaderías, parrilladas, rotiserías, farmacias y oficinas en Uruguay. Qué pide la norma en Montevideo.',
  faq: comerciosFaq,
  main: [
    detailHero({ eyebrow: 'Servicio comercial · Uruguay', h1: 'Tu negocio,<br/>protegido.', p: 'Un programa que tiene en cuenta tu local, a tus clientes y el ritmo de tu operación: almacenes, panaderías, parrilladas, rotiserías, farmacias y oficinas.', img: `${A}/uy-comercios.webp`, alt: 'Panadería y confitería moderna en Montevideo, con vitrinas de bizcochos y medialunas' }),
    tabla({ ey: 'Qué podés esperar', h2: 'Control para tu negocio.', rows: [
      ['¿Para quién?', 'Almacenes, autoservicios, panaderías y confiterías, rotiserías, parrilladas, restaurantes, farmacias, policlínicas y oficinas.'],
      ['¿Qué incluye?', 'Inspección de las áreas de trabajo y del depósito, control según el rubro y coordinación de horarios y accesos con el encargado.'],
      ['¿Cómo sigue?', 'Registro de hallazgos y recomendaciones. Si tenés varias sucursales, se acuerda el alcance de cada una.'],
    ], nota: 'Antes de empezar recibís una propuesta con el alcance y las condiciones para tu negocio.' }),
    tabla({ ey: 'Espacios que cuidamos', h2: 'Cada punto<br/>del proceso.', intro: 'Cada rubro tiene sus puntos críticos. La inspección los reconoce y define qué hace falta en cada uno.', rows: [
      ['Panaderías y confiterías', 'Recepción, elaboración, depósito y mostrador son una sola operación.', ['Bolsas de harina y depósitos.', 'Hornos, mesadas y zonas calientes.']],
      ['Parrilladas y restaurantes', 'Cocina, parrilla y salón.', ['Leña y carbón guardados.', 'Cámaras de frío y desagües de cocina.']],
      ['Almacenes y autoservicios', 'Mercadería que entra y sale todos los días.', ['Depósito y góndolas.', 'Zona de residuos y contenedores.']],
      ['Farmacias, policlínicas y oficinas', 'Espacios con público y protocolos de higiene.', ['Depósitos y archivos.', 'Cocinas y áreas de descanso del personal.']],
    ] }),
    dato({ ey: 'Un dato que pesa', h2: 'Lo que encontró<br/>la ciencia.', items: [
      ['60', 'ingredientes activos de insecticidas tienen reportes de resistencia en la cucaracha alemana, según una revisión de 102 estudios en 23 países.', 'Revisión científica (2025)'],
    ] }),
    tabla({ ey: 'Por qué importa', h2: 'En un negocio de alimentos,<br/>una plaga es un riesgo de salud.', rows: [
      ['Roedores y leptospirosis', 'Un seguimiento de diez años describió la leptospirosis humana en Uruguay como un problema de salud no resuelto.'],
      ['Las lluvias', 'El MSP informó una muerte por leptospirosis en Montevideo. La nota explica, con datos de la OPS, que el riesgo sube después de las lluvias.'],
      ['Insecticidas que no alcanzan', 'Con tantos reportes de resistencia, aplicar siempre el mismo producto no basta: hay que encontrar dónde se esconde la plaga.'],
    ] }),
    tabla({ ey: 'Lo que dice la norma', h2: 'Si vendés alimentos,<br/>la norma lo pide.', rows: [
      ['Programa preventivo', 'En Montevideo, las empresas alimentarias deben tener un programa de control preventivo de plagas ante el Servicio de Salubridad Pública.'],
      ['Registros', 'El programa preventivo de Montevideo tiene que dejar anotado el control que se hizo, quién lo hizo y las medidas correctivas.'],
      ['Guía oficial', 'El portal gub.uy publica una guía para elaborar el Plan de Control de Plagas de las empresas alimentarias.'],
      ['Empresa habilitada', 'En Montevideo, las empresas de control de plagas deben registrarse en el Servicio de Salubridad Pública, con un técnico profesional responsable y la habilitación del MSP. El registro se renueva cada 2 años.'],
    ], nota: 'Los requisitos pueden cambiar según el departamento. Consultá los de la Intendencia que corresponde a tu local.' }),
    pestGrid({ ey: 'Guía de plagas', h2: 'Las plagas que más<br/>afectan a un negocio.', slugs: ['cucarachas', 'ratas-y-ratones', 'mosquitos'] }),
    tabla({ ey: 'Antes de hablar', h2: 'Qué conviene contarnos.', rows: [
      ['Tu negocio', 'Contanos el rubro, el tamaño del local y si tenés depósito.'],
      ['Tus horarios', 'Decinos cuándo abrís y cerrás, y en qué horario conviene la visita.'],
      ['Lo que ves', 'Describí las señales, dónde aparecen y desde cuándo.'],
    ] }),
    faqSection(comerciosFaq),
    fuentes([SRC.imAlimentos, SRC.imRegistro, SRC.mspEmpresas, SRC.guiaPlan, SRC.resistencia, SRC.leptoSeguimiento, SRC.leptoLluvia]),
    contacto([
      ['Tengo una panadería o restaurante', 'Tengo una panadería o un restaurante y quiero un programa de control de plagas.'],
      ['Necesito el programa preventivo', 'Necesito un programa de control preventivo de plagas para mi comercio de alimentos.'],
      ['Tengo varias sucursales', 'Tengo varias sucursales y quiero coordinar el control de plagas en todas.'],
    ]),
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
    detailHero({ eyebrow: 'Servicio industrial · Uruguay', h1: 'Control de plagas<br/>para tu industria.', p: 'Frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística. Un programa que parte de conocer tu operación, de la recepción al despacho.', img: `${A}/uy-industria.webp`, alt: 'Planta láctea moderna en Uruguay, con el campo verde detrás de los ventanales' }),
    tabla({ ey: 'Qué podés esperar', h2: 'Manejo integrado<br/>de plagas.', rows: [
      ['Diagnóstico', 'Recorrida de la planta, el perímetro y los depósitos para entender qué favorece a cada plaga.', ['Accesos, desagües y zonas húmedas.', 'Depósitos, silos y residuos.']],
      ['Programa', 'Monitoreo, control y registros según tu actividad y las auditorías que tenés que cumplir.', ['Estaciones de monitoreo numeradas.', 'Registro de cada visita.']],
      ['Seguimiento', 'Informes de hallazgos, tendencias y recomendaciones, con visitas según el programa acordado.', ['Tendencias por zona.', 'Medidas correctivas y su control.']],
    ], nota: 'Antes de empezar recibís una propuesta con el alcance, la frecuencia y los registros para tu planta.' }),
    dato({ ey: 'Por qué importa en Uruguay', h2: 'Lo que exporta<br/>el país.', items: [
      ['2.444', 'millones de dólares exportó la carne bovina de enero a noviembre de 2025: el primer rubro del país.', 'El Observador (2025)'],
      ['2.103', 'millones de dólares exportó la celulosa de enero a noviembre de 2025.', 'El Observador (2025)'],
      ['848', 'millones de dólares exportaron los lácteos en 2024.', 'El Observador (2025)'],
    ] }),
    tabla({ ey: 'Conozcamos tu instalación', h2: 'De la recepción<br/>al despacho.', rows: [
      ['Recepción', 'Donde entra la materia prima.', ['Andenes y puertas de carga.', 'Camiones y contenedores que ingresan.']],
      ['Proceso', 'Donde se trabaja el producto.', ['Equipos, desagües y zonas húmedas.', 'Áreas con restos de producto.']],
      ['Depósito y silos', 'Donde se guarda.', ['Granos, bolsas y pallets.', 'Grietas y acumulación de polvo.']],
      ['Despacho y perímetro', 'Lo que rodea la planta.', ['Residuos y contenedores.', 'Pastizales, desagües pluviales y cercos.']],
    ] }),
    tabla({ ey: 'Lo que se sabe', h2: 'Por qué fumigar<br/>no basta.', rows: [
      ['Resistencia', 'Una revisión de 102 estudios en 23 países reporta cucarachas alemanas resistentes a 60 ingredientes activos, sobre todo piretroides y organofosforados.'],
      ['Registros', 'En Montevideo, el programa preventivo de una empresa alimentaria tiene que dejar anotado el control, quién lo hizo y las medidas correctivas.'],
      ['Lluvias', 'El MSP informó una muerte por leptospirosis en Montevideo; según la OPS, citada en la nota, el riesgo sube después de las lluvias.'],
    ] }),
    pestGrid({ ey: 'Guía de plagas', h2: 'Plagas que vigilamos<br/>en la industria.', slugs: ['ratas-y-ratones', 'cucarachas', 'hormigas'] }),
    tabla({ ey: 'Antes de hablar', h2: 'Qué conviene contarnos.', rows: [
      ['Tu planta', 'Rubro, superficie y cantidad de edificios.'],
      ['Tus auditorías', 'Contanos qué normas o auditorías tenés que cumplir.'],
      ['Lo que ves', 'Dónde aparecen las señales y desde cuándo.'],
    ] }),
    faqSection(industriaFaq),
    fuentes([SRC.exportaciones, SRC.palomas, SRC.resistencia, SRC.imAlimentos, SRC.leptoLluvia]),
    contacto([
      ['Tengo una planta de alimentos', 'Tengo una planta de alimentos y quiero un programa de manejo integrado de plagas.'],
      ['Tengo un depósito o silos', 'Tengo un depósito o silos de granos y quiero una evaluación.'],
      ['Necesito registros para auditoría', 'Necesito un programa de control de plagas con registros para auditorías.'],
    ]),
  ].join('\n'),
};

// ---------------------------------------------------------------- BLOG
const POSTS = POSTS_UY;
const card = (p, featured = false) => `<article class="blog-card${featured ? ' blog-featured' : ''}"><a href="${U}/blog/${p.slug}/" tabindex="-1" aria-hidden="true"><img src="${p.img}" alt="" loading="lazy"/></a><div><p class="eyebrow">${p.tag} · <time datetime="2026-10-31">31 de octubre de 2026</time></p><h2><a href="${U}/blog/${p.slug}/">${p.title}</a></h2><p>${p.lead}</p><a class="text-link" href="${U}/blog/${p.slug}/">Leer el artículo →</a></div></article>`;

const blog = {
  out: 'blog/', template: 'blog/', title: 'Blog de control de plagas en Uruguay · Truly Nolen', crumb: 'Blog',
  description: 'Guías sobre plagas de Uruguay: la araña de los rincones, la hormiga cortadora y más, con cada dato respaldado por su fuente abierta.',
  main: `<section class="section blog-head"><a class="text-link" href="${U}/">← Volver al inicio</a><p class="eyebrow">Blog · Uruguay</p><h1>Blog de control de plagas</h1><p>Guías sobre las plagas de acá, con cada dato respaldado por su fuente.</p></section><section class="section blog-lista"><div class="blog-grid">${card(POSTS[0], true)}${card(POSTS[1])}</div></section>
${contacto(DEFAULT_PROMPTS)}`,
};

function article(post, { body, faq, src, prompts, related }) {
  return {
    out: `blog/${post.slug}/`, template: 'blog/como-eliminar-el-comejen/', title: `${post.title} · Truly Nolen Uruguay`, description: post.desc || post.lead,
    crumb: post.tag, crumbParent: ['Blog', `${U}/blog/`], faq, article: post,
    main: `<article class="section blog-articulo"><nav class="blog-migas" aria-label="Ruta"><a href="${U}/">Inicio</a> · <a href="${U}/blog/">Blog</a> · <span>${post.tag}</span></nav><p class="eyebrow">${post.tag}</p><h1>${post.title}</h1><p class="blog-entrada">${post.lead}</p><p class="blog-meta">Truly Nolen Uruguay · 31 de octubre de 2026 · 5 min de lectura</p><img class="blog-portada" src="${post.img}" alt="${post.alt}"/><div class="blog-cuerpo">${body}</div></article>
${faqSection(faq, { eyebrow: post.tag, h2: 'Preguntas frecuentes', id: '' })}
${fuentes(src)}
<section class="section"><div class="section-heading"><p class="eyebrow">Blog</p><h2>Artículos relacionados</h2></div><div class="blog-grid">${card(related)}</div></section>
${contacto(prompts)}`,
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
    main: `<section class="section legal-content"><p class="eyebrow">Truly Nolen · Uruguay</p><h1>${h1}</h1>${html}<a class="button" href="${U}/">← Volver al sitio</a></section>`,
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
  ['Rata noruega, Rattus norvegicus', 'Zeynel Cebeci', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0', 'https://commons.wikimedia.org/wiki/File:Rattus_norvegicus_-_Brown_rat_03.jpg'],
  ['Termita subterránea, Reticulitermes flavipes', 'Judy Gallagher', 'CC BY 2.0', 'https://creativecommons.org/licenses/by/2.0', 'https://commons.wikimedia.org/wiki/File:Eastern_Subterranean_Termite_-_Reticulitermes_flavipes,_Meadowood_SRMA,_Mason_Neck,_Virginia,_April_7,_2023_(53310004483).jpg'],
  ['Araña de los rincones, Loxosceles laeta (también portada del artículo del blog)', 'Mampato', 'Dominio público', '', 'https://commons.wikimedia.org/wiki/File:Loxosceles_laeta.jpg'],
];
const creditos = legal('creditos/', 'Créditos de imágenes', 'Créditos de imágenes',
  `<p>Las fotos reales de este sitio vienen de Wikimedia Commons y se usan según su licencia.</p><ul>${CREDITS.map(([t, a, l, lu, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>, por ${a}. ${lu ? `<a href="${lu}" target="_blank" rel="noopener noreferrer">${l}</a>` : l}.</li>`).join('')}</ul><p>Las fotos del mosquito, la cucaracha y la hormiga cortadora (también portada del artículo del blog) son las mismas que usan los otros sitios de oficina de Truly Nolen; su origen exacto no está verificado en este borrador.</p><p>La portada usa como referencia esa foto real del Teatro Solís (edificio de 1856): el carro oficial se ubicó frente al teatro con IA (Gemini). La casa de las tres zonas, los espacios de hogares, comercios e industria, la foto de la técnica y la acuarela del pie son imágenes generadas con IA (Gemini) para este borrador.</p>`);

export const PAGES = [home, mosquitos, ratas, cucarachas, hormigas, termitas, arana, hogares, comercios, industria, blog, postTermitas, postMosquito, privacidad, terminos, accesibilidad, creditos];
