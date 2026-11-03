// Inner-page blocks with the same markup and classes as the master (globaltni.com/en), copied from
// the current Venezuela draft: s-intro, s-lead-pair, s-flow, s-preguntas, s-fuentes, s-closing,
// pest-* and article-body. Prose only: the master has no tables on service, pest or article pages.
import { U, WA, PESTS, PEST_ORDER, pestUrl } from './helpers.mjs';

export const flat = (s) => s.replace(/<br\/>/g, ' ').replace(/\s+/g, ' ').trim();
const ensureDot = (s) => (/[.!?…»:]$/.test(s) ? s : `${s}.`);
const SEP = '<span aria-hidden="true">/</span>';

export function intro(trail, h1, after = '') {
  const parts = [`<a href="${U}/">Inicio</a>`, ...trail];
  return `<section class="wrap s-intro"><nav aria-label="Ruta">${parts.join(SEP)}</nav><h1>${h1}</h1>${after}</section>`;
}

// paras: array of HTML paragraphs (already wrapped or plain text)
export function leadPair({ h2, paras, note = '', img, alt }) {
  const ps = paras.map((p) => (p.startsWith('<') ? p : `<p>${p}</p>`)).join('');
  return `<section class="wrap s-section s-lead-pair"><article class="s-prose"><h2>${flat(h2)}</h2></article><article class="s-prose">${ps}${note ? `<p class="s-note">${note}</p>` : ''}</article><figure class="s-figure"><img src="${img}" alt="${alt}"/></figure><a class="button s-service-action" href="#contacto">Hablemos →</a></section>`;
}

export const flow = (h2, inner) => `<section class="wrap s-section s-flow"><h2>${ensureDot(flat(h2))}</h2><article class="s-prose">${inner}</article></section>`;

// rows: [title, text] or [title, text, [list]] -> "<strong>Title.</strong> text" (+ list)
export const rowsProse = (rows) => rows.map(([t, d, list]) => `<p><strong>${ensureDot(flat(t))}</strong> ${d}</p>${list ? `<ul>${list.map((x) => `<li>${x}</li>`).join('')}</ul>` : ''}`).join('');

// items: [number, text, source]
export const datoProse = (items) => items.map(([b, p, s]) => `<p><strong>${b}</strong> ${p} <small class="s-fuente">${s}</small></p>`).join('');

export const enlaces = (links) => `<ul class="s-enlaces">${links.map(([l, u]) => `<li><a href="${u}">${l}</a></li>`).join('')}</ul>`;
export const pestLinks = (slugs = PEST_ORDER) => enlaces(slugs.map((s) => [PESTS[s].name, pestUrl(s)]));
export const serviceLinks = (which = ['hogares', 'comercios', 'industria']) => enlaces(which.map((w) => [w[0].toUpperCase() + w.slice(1), `${U}/servicios/${w}/`]));

const answers = (faq) => faq.map(([q, a]) => `<details class="ux-answer"><summary><h3>${q}</h3></summary><article><p>${a}</p></article></details>`).join('');
export const preguntas = (faq, h2 = 'Lo que más nos preguntan.') => `<section class="wrap s-section s-preguntas"><h2>${h2}</h2><div class="s-prose">${answers(faq)}</div></section>`;

export const sFuentes = (list) => `<section class="wrap s-section s-fuentes"><h2>De dónde sale esta información.</h2><p class="s-note">Cada dato de esta página viene de una fuente pública que podés revisar.</p><ol>${list.map(([l, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${l}</a></li>`).join('')}</ol></section>`;

export const closing = () => `<section id="contacto" class="s-closing"><div class="wrap"><h2>Contanos qué necesitás proteger.</h2><p>Todo empieza contándonos qué viste. Escribile a Truly AI acá mismo o por WhatsApp y te orienta en el siguiente paso.</p><div class="s-closing-actions"><a class="button button-dark" href="#contacto" data-abrir-chat>Escribir en el chat</a><a class="text-link" href="${WA}" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a><a class="text-link" href="${U}/#consulta">Consultar cobertura →</a></div></div></section>`;

// sections: [{ h2, html }]
export function pestMaster(slug, { lead, sections }) {
  const p = PESTS[slug];
  const fam = PEST_ORDER.map((s) => `<a href="${pestUrl(s)}"${s === slug ? ' aria-current="page"' : ''}>${PESTS[s].name}</a>`).join('');
  const idx = sections.map((s, i) => `<li><a href="#guia-${i + 1}">${ensureDot(flat(s.h2))}</a></li>`).join('');
  const body = sections.map((s, i) => `<section class="pest-copy" id="guia-${i + 1}"><h2 id="guia-${i + 1}-title">${ensureDot(flat(s.h2))}</h2>${s.html}</section>`).join('');
  return `<div class="wrap pest-wrap"><nav class="pest-breadcrumb" aria-label="Ruta"><a href="${U}/">Inicio</a>${SEP}<span>Guía de plagas</span>${SEP}<span>${p.name}</span></nav><header class="pest-masthead"><div><p class="pest-eyebrow">Guía de plagas</p><h1>${p.name}</h1><p class="pest-lead">${lead}</p><div class="pest-hero-actions"><a class="button" href="#contacto">Hablemos →</a><a class="text-link" href="#guia-1">Explorar esta guía ↓</a></div></div><figure class="pest-figure pest-hero-figure"><img src="${p.img}" alt="${p.alt}"/></figure></header><nav class="pest-families" aria-label="Guía de plagas">${fam}</nav><div class="pest-layout"><aside class="pest-sidebar"><details class="pest-index" id="reading-index"><summary>En esta página <span>−</span></summary><ol>${idx}</ol></details></aside><div class="pest-content">${body}</div></div></div>`;
}

// Article body: numbers its h2 (art-N) and returns the index list
export function articleParts(body) {
  let n = 0;
  const items = [];
  const html = body.replace(/<h2>([^<]+)<\/h2>/g, (_, t) => { n++; items.push(`<li><a href="#art-${n}">${t}</a></li>`); return `<h2 id="art-${n}">${t}</h2>`; });
  return { html, index: `<nav class="wrap s-index ux-index" aria-label="En este artículo"><details><summary>En este artículo</summary><ul>${items.join('')}</ul></details></nav>` };
}
export const articleFaq = (faq) => `<h2 class="sin-num">Preguntas frecuentes</h2><div class="s-prose">${answers(faq)}</div>`;
