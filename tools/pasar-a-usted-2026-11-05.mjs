// One-off (5-nov-2026, recipe R3 "siempre de usted"): moves Uruguay's own texts from voseo to usted.
// Uruguayan words stay (mosquito, termitas, apartamento, heladera, canilla, barrio, departamento, placard, galpón).
// Each pair must be found at least once, so a typo stops the script instead of silently skipping a sentence.
// The unused 4-nov Hogares and Comercios content (hogaresPropio, comerciosPropio in src/pages.mjs) is not touched:
// it is no longer shown (recipe R17) and is kept as it was.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const file = (p) => fileURLToPath(new URL(`../src/${p}`, import.meta.url));
const PAIRS = {
  'helpers.mjs': [
    ['Si sospechás una picadura, llamá al CIAT: 1722.', 'Si sospecha una picadura, llame al CIAT: 1722.'],
  ],
  'pages.mjs': [
    // pests (SVC headings and hero h1 are not shown today, converted anyway)
    ["termitas: 'Revisemos la madera<br/>de tu casa.'", "termitas: 'Revisemos la madera<br/>de su casa.'"],
    ["'arana-de-los-rincones': 'Revisemos los rincones<br/>de tu casa.'", "'arana-de-los-rincones': 'Revisemos los rincones<br/>de su casa.'"],
    ['El criadero está más cerca<br/>de lo que pensás.', 'El criadero está más cerca<br/>de lo que piensa.'],
    ["h2: 'Tapá, vaciá<br/>y limpiá.'", "h2: 'Tape, vacíe<br/>y limpie.'"],
    ["'Lo que guardás o se llena solo.'", "'Lo que usted guarda o se llena solo.'"],
    ['Son de hábitos nocturnos: si ves una de día, puede haber muchas escondidas.', 'Son de hábitos nocturnos: si ve una de día, puede haber muchas escondidas.'],
    ["h2: 'Seguí la fila<br/>hasta la entrada.'", "h2: 'Siga la fila<br/>hasta la entrada.'"],
    ['cómo prevenir daños en la madera de tu casa.', 'cómo prevenir daños en la madera de su casa.'],
    ['Lo importante es detectarla a tiempo en tu casa.', 'Lo importante es detectarla a tiempo en su casa.'],
    ['Ante una picadura, llamá al CIAT: 1722.', 'Ante una picadura, llame al CIAT: 1722.'],
    ['Ante la sospecha, llamá al CIAT (1722) o consultá a tu prestador de salud.', 'Ante la sospecha, llame al CIAT (1722) o consulte a su prestador de salud.'],
    // industry
    ['Contanos qué auditorías tenés que cumplir y el equipo te explica cómo se documenta.', 'Cuéntenos qué auditorías tiene que cumplir y el equipo le explica cómo se documenta.'],
    ['Contanos el caso: también se evalúan.', 'Cuéntenos el caso: también se evalúan.'],
    ['Decinos el departamento, la localidad y el tipo de instalación. Te confirmamos si podemos atenderte y cómo coordinar.', 'Indíquenos el departamento, la localidad y el tipo de instalación. Le confirmaremos si podemos atenderle y cómo coordinar.'],
    ["h1: 'Control de plagas<br/>para tu industria.', intro: 'Un programa que parte de conocer tu operación,", "h1: 'Control de plagas<br/>para su industria.', intro: 'Un programa que parte de conocer su operación,"],
    ["navLabel: 'Elegí el tema'", "navLabel: 'Elija el tema'"],
    ['control según tu actividad y registro de cada visita para tus auditorías.', 'control según su actividad y registro de cada visita para sus auditorías.'],
    ['Antes de empezar recibís una propuesta con el alcance, la frecuencia y los registros para tu planta.', 'Antes de empezar recibe una propuesta con el alcance, la frecuencia y los registros para su planta.'],
    ["['Tu planta', 'Rubro, superficie y cantidad de edificios.']", "['Su planta', 'Rubro, superficie y cantidad de edificios.']"],
    ["['Tus auditorías', 'Contanos qué normas o auditorías tenés que cumplir.']", "['Sus auditorías', 'Cuéntenos qué normas o auditorías tiene que cumplir.']"],
    ["['Lo que ves', 'Dónde aparecen las señales y desde cuándo.']", "['Lo que ve', 'Dónde aparecen las señales y desde cuándo.']"],
    // legal
    ['Lo que escribas en el chat de este sitio o por WhatsApp lo recibe y responde Truly AI, el asistente de Truly Nolen International. Usalo para tu consulta sobre control de plagas y no compartas datos sensibles,', 'Lo que escriba en el chat de este sitio o por WhatsApp lo recibe y responde Truly AI, el asistente de Truly Nolen International. Úselo para su consulta sobre control de plagas y no comparta datos sensibles,'],
    ['Ante una picadura o una posible intoxicación, llamá al CIAT (Centro de Información y Asesoramiento Toxicológico) al 1722 o consultá a tu prestador de salud.', 'Ante una picadura o una posible intoxicación, llame al CIAT (Centro de Información y Asesoramiento Toxicológico) al 1722 o consulte a su prestador de salud.'],
    ['Si encontrás una barrera, contanos dónde por el chat o por WhatsApp y la revisamos.', 'Si encuentra una barrera, cuéntenos dónde por el chat o por WhatsApp y la revisamos.'],
  ],
  'blog-uy.mjs': [
    ['Vive tranquila en los rincones oscuros de la casa: te contamos dónde buscarla,', 'Vive tranquila en los rincones oscuros de la casa: le contamos dónde buscarla,'],
    ['Si amanecés con el rosal pelado y un caminito de hojas en el pasto, es la hormiga cortadora. Te contamos qué dice', 'Si amanece con el rosal pelado y un caminito de hojas en el pasto, es la hormiga cortadora. Le contamos qué dice'],
    ['Si encontrás una y podés atraparla sin tocarla, por ejemplo con un frasco, guardala:', 'Si encuentra una y puede atraparla sin tocarla, por ejemplo con un frasco, guárdela:'],
    ['<h2>Qué hacer si sospechás una picadura</h2>', '<h2>Qué hacer si sospecha una picadura</h2>'],
    ['<li><strong>Llamá al CIAT al 1722.</strong>', '<li><strong>Llame al CIAT al 1722.</strong>'],
    ['<li><strong>Consultá a tu prestador de salud</strong>', '<li><strong>Consulte a su prestador de salud</strong>'],
    ['<li><strong>Si podés, llevá la araña</strong>', '<li><strong>Si puede, lleve la araña</strong>'],
    ['<p>Si encontrás más de una araña,', '<p>Si encuentra más de una araña,'],
    ['Escribile a Truly AI por el chat o por WhatsApp, contale dónde la viste y te orienta en el siguiente paso. Para repasar sus señales, entrá a la', 'Escríbale a Truly AI por el chat o por WhatsApp, cuéntele dónde la vio y le orienta en el siguiente paso. Para repasar sus señales, entre a la'],
    ['Ante una sospecha, llamá al CIAT al 1722.', 'Ante una sospecha, llame al CIAT al 1722.'],
    ["'Llamá al CIAT al 1722 y consultá a tu prestador de salud. Si la atrapaste, llevala en un frasco: ayuda a saber qué araña fue.'", "'Llame al CIAT al 1722 y consulte a su prestador de salud. Si la atrapó, llévela en un frasco: ayuda a saber qué araña fue.'"],
    ["'Limpiá seguido los rincones, revisá ropa y zapatos antes de usarlos, no cuelgues ropa contra la pared y ordená placares y galpones.'", "'Limpie seguido los rincones, revise ropa y zapatos antes de usarlos, no cuelgue ropa contra la pared y ordene placares y galpones.'"],
    ['<h2>Las señales en tu jardín</h2>', '<h2>Las señales en su jardín</h2>'],
    ['<p>Mientras tanto, en casa podés:</p>', '<p>Mientras tanto, en casa puede:</p>'],
    ['<h2>Truly AI te ayuda a encontrar el nido</h2>', '<h2>Truly AI le ayuda a encontrar el nido</h2>'],
    ['escribile a Truly AI por el chat o por WhatsApp. Contale qué plantas cortan y dónde ves los caminos, y te orienta en el siguiente paso. Para repasar cómo distinguirlas de la hormiga de la cocina, entrá a la', 'escríbale a Truly AI por el chat o por WhatsApp. Cuéntele qué plantas cortan y dónde ve los caminos, y le orienta en el siguiente paso. Para repasar cómo distinguirlas de la hormiga de la cocina, entre a la'],
  ],
};

let total = 0;
for (const [name, pairs] of Object.entries(PAIRS)) {
  let s = readFileSync(file(name), 'utf8');
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`${name}: no encontré «${a.slice(0, 80)}»`);
    s = s.split(a).join(b);
    total++;
  }
  writeFileSync(file(name), s);
}
console.log(`${total} frases pasadas a usted`);
