# Uruguay con la receta del 5-nov-2026 — qué se hizo

Todo en **local**, rama `portada-video`. **Sin push y sin publicar**: Carlos tiene que dar permiso antes.
Modelo: Cali (`truly-cali/CAMBIOS-2026-11-05-receta.md`, commits 5e1edd4, ca38d21, 56aae41 y cab479e).

Respaldo previo completo: `respaldos/2026-11-05-antes-receta-5nov/` (site entero con el molde viejo de Venezuela, src, docs,
receta, build, check, serve, prepare-pages, README, RETOMAR, tools/*.mjs, el commit de partida en `HEAD.txt` y los cambios
del 4-nov sin commit en `cambios-sin-commit-4nov.diff`). No se borró nada.

## Cómo se hizo
1. `node tools/sync-venezuela.mjs` volvió a bajar el molde de Venezuela (39 archivos nuevos o cambiados). Es igual, byte
   por byte, al que usó Cali hoy (`truly-cali/referencia/site/oficinas/venezuela/`).
2. `build.mjs` arma tres tipos de página:
   - **Portada:** el `<main>` de Venezuela con lo de Uruguay cambiado (`replace` en `src/pages.mjs`).
   - **Hogares y Comercios:** el `<main>` de Venezuela tal cual (copias de globaltni), con los enlaces llevados a Uruguay.
   - **El resto** (6 plagas, Industria, blog, legales, créditos): el `<main>` propio de Uruguay, con el marcado de Venezuela.
3. `src/replica.css` (3-nov) ya no se aplica entero. Sus reglas generales pisaban la réplica nueva (R19). Ahora solo se usan
   las reglas de los bloques propios de Uruguay (tarjetas de especies, bandas de Industria y la línea de fuente), y solo en
   las páginas propias. El archivo sigue igual.

## Lo que quedó
- **Encabezado, franja gris, desplegables, lupa, pie y botón del chat:** los de Venezuela, sin franquicias y sin selector de
  idioma. El pie usa `pie-comunidad-truly.webp` con «Volver al inicio» y conserva el enlace «Créditos de imágenes».
- **Lupa (R4):** el índice `#gt-buscar-indice` lo arma `build.mjs` solo con páginas de Uruguay: 3 servicios, 6 plagas,
  2 artículos y 4 anclas de la portada. El ejemplo del buscador dice «comercios o cucarachas».
- **Portada:** la de Venezuela con:
  - el video y las imágenes del carro frente al Teatro Solís, sin tocar;
  - la foto del técnico del 4-nov (`uy-operacion.webp?v=3`);
  - las 6 plagas de Uruguay con sus textos y fotos;
  - el artículo de la araña de los rincones;
  - la cobertura por «departamento, barrio o localidad».
  - Las filas de sectores llevan a `comercios/#healthcare`, `#food-processing` y `#logistics`; Industria va a su página.
  - Se quitó el formulario de cobertura del 4-nov, porque la portada de Venezuela no lo tiene. Está en el respaldo.
- **Zonas (R10):** diagrama oficial `zonas-truly-oficial.jpg`. El sello TEPS, `carro-truly.png`, el pie y las fotos de
  globaltni de Comercios vienen del molde.
- **Hogares y Comercios (R17):** son las copias de globaltni (`<!--gt-pagina:residential-->` y
  `<!--gt-pagina:commercial-->`), con los enlaces a Uruguay y el cierre de Uruguay.
  - El contenido propio que tenían, incluidos los 4 sectores del 4-nov, ya no se muestra. Sigue en `src/pages.mjs`
    (`hogaresPropio`, `comerciosPropio`, exportados en `SIN_USO`) y en el respaldo. Se dejó en vos, como estaba.
- **Desbordes de las copias:** se puso el bloque `<style id="copia-sin-desborde">` de Bogotá, igual, en Hogares y Comercios.
- **Blog:** índice con el diseño nuevo de Venezuela (lista tipo diario) y la banda de cierre nueva, con los 2 artículos de Uruguay.
- **Trato (R3):** todo de usted.
  - `tools/pasar-a-usted-2026-11-05.mjs` cambió 41 frases. Los cierres y la banda de contacto están en `src/master.mjs`.
  - El chat de `build.mjs` también: `CHAT_TEXTS` y `CHAT_CONTEXT` con «Uruguayan Spanish, always usted, never tú or voseo».
  - Se mantienen las palabras uruguayas: mosquito, termitas, apartamento, heladera, canilla, barrio, departamento, placard y auto.
- **Freno del trato:** `tools/trato.mjs` (también lo usa `check.mjs`) busca en el texto visible, `alt`, `aria-label`,
  `placeholder`, `title`, meta, los textos del chat y el índice de la lupa:
  - tú: tú, tu, te, ti, contigo y verbos;
  - voseo con tilde (-ás, -és, -ís, -á, -é, -í) y con pronombre (contame, escribinos, llevala…);
  - pretérito de tú (viste), «-rte» (atenderte) y «no + subjuntivo» (no cuelgues).
  - Probado contra el sitio viejo en vos: encuentra 201 formas en 4 páginas de muestra.
- **Chat (anexo F):** el contexto dice que Uruguay no tiene oficina publicada y prohíbe inventar oficina, dirección o
  teléfono. Se mantiene el aviso del CIAT 1722. La columna «Hablemos» del pie solo tiene «Escribir a Truly AI».
- **Ortografía:**
  - Se copió `src/ortografia.mjs` de Cali y `build.mjs` la aplica a todas las páginas. Se quitaron los 2 pares de «closets»,
    que eran solo de Cali.
  - En las copias corrige «médica», «reenvasado», «y / o», «Campos de la logística» y las concordancias.
  - Cambia «catering» por «servicios de comida» y «premium» por «prémium».
  - Lectura palabra por palabra del corpus (686 líneas). Se corrigió:
    - «pallets» → «palés»;
    - «la que deja» → «las que dejan» (hormigas);
    - «Hormiga cortadora» repetida en su tarjeta de especie;
    - «Lo que usted guarda» → «Lo que se guarda»;
    - «Si amanece con el rosal pelado» → «Si una mañana encuentra el rosal pelado»;
    - créditos desactualizados: ya no hay casa de tres zonas ni acuarela del pie generadas con IA.
- **Tarjeta de voz:** `docs/design/oficinas/uruguay/voz-humana/voz-card.md`, ahora en usted.
  - La de vos quedó como `voz-card-vos-hasta-2026-11-04.md`.
  - El veredicto viejo (HUMANO, en vos) quedó como `veredicto-4nov-vos.md`. `veredicto.md` dice PENDIENTE.
  - Corpus nuevo: `docs/design/oficinas/uruguay/voz-humana/corpus.md`, con 7466 palabras y armado con `node tools/corpus-voz.mjs`.

## Comprobado (local, 5-nov-2026)
- `node build.mjs`: 17 páginas + sitemap, sin avisos. `node check.mjs`: 17 páginas, **0 problemas**.
- `node tools/trato.mjs`: **0 formas de tú o voseo** en las 17 páginas. También 0 en el JSON-LD.
- `node tools/comprobar-5nov.mjs` usa Chrome sin ventana y el playwright-core de la carpeta de Cali; no se instaló nada.
  Resultado: **0 errores**.
  - 17 páginas × 9 anchos (360, 390, 768, 961, 1024, 1100, 1280, 1366, 1440) = 153 combinaciones.
  - En todas: sin scroll horizontal, un solo h1, 0 imágenes rotas y 0 errores de consola.
  - 998 enlaces internos (17 direcciones): todos responden 200 y todas las anclas existen, incluidas
    `comercios/#healthcare`, `#food-processing` y `#logistics`.
  - Lupa a 390, 768, 1024 y 1440: abre «¿Qué está buscando?», el chat queda cerrado y «cucarachas» da 1 resultado,
    `/oficinas/uruguay/plagas/cucarachas/`. Igual que Venezuela.
  - Encabezado pegado al bajar 1500 px: top −44 a 1024 y 1440, 0 a 390 y 768. Igual que Venezuela.
  - Botón del chat: 112×108, y 88×89 en celular. Igual que Venezuela.
  - Arreglo de desbordes, cajas de todos los elementos de `<main>` con y sin arreglo:
    - **0 cajas cambiadas** a 1440, 1024, 768 y 390: 0 de 40 en Hogares y 0 de 199 en Comercios.
    - Sin el arreglo, Hogares desborda a 360 (+8 px), 961 (+23), 1280 (+96) y 1366 (+10). Comercios desborda a 360 (+10).
    - Con el arreglo, 0 desbordes.
- Capturas lado a lado Uruguay | Venezuela en `capturas/5nov/` (portada, Hogares y Comercios a 1440 y 390). Revisadas a ojo:
  mismo diseño; cambian el contenido de Uruguay (video, foto comercial, plagas, blog) y las correcciones de ortografía.
  - `capturas/` está en `.gitignore`, así que no entra al commit. El informe completo está en `capturas/5nov/comprobar.txt`.

## Falta
- **Permiso de Carlos para publicar** (push a `portada-video` = GitHub Pages).
- **Juez de voz y ojo de diseño independientes:** los tiene que correr otro agente sobre `voz-card.md` y `corpus.md`.
- **Hogares de globaltni repite su texto:** el párrafo de las tres zonas sale 2 veces, en «Protección adaptada por zona» y
  en «Un protocolo para cada zona». Viene así en la copia de Venezuela y de globaltni (R17 «tal cual»), por eso no se cambió.
  Cali tiene lo mismo. `check.mjs` no revisa frases repetidas en las copias.
- **Textos de las copias que quedan flojos pero son de globaltni:** «Cualquier corporación que se involucre…» (frase sin
  verbo principal) y «cumple con toda la documentación y registros requeridos». No se tocaron, igual que en Cali.
- **Fotos:** las elige Carlos. Siguen pendientes las 4 fotos de sectores del 4-nov (`RETOMAR-2026-11-04.md`); ahora Comercios
  muestra las fotos de globaltni, así que esas fotos ya no tienen dónde ir salvo que Carlos decida otra cosa.
- **Candados oficiales** (`gate-replica`, `comparar-identico.mjs`, `gate-fotos`): no están en este PC.
  `tools/comprobar-5nov.mjs` es un reemplazo, no los sustituye.
- Pendientes viejos: WhatsApp +598, razón social y RUT; video con el método nuevo (necesita Midjourney y los insumos de la receta).

## Correcciones del juez de voz y del ojo de diseño (5-nov, segunda vuelta)
- **Voz:**
  - Banda final: «Escriba aquí mismo o por WhatsApp y Truly AI le orienta en el siguiente paso.» Se cambió con
    `src/ortografia.mjs` y sale en 16 de las 17 páginas. Comercios tiene el cierre propio de globaltni, que no se toca.
  - Cierres de los 2 artículos, meta de la portada, «Antes de empezar, usted recibe…» (Industria) y respuesta de cobertura
    de la portada («…y si es casa, apartamento o local…»).
- **h1 de Industria:** igual que Comercios, con `page.css` en `src/pages.mjs` y `<style id="uruguay-pagina">` en `build.mjs`.
  - Medido con `tools/medir-h1.mjs`: MachoteDisplay 900.
  - Tamaños: 67,68 px desde 1200 (también a 1440), 48,128 px entre 961 y 1199 (también a 1024) y 43 px hasta 960 (también a 390).
  - En los 17 anchos medidos (360 a 1600) da lo mismo que Comercios. Antes era Machote 600 a 78, 46 y 44 px.
- **Tarjetas de plagas de la portada:**
  - Cada una tiene una frase propia, `corto` en `src/helpers.mjs`, de 92 a 138 caracteres (todas ≤140), sin citas.
  - Ninguna frase se repite completa en otra parte de la portada.
- **Índice del blog:** resumen corto de la araña (`resumen` en `src/blog-uy.mjs`). Ocupa 3 líneas a 1440, igual que Venezuela.
- **Comprobado otra vez:**
  - `check.mjs`: 0 problemas. `trato.mjs`: 0 formas.
  - `comprobar-5nov.mjs`: 153 combinaciones, 998 enlaces, lupa, encabezado −44/0 y 0 cajas movidas; 0 errores.
  - Corpus rearmado: 7374 palabras.
