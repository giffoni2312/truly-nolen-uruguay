import {
  U, A, PESTS, PEST_ORDER, pestGrid, detailHero, tabla, dato, cols, faqSection, fuentes,
  servicesCards, contacto, DEFAULT_PROMPTS, GENERAL_FAQ, SRC,
} from './helpers.mjs';

const arrow = '<span aria-hidden="true">→</span>';

// ---------------------------------------------------------------- HOME
const homeFaq = GENERAL_FAQ;
const home = {
  out: '', template: '', title: 'Truly Nolen Uruguay | Control de plagas',
  description: 'Control de plagas en Uruguay para hogares, comercios e industrias. Escribile a Truly AI y te orientamos en el siguiente paso.',
  faq: homeFaq,
  main: `<section class="cinema" id="inicio"><div class="film"><picture><source media="(max-width:760px)" srcset="${A}/uruguay-desktop.jpg"/><img src="${A}/uruguay-desktop.jpg" alt="Carro amarillo de Truly Nolen en la Rambla de Punta del Este, Uruguay"/></picture></div><div class="hero-text"><p class="eyebrow">Truly Nolen · <span data-preview-office>Uruguay</span></p><h1>Disfrutá tu espacio. Nosotros lo cuidamos.</h1><p>Prevención y atención para que vivas tranquilo en tu casa.</p><a class="button" href="#contacto">Hablemos</a></div><a class="discover" href="#servicios">Conocé el cuidado Truly Nolen ↓</a></section>
<section class="g-cifras" aria-label="Truly Nolen en el mundo"><div class="g-cifras-in"><div><b>65</b> <span>países</span><small>presencia internacional</small></div><div><b>300+</b> <span>oficinas</span><small>en el mundo</small></div><div><b>80+</b> <span>años</span><small>de experiencia</small></div><div class="g-cifra-carro"><img src="/oficinas/assets/truly-carrito-asistente.svg" alt="Carro amarillo de Truly Nolen"/><span>una marca reconocible<small>nuestro carro emblemático</small></span></div></div></section>
<section id="servicios" class="section g g-programa"><header class="g-cab"><p class="g-ey">Truly Nolen · Uruguay</p><h2>Un programa para tu espacio.</h2><p class="g-intro">De tu casa a tu negocio o tu planta. Elegí el servicio que querés conocer.</p></header><div class="g-prog-fila">
<a class="g-prog g-prog-1" href="${U}/servicios/hogares/"><span class="g-prog-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5M6.5 10v9h11v-9M10 19v-5h4v5"/></svg></span><h3>Hogares</h3><p>Para tu casa, tu apartamento o tu casa de balneario.</p><span class="g-flecha" aria-hidden="true">↓</span></a>
<a class="g-prog" href="${U}/servicios/comercios/"><span class="g-prog-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h16l-1.5-4h-13zM5 9v10h14V9M9 19v-5h6v5M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"/></svg></span><h3>Comercios</h3><p>Para tu local, tu equipo y tus clientes.</p><span class="g-flecha" aria-hidden="true">↓</span></a>
<a class="g-prog" href="${U}/servicios/industria/"><span class="g-prog-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20V10l5 3V10l5 3V10l5 3V5h3v15zM7 17h2M12 17h2M17 17h2"/></svg></span><h3>Industria</h3><p>Un programa que parte de conocer tu operación.</p><span class="g-flecha" aria-hidden="true">↓</span></a>
</div></section>
<section class="section g g-zonas"><div class="g-zonas-grid"><figure class="g-zonas-fig"><img src="${A}/uruguay-casa-zonas.jpg" alt="Casa en Carrasco, Montevideo: el interior en rojo, el perímetro en amarillo y el jardín en verde" loading="lazy"/></figure><div><header class="g-cab"><p class="g-ey">Tres zonas para revisar</p><h2>Cada rincón<br/>cuenta.</h2><p class="g-intro">Tu casa tiene tres áreas que se complementan. La inspección define qué hace falta en cada una.</p></header><ul class="g-zonas-lista"><li class="g-z-rojo"><h3>Interior</h3><p>Donde vivís y guardás la comida.</p></li><li class="g-z-amarillo"><h3>Perímetro</h3><p>Por donde entran.</p></li><li class="g-z-verde"><h3>Fondo, patio y azotea</h3><p>Lo que rodea tu casa.</p></li></ul><a class="g-link" href="${U}/servicios/hogares/">Conocé el servicio para hogares${arrow}</a></div></div></section>
<section class="section g g-comercial"><header class="g-cab"><p class="g-ey">Comercio e industria</p><h2>Control de plagas para tu actividad.</h2><p class="g-intro">Almacenes, panaderías, parrilladas, plantas y depósitos: cada actividad tiene sus puntos críticos.</p></header><div class="g-com-grid"><a class="g-com-foto" href="${U}/servicios/comercios/"><img src="${A}/uy-comercio-mercado-agricola.jpg" alt="Puestos de frutas y verduras en el Mercado Agrícola de Montevideo" loading="lazy"/><span><b>La prevención es parte de tu operación.</b><em>Conocé el servicio para comercios →</em></span></a><div class="g-sectores">
<a class="g-sector" href="${U}/servicios/comercios/"><span><h3>¿Para quién?</h3><p>Almacenes, autoservicios, panaderías y confiterías, rotiserías, parrilladas, restaurantes, farmacias, policlínicas y oficinas.</p></span>${arrow}</a>
<a class="g-sector" href="${U}/servicios/comercios/"><span><h3>¿Qué incluye?</h3><p>Inspección de las áreas de trabajo y del depósito, control según el rubro y coordinación de horarios y accesos con el encargado.</p></span>${arrow}</a>
<a class="g-sector" href="${U}/servicios/comercios/"><span><h3>¿Cómo sigue?</h3><p>Registro de hallazgos y recomendaciones. Si tenés varias sucursales, se acuerda el alcance de cada una.</p></span>${arrow}</a>
<a class="g-sector" href="${U}/servicios/industria/"><span><h3>Industria</h3><p>Frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística.</p></span>${arrow}</a>
</div></div></section>
<section id="metodo" class="section g g-metodo"><header class="g-cab"><p class="g-ey">Cómo trabajamos</p><h2>Un siguiente paso claro,<br/>en cada momento.</h2></header><div class="g-cols g-cols-4"><article><span class="g-n">01</span><h3>Escuchamos</h3><p>Contanos qué ves y qué querés proteger.</p></article><article><span class="g-n">02</span><h3>Evaluamos</h3><p>Revisamos el espacio y lo que favorece a las plagas.</p></article><article><span class="g-n">03</span><h3>Proponemos</h3><p>Te explicamos el plan y las indicaciones antes de empezar.</p></article><article><span class="g-n">04</span><h3>Acompañamos</h3><p>Después volvemos a revisar lo que haga falta.</p></article></div></section>
${cols({ id: 'nosotros', cls: 'g-esperar', ey: 'Nuestra forma de cuidar', h2: 'Prevenir antes<br/>que fumigar.', items: [
    ['Buscamos la causa', 'No alcanza con lo que se ve: buscamos lo que atrae a cada plaga para que no vuelva.'],
    ['Información clara', 'Cada guía de este sitio cita sus fuentes: MSP, intendencias, UdelaR, INIA y estudios publicados.'],
    ['Cuidamos a tu familia', 'Antes de cada visita te indicamos las precauciones para personas y mascotas.'],
  ] })}
${pestGrid({ ey: 'Guía de plagas', h2: 'Reconocé la plaga.<br/>Entendé sus hábitos.', intro: 'Las que más vemos en Uruguay. Cada guía explica las señales y qué hacer, con sus fuentes.' })}
<section class="section g g-ayuda"><header class="g-cab"><p class="g-ey">Blog y preguntas</p><h2>Prevención y respuestas<br/>para vos.</h2><p class="g-intro">Consejos para prevenir plagas y cómo trabajamos.</p></header><div class="g-ayuda-grid"><article class="g-blog"><div class="g-blog-top"><img src="${A}/uy-blog-termitas-madera.jpg" alt="Termitas sobre madera dañada" loading="lazy"/><p class="g-ey">Del blog</p></div><h3><a href="${U}/blog/como-detectar-termitas-en-casa/">Termitas en tu casa: cómo detectarlas y qué hacer</a></h3><p>En Uruguay, la termita que da problemas es la subterránea. Avanza por dentro de la madera y se ve tarde: te contamos qué señales buscar y qué no hacer.</p><a class="g-link" href="${U}/blog/como-detectar-termitas-en-casa/">Leer el artículo${arrow}</a><a class="g-link g-link-2" href="${U}/blog/">Ver todo el blog${arrow}</a></article><div class="g-faq" id="preguntas"><h3>Lo que más nos preguntan</h3>${homeFaq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></div></section>
${contacto(DEFAULT_PROMPTS, { zona: true })}`,
};

