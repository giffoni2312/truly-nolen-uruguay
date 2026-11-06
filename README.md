# Truly Nolen Uruguay — borrador

Versión Uruguay de la página de Venezuela (mismo diseño, contenido 100 % uruguayo).

**Ver en línea:** https://giffoni2312.github.io/truly-nolen-uruguay/oficinas/uruguay/ (se actualiza sola en cada push a `main`)

## Comandos
- `node build.mjs`  → genera las 17 páginas en `site/oficinas/uruguay/`
- `node check.mjs`  → revisa restos de Venezuela, tú o voseo (siempre de usted), enlaces rotos, h1, ids y JSON-LD
- `node serve.mjs`  → vista previa en http://localhost:8080/oficinas/uruguay/
- `node tools/sync-venezuela.mjs` → vuelve a bajar el molde de Venezuela (réplica de globaltni.com/es)
- `node tools/trato.mjs` → lista cualquier forma de tú o voseo que quede en el sitio armado
- `node tools/comprobar-5nov.mjs` → revisión con Chrome sin ventana (necesita `PORT=8095 node serve.mjs`); ver `CAMBIOS-2026-11-05-receta.md`

## Dónde se edita
- `src/pages.mjs`   → textos de cada página (portada = molde de Venezuela con lo de Uruguay; Hogares y Comercios = copias de globaltni)
- `src/ortografia.mjs` → correcciones de ortografía que `build.mjs` aplica a todas las páginas
- `src/helpers.mjs` → bloques reutilizables, plagas, fuentes y el número de WhatsApp (constante `WA`)
- `build.mjs`       → menú, footer y textos del chat

## Pendiente (cuando deje de ser borrador)
- Fotos de técnicos uruguayos con uniforme (prompts en `investigacion-uruguay.md`, sección 3)
- WhatsApp +598, razón social y RUT
