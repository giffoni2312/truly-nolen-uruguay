// One-off rewrite (3-nov-2026, second design review): Comercios and Industria move to the master's
// commercial template (ctPage bands), and Hogares keeps only what /en/services/residential/ shows.
// It checks the exact lines it replaces and stops if the file is not as expected.
import { readFileSync, writeFileSync } from 'node:fs';
const FILE = 'src/pages.mjs';
const L = readFileSync(FILE, 'utf8').split('\n');
const at = (n, starts) => { if (!L[n - 1].startsWith(starts)) throw new Error(`line ${n} is not "${starts}": ${L[n - 1].slice(0, 60)}`); };
at(240, "    flow('Seis plagas"); at(245, '    ])),'); at(247, '    sFuentes([SRC.msp2016');
at(263, "    intro(['Servicios', 'Servicio comercial']"); at(299, '    closing(),');
at(314, "    intro(['Servicios', 'Servicio industrial']"); at(351, '    closing(),');

const link = (s) => '`<a href="${U}/plagas/' + s + '/">${PESTS[\'' + s + '\'].name}</a>`';
const comercios = [
  "    ctPage({ crumb: 'Servicio comercial', kicker: 'Servicio comercial', h1: 'Tu negocio,<br/>protegido.', intro: 'Un programa que tiene en cuenta tu local, a tus clientes y el ritmo de tu operación: almacenes, panaderías, parrilladas, rotiserías, farmacias y oficinas.', img: `${A}/uy-comercios.webp`, alt: 'Panadería y confitería moderna en Montevideo, con vitrinas de bizcochos y medialunas', navLabel: 'Elegí el tema', bands: [",
  "      { id: 'servicio', kicker: 'El servicio', h2: 'Control para tu negocio.', html: '<p><strong>¿Qué incluye?</strong> Inspección de las áreas de trabajo y del depósito, control según el rubro y coordinación de horarios y accesos con el encargado.</p><p><strong>¿Cómo sigue?</strong> Registro de hallazgos y recomendaciones. Si tenés varias sucursales, se acuerda el alcance de cada una.</p><p>Antes de empezar recibís una propuesta con el alcance y las condiciones para tu negocio.</p>',",
  "        aside: { h3: '¿Quién se beneficia?', items: ['Almacenes y autoservicios', 'Panaderías y confiterías', 'Rotiserías, parrilladas y restaurantes', 'Farmacias y policlínicas', 'Oficinas'] } },",
  "      { id: 'rubros', kicker: 'Cada rubro', h2: 'Cada punto del proceso.', html: '<p>Cada rubro tiene sus puntos críticos. La inspección los reconoce y define qué hace falta en cada uno.</p>' + rowsProse([",
  "        ['Panaderías y confiterías', 'Recepción, elaboración, depósito y mostrador son una sola operación.'],",
  "        ['Parrilladas y restaurantes', 'Cocina, parrilla y salón.'],",
  "        ['Almacenes y autoservicios', 'Mercadería que entra y sale todos los días.'],",
  "        ['Farmacias, policlínicas y oficinas', 'Espacios con público y protocolos de higiene.'],",
  "      ]), aside: { h3: 'Qué revisamos', items: ['Bolsas de harina y depósitos', 'Hornos, mesadas y zonas calientes', 'Leña y carbón guardados', 'Cámaras de frío y desagües de cocina', 'Depósito y góndolas', 'Zona de residuos y contenedores', 'Archivos, cocinas y áreas de descanso'] } },",
  "      { id: 'norma', kicker: 'La norma', h2: 'Si vendés alimentos, la norma lo pide.', html: rowsProse([",
  "        ['Programa preventivo', 'En Montevideo, las empresas alimentarias deben tener un programa de control preventivo de plagas ante el Servicio de Salubridad Pública.'],",
  "        ['Registros', 'El programa preventivo de Montevideo tiene que dejar anotado el control que se hizo, quién lo hizo y las medidas correctivas.'],",
  "        ['Guía oficial', 'El portal gub.uy publica una guía para elaborar el Plan de Control de Plagas de las empresas alimentarias.'],",
  "        ['Empresa habilitada', 'En Montevideo, las empresas de control de plagas deben registrarse en el Servicio de Salubridad Pública, con un técnico universitario responsable y la habilitación del MSP. El registro se renueva cada 2 años.'],",
  "      ]) + '<p>Los requisitos pueden cambiar según el departamento. Consultá los de la Intendencia que corresponde a tu local.</p>' },",
  "      { id: 'salud', kicker: 'La salud', h2: 'En un negocio de alimentos, una plaga es un riesgo de salud.', html: rowsProse([",
  "        ['Roedores y leptospirosis', 'Un seguimiento de diez años, publicado en 2012, describió la leptospirosis humana en Uruguay como un problema de salud no resuelto.'],",
  "        ['Las lluvias', 'En 2025 el MSP informó una muerte por leptospirosis en Montevideo. La nota explica, con datos de la OPS, que el riesgo sube después de los días de lluvia.'],",
  "        ['Insecticidas que no alcanzan', 'Una revisión de 102 estudios en 23 países encontró reportes de resistencia a 60 ingredientes activos en la cucaracha alemana (2025): aplicar siempre el mismo producto no basta, hay que encontrar dónde se esconde la plaga.'],",
  `      ]), aside: { h3: 'Las plagas que más afectan a un negocio', items: [${link('cucarachas')}, ${link('ratas-y-ratones')}, ${link('mosquitos')}] } },`,
  '    ] }),',
  "    flow('Qué conviene contarnos.', rowsProse([",
  "      ['Tu negocio', 'Contanos el rubro, el tamaño del local y si tenés depósito.'],",
  "      ['Tus horarios', 'Decinos cuándo abrís y cerrás, y en qué horario conviene la visita.'],",
  "      ['Lo que ves', 'Describí las señales, dónde aparecen y desde cuándo.'],",
  '    ])),',
  '    preguntas(comerciosFaq),',
  '    sFuentes([SRC.imAlimentos, SRC.imRegistro, SRC.mspEmpresas, SRC.guiaPlan, SRC.resistencia, SRC.leptoSeguimiento, SRC.leptoLluvia]),',
];
const industria = [
  "    ctPage({ crumb: 'Servicio industrial', kicker: 'Servicio industrial', h1: 'Control de plagas<br/>para tu industria.', intro: 'Un programa que parte de conocer tu operación, de la recepción al despacho: frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística.', img: `${A}/uy-industria.webp`, alt: 'Planta láctea moderna en Uruguay, con el campo verde detrás de los ventanales', navLabel: 'Elegí el tema', bands: [",
  "      { id: 'servicio', kicker: 'El servicio', h2: 'Manejo integrado de plagas.', html: rowsProse([",
  "        ['Diagnóstico', 'Recorrida de la planta, el perímetro y los depósitos para entender qué favorece a cada plaga.'],",
  "        ['Programa', 'Monitoreo con estaciones numeradas, control según tu actividad y registro de cada visita para tus auditorías.'],",
  "        ['Seguimiento', 'Informes de hallazgos, tendencias por zona y medidas correctivas, con visitas según el programa acordado.'],",
  "      ]) + '<p>Antes de empezar recibís una propuesta con el alcance, la frecuencia y los registros para tu planta.</p>',",
  "        aside: { h3: '¿Quién se beneficia?', items: ['Frigoríficos', 'Lácteas', 'Molinos y acopio de granos', 'Celulosa', 'Puertos y logística'] } },",
  "      { id: 'pais', kicker: 'El país', h2: 'Lo que exporta el país.', html: datoProse([",
  "        ['2.444', 'millones de dólares exportó la carne bovina de enero a noviembre de 2025, más que cualquier otro rubro.', 'El Observador (2025)'],",
  "        ['2.103', 'millones de dólares exportó la celulosa de enero a noviembre de 2025.', 'El Observador (2025)'],",
  "        ['848', 'millones de dólares exportaron los lácteos de enero a noviembre de 2025.', 'El Observador (2025)'],",
  '      ]) },',
  "      { id: 'planta', kicker: 'La planta', h2: 'De la recepción al despacho.', html: rowsProse([",
  "        ['Recepción', 'Donde entra la materia prima.'],",
  "        ['Proceso', 'Donde se trabaja el producto.'],",
  "        ['Depósito y silos', 'Donde se guarda.'],",
  "        ['Despacho y perímetro', 'Lo que rodea la planta.'],",
  "      ]), aside: { h3: 'Qué revisamos', items: ['Andenes, puertas de carga y camiones', 'Equipos, desagües y zonas húmedas', 'Áreas con restos de producto', 'Granos, bolsas y pallets', 'Grietas y acumulación de polvo', 'Residuos, pastizales y cercos'] } },",
  "      { id: 'por-que', kicker: 'Por qué', h2: 'Por qué fumigar no basta.', html: rowsProse([",
  "        ['Resistencia', 'Una revisión de 102 estudios en 23 países reporta cucarachas alemanas resistentes a 60 ingredientes activos, sobre todo piretroides y organofosforados.'],",
  "        ['Registros', 'En Montevideo, el programa preventivo de una empresa alimentaria tiene que dejar anotado el control, quién lo hizo y las medidas correctivas.'],",
  "        ['Lluvias', 'En 2025 el MSP informó una muerte por leptospirosis en Montevideo; según la OPS, citada en la nota, el riesgo sube después de los días de lluvia.'],",
  `      ]), aside: { h3: 'Plagas que vigilamos en la industria', items: [${link('ratas-y-ratones')}, ${link('cucarachas')}, ${link('hormigas')}] } },`,
  '    ] }),',
  "    flow('Qué conviene contarnos.', rowsProse([",
  "      ['Tu planta', 'Rubro, superficie y cantidad de edificios.'],",
  "      ['Tus auditorías', 'Contanos qué normas o auditorías tenés que cumplir.'],",
  "      ['Lo que ves', 'Dónde aparecen las señales y desde cuándo.'],",
  '    ])),',
  '    preguntas(industriaFaq),',
  '    sFuentes([SRC.exportaciones, SRC.palomas, SRC.resistencia, SRC.imAlimentos, SRC.leptoLluvia]),',
];
// bottom to top so the earlier line numbers stay valid
L.splice(314 - 1, 350 - 314 + 1, ...industria);
L.splice(263 - 1, 298 - 263 + 1, ...comercios);
L.splice(247 - 1, 1);
L.splice(240 - 1, 245 - 240 + 1);
let s = L.join('\n');
const imp = "  pestMaster, articleParts, articleFaq,\n} from './master.mjs';";
if (!s.includes(imp)) throw new Error('import line not found');
s = s.replace(imp, "  pestMaster, articleParts, articleFaq, ctPage,\n} from './master.mjs';");
writeFileSync(FILE, s);
console.log('✓ Comercios e Industria en el molde comercial; Hogares compacto');
