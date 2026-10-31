// Reusable HTML blocks that reproduce the exact markup/classes of the Venezuela template,
// so the shared CSS (/machotes/assets/*.css) styles the Uruguay pages identically.

export const U = '/oficinas/uruguay';
export const A = `${U}/assets`;
export const SITE = 'https://trulyinbound.ai';
// Central Truly Nolen WhatsApp line (same one the Venezuela page uses). Swap for a +598 number
// once the Uruguay franchise confirms one — this is the ONLY place to change it.
export const WA = 'https://wa.me/15202145675';

const arrow = '<span aria-hidden="true">→</span>';

export const PESTS = {
  mosquitos: {
    name: 'Mosquitos', sub: 'Guía de mosquitos', img: `${A}/uy-plaga-mosquito-foto.webp`,
    alt: 'Mosquito Aedes aegypti, el transmisor del dengue',
    card: 'El Aedes aegypti transmite el dengue y se cría en el agua quieta de casa. En 2024, Uruguay tuvo 661 casos de dengue autóctono.',
  },
  'ratas-y-ratones': {
    name: 'Ratas y ratones', sub: 'Guía de roedores', img: `${A}/uy-plaga-rata-noruega-foto.jpg`,
    alt: 'Rata noruega',
    card: 'En Punta del Este se refugian en las palmeras, cerca de los restaurantes. La Intendencia de Maldonado lo describió como un tema «complicado» (2025).',
  },
  cucarachas: {
    name: 'Cucarachas', sub: 'Guía de cucarachas', img: `${A}/uy-plaga-cucaracha-americana-foto.webp`,
    alt: 'Cucaracha americana',
    card: 'La alemana, chica y de cocina, y la americana, grande y de desagües. En Montevideo, los comercios de alimentos deben tener un programa preventivo de plagas.',
  },
  hormigas: {
    name: 'Hormigas', sub: 'Guía de hormigas', img: `${A}/uy-plaga-hormiga-cortadora-foto.webp`,
    alt: 'Hormiga cortadora cargando un trozo de hoja',
    card: 'En Uruguay hay 14 especies de hormigas cortadoras del género Acromyrmex: la «hormiga negra» que deja sin hojas el jardín y la huerta.',
  },
  termitas: {
    name: 'Termitas', sub: 'Guía de termitas', img: `${A}/uy-plaga-termita-subterranea-foto.jpg`,
    alt: 'Obreras de termita subterránea (Reticulitermes) sobre madera',
    card: 'La termita subterránea Reticulitermes llegó a Uruguay desde afuera y es la única termita plaga seria del país.',
  },
  'arana-de-los-rincones': {
    name: 'Araña de los rincones', sub: 'Guía de la araña de los rincones', img: `${A}/uy-plaga-arana-de-los-rincones-foto.jpg`,
    alt: 'Araña de los rincones (Loxosceles laeta) sobre madera',
    card: 'Es la araña de mayor importancia sanitaria en Uruguay, según el MSP. Si sospechás una picadura, llamá al CIAT: 1722.',
  },
};
export const PEST_ORDER = Object.keys(PESTS);

export const pestUrl = (slug) => `${U}/plagas/${slug}/`;

export function pestGrid({ ey, h2, intro = '', slugs = PEST_ORDER, nota = '' }) {
  const cards = slugs.map((s) => {
    const p = PESTS[s];
    return `<article><a class="g-pl-fig" href="${pestUrl(s)}" aria-label="${p.sub}"><img src="${p.img}" alt="${p.alt}" loading="lazy"/></a><h3>${p.name}</h3><p class="g-pl-sub">${p.sub}</p><p>${p.card}</p><a class="g-mas" href="${pestUrl(s)}">Ver la guía${arrow}</a></article>`;
  }).join('');
  return `<section id="plagas" class="section g g-plagas"><header class="g-cab"><p class="g-ey">${ey}</p><h2>${h2}</h2>${intro ? `<p class="g-intro">${intro}</p>` : ''}</header><div class="g-plagas-grid" style="--n:${slugs.length}">${cards}</div>${nota ? `<p class="g-plagas-nota">${nota}</p>` : ''}</section>`;
}

export function detailHero({ eyebrow, h1, p, img, alt }) {
  return `<section class="section detail-hero"><a class="text-link" href="${U}/">← Volver al inicio</a><div class="story"><div><p class="eyebrow">${eyebrow}</p><h1>${h1}</h1><p>${p}</p><a class="button" href="#contacto">Hablemos</a></div><img src="${img}" alt="${alt}"/></div></section>`;
}

