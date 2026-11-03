// Corrections from the independent source audit of 3-nov-2026 (every source opened that day).
// Each pair must match exactly once; the script stops on the first miss so nothing is half-applied.
import { readFileSync, writeFileSync } from 'node:fs';
const FIX = {
  'src/pages.mjs': [
    ["'millones de dólares exportaron los lácteos en 2024.'", "'millones de dólares exportaron los lácteos de enero a noviembre de 2025.'"],
    ['de enero a noviembre de 2025: el primer rubro del país.', 'de enero a noviembre de 2025, más que cualquier otro rubro.'],
    ['resultó ser de belostomátidos, insectos que viven en el agua. Identificar bien es el primer paso.', 'resultó ser de belostomátidos, según Alternatus Uruguay: no eran cucarachas. Identificar bien es el primer paso.'],
    ['con un técnico profesional responsable y la habilitación', 'con un técnico universitario responsable y la habilitación'],
    ['hay en Uruguay: 12 según el INIA (2014) y 14 según la Facultad de Agronomía (2023).', 'hay en Uruguay: 12 según la cartilla del INIA (2014) y unas 14 según Martín Bollazzi, de la Facultad de Agronomía, en La Mañana (2023).'],
    ['Hormiga argentina y hormiga negra cortadora (Acromyrmex)', 'Hormiga argentina y hormiga cortadora (Acromyrmex)'],
    ['La hormiga argentina entra a la cocina en filas buscando dulce. La hormiga negra cortadora (Acromyrmex) deja sin hojas los rosales y la huerta.', 'En la cocina aparecen en fila; en el jardín, la hormiga cortadora (Acromyrmex) deja sin hojas los rosales y la huerta.'],
    ["['Hormiga argentina', 'Chica, marrón, en filas largas. Es nativa de la cuenca del Paraná, que incluye a Uruguay.'],", "['Hormiga de la cocina', 'Chica, marrón, en filas largas.'],"],
    ["['Hormiga negra o cortadora',", "['Hormiga cortadora',"],
    ["    ['Nativa', 'La hormiga argentina es nativa de la cuenca del Paraná, que incluye a Uruguay.', 'AntWiki'],\n", ''],
    ['src: [SRC.inia, SRC.laManana, SRC.antwiki],', 'src: [SRC.inia, SRC.laManana],'],
    ["'La Mañana'],", "'La Mañana (2023)'],"],
    ['En Punta del Este, la Intendencia de Maldonado las encontró refugiadas en las palmeras, cerca de los restaurantes.', 'En Punta del Este se esconden arriba de las palmeras y comen los restos que dejan los restaurantes de noche, según la Intendencia de Maldonado (2025).'],
    ["'Montevideo Portal (2026)'", "'Montevideo Portal (27/01/2026)'"],
    ["'volvió a circular el dengue: el primer caso autóctono del año se confirmó el 1 de marzo.'", "'el 1 de marzo el MSP confirmó el primer caso de dengue autóctono del año, en una persona que no había viajado.'"],
    ['El MSP impulsa la campaña «Activate contra el mosquito» con esta misma rutina.', 'En 2018 el MSP lanzó la campaña «Activate contra el mosquito», que pide dar vuelta o vaciar lo que junta agua.'],
    ['Según el MSP, dos de cada tres criaderos están en las casas.', 'Según una lista de verificación del MSP (sin fecha), dos de cada tres criaderos están en las casas.'],
    ['vive detrás de muebles y cuadros, en placares y rincones oscuros. Es la araña de mayor importancia sanitaria en Uruguay.', 'vive en rincones oscuros, detrás de cuadros y muebles. Según un boletín del MSP de 2013, citado por Montevideo Portal (2022), es la de mayor importancia para la salud pública en Uruguay.'],
    ["'Rincones oscuros y tranquilos: detrás de cuadros y muebles, en placares, cajas y ropa guardada.'", "'Según Montevideo Portal, detrás de cuadros, en esquinas y en muebles de madera. La guía de Mendoza (Argentina) suma roperos, ropa poco usada y zapatos.'"],
    ["['Placares y depósitos', 'Lugares tranquilos.', ['Ordenar cajas y ropa acumulada.', 'Aspirar rincones y grietas.']],\n  ] },\n  src: [SRC.arana],", "['Placares y depósitos', 'Lugares tranquilos.', ['Ordenar cajas y ropa acumulada.', 'Aspirar rincones y grietas.']],\n  ], nota: 'Estas recomendaciones siguen la guía del Ministerio de Salud de Mendoza (Argentina), que trabaja con la misma especie: por ejemplo, separar la cama unos 20 cm de la pared y sacudir la ropa y el calzado antes de usarlos.' },\n  src: [SRC.arana, SRC_BLOG.mendoza],"],
    ['En Uruguay, la termita que causa problemas es la subterránea del género Reticulitermes. Llegó desde afuera: lo importante es detectarla a tiempo en tu casa.', 'Según Constantino (2002), en Uruguay la termita plaga es la subterránea del género Reticulitermes, que llegó desde afuera. Lo importante es detectarla a tiempo en tu casa.'],
    ["'Un estudio sobre Reticulitermes flavipes, una de las termitas plaga más importantes del mundo, la menciona como establecida en Uruguay.'", "'Un estudio de 2023 sobre su primer registro en Argentina menciona a Reticulitermes flavipes como ya establecida en Uruguay.'"],
    ['así llega la termita subterránea (UC IPM).', 'así llega la termita subterránea, según la Universidad de California (EE. UU.).'],
    ['Según UC IPM, verlos «no siempre significa»', 'Según la Universidad de California (EE. UU.), verlos «no siempre significa»'],
    ['No usar productos a ciegas: los caseros «generalmente no son efectivos» (UC IPM).', 'No usar productos a ciegas: según la Universidad de California (EE. UU.), los caseros «generalmente no son efectivos».'],
    ["intro: 'Las que más vemos en Uruguay. Cada guía explica las señales y qué hacer, con sus fuentes.'", "intro: 'Seis plagas que conviene conocer en Uruguay. Cada guía explica las señales y qué hacer, con sus fuentes.'"],
    ["flow('Lo que más aparece en las casas de acá.',", "flow('Seis plagas que conviene conocer.',"],
    ['${contacto(DEFAULT_PROMPTS, { zona: true })}`', '${sFuentes([SRC.msp2016, SRC.maldonado2025, SRC.imAlimentos, SRC.inia, SRC.laManana, SRC.constantino, SRC.arana])}\n${contacto(DEFAULT_PROMPTS, { zona: true })}`'],
    ['alt="Técnica de Truly Nolen fumigando los zócalos de un depósito en Montevideo"', 'alt="Técnica fumigando los zócalos de un depósito (imagen ilustrativa)"'],
    ["'Un seguimiento de diez años describió", "'Un seguimiento de diez años, publicado en 2012, describió"],
    ["'El MSP informó una muerte por leptospirosis en Montevideo. La nota explica, con datos de la OPS, que el riesgo sube después de las lluvias.'", "'En 2025 el MSP informó una muerte por leptospirosis en Montevideo. La nota explica, con datos de la OPS, que el riesgo sube después de los días de lluvia.'"],
    ["'El MSP informó una muerte por leptospirosis en Montevideo; según la OPS, citada en la nota, el riesgo sube después de las lluvias.'", "'En 2025 el MSP informó una muerte por leptospirosis en Montevideo; según la OPS, citada en la nota, el riesgo sube después de los días de lluvia.'"],
    ['Los requisitos de habilitación los define la Intendencia de tu departamento.', 'Los requisitos de habilitación los definen la Intendencia de tu departamento y el MSP.'],
    [' (edificio de 1856)', ''],
  ],
  'src/helpers.mjs': [
    ['según la fuente (INIA, 2014, y Facultad de Agronomía, 2023): la «hormiga negra» que deja sin hojas el jardín y la huerta.', 'la que deja sin hojas el jardín y la huerta. Son 12 según la cartilla del INIA (2014) y unas 14 según Martín Bollazzi (Facultad de Agronomía) en La Mañana (2023).'],
    ['En Punta del Este se refugian en las palmeras, cerca de los restaurantes.', 'En Punta del Este se esconden arriba de las palmeras y comen los restos que dejan los restaurantes de noche.'],
    ['Es la araña de mayor importancia sanitaria en Uruguay, según el MSP. Si sospechás', 'Según un boletín del MSP de 2013, citado por Montevideo Portal (2022), es la araña de mayor importancia para la salud pública en Uruguay. Si sospechás'],
    ["card: 'La termita subterránea Reticulitermes llegó", "card: 'Según Constantino (2002), la termita subterránea Reticulitermes llegó"],
    ["['Ministerio de Salud Pública. Lista de verificación", "['Ministerio de Salud Pública (s. f.). Lista de verificación"],
    ["['Ministerio de Salud Pública. Uruguay reafirma", "['Ministerio de Salud Pública (2018). Uruguay reafirma"],
    ["['gub.uy. Guía para elaborar", "['gub.uy (2025). Guía para elaborar"],
    ["['Constantino (2002). Journal of Applied Entomology 126: 355-365', 'https://wiki.pestinfo.org/wiki/Journal_of_Applied_Entomology_-_Zeitschrift_f%C3%BCr_angewandte_Entomologie_(2002)_126,_355-365']", "['Constantino (2002). The pest termites of South America: taxonomy, distribution and status. Journal of Applied Entomology 126: 355-365', 'https://doi.org/10.1046/j.1439-0418.2002.00670.x']"],
    ["'https://complete.bioone.org/journals/journal-of-economic-entomology/volume-116/issue-3/toad076/First-record-of-the-major-termite-pest-species-Reticulitermes-flavipes/10.1093/jee/toad076.full'", "'https://pubmed.ncbi.nlm.nih.gov/37156231/'"],
    ["['Carrijo y col. (2023). Reticulitermes flavipes. Journal of Economic Entomology'", "['Carrijo y col. (2023). Primer registro de Reticulitermes flavipes en Argentina. Journal of Economic Entomology'"],
  ],
  'src/blog-uy.mjs': [
    ["Recomendaciones ante envenenamiento por arácnidos (referencia regional, copia archivada)', 'https://web.archive.org/web/20240305000000*/", "Recomendaciones ante envenenamiento por arácnidos (referencia regional, copia archivada)', 'https://web.archive.org/web/20240305003525/"],
    ["['Ministerio de Salud de Mendoza, Argentina (2017).", "['Ministerio de Salud de Mendoza, Argentina."],
    ['(Argentina, 2017), que trabaja con la misma especie', '(Argentina), que trabaja con la misma especie'],
    ["lead: 'Es la araña que más le importa a la salud pública en Uruguay, según el MSP.", "lead: 'Según un boletín del MSP de 2013, es la araña que más le importa a la salud pública en Uruguay."],
    ['deja una tela irregular y floja en los rincones', 'deja una tela irregular, algodonosa y muy pegajosa en los rincones'],
    ['<h2>Dónde se esconde en una casa uruguaya</h2>', '<h2>Dónde se esconde en la casa</h2>'],
    ['En una casa de acá conviene mirar estos lugares:', 'Según la guía del Ministerio de Salud de Mendoza (Argentina), que trabaja con la misma especie, conviene mirar estos lugares:'],
    ['<li><strong>El galpón del fondo, el entretecho y el sótano</strong>, donde se guardan cajas y herramientas.</li>', '<li><strong>Donde se guardan cajas, ropa o materiales</strong> que no se mueven hace tiempo.</li>'],
    ['detrás de muebles y cuadros, galpones, altillos y sótanos.', 'detrás de muebles y cuadros, y donde se guardan cajas, ropa o materiales que no se mueven hace tiempo.'],
    ['Su veneno es necrosante y el MSP la considera', 'Su veneno es necrosante y un boletín del MSP de 2013 la considera'],
    [' y plantas peladas de un día para el otro, muchas veces de noche.', ' y plantas peladas de un día para el otro.'],
    ['<strong>Filas de hormigas con trozos verdes</strong> en los horarios frescos.', '<strong>Filas de hormigas con trozos verdes</strong> que van y vienen del nido.'],
    ['Las fuentes técnicas coinciden en que el camino es llegar al nido. Los cebos que las propias hormigas llevan al hormiguero son el método más citado.', 'Bollazzi prefiere el cebo, que las obreras llevan al hormiguero y que controla toda la colonia en 15 a 30 días. También advierte que ponerlo muy cerca del nido puede hacerlo fracasar.'],
    [' Una tesis de maestría de la Facultad de Agronomía (2018) también estudió los problemas de eficacia del control con cebos.', ''],
    ["src: ['revistaInia', 'cartillaInia', 'laManana', 'tesisFagro'],", "src: ['revistaInia', 'cartillaInia', 'laManana'],"],
    ['<li>No remover el hormiguero ni tirarle polvo: solo dispersa a la colonia.</li>', '<li>No tirarle polvo al hormiguero: según Bollazzi, controla algunas obreras, pero no a todas.</li>'],
  ],
};
for (const [file, pairs] of Object.entries(FIX)) {
  let s = readFileSync(file, 'utf8');
  for (const [a, b] of pairs) {
    const n = s.split(a).length - 1;
    if (n !== 1) { console.error(`✗ ${file}: found ${n} times: ${a.slice(0, 80)}`); process.exit(1); }
    s = s.replace(a, b);
  }
  writeFileSync(file, s);
  console.log(`✓ ${file}: ${pairs.length} corrections`);
}
