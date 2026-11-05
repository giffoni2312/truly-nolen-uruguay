// Recipe R3 (5-nov-2026): always "usted". Lists every "tú" or voseo form left in the visible text of the built site
// (text, alt, aria-label, placeholder, title, meta content, chat texts and the search index).
// Usage: node tools/trato.mjs   (exit code 1 if anything is found). check.mjs uses formasDeTu() too.
// Uruguayan words stay (mosquito, termitas, apartamento, heladera, canilla, barrio, departamento): only the
// form of address changes.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// tú pronouns and possessives, voseo pronoun, and tú/voseo verb forms that are not also usted forms.
const PALABRAS = [
  'tú', 'tu', 'tus', 'te', 'ti', 'contigo', 'vos', 'para ti',
  // tú present / imperative (from Cali's list)
  'puedes', 'necesitas', 'quieres', 'tienes', 'sabes', 'vives', 'vendes', 'abres', 'cierras', 'manipulas', 'notas', 'observas',
  'recibes', 'encuentras', 'haces', 'ves', 'has', 'crees', 'guardas', 'prefieres', 'escríbele', 'escríbenos', 'cuéntanos',
  'cuéntame', 'avísanos', 'pídele', 'pregúntale', 'indícanos', 'revisa', 'tapa', 'lava', 'guarda', 'sella', 'sacude', 'mira',
  'busca', 'haz', 'pon', 'deja', 'mantén', 'cierra', 'limpia', 'evita', 'recoge', 'vacía', 'saca', 'ten', 'usa', 'elige',
  'describe', 'comparte', 'indica', 'conoce', 'reconoce', 'entiende', 'explora', 'consulta', 'llama', 'escribe', 'agenda',
  'aprende', 'lee', 'descubre', 'encuentra', 'intenta', 'activa', 'conversa',
  // voseo with enclitic pronoun (no written accent)
  'contame', 'contanos', 'contale', 'contala', 'decinos', 'decime', 'escribinos', 'escribile', 'escribime', 'avisanos',
  'mandanos', 'llevala', 'llevalo', 'guardala', 'guardalo', 'usalo', 'usala', 'consultalo', 'preguntale', 'fijate', 'acordate',
  'mostranos', 'pasanos', 'llamanos', 'dejanos', 'sacala', 'tirala',
];
// Words ending in an accented vowel or in -ás/-és/-ís that are NOT voseo (adverbs, nouns, usted/third-person forms).
const NO_VOSEO = new Set(['más', 'además', 'jamás', 'atrás', 'detrás', 'demás', 'después', 'través', 'inglés', 'interés', 'francés',
  'japonés', 'ciprés', 'revés', 'país', 'maíz', 'raíz', 'solís', 'jesús', 'está', 'acá', 'allá', 'ahí', 'aquí', 'así', 'allí', 'sí', 'qué',
  'sé', 'dé', 'esté', 'café', 'menú', 'josé', 'perú', 'panamá', 'canadá', 'mamá', 'papá', 'bebé', 'tomás', 'andrés', 'garcía', 'ají', 'colibrí',
  'esquí', 'rubí', 'bambú', 'tabú', 'champú', 'vudú', 'según', 'algún', 'ningún', 'común', 'aún', 'atún', 'será', 'estará', 'podrá',
  'habrá', 'hará', 'dirá', 'tendrá', 'vendrá', 'querrá', 'sabrá', 'saldrá', 'valdrá', 'cabrá', 'irá', 'dará', 'verá', 'pondrá',
  'quizás', 'tamaño', 'vivirá', 'llegará', 'cambiará', 'ayudará', 'mostrará', 'dejará', 'quedará', 'empezará', 'pasará', 'bastará',
  'convendrá', 'proporcionará', 'implementará', 'dividirá', 'realizará', 'contará', 'llamará', 'orientará', 'revisará', 'confirmará',
  'explicará', 'indicará', 'evaluará', 'recibirá', 'tratará', 'volverá', 'brindará', 'enviará', 'trabajará', 'agradecerá',
  'cortés', 'portugués', 'holandés', 'escocés', 'galés', 'danés', 'irlandés', 'finlandés', 'alemán', 'mes', 'ecuatoriano',
  'después', 'ojalá', 'sofá', 'dominó', 'capó', 'buró', 'bonsái', 'jabalí', 'maní', 'frenesí', 'cebú', 'ombú', 'tatú', 'ñandú',
  'yacaré', 'carandá', 'paraná', 'tacuarembó', 'yí', 'arapey', 'guaraní', 'charrúa', 'cuareim', 'aiguá', 'chuy', 'paysandú',
  'palés', 'atlántida', 'piriápolis', 'ombúes', 'rodó', 'pocitos', 'sayago']);
