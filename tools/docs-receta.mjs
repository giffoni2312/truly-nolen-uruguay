// Recipe steps 2 and 9: writes docs/design/oficinas/uruguay/investigacion.md and app/src/inbound/oficinas/uruguay.json
// from the data the site already uses (src/helpers.mjs, src/blog-uy.mjs, assets). Nothing new is invented here:
// every source comes from the project; what is missing is written down as missing.
// Usage: node tools/docs-receta.mjs
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { SRC, PESTS, WA } from '../src/helpers.mjs';
import { POSTS_UY, SRC_BLOG } from '../src/blog-uy.mjs';

const A = 'site/oficinas/uruguay/assets';
const sha = (f) => (existsSync(f) ? createHash('sha256').update(readFileSync(f)).digest('hex') : null);
const link = ([t, u]) => `- ${t} — ${u}`;

// ---------- investigacion.md (recipe step 2: 1 contacto · 2 trato · 3 plagas · 4 normas · 5 negocios y territorio · 6 lugares) ----------
const plagas = Object.entries(PESTS).map(([slug, p]) => `- **${p.name}** (\`${slug}\`): ${p.card}`).join('\n');
const inv = `# Investigación · Truly Nolen Uruguay

> Formato del paso 2 de la receta Truly Inbound. Armado con las fuentes que ya usa el sitio (\`src/helpers.mjs\`,
> \`src/blog-uy.mjs\`). Cada cifra del sitio fue revisada contra su fuente por auditores independientes (3 y 4-nov-2026).

## 1. Contacto y mejoras
- País **sin oficina** (Anexo F, como Venezuela): atiende Truly AI por chat y WhatsApp (${WA}).
- Sin teléfono local, dirección, horario, precios ni garantías: no hay oficina que los publique.
- Sitio actual de la oficina: no existe. «Lo que el sitio nuevo tiene que hacer mejor»: no aplica.

## 2. Trato
- Voseo rioplatense en todo el sitio (querés, tenés, contanos). Detalle en \`voz-humana/voz-card.md\`.
- No hay textos de una oficina uruguaya para citar (pendiente si el dueño los comparte).

## 3. Plagas con nombre local y fuente
${plagas}

## 4. Normas
${[SRC.imAlimentos, SRC.imRegistro, SRC.mspEmpresas, SRC.guiaPlan].map(link).join('\n')}

## 5. Negocios típicos y división territorial
- Negocios: almacenes y autoservicios, panaderías y confiterías, rotiserías y parrilladas, farmacias y policlínicas, oficinas; industria: frigoríficos, lácteas, molinos, acopio de granos, celulosa, puertos y logística.
- Exportaciones (rubros de industria): ${SRC.exportaciones[0]} — ${SRC.exportaciones[1]}
- División territorial: 19 departamentos; el filtro de cobertura pide departamento y barrio o localidad.

## 6. Lugares para la portada (Anexo B)
- Elegido: **Teatro Solís, Montevideo** (foto de referencia libre de derechos; el sitio no usa La Mano por derechos de autor vigentes).
- Otros revisados: Rambla de Montevideo, Faro de Punta Carretas, Palacio Legislativo, Colonia del Sacramento.

## Fuentes del sitio
${Object.values(SRC).map(link).join('\n')}
${Object.values(SRC_BLOG).map(link).join('\n')}

## Comprobación propia
- Auditoría de textos (3-nov-2026): 17 fallas encontradas y corregidas (atribuciones fieles, frases repetidas, «auto» en vez de «carro»).
- Atribuciones «Según…» revisadas abriendo la fuente.

## Lo que no encontré
- Página de trámites de la Intendencia de Montevideo (nodos 38711 y 24613): no abría el 3-nov-2026; se dejó solo lo seguro.
- AntWiki (hormiga argentina en Uruguay): bloqueó la consulta; la tarjeta usa «hormiga de la cocina».
- Textos propios de una oficina uruguaya de Truly Nolen: no existen.
`;
mkdirSync('docs/design/oficinas/uruguay', { recursive: true });
writeFileSync('docs/design/oficinas/uruguay/investigacion.md', inv);

// ---------- uruguay.json (recipe step 9, Anexo C), shape of a country WITHOUT office ----------
const ficha = {
  id: 'uruguay', title: 'Uruguay', country: 'Uruguay', language: 'es', base: 'colombia',
  landmark: 'Teatro Solís, Montevideo', localArea: 'Montevideo y el interior',
  chatIdioma: 'Uruguayan Spanish with voseo (contame, tenés, querés, escribinos), warm and professional; never tú verb forms, never usted.',
  tratoVetado: ['usted', 'Usted', 'tú', 'Tú', 'puedes', 'necesitas', 'quieres', 'Cuéntenos', 'Escríbale', 'Indique'],
  contacto: { whatsappTrulyAI: WA },
  pelicula: {
    videoStatus: 'pendiente', landmark: 'Teatro Solís, Montevideo',
    nota: 'Video de Gemini tal cual, agrandado a 4K en Colab con RealESRGAN_x4plus (3840x2160, 10 s). Falta el video vertical que ruede y los bigotes al 70 %. El logo de la puerta espera el método nuevo (paquete 3-nov tarde).',
    video: { file: `${A}/uruguay-desktop.mp4`, sha256: sha(`${A}/uruguay-desktop.mp4`), width: 3840, height: 2160, duration: 10 },
    movil: { file: `${A}/uruguay-movil.mp4`, sha256: sha(`${A}/uruguay-movil.mp4`), width: 2160, height: 3840 },
    poster: `${A}/uruguay-desktop.webp`,
  },
  footer: { estado: 'listo', file: `${A}/footer-uruguay.webp`, sha256: sha(`${A}/footer-uruguay.webp`), origen: 'Acuarela del Teatro Solís hecha con Gemini (la receta pide Midjourney: pendiente).' },
  casaZonas: { file: `${A}/uruguay-casa-zonas.webp`, alt: 'Casa moderna de Punta del Este con el interior en rojo, el perímetro en amarillo y el jardín en verde', origen: 'Gemini + etiquetas (la receta pide Midjourney: pendiente).' },
  fotoOperacion: { file: `${A}/uy-operacion.webp`, origen: 'Gemini 4-nov-2026 con la foto de capacitación de globaltni como referencia del uniforme; emblema real (tn-emblema.png) bordado en el pecho y en la gorra con tools/fotos-tecnico-2026-11-04/logos.py; carnet al revés.' },
  paginas: {
    servicios: ['hogares', 'comercios', 'industria'],
    plagas: Object.keys(PESTS),
  },
  blog: { porDia: 2, publicados: POSTS_UY.map((p) => p.slug) },
  seo: { url: 'https://giffoni2312.github.io/truly-nolen-uruguay/oficinas/uruguay/', indexar: false, imagen: `${A}/uruguay-social.jpg` },
  ruta: { aprobado: { portada: '2026-11-02', carro: null, revision: null } },
  pendientes: ['Candados oficiales (capa-oficinas)', 'Video 4K y vertical', 'Fotos con Midjourney', 'Foto de sanitización'],
};
mkdirSync('app/src/inbound/oficinas', { recursive: true });
writeFileSync('app/src/inbound/oficinas/uruguay.json', JSON.stringify(ficha, null, 2) + '\n');
console.log('ok investigacion.md y uruguay.json');