// ---------------------------------------------------------------- PESTS
function pestPage(slug, { title, description, hero, t1, d, t2, faq = GENERAL_FAQ.slice(0, 4), src, prompts }) {
  const p = PESTS[slug];
  return {
    out: `plagas/${slug}/`, template: 'plagas/zancudos/', title: `${p.name} en Uruguay · Truly Nolen`, description, crumb: p.name, faq,
    main: [
      detailHero({ eyebrow: `${p.sub} · Uruguay`, h1: hero.h1, p: hero.p, img: p.img, alt: p.alt }),
      tabla(t1), dato(d), tabla(t2), servicesCards(), faqSection(faq), fuentes(src), contacto(prompts),
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
    ['661', 'casos de dengue autóctono en el brote de 2024.', 'Subrayado, con datos del MSP (2024)'],
  ] },
  t2: { ey: 'Rutina de cada semana', h2: 'Tapá, vaciá<br/>y limpiá.', rows: [
    ['Recipientes con agua', 'Lo que guardás o se llena solo.', ['Baldes y tanques bien tapados.', 'Bebederos de mascotas con agua cambiada seguido.']],
    ['Fondo, patio y azotea', 'Todo lo que junta lluvia.', ['Platos de macetas y floreros.', 'Cubiertas, botellas y latas.', 'Canaletas y desagües destapados.']],
    ['Cada semana', 'La recomendación de la OMS.', ['Cubrir, vaciar y limpiar los recipientes donde se guarda agua.']],
  ], nota: 'El MSP impulsa la campaña «Activate contra el mosquito» con esta misma rutina.' },
  src: [SRC.oms, SRC.msp2016, SRC.mspCriaderos, SRC.mspActivate, SRC.subrayado2024],
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
    ['3', 'veces tuvo que intervenir la Intendencia de Montevideo en un cantero del Parque Rodó por roedores.', 'Montevideo Portal'],
    ['4', 'plagas atiende la cuadrilla de la Intendencia de Maldonado: ratas, pulgas, mosquitos y garrapatas.', 'Montevideo Portal (15/10/2025)'],
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
    ['5 años', 'dura la habilitación bromatológica que otorga el Servicio de Regulación Alimentaria de la Intendencia.', 'Intendencia de Montevideo, trámites'],
    ['¿Cucarachas?', 'Una «invasión de cucarachas» en la Costa de Oro y Montevideo resultó ser de chinches acuáticas. Identificar bien es el primer paso.', 'Montevideo Portal'],
  ] },
  t2: { ey: 'Prevención', h2: 'Sin agua, sin migas,<br/>sin escondites.', rows: [
    ['Cocina', 'Lo que las alimenta.', ['Migas y grasa limpias al final del día.', 'Residuos tapados y sacados todas las noches.']],
    ['Agua', 'Lo que más buscan.', ['Canillas que gotean y piletas húmedas.', 'Rejillas de desagüe con tapa.']],
    ['Escondites', 'Donde pasan el día.', ['Grietas en zócalos y azulejos.', 'Cajas de cartón acumuladas.']],
  ] },
  src: [SRC.imAlimentos, SRC.cucarachasMP],
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
    ['14', 'especies de hormigas cortadoras del género Acromyrmex hay en Uruguay, además de 2 del género Atta.', 'La Mañana · INIA, cartilla 36'],
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
  hero: { h1: 'Comen la madera<br/>desde adentro.', p: 'En Uruguay, la termita que causa problemas es la subterránea del género Reticulitermes. Llegó desde afuera y ya no se puede erradicar del país: lo importante es detectarla a tiempo en tu casa.' },
  t1: { ey: 'Las señales', h2: 'Lo que hay<br/>que mirar.', rows: [
    ['Tubos de tierra', 'Caminos de barro entre el suelo y la madera: así llega la termita subterránea (UC IPM).'],
    ['Madera hueca', 'Marcos, zócalos o pisos que suenan huecos o se hunden al apretarlos.'],
    ['Insectos con alas', 'Enjambres cerca de ventanas y luces. Según UC IPM, verlos «no siempre significa» que la casa esté infestada.'],
  ] },
  d: { ey: 'En Uruguay', h2: 'Lo que se sabe<br/>en el país.', items: [
    ['1993', 'Aber y Fontes registran Reticulitermes en Uruguay, el primer registro del género en Sudamérica, y concluyen que erradicarla ya era imposible.', 'Citado en Revista de Agricultura'],
    ['1', 'Reticulitermes es la única termita plaga seria del país.', 'Constantino (2002), Journal of Applied Entomology'],
    ['2023', 'Un estudio sobre Reticulitermes flavipes, una de las termitas plaga más importantes del mundo, la menciona como establecida en Uruguay.', 'Carrijo y col. (2023), Journal of Economic Entomology'],
  ] },
  t2: { ey: 'Prevención', h2: 'Madera seca<br/>y lejos del suelo.', rows: [
    ['Madera y suelo', 'La puerta de entrada.', ['Madera que no toque la tierra.', 'Leña y restos de madera lejos de la casa.']],
    ['Humedad', 'Lo que la atrae.', ['Reparar pérdidas de agua y filtraciones.', 'Ventilar sótanos y espacios bajos.']],
    ['Antes de tratar', 'Lo que conviene hacer.', ['No usar productos a ciegas: los caseros «generalmente no son efectivos» (UC IPM).', 'Fotografiar las señales y anotar dónde están.']],
  ] },
  src: [SRC.ucipm, SRC.constantino, SRC.aber, SRC.carrijo],
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
    ['MSP', 'la considera la araña de mayor importancia para la salud pública en Uruguay.', 'Boletín del MSP (2013), citado por Montevideo Portal (2022)'],
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
  ['¿Qué pasa si hay niños o mascotas en casa?', 'Avisanos antes de la visita: te vamos a indicar las medidas que aplican al servicio y las precauciones para personas y mascotas.'],
  ['¿Tengo que salir de casa?', 'Depende del tratamiento. Te lo indicamos antes de la visita, junto con las precauciones que hay que tomar.'],
  ['¿Con una visita alcanza?', 'El equipo define el alcance y el seguimiento después de evaluar tu situación. Las visitas y condiciones se explican en la propuesta.'],
  ['¿Cómo sé si llegan a mi barrio?', 'Escribile a Truly AI tu departamento, tu barrio o localidad y el tipo de espacio. Te confirmamos si podemos atenderte y cómo coordinar.'],
];
const hogares = {
  out: 'servicios/hogares/', template: 'servicios/hogares/', title: 'Control de plagas para hogares en Uruguay · Truly Nolen', crumb: 'Hogares',
  description: 'Revisamos tu casa, apartamento o casa de balneario por dentro y por fuera: interior, perímetro, fondo y azotea. Control de plagas en Uruguay.',
  faq: hogaresFaq,
  main: [
    detailHero({ eyebrow: 'Servicio residencial · Uruguay', h1: 'Revisamos tu casa<br/>por dentro y por fuera.', p: 'De la cocina al fondo y la azotea. Revisamos tu casa o apartamento para encontrar dónde está la actividad de plagas y qué la favorece, cuidando a tu familia y a tus mascotas.', img: `${A}/uy-hogar-casa-estandar-palermo.jpg`, alt: 'Casa estándar con rejas de hierro y persianas de madera en el barrio Palermo, Montevideo' }),
    cols({ ey: 'Qué podés esperar', h2: 'Protección para tu casa.', items: [
      ['¿Para quién?', 'Casas, apartamentos, casas de balneario y chacras con plagas o que quieren prevenirlas.'],
      ['¿Qué incluye?', 'Revisión del interior, el perímetro y el fondo. Control según lo que se encuentre e indicaciones para preparar a tu familia y a tus mascotas.'],
      ['¿Cómo sigue?', 'Recomendaciones para que no vuelvan a entrar y visitas de seguimiento según el programa acordado.'],
    ], nota: 'Antes de empezar recibís una propuesta con el alcance y las condiciones para tu casa.' }),
    `<section class="section g g-zonas"><div class="g-zonas-grid"><figure class="g-zonas-fig"><img src="${A}/uruguay-casa-zonas.jpg" alt="Casa en Carrasco, Montevideo: el interior en rojo, el perímetro en amarillo y el jardín en verde" loading="lazy"/></figure><div><header class="g-cab"><p class="g-ey">Tres zonas para revisar</p><h2>Cada rincón<br/>cuenta.</h2><p class="g-intro">Tu casa tiene tres áreas que se complementan. La inspección define qué hace falta en cada una.</p></header><ul class="g-zonas-lista"><li class="g-z-rojo"><h3>Interior</h3><p>Donde vivís y guardás la comida.</p><p class="g-z-det">Bajo la pileta y detrás de la heladera · Baños, rejillas y humedades · Dónde y a qué hora viste actividad.</p></li><li class="g-z-amarillo"><h3>Perímetro</h3><p>Por donde entran.</p><p class="g-z-det">Puertas, ventanas y rejas · Grietas y pasos de caños · Lo que está guardado contra las paredes.</p></li><li class="g-z-verde"><h3>Fondo, patio y azotea</h3><p>Lo que rodea tu casa.</p><p class="g-z-det">Plantas, canteros y huerta · Baldes, macetas y todo lo que junte agua · Leña, escombros y hojas acumuladas.</p></li></ul></div></div></section>`,
    pestGrid({ ey: 'Lo que hay que saber en Uruguay', h2: 'Las plagas que más<br/>vemos en casa.', nota: '<strong>Dónde empieza la revisión.</strong> Cocina, baños, desagües, techos, el fondo y la azotea: ahí se buscan las señales y lo que favorece a cada plaga.' }),
    tabla({ ey: 'Antes de hablar', h2: 'Qué conviene contarnos.', rows: [
      ['Tu espacio', 'Contanos si es casa, apartamento o casa de balneario, y qué ambientes necesitan atención.'],
      ['Tu rutina', 'Decinos qué horarios te quedan cómodos para una visita.'],
      ['Lo que ves', 'Describí las señales y desde cuándo las notás. Contanos si hay niños o mascotas.'],
    ] }),
    faqSection(hogaresFaq),
    fuentes([SRC.msp2016, SRC.subrayado2024, SRC.maldonado2025, SRC.imAlimentos, SRC.inia, SRC.constantino, SRC.arana]),
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
    detailHero({ eyebrow: 'Servicio comercial · Uruguay', h1: 'Tu negocio,<br/>protegido.', p: 'Un programa que tiene en cuenta tu local, a tus clientes y el ritmo de tu operación: almacenes, panaderías, parrilladas, rotiserías, farmacias y oficinas.', img: `${A}/uy-comercio-parrilla.jpg`, alt: 'Parrilla con carnes y morrones en un restaurante del Mercado del Puerto, Montevideo' }),
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
    tabla({ ey: 'Lo que dice la norma', h2: 'Si vendés alimentos,<br/>la norma lo pide.', rows: [
      ['Programa preventivo', 'En Montevideo, las empresas alimentarias deben tener un programa de control preventivo de plagas ante el Servicio de Salubridad Pública.'],
      ['Habilitación bromatológica', 'La otorga el Servicio de Regulación Alimentaria de la Intendencia de Montevideo y dura 5 años.'],
      ['Empresa habilitada', 'Las empresas de control de plagas deben estar habilitadas por el MSP y registradas en la Intendencia, con un técnico responsable.'],
    ], nota: 'Los requisitos pueden cambiar según el departamento. Consultá los de la Intendencia que corresponde a tu local.' }),
    pestGrid({ ey: 'Guía de plagas', h2: 'Las plagas que más<br/>afectan a un negocio.', slugs: ['cucarachas', 'ratas-y-ratones', 'mosquitos'] }),
    tabla({ ey: 'Antes de hablar', h2: 'Qué conviene contarnos.', rows: [
      ['Tu negocio', 'Contanos el rubro, el tamaño del local y si tenés depósito.'],
      ['Tus horarios', 'Decinos cuándo abrís y cerrás, y en qué horario conviene la visita.'],
      ['Lo que ves', 'Describí las señales, dónde aparecen y desde cuándo.'],
    ] }),
    faqSection(comerciosFaq),
    fuentes([SRC.imAlimentos, SRC.imRegistro, SRC.mspEmpresas]),
    contacto([
      ['Tengo una panadería o restaurante', 'Tengo una panadería o un restaurante y quiero un programa de control de plagas.'],
      ['Necesito el programa preventivo', 'Necesito un programa de control preventivo de plagas para mi comercio de alimentos.'],
      ['Tengo varias sucursales', 'Tengo varias sucursales y quiero coordinar el control de plagas en todas.'],
    ]),
  ].join('\n'),
};

