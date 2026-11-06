// One-off edit (receta 4-nov-2026, paso 6c): add globaltni's 4 commercial sectors to the Comercios page,
// point the home rows to each sector, and add globaltni's commercial page as a source.
// Texts come from https://globaltni.com/es/services/commercial/ (official Spanish), rewritten in Uruguayan "vos".
import { readFileSync, writeFileSync } from 'node:fs';
const F = 'src/pages.mjs';
let p = readFileSync(F, 'utf8');
const rep = (a, b) => { if (p.split(a).length !== 2) throw new Error('not unique: ' + a.slice(0, 80)); p = p.replace(a, b); };

const SECTORES = `      { id: 'sector-salud', kicker: 'Salud', h2: 'El cuidado empieza con la prevención.', html: '<p>Quienes dirigen residenciales de larga estadía, centros de emergencia y centros de rehabilitación física o mental tienen que sostener el nivel más alto de higiene mientras atienden a personas vulnerables.</p><p>El Truly Elite Protection System (TEPS) se desarrolló para instalaciones de salud, donde el servicio tiene que ir más allá del control: prevenir y minimizar el riesgo de plagas y de contaminación química.</p><p>Cada servicio se puede auditar y deja la documentación que piden las normas del sector y los protocolos más exigentes.</p><p><a class="text-link" href="\${GT}/services/teps/" target="_blank" rel="noopener noreferrer">Conocé el programa TEPS&nbsp;→</a></p>',
        aside: { h3: '¿Quién se beneficia?', items: ['Laboratorios de diagnóstico', 'Hospitales y sanatorios', 'Residenciales de larga estadía', 'Centros de emergencia', 'Centros de rehabilitación', 'Consultorios médicos', 'Centros de atención y tratamiento de pacientes', 'Depósitos de insumos médicos'] } },
      { id: 'sector-industria', kicker: 'Industrias', h2: 'Protección en cada operación.', html: '<p>En plantas, laboratorios y depósitos, TEPS suma prevención y baja la posibilidad de actividad de plagas o de contaminación química en la producción.</p><p>Es un servicio auditable de punta a punta: los registros quedan listos para lo que exija cada cliente.</p><p><a class="text-link" href="\${U}/servicios/industria/">Ver el servicio para industrias&nbsp;→</a></p>',
        aside: { h3: '¿Quién se beneficia?', items: ['Plantas de procesamiento de alimentos', 'Almacenamiento y distribución de alimentos', 'Envasado y reenvasado de alimentos', 'Proveedores de la industria alimentaria', 'Laboratorios farmacéuticos', 'Catering', 'Hoteles', 'Hospitales', 'Cadenas de comida rápida', 'Supermercados', 'Archivo de documentos', 'Otras industrias'] } },
      { id: 'sector-alimentos', kicker: 'Venta de alimentos', h2: 'Cuidar donde se encuentran personas y alimentos.', html: '<p>Los locales que venden alimentos están entre los más difíciles al planificar higiene y manejo de plagas: tienen que entregar productos seguros en un lugar limpio y libre de plagas.</p><p>Para supermercados, panaderías y restaurantes, TEPS va más allá de una aplicación puntual y pone el foco en anticiparse a la plaga.</p><p>Las visitas quedan registradas y sirven para una inspección o para la auditoría de tu propia cadena.</p>',
        aside: { h3: '¿Quién se beneficia?', items: ['Supermercados', 'Hipermercados', 'Centros de distribución', 'Locales de comida rápida', 'Restaurantes', 'Panaderías y confiterías'] } },
      { id: 'sector-logistica', kicker: 'Logística', h2: 'Los productos viajan. La protección los acompaña.', html: '<p>Para toda empresa que mueve mercadería todos los días: si exportás, importás o trasladás productos de un lugar a otro, Truly Nolen International trabaja para que la carga no se contamine con plagas.</p><p>En depósitos, terminales y flotas, TEPS prioriza la prevención antes que la reacción.</p><p>Cada intervención deja constancia escrita, con el detalle que piden tus clientes y los estándares del rubro.</p>',
        aside: { h3: '¿Quién se beneficia?', items: ['Empresas de transporte', 'Agentes de carga', 'Transportistas', 'Operadores logísticos', 'Parques logísticos', 'Logística de abastecimiento', 'Logística de producto', 'Logística de ventas'] } },
`;
rep(`      { id: 'rubros', kicker: 'Cada rubro',`, SECTORES + `      { id: 'rubros', kicker: 'Cada rubro',`);