// rows: [tema, significa] or [tema, significa, [checks...]]
export function tabla({ ey, h2, intro = '', rows, cls = 'g-bloque', nota = '' }) {
  const four = rows.some((r) => r[2]);
  const head = `<thead><tr><th scope="col" aria-label="Número"></th><th scope="col">Tema</th><th scope="col">Qué significa</th>${four ? '<th scope="col">Qué revisamos</th>' : ''}</tr></thead>`;
  const body = rows.map((r, i) => `<tr><td class="g-t-n">${String(i + 1).padStart(2, '0')}</td><th scope="row">${r[0]}</th><td data-col="Qué significa">${r[1]}</td>${four ? `<td data-col="Qué revisamos">${r[2] ? `<ul class="g-lista">${r[2].map((c) => `<li>${c}</li>`).join('')}</ul>` : ''}</td>` : ''}</tr>`).join('');
  return `<section class="section g ${cls}"><header class="g-cab"><p class="g-ey">${ey}</p><h2>${h2}</h2>${intro ? `<p class="g-intro">${intro}</p>` : ''}</header><div class="g-tabla-marco"><table class="g-tabla">${head}<tbody>${body}</tbody></table></div>${nota ? `<p class="g-nota">${nota}</p>` : ''}</section>`;
}

// items: [[number, text, source]]
export function dato({ ey, h2, items }) {
  return `<section class="section g g-dato"><header class="g-cab"><p class="g-ey">${ey}</p><h2>${h2}</h2></header><div class="g-dato-fila">${items.map(([b, p, s]) => `<article><b>${b}</b><p>${p}</p><small>${s}</small></article>`).join('')}</div></section>`;
}

// items: [[title, text]]
export function cols({ ey, h2, items, id = '', cls = 'g-esperar', nota = '' }) {
  return `<section${id ? ` id="${id}"` : ''} class="section g ${cls}"><header class="g-cab"><p class="g-ey">${ey}</p><h2>${h2}</h2></header><div class="g-cols g-cols-${items.length}">${items.map(([t, p], i) => `<article><span class="g-n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div>${nota ? `<p class="g-nota">${nota}</p>` : ''}</section>`;
}