const industriaFaq = [
  ['¿Trabajan con registros para auditorías?', 'El programa incluye registros de hallazgos y recomendaciones. Contanos qué auditorías tenés que cumplir y el equipo te explica cómo se documenta.'],
  ['¿Atienden palomas?', 'Contanos el caso: también se evalúan. Como referencia, la Intendencia de Montevideo usa cetrería contra las palomas en el Centro y la Ciudad Vieja desde 2011.'],
  ['¿Con una visita alcanza?', 'En una planta, el control es un programa con monitoreo y seguimiento. El alcance se define después de la evaluación.'],
  ['¿Llegan a mi departamento?', 'Decinos el departamento, la localidad y el tipo de instalación. Te confirmamos si podemos atenderte y cómo coordinar.'],
];
const industria = {
  out: 'servicios/industria/', template: 'servicios/industria/', title: 'Control de plagas para la industria en Uruguay · Truly Nolen', crumb: 'Industria',
  description: 'Manejo integrado de plagas para frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística en Uruguay.',
  faq: industriaFaq,
  main: [
    detailHero({ eyebrow: 'Servicio industrial · Uruguay', h1: 'Control de plagas<br/>para tu industria.', p: 'Frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística. Un programa que parte de conocer tu operación, de la recepción al despacho.', img: `${A}/uy-industria-puerto-montevideo-aereo.jpg`, alt: 'Vista aérea del Puerto de Montevideo' }),
    cols({ ey: 'Qué podés esperar', h2: 'Manejo integrado<br/>de plagas.', items: [
      ['Diagnóstico', 'Recorrida de la planta, el perímetro y los depósitos para entender qué favorece a cada plaga.'],
      ['Programa', 'Monitoreo, control y registros según tu actividad y las auditorías que tenés que cumplir.'],
      ['Seguimiento', 'Informes de hallazgos, tendencias y recomendaciones, con visitas según el programa acordado.'],
    ] }),
    dato({ ey: 'Por qué importa en Uruguay', h2: 'Lo que exporta<br/>el país.', items: [
      ['2.680', 'millones de dólares exportó la carne bovina en 2025: el primer rubro del país.', 'El Observador · Uruguay XXI (2025)'],
      ['2.307', 'millones de dólares exportó la celulosa en 2025.', 'El Observador · Uruguay XXI (2025)'],
      ['928', 'millones de dólares exportaron los lácteos en 2025.', 'El Observador · Uruguay XXI (2025)'],
    ] }),
    tabla({ ey: 'Conozcamos tu instalación', h2: 'De la recepción<br/>al despacho.', rows: [
      ['Recepción', 'Donde entra la materia prima.', ['Andenes y puertas de carga.', 'Camiones y contenedores que ingresan.']],
      ['Proceso', 'Donde se trabaja el producto.', ['Equipos, desagües y zonas húmedas.', 'Áreas con restos de producto.']],
      ['Depósito y silos', 'Donde se guarda.', ['Granos, bolsas y pallets.', 'Grietas y acumulación de polvo.']],
      ['Despacho y perímetro', 'Lo que rodea la planta.', ['Residuos y contenedores.', 'Pastizales, desagües pluviales y cercos.']],
    ] }),
    pestGrid({ ey: 'Guía de plagas', h2: 'Plagas que vigilamos<br/>en la industria.', slugs: ['ratas-y-ratones', 'cucarachas', 'hormigas'] }),
    tabla({ ey: 'Antes de hablar', h2: 'Qué conviene contarnos.', rows: [
      ['Tu planta', 'Rubro, superficie y cantidad de edificios.'],
      ['Tus auditorías', 'Contanos qué normas o auditorías tenés que cumplir.'],
      ['Lo que ves', 'Dónde aparecen las señales y desde cuándo.'],
    ] }),
    faqSection(industriaFaq),
    fuentes([SRC.exportaciones, SRC.uruguayXXI, SRC.palomas]),
    contacto([
      ['Tengo una planta de alimentos', 'Tengo una planta de alimentos y quiero un programa de manejo integrado de plagas.'],
      ['Tengo un depósito o silos', 'Tengo un depósito o silos de granos y quiero una evaluación.'],
      ['Necesito registros para auditoría', 'Necesito un programa de control de plagas con registros para auditorías.'],
    ]),
  ].join('\n'),
};