// closing of the sectors, as globaltni: "Cada industria merece atención." + "Más formas de proteger tu mundo."
const OTROS = `      { id: 'otros', kicker: 'Otros rubros', h2: 'Cada industria merece atención.', html: '<p>Si tu actividad no está en estos sectores, no te preocupes: Truly Nolen International también tiene clientes en turismo, educación, fabricación, catering y mucho más. Contanos qué hacés y te orientamos.</p>',
        aside: { h3: 'Más formas de proteger tu mundo', items: [\`<a href="\${U}/servicios/hogares/">Servicio para hogares</a>\`, \`<a href="\${GT}/services/sanitization/" target="_blank" rel="noopener noreferrer">Sanitización</a>\`, \`<a href="\${GT}/services/teps/" target="_blank" rel="noopener noreferrer">Programa TEPS</a>\`] } },
`;
const FIN_SALUD = "'Las plagas que más afectan a un negocio'";
const i = p.indexOf(FIN_SALUD); if (i < 0 || p.indexOf(FIN_SALUD, i + 1) >= 0) throw new Error('fin salud');
const j = p.indexOf('\n    ] }),\n', i); if (j < 0) throw new Error('fin bands');
p = p.slice(0, j + 1) + OTROS + p.slice(j + 1);

// home rows: one per globaltni sector, each to its own anchor; Industria keeps its own page
rep('<a class="g-sector" href="${U}/servicios/comercios/#sector-almacenes"><span><h3>Almacenes y autoservicios</h3><p>Mercadería que entra y sale todos los días: depósito, góndolas y zona de residuos.</p></span>${arrow}</a>',
    '<a class="g-sector" href="${U}/servicios/comercios/#sector-salud"><span><h3>Salud</h3><p>Hospitales, sanatorios, residenciales, laboratorios y consultorios.</p></span>${arrow}</a>');
rep('<a class="g-sector" href="${U}/servicios/comercios/#sector-panaderias"><span><h3>Panaderías y restaurantes</h3><p>Recepción, elaboración, depósito y salón: bolsas de harina, hornos, parrilla y desagües de cocina.</p></span>${arrow}</a>',
    '<a class="g-sector" href="${U}/servicios/comercios/#sector-alimentos"><span><h3>Venta de alimentos</h3><p>Supermercados, panaderías, restaurantes y locales de comida rápida.</p></span>${arrow}</a>');
rep('<a class="g-sector" href="${U}/servicios/comercios/#sector-farmacias"><span><h3>Farmacias, policlínicas y oficinas</h3><p>Espacios con público y protocolos de higiene: depósitos, archivos y cocinas del personal.</p></span>${arrow}</a>',
    '<a class="g-sector" href="${U}/servicios/comercios/#sector-logistica"><span><h3>Logística</h3><p>Depósitos, transporte de carga, agentes de carga y operadores logísticos.</p></span>${arrow}</a>');

rep('sFuentes([SRC.imAlimentos, SRC.imRegistro,', 'sFuentes([SRC.gtComercial, SRC.imAlimentos, SRC.imRegistro,');
writeFileSync(F, p);

const H = 'src/helpers.mjs';
let h = readFileSync(H, 'utf8');
const anchor = '  guiaPlan: [';
if (h.split(anchor).length !== 2) throw new Error('helpers anchor');
h = h.replace(anchor, "  gtComercial: ['Truly Nolen International (2026). Servicio comercial: salud, industrias, venta de alimentos y logística', 'https://globaltni.com/es/services/commercial/'],\n" + anchor);
writeFileSync(H, h);
console.log('ok');
