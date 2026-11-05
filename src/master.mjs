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
export const rowsProse = (rows) => rows.map(([t, d, list, id]) => `<p${id ? ` id="${id}"` : ""}><strong>${ensureDot(flat(t))}</strong> ${d}</p>${list ? `<ul>${list.map((x) => `<li>${x}</li>`).join('')}</ul>` : ''}`).join('');

// items: [number, text, source]
export const datoProse = (items) => items.map(([b, p, s]) => `<p><strong>${b}</strong> ${p} ${s ? `<small class="s-fuente">${s}</small>` : ''}</p>`).join('');

export const enlaces = (links) => `<ul class="s-enlaces">${links.map(([l, u]) => `<li><a href="${u}">${l}</a></li>`).join('')}</ul>`;
export const pestLinks = (slugs = PEST_ORDER) => enlaces(slugs.map((s) => [PESTS[s].name, pestUrl(s)]));
export const serviceLinks = (which = ['hogares', 'comercios', 'industria']) => enlaces(which.map((w) => [w[0].toUpperCase() + w.slice(1), `${U}/servicios/${w}/`]));

// The master opens the first question and shows +/− on the right
const answers = (faq) => faq.map(([q, a], i) => `<details class="ux-answer"${i === 0 ? ' open' : ''}><summary><h3>${q}</h3></summary><article><p>${a}</p></article></details>`).join('');
export const preguntas = (faq, h2 = 'Lo que más nos preguntan.') => `<section class="wrap s-section s-preguntas"><h2>${h2}</h2><div class="s-prose">${answers(faq)}</div></section>`;