// ---------------------------------------------------------------- BLOG
const POSTS = [
  { slug: 'como-detectar-termitas-en-casa', tag: 'Termitas', img: `${A}/uy-blog-termitas-madera.jpg`, alt: 'Termitas sobre madera dañada',
    title: 'Termitas en tu casa: cómo detectarlas y qué hacer',
    lead: 'En Uruguay, la termita que da problemas es la subterránea. Avanza por dentro de la madera y se ve tarde: te contamos qué señales buscar y qué no hacer.' },
  { slug: 'como-prevenir-el-mosquito-del-dengue', tag: 'Mosquitos', img: `${A}/uy-plaga-mosquito-foto.webp`, alt: 'Mosquito Aedes aegypti',
    title: 'Cómo prevenir el mosquito del dengue en casa: rutina semanal',
    lead: 'Dos de cada tres criaderos del Aedes aegypti están en las casas. Te contamos qué tapar, vaciar y limpiar cada semana, según el MSP y la OMS.' },
];
const card = (p, featured = false) => `<article class="blog-card${featured ? ' blog-featured' : ''}"><a href="${U}/blog/${p.slug}/" tabindex="-1" aria-hidden="true"><img src="${p.img}" alt="" loading="lazy"/></a><div><p class="eyebrow">${p.tag}</p><h2><a href="${U}/blog/${p.slug}/">${p.title}</a></h2><p>${p.lead}</p><a class="text-link" href="${U}/blog/${p.slug}/">Leer guía →</a></div></article>`;