export function faqSection(items, { eyebrow = 'Preguntas frecuentes', h2 = 'Lo que más nos preguntan.', id = 'preguntas' } = {}) {
  return `<section${id ? ` id="${id}"` : ''} class="section faq"><div><p class="eyebrow">${eyebrow}</p><h2>${h2}</h2></div><div>${items.map(([q, a]) => `<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></section>`;
}

// list: [[label, url]]
export function fuentes(list) {
  return `<section class="section detail-sources"><div><p class="eyebrow">Fuentes</p><h2>De dónde sale esta información.</h2><p class="nota">Cada dato de esta página viene de una fuente pública que podés revisar.</p></div><ol>${list.map(([l, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${l}</a></li>`).join('')}</ol></section>`;
}

export function servicesCards() {
  return `<section class="section services"><div class="section-heading"><p class="eyebrow">Servicios</p><h2>Revisemos tu caso<br/>en tu espacio.</h2></div><div class="service-grid">
<a class="service" href="${U}/servicios/hogares/"><img src="${A}/uy-hogares.jpg" alt="Cocina moderna de un apartamento en Montevideo con vista a la Rambla" loading="lazy"/><div><span>01</span><h3>Hogares</h3><p>Para tu casa, tu apartamento o tu casa de balneario.</p><span class="service-action">Ver servicio</span></div></a>
<a class="service" href="${U}/servicios/comercios/"><img src="${A}/uy-comercios.jpg" alt="Panadería y confitería moderna en Montevideo" loading="lazy"/><div><span>02</span><h3>Comercios</h3><p>Para tu local, tu equipo y tus clientes.</p><span class="service-action">Ver servicio</span></div></a>
</div></section>`;
}

// prompts: [[label, prompt]]
export function contacto(prompts, { zona = false } = {}) {
  return `<section id="contacto" class="section local-consult g-cierre"><div><span id="consulta"></span><span id="cobertura"></span><p class="eyebrow">Truly Nolen · Uruguay</p><h2>Contanos qué necesitás proteger.</h2><p>Todo empieza contándonos qué viste. Escribile a Truly AI acá mismo o por WhatsApp y te orienta en el siguiente paso.</p>${zona ? `<p class="g-cierre-zona">Decinos tu departamento y tu barrio o localidad para revisar si podemos atenderte y coordinar el siguiente paso. <a class="text-link" href="#contacto" data-abrir-chat data-chat-prompt="Quiero saber si atienden en mi zona. Mi departamento y barrio: ">Consultar mi zona</a></p>` : ''}<div class="contact-channels" style="display:flex;flex-wrap:wrap;align-items:center;gap:16px 28px;align-self:end"><a class="button" href="#contacto" data-abrir-chat>Escribir en el chat</a><a class="text-link" href="${WA}" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a></div></div><div class="marco-entry"><div class="marco-entry-heading"><img src="/oficinas/assets/truly-carrito-asistente.svg" alt="" width="72" height="48" loading="lazy"/><div><h3>Truly AI</h3><p>Asistente virtual · Uruguay</p></div></div><p class="marco-entry-label">¿Por dónde empezamos?</p><div class="marco-starts">${prompts.map(([l, p]) => `<a href="#contacto" data-abrir-chat data-chat-prompt="${p}">${l}${arrow}</a>`).join('')}</div><p class="marco-entry-note">Hablá acá con Truly AI. Si preferís, seguí por WhatsApp.</p></div></section>`;
}

export const DEFAULT_PROMPTS = [
  ['Vi una plaga en mi casa', 'Quiero consultar por actividad de plagas en mi casa.'],
  ['Necesito proteger mi negocio', 'Quiero consultar por un servicio para mi negocio.'],
  ['No sé qué plaga encontré', 'Quisiera ayuda para identificar lo que vi.'],
];

export const GENERAL_FAQ = [
  ['¿Cómo empieza el servicio?', 'El equipo revisa tu consulta, confirma si podemos atenderte y coordina la evaluación que corresponda.'],
  ['¿Puedo pedir atención para mi negocio?', 'Sí. El rubro, los horarios y las condiciones del local ayudan a definir el programa.'],
  ['¿Qué tengo que preparar antes de la visita?', 'Te vamos a indicar las medidas que aplican al servicio y las precauciones para personas y mascotas.'],
  ['¿Cómo sé si llegan a mi zona?', 'Decinos tu departamento, tu barrio o localidad y el tipo de espacio. Te confirmamos si podemos atenderte y cómo coordinar.'],
  ['¿La evaluación tiene costo?', 'Consultalo con el equipo antes de coordinar la visita. El costo y las condiciones dependen de la ubicación y del servicio que necesites.'],
  ['¿Con una visita alcanza?', 'El equipo define el alcance y el seguimiento después de evaluar tu situación. Las visitas y condiciones se explican en la propuesta.'],
];

// Sources used across several pages
export const SRC = {
  oms: ['Organización Mundial de la Salud. Dengue y dengue grave', 'https://www.who.int/es/news-room/fact-sheets/detail/dengue-and-severe-dengue'],
  msp2016: ['Ministerio de Salud Pública (2016). Boletín epidemiológico: informe del brote de dengue en Uruguay', 'https://www.gub.uy/ministerio-salud-publica/sites/ministerio-salud-publica/files/documentos/publicaciones/Extracto%20bolet%C3%ADn%20epid%20nov%202016%20Informe%20brote%20de%20Dengue%20en%20Uruguay_0.pdf'],
  mspCriaderos: ['Ministerio de Salud Pública. Lista de verificación y prevención para el control de criaderos de Aedes aegypti', 'https://www.gub.uy/sistema-nacional-emergencias/sites/sistema-nacional-emergencias/files/documentos/publicaciones/LISTA%20DE%20VERIFICACI%C3%93N%20Y%20PREVENCI%C3%93N%20PARA%20EL%20CONTROL%20DE%20CRIADEROS%20DE%20Aedes%20aegypti%20del%20MSP.pdf'],
  mspActivate: ['Ministerio de Salud Pública. Uruguay reafirma su meta de continuar libre de casos autóctonos de dengue', 'https://www.gub.uy/ministerio-salud-publica/comunicacion/noticias/uruguay-reafirma-su-meta-de-continuar-libre-de-casos-autoctonos-de-dengue'],
  subrayado2024: ['Subrayado (2024). Dengue en Uruguay: casos autóctonos e importados', 'https://www.subrayado.com.uy/dengue-a840/4'],
  maldonado2025: ['Montevideo Portal (15/10/2025). Intendencia de Maldonado y su combate con ratas en Punta del Este y el Centro', 'https://www.montevideo.com.uy/Noticias/-Complicado--Intendencia-de-Maldonado-y-su-combate-con-ratas-en-Punta-del-Este-y-Centro-uc939919'],
  parqueRodo: ['Montevideo Portal. La IM activó un operativo de limpieza por tercera vez en el Parque Rodó ante invasión de ratas', 'https://www.montevideo.com.uy/Noticias/IM-activo-operativo-de-limpieza-por-tercera-vez-en-el-Parque-Rodo-ante-invasion-de-ratas-uc951193'],
  imAlimentos: ['Intendencia de Montevideo. Trámites: programa de control preventivo de plagas y habilitación bromatológica', 'https://tramites.montevideo.gub.uy/print/pdf/node/38711'],
  imRegistro: ['Intendencia de Montevideo. Trámites: registro de empresas de control de insectos y roedores', 'https://tramites.montevideo.gub.uy/print/pdf/node/24613'],
  mspEmpresas: ['gub.uy. Habilitación y registro de empresas de control de plagas domisanitarios (MSP)', 'https://www.gub.uy/tramites/habilitacion-registro-empresas-control-plagas-domisanitarios'],
  cucarachasMP: ['Montevideo Portal. «Invasión de cucarachas» en Montevideo y Canelones: por qué se da y qué especie son', 'https://www.montevideo.com.uy/Noticias/Invasion-de-cucarachas-en-Montevideo-y-Canelones--por-que-se-da-y-que-especie-son--uc882108'],
  inia: ['INIA (2024). Cartilla 36: hormigas cortadoras del género Acromyrmex', 'https://www.inia.uy/sites/default/files/publications/2024-10/inia-cartilla36-Acromyrmex.pdf'],
  laManana: ['La Mañana. Hormigas cortadoras en Uruguay, con Martín Bollazzi (Facultad de Agronomía, UdelaR)', 'https://www.xn--lamaana-7za.uy/?p=48346'],
  antwiki: ['AntWiki. Linepithema humile (hormiga argentina)', 'https://antwiki.org/wiki/Linepithema_humile'],
  ucipm: ['Universidad de California, UC IPM (2025). Termitas (guía en español, referencia general)', 'https://ipm.ucanr.edu/home-and-landscape/spanish/termitas/'],
  constantino: ['Constantino (2002). Journal of Applied Entomology 126: 355-365', 'https://wiki.pestinfo.org/wiki/Journal_of_Applied_Entomology_-_Zeitschrift_f%C3%BCr_angewandte_Entomologie_(2002)_126,_355-365'],
  aber: ['Revista de Agricultura. Referencia a Aber y Fontes (1993), Reticulitermes en Uruguay', 'https://revistadeagricultura.org.br/index.php/revistadeagricultura/article/view/3404'],
  carrijo: ['Carrijo y col. (2023). Reticulitermes flavipes. Journal of Economic Entomology', 'https://complete.bioone.org/journals/journal-of-economic-entomology/volume-116/issue-3/toad076/First-record-of-the-major-termite-pest-species-Reticulitermes-flavipes/10.1093/jee/toad076.full'],
  arana: ['Montevideo Portal (21/10/2022). Araña de los rincones en Uruguay: la mayoría de los casos son leves', 'https://www.montevideo.com.uy/Archivo/Mayoria-de-casos-con-arana-en-Uruguay-que-dejo-victimas-en-Argentina-son-leves--uc836048'],
  exportaciones: ['El Observador (2025). Exportaciones de Uruguay: los rubros que superaron los US$ 2.000 millones', 'https://www.elobservador.com.uy/agro/ingresos-exportaciones-dos-rubros-pasaron-los-us-2000-millones-y-el-top-ten-solo-uno-no-es-del-campo-n6026756'],
  uruguayXXI: ['Uruguay XXI. Informe de exportaciones', 'https://www.uruguayxxi.gub.uy/uploads/informacion/75e1462ccae255a798c7264d361d006bab5e613e.pdf'],
  palomas: ['El Observador (2012). Gavilanes entrenados ahuyentan el 80 % de las palomas en tres plazas', 'https://www.elobservador.com.uy/nota/gavilanes-entrenados-ahuyentan-80-de-palomas-en-tres-plazas--201242320330'],
};