const LISTA = new RegExp(`(?<![\\p{L}])(${PALABRAS.map((w) => w.replace(/ /g, '\\s+')).join('|')})(?![\\p{L}])`, 'giu');
// Voseo present (-ás, -és, -ís) and voseo imperative (-á, -é, -í) with written accent.
const ACENTO = /(?<![\p{L}])(\p{L}+(?:ás|és|ís|á|é|í))(?![\p{L}])/giu;
// Futures (será, podrá...) also end in -rá: they are listed here one by one, so a voseo imperative such as «mirá»
// or «separá» is never skipped by a general rule.
const FUTUROS = /^(?:será|podrá|tendrá|hará|dirá|habrá|sabrá|querrá|saldrá|vendrá|pondrá|valdrá|cabrá|\p{L}+(?:ará|erá|irá))$/u;
const FUTURO_NO = new Set(['separá', 'mirá', 'tirá', 'pará', 'aspirá', 'girá', 'secá', 'cerrá', 'reparará']);
// Tú preterite (viste, atrapaste), pronoun «te» after an infinitive or gerund (atenderte, contándote), negative tú
// subjunctive (no cuelgues, no compartas).
const PRETERITO = /(?<![\p{L}])(\p{L}+(?:aste|iste))(?![\p{L}])/giu;
const PRETERITO_NO = new Set(['triste', 'existe', 'consiste', 'insiste', 'resiste', 'persiste', 'subsiste', 'asiste', 'desiste', 'chiste', 'contraste', 'desgaste', 'baste', 'quiste', 'embiste', 'reviste', 'jurista']);
const ENCLITICO = /(?<![\p{L}])(\p{L}+(?:ar|er|ir|ndo)te)(?![\p{L}])/giu;
const ENCLITICO_NO = /^(?:parte|aparte|reparte|departe|contraparte|marte|baluarte|estandarte|inerte|\p{L}*ierte|\p{L}*uerte)$/iu;
const NEGATIVO = /(?<![\p{L}])no (\p{L}+(?:es|as))(?![\p{L}])/giu;
const NEGATIVO_NO = new Set(['las', 'les', 'todas', 'ellas', 'veces', 'más', 'tres', 'mes', 'meses', 'muchas', 'pocas', 'otras', 'esas', 'estas', 'algunas', 'nuevas']);
// Third-person or usted uses of the same spellings ("se guarda", "el equipo revisa", "sin tapa", "Si encuentra"...).
const TERCERA = /([Ss]e (guarda|usa|encuentra|revisa|limpia|tapa|deja|lava|consulta|busca|evita|indica|conoce)|autoridad revisa|equipo revisa|técnico revisa|(sin|con|la|una) tapa|su consulta|la consulta|una consulta|Si encuentra|Lo que deja|control cambia|los describe|la guarda|que conoce|programa (indica|evita)|que (indica|describe|revisa|encuentra|evita|deja|busca|usa|guarda)|norma (indica|pide)|(la|una|esta) (guía|lista|cartilla|nota) (indica|describe|explica)|lo que (indica|describe)|no busca|: busca|Busca lugares|: deja una|tiempo evita|portada usa|[)] deja|mañana encuentra)/i;

export function textoVisible(html) {
  return html
    .replace(/<script(?![^>]*(?:gt-buscar-indice|tia-textos))[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<section[^>]*s-fuentes[\s\S]*?<\/section>/g, ' ') // source titles are quoted as published
    .replace(/<[^>]+?(?:alt|aria-label|placeholder|title|content)="([^"]*)"[^>]*>/g, ' $1 ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

export function formasDeTu(html) {
  const text = textoVisible(html);
  const out = [];
  const near = (i, n) => text.slice(Math.max(0, i - 50), i + n + 40);
  for (const m of text.matchAll(LISTA)) {
    if (TERCERA.test(text.slice(Math.max(0, m.index - 16), m.index + m[0].length + 14))) continue;
    out.push([m[0], near(m.index, m[0].length)]);
  }
  for (const m of text.matchAll(ACENTO)) {
    const w = m[1].toLowerCase();
    if (NO_VOSEO.has(w)) continue;
    if (FUTUROS.test(w) && !FUTURO_NO.has(w)) continue;
    out.push([m[1], near(m.index, m[1].length)]);
  }
  for (const [re, no] of [[PRETERITO, (w) => PRETERITO_NO.has(w)], [ENCLITICO, (w) => ENCLITICO_NO.test(w)], [NEGATIVO, (w) => NEGATIVO_NO.has(w)]]) {
    for (const m of text.matchAll(re)) if (!no(m[1].toLowerCase())) out.push([m[1], near(m.index, m[1].length)]);
  }
  return out;
}

// CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const ROOT = fileURLToPath(new URL('../site/oficinas/uruguay/', import.meta.url));
  const out = [];
  (function walk(d) {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) { if (f !== 'assets') walk(p); continue; }
      if (f !== 'index.html') continue;
      const page = relative(ROOT, d).split('\\').join('/') || 'portada';
      for (const [w, ctx] of formasDeTu(readFileSync(p, 'utf8'))) out.push(`${page}: «${w}» …${ctx}…`);
    }
  })(ROOT);
  for (const l of out) console.log(l);
  console.log(`${out.length} forma(s) de tú o voseo`);
  process.exit(out.length ? 1 : 0);
}