const blog = {
  out: 'blog/', template: 'blog/', title: 'Blog de control de plagas en Uruguay · Truly Nolen', crumb: 'Blog',
  description: 'Guías sobre las plagas de Uruguay: termitas, mosquitos, ratas, cucarachas, hormigas y la araña de los rincones, con cada dato respaldado por su fuente.',
  main: `<section class="section blog-head"><a class="text-link" href="${U}/">← Volver al inicio</a><p class="eyebrow">Blog · Uruguay</p><h1>Blog de control de plagas</h1><p>Guías sobre las plagas de acá, con cada dato respaldado por su fuente.</p></section><section class="section blog-lista"><div class="blog-grid">${card(POSTS[0], true)}${card(POSTS[1])}</div></section>
${contacto(DEFAULT_PROMPTS)}`,
};

function article(post, { body, faq, src, prompts, related }) {
  return {
    out: `blog/${post.slug}/`, template: 'blog/como-eliminar-el-comejen/', title: `${post.title} · Truly Nolen Uruguay`, description: post.lead,
    crumb: post.tag, crumbParent: ['Blog', `${U}/blog/`], faq, article: post,
    main: `<article class="section blog-articulo"><nav class="blog-migas" aria-label="Ruta"><a href="${U}/">Inicio</a> · <a href="${U}/blog/">Blog</a> · <span>${post.tag}</span></nav><p class="eyebrow">${post.tag}</p><h1>${post.title}</h1><p class="blog-entrada">${post.lead}</p><p class="blog-meta">Truly Nolen Uruguay · 31 de octubre de 2026 · 5 min de lectura</p><img class="blog-portada" src="${post.img}" alt="${post.alt}"/><div class="blog-cuerpo">${body}</div></article>
${faqSection(faq, { eyebrow: post.tag, h2: 'Preguntas frecuentes', id: '' })}
${fuentes(src)}
<section class="section"><div class="section-heading"><p class="eyebrow">Blog</p><h2>Artículos relacionados</h2></div><div class="blog-grid">${card(related)}</div></section>
${contacto(prompts)}`,
  };
}