export const sFuentes = (list) => `<section class="wrap s-section s-fuentes"><h2>De dónde sale esta información.</h2><p class="s-note">Cada dato de esta página viene de una fuente pública que puede revisar.</p><ol>${list.map(([l, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${l}</a></li>`).join('')}</ol></section>`;

export const closing = () => `<section id="contacto" class="s-closing"><div class="wrap"><h2>Cuéntenos qué necesita proteger.</h2><p>Todo empieza por contarnos qué vio. Escríbale a Truly AI aquí mismo o por WhatsApp y le orienta en el siguiente paso.</p><div class="s-closing-actions"><a class="button button-dark" href="#contacto" data-abrir-chat>Escribir en el chat</a><a class="text-link" href="${WA}" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a><a class="text-link" href="${U}/#consulta">Consultar cobertura →</a></div></div></section>`;

// Closing band of the Venezuela home and blog index (globaltni contact band), in usted.
export const contactBand = () => '<section id="contacto" class="contact-band gt-contact" aria-labelledby="contact-title"><span id="consulta"></span><span id="cobertura"></span><div class="wrap contact-layout"><div class="contact-intro"><h2 id="contact-title">Cuéntenos qué necesita proteger.</h2><p>Todo empieza por contarnos qué vio. Escríbale a Truly AI aquí mismo o por WhatsApp y le orienta en el siguiente paso.</p></div><div class="contact-actions"><a class="button button-dark" href="#contacto" data-abrir-chat>Escribir en el chat</a><a class="text-link" href="' + WA + '" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a></div></div></section>';

// sections: [{ h2, html }]
export function pestMaster(slug, { lead, sections }) {
  const p = PESTS[slug];
  const fam = PEST_ORDER.map((s) => `<a href="${pestUrl(s)}"${s === slug ? ' aria-current="page"' : ''}>${PESTS[s].name}</a>`).join('');
  const idx = sections.map((s, i) => `<li><a href="#guia-${i + 1}">${ensureDot(flat(s.h2))}</a></li>`).join('');
  const body = sections.map((s, i) => `<section class="pest-copy" id="guia-${i + 1}"><h2 id="guia-${i + 1}-title">${ensureDot(flat(s.h2))}</h2>${s.html}</section>`).join('');
  return `<div class="wrap pest-wrap"><nav class="pest-breadcrumb" aria-label="Ruta"><a href="${U}/">Inicio</a>${SEP}<span>Guía de plagas</span>${SEP}<span>${p.name}</span></nav><header class="pest-masthead"><div><p class="pest-eyebrow">Guía de plagas</p><h1>${p.name}</h1><p class="pest-lead">${lead}</p><div class="pest-hero-actions"><a class="button" href="#contacto">Conversemos →</a><a class="text-link" href="#guia-1">Explorar esta guía ↓</a></div></div><figure class="pest-figure pest-hero-figure"><img src="${p.img}" alt="${p.alt}"/></figure></header><nav class="pest-families" aria-label="Guía de plagas">${fam}</nav><div class="pest-layout"><aside class="pest-sidebar"><details class="pest-index" id="reading-index"><summary>En esta página <span>−</span></summary><ol>${idx}</ol></details></aside><div class="pest-content">${body}</div></div></div>`;
}

// Commercial/industrial service page as /en/services/commercial/ (ct-*): hero with photo, yellow topic bar,
// then one full-width band per topic (dark and light alternated): kicker + h2, prose and an optional aside list.
// bands: [{ id, kicker, h2, html, aside: { h3, items: [html] } }]
export function ctPage({ crumb, kicker, h1, intro: lead, img, alt, navLabel, bands, navIds }) {
  // navIds (optional): only these bands go in the yellow topic bar, as globaltni lists only its sectors
  const nav = (navIds ? bands.filter((b) => navIds.includes(b.id)) : bands).map((b) => `<a href="#${b.id}">${b.kicker}<span aria-hidden="true">↓</span></a>`).join('');
  const body = bands.map((b, i) => `<section id="${b.id}" class="ct-sector${i % 2 ? '' : ' ct-dark'}" aria-labelledby="${b.id}-title"><div class="ct-wrap"><header class="ct-sector-heading"><p class="ct-kicker">${b.kicker}</p><h2 id="${b.id}-title">${ensureDot(flat(b.h2))}</h2></header><div class="ct-sector-layout${b.aside ? '' : ' ct-no-aside'}"><div class="ct-prose">${b.html}</div>${b.aside ? `<aside class="ct-facilities"><h3>${b.aside.h3}</h3><ul>${b.aside.items.map((x) => `<li>${x}</li>`).join('')}</ul></aside>` : ''}</div></div></section>`).join('');
  return `<nav class="ct-wrap ct-breadcrumb" aria-label="Ruta"><a href="${U}/">Inicio</a>${SEP}<span>Servicios</span>${SEP}<span>${crumb}</span></nav><section class="ct-hero ct-wrap"><div class="ct-hero-copy"><p class="ct-kicker">${kicker}</p><h1 id="ct-title">${h1}</h1><p class="ct-intro">${lead}</p><a class="button" href="#contacto">Hablemos <span aria-hidden="true">→</span></a></div><figure class="ct-hero-photo"><img src="${img}" alt="${alt}"/></figure></section><nav class="ct-sector-nav" aria-label="${navLabel}"><div class="ct-wrap"><span>${navLabel}</span><div>${nav}</div></div></nav>${body}`;
}

// Article body: numbers its h2 (art-N) and returns the index list
export function articleParts(body) {
  let n = 0;
  const items = [];
  const html = body.replace(/<h2>([^<]+)<\/h2>/g, (_, t) => { n++; items.push(`<li><a href="#art-${n}">${t}</a></li>`); return `<h2 id="art-${n}">${t}</h2>`; });
  return { html, index: `<nav class="wrap s-index ux-index" aria-label="En este artículo"><details><summary>En este artículo</summary><ul>${items.join('')}</ul></details></nav>` };
}
export const articleFaq = (faq) => `<h2 class="sin-num">Preguntas frecuentes</h2><div class="s-prose">${answers(faq)}</div>`;