const postTermitas = article(POSTS[0], {
  body: `<p>¿Cómo saber si tenés termitas en casa? En Uruguay, la que causa problemas es la termita subterránea del género <em>Reticulitermes</em>. Vive bajo tierra y sube a la madera por dentro, así que cuando se ven los daños la colonia ya lleva tiempo trabajando. La buena noticia: hay señales concretas para detectarla.</p>
<h2>La termita de Uruguay vino de afuera y llegó para quedarse</h2>
<p>Según una revisión publicada en el <em>Journal of Applied Entomology</em> (Constantino, 2002), <em>Reticulitermes</em> fue introducida en Uruguay y es la única termita plaga seria del país. Aber y Fontes la registraron en 1993, el primer registro del género en Sudamérica, y ya entonces concluyeron que erradicarla del país era imposible.</p>
<p>Un estudio de 2023 sobre <em>Reticulitermes flavipes</em>, una de las termitas plaga más importantes del mundo, la menciona como establecida en Uruguay. Por eso el objetivo en tu casa no es «que no existan», sino detectarlas a tiempo y no darles la madera y la humedad que buscan.</p>
<h2>Las señales: tubos de barro, madera hueca y alados</h2>
<ul>
<li><strong>Tubos de tierra</strong> entre el suelo y la madera o sobre las paredes: así llega la termita subterránea a su alimento (UC IPM).</li>
<li><strong>Madera hueca</strong>: marcos, zócalos o pisos que suenan huecos o se hunden al apretarlos.</li>
<li><strong>Insectos con alas</strong> cerca de ventanas y luces. Ojo: según UC IPM, ver enjambres «no siempre significa» que la casa esté infestada.</li>
</ul>
<h2>Qué no hacer: productos a ciegas</h2>
<p>La guía de termitas de la Universidad de California (UC IPM) advierte que los pesticidas caseros contra las termitas «generalmente no son efectivos». Además, si rompés los tubos o movés la madera antes de que alguien la vea, se pierden las pistas para ubicar por dónde entran.</p>
<h2>Cómo prevenir: madera seca y lejos del suelo</h2>
<p>UC IPM recomienda mantener la madera lejos de la tierra y seca:</p>
<ul>
<li>Que la madera de la casa no toque el suelo.</li>
<li>Retirar leña, restos de madera y postes viejos pegados a la casa.</li>
<li>Reparar pérdidas de agua y filtraciones, y ventilar sótanos y espacios bajos.</li>
</ul>
<p>UC IPM es una referencia general de California, no uruguaya, pero describe el mismo género de termita que tenemos acá.</p>
<h2>Truly AI te ayuda a dar el primer paso hoy</h2>
<p>Antes de cualquier cosa, sacá fotos de las señales y anotá dónde están: marcos, zócalos, placares o muebles. Con eso ya podés escribirle a Truly AI, el asistente de Truly Nolen, por el chat del sitio o por WhatsApp. Te responde al instante y te orienta en el siguiente paso.</p>
<p>Si querés repasar las señales, entrá a la <a href="${U}/plagas/termitas/">guía de termitas</a>.</p>`,
  faq: [
    ['¿Las termitas se pueden eliminar con productos caseros?', 'La guía de termitas de la Universidad de California (UC IPM) dice que los pesticidas caseros contra las termitas «generalmente no son efectivos». Antes de gastar en ellos, escribile a Truly AI y te orienta.'],
    ['¿Qué son los tubos de barro en la pared?', 'Son los caminos que construye la termita subterránea para llegar del suelo a la madera sin exponerse (UC IPM). Si los ves, no los rompas: sacales una foto.'],
    ['¿Ver termitas con alas significa que mi casa está infestada?', 'No siempre. Según UC IPM, ver enjambres no siempre significa que la casa esté infestada. Fotografialos, anotá por dónde salieron y consultá.'],
    ['¿Qué termita hay en Uruguay?', 'La termita subterránea del género Reticulitermes, introducida en el país. Según Constantino (2002), es la única termita plaga seria de Uruguay.'],
  ],
  src: [SRC.constantino, SRC.aber, SRC.carrijo, SRC.ucipm],
  prompts: [
    ['Encontré tubos de barro', 'Encontré tubos de barro en una pared o en la madera. ¿Pueden ser termitas?'],
    ['La madera suena hueca', 'Un marco o un zócalo suena hueco. ¿Cómo confirmo si hay termitas?'],
    ['Vi insectos con alas', 'Vi muchos insectos con alas cerca de una ventana. ¿Son termitas?'],
  ],
  related: POSTS[1],
});

const postMosquito = article(POSTS[1], {
  body: `<p>Para prevenir el mosquito del dengue en casa hay que sacarle el agua donde se cría. El <em>Aedes aegypti</em> pone sus huevos en recipientes con agua quieta, y según el Ministerio de Salud Pública, dos de cada tres criaderos están en los domicilios. La rutina es simple: tapar, vaciar y limpiar, todas las semanas.</p>
<h2>El dengue ya no es un problema lejano en Uruguay</h2>
<p>El <em>Aedes aegypti</em> se había declarado erradicado de Uruguay en 1958 y se volvió a detectar en 1997. En 2016 llegó el primer brote de dengue autóctono en 100 años: 19 casos, 18 de ellos en Montevideo, con epicentro en Pocitos (MSP). En 2024 el brote fue mucho mayor: 661 casos autóctonos, según datos del MSP publicados por Subrayado.</p>
<h2>Dónde se cría el mosquito en una casa uruguaya</h2>
<ul>
<li><strong>Baldes y tanques</strong> sin tapa en el fondo o en la azotea.</li>
<li><strong>Platos de macetas y floreros</strong> con agua estancada.</li>
<li><strong>Bebederos de mascotas</strong> que no se cambian seguido.</li>
<li><strong>Cubiertas viejas, botellas y latas</strong> que juntan agua de lluvia.</li>
<li><strong>Canaletas y desagües</strong> tapados con hojas.</li>
</ul>
<h2>La rutina de cada semana: tapá, vaciá y limpiá</h2>
<p>La Organización Mundial de la Salud recomienda cubrir, vaciar y limpiar cada semana los recipientes donde se guarda agua. El MSP impulsa la misma idea con su campaña «Activate contra el mosquito». Elegí un día fijo, por ejemplo el domingo, y recorré el fondo, el patio y la azotea.</p>
<ol>
<li>Tapá los recipientes que necesitás tener con agua.</li>
<li>Vaciá y dá vuelta lo que no usás: baldes, macetas vacías, juguetes.</li>
<li>Limpiá con cepillo los bordes de bebederos y floreros: los huevos quedan pegados a las paredes del recipiente.</li>
</ol>
<h2>Truly AI te ayuda a revisar tu casa o tu negocio</h2>
<p>Si los mosquitos siguen apareciendo, escribile a Truly AI por el chat del sitio o por WhatsApp. Contale dónde los ves y qué recipientes tenés en el fondo, y te orienta en el siguiente paso. Para repasar las señales, entrá a la <a href="${U}/plagas/mosquitos/">guía de mosquitos</a>.</p>`,
  faq: [
    ['¿Cada cuánto tengo que revisar el fondo?', 'Una vez por semana. Es la recomendación de la OMS: cubrir, vaciar y limpiar los recipientes donde se guarda agua.'],
    ['¿Por qué hay que cepillar los recipientes?', 'Porque los huevos del Aedes aegypti quedan pegados a las paredes del recipiente: vaciarlo no siempre alcanza.'],
    ['¿Hubo dengue autóctono en Uruguay?', 'Sí. En 2016 hubo 19 casos, el primer brote en 100 años (MSP), y en 2024 hubo 661 casos autóctonos, según datos del MSP publicados por Subrayado.'],
    ['¿Qué hago si tengo síntomas de dengue?', 'Consultá a tu prestador de salud. Esta guía es sobre prevención en casa y no reemplaza la consulta médica.'],
  ],
  src: [SRC.oms, SRC.msp2016, SRC.mspCriaderos, SRC.mspActivate, SRC.subrayado2024],
  prompts: [
    ['Tengo muchos mosquitos', 'Tengo muchos mosquitos en casa y quiero saber de dónde vienen.'],
    ['Junto agua en el fondo', 'Tengo baldes, macetas o cubiertas en el fondo. ¿Cómo evito que se críe el mosquito?'],
    ['Es en mi negocio', 'Hay mosquitos en mi negocio y quiero una evaluación.'],
  ],
  related: POSTS[0],
});

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
  ['Rambla de Punta del Este (fondo del fotomontaje de la portada)', 'Babels', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0', 'https://commons.wikimedia.org/wiki/File:Rambla_Lorenzo_Batlle_Pacheco_(Punta_del_Este).jpg'],
  ['Casa en Carrasco, Montevideo (base de la imagen de zonas)', 'Andrés Franchi Ugarte', 'CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0', 'https://commons.wikimedia.org/wiki/File:Casa_de_Carrasco_vista_desde_Rambla_Tom%C3%A1s_Berreta_-_panoramio.jpg'],
  ['Vista aérea del Puerto de Montevideo (industria)', 'Fedaro', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0', 'https://commons.wikimedia.org/wiki/File:Puerto_de_Montevideo_a%C3%A9reo.jpg'],
  ['Rata noruega, Rattus norvegicus', 'Zeynel Cebeci', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0', 'https://commons.wikimedia.org/wiki/File:Rattus_norvegicus_-_Brown_rat_03.jpg'],
  ['Termita subterránea, Reticulitermes flavipes', 'Judy Gallagher', 'CC BY 2.0', 'https://creativecommons.org/licenses/by/2.0', 'https://commons.wikimedia.org/wiki/File:Eastern_Subterranean_Termite_-_Reticulitermes_flavipes,_Meadowood_SRMA,_Mason_Neck,_Virginia,_April_7,_2023_(53310004483).jpg'],
  ['Termitas sobre madera (blog)', 'Editor abcdef', 'CC0', 'https://creativecommons.org/publicdomain/zero/1.0/', 'https://commons.wikimedia.org/wiki/File:Termites_on_wood.JPG'],
  ['Casas en Palermo, Montevideo (hogares)', 'Felipe Restrepo Acosta', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0', 'https://commons.wikimedia.org/wiki/File:2016_casas_en_Palermo_Montevideo_fachadas_en_la_calle_Javier_Barrios_Amor%C3%ADn_1037_Uruguay.jpg'],
  ['Interior del Mercado Agrícola de Montevideo (comercios)', 'Fedaro', 'CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0', 'https://commons.wikimedia.org/wiki/File:Mercado_Agricola_Montevideo_interior.jpg'],
  ['Parrilla en el Mercado del Puerto (comercios)', 'Ypsilon from Finland', 'CC0', 'https://creativecommons.org/publicdomain/zero/1.0/', 'https://commons.wikimedia.org/wiki/File:La_chacra_del_puerto_Asado.JPG'],
  ['Araña de los rincones, Loxosceles laeta', 'Sergiosan00709', 'CC BY 3.0', 'https://creativecommons.org/licenses/by/3.0', 'https://commons.wikimedia.org/wiki/File:Loxosceles_Laeta_adult.jpg'],
];
const creditos = legal('creditos/', 'Créditos de imágenes', 'Créditos de imágenes',
  `<p>Las fotos de Uruguay de este sitio vienen de Wikimedia Commons y se usan según su licencia.</p><ul>${CREDITS.map(([t, a, l, lu, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>, por ${a}. ${lu ? `<a href="${lu}" target="_blank" rel="noopener noreferrer">${l}</a>` : l}.</li>`).join('')}</ul><p>La portada es un fotomontaje del carro de Truly Nolen sobre la foto de la Rambla, y la imagen de zonas agrega las marcas de color sobre la foto de Carrasco. Las fotos modificadas mantienen su licencia CC BY-SA. La ilustración del Palacio Salvo es de Truly Nolen.</p>`);

export const PAGES = [home, mosquitos, ratas, cucarachas, hormigas, termitas, arana, hogares, comercios, industria, blog, postTermitas, postMosquito, privacidad, terminos, accesibilidad, creditos];
