VEREDICTO: HUMANO

Juez de voz independiente (agente que no escribió el sitio), 5-nov-2026, después del paso de «vos» a «usted».
Base: `voz-card.md`, `corpus.md` y el HTML de las 17 páginas de `site/oficinas/uruguay/` (texto visible, `alt`, `aria-label`,
`placeholder`, `title`, meta description/og/twitter, `tia-textos` y `tia-contexto`).

## Resumen

- **Tratamiento:** limpio. Se buscó palabra por palabra en todo el texto visible, los atributos y el chat: no queda
  ninguna forma de tú ni de voseo (vos, te, tu, contame, tenés, querés, escribinos, encontrá, probá, mirá, fijate, puedes, etc.).
  La única coincidencia es «Activate contra el mosquito» (mosquitos), que es el nombre oficial de la campaña del MSP 2018, va
  entre comillas y debe quedar así.
- **Chat:** `tia-textos` está todo en usted («Cuénteme qué necesita proteger y le oriento», «Escríbale a Truly AI…», «Intente
  enviar su mensaje de nuevo»). `tia-contexto` pide «always usted, never tú or voseo» y la lista de palabras uruguayas. Bien.
- **Palabras uruguayas:** se mantienen mosquito, heladera, canilla, pileta, placard, azotea, fondo, barrio, departamento y auto.
  **«Apartamento» ya no aparece en ningún texto visible** (solo en `tia-contexto`): se fue con la página de Hogares, que hoy es
  texto de globaltni por decisión del dueño. No es un error de la conversión, pero conviene reponerlo donde el texto es propio.
- **Concordancia:** un solo problema real, repetido: «Escríbale a Truly AI … y le orienta». En vos («y te orienta») el «te»
  dejaba claro quién orientaba a quién; en usted, «le orienta» se puede leer como que *usted* orienta a Truly AI. Es obligatoria.
- **Señales de IA:** el texto propio (guías, blog, industria, FAQ) es concreto, con fuentes, cifras y palabras del país. No hay
  «no solo… sino», «soluciones integrales» ni eslóganes inflados en el texto propio. Queda un tic de molde: 18 títulos que
  empiezan con «Lo que…» y los títulos-tríada de las guías («Sin agua, sin migas, sin escondites.»). Ya estaban en la versión
  en vos y no bastan para cambiar el veredicto; van como opcionales.

## Correcciones obligatorias

| # | Dónde | Texto actual | Problema | Corrección propuesta |
|---|---|---|---|---|
| 1 | Banda final de contacto, en las 17 páginas (portada, guías, blog, servicios, legales) | «Escríbale a Truly AI aquí mismo o por WhatsApp y le orienta en el siguiente paso.» | Concordancia rota al pasar a usted: el sujeto de «le orienta» queda ambiguo (se lee como «usted le orienta a Truly AI»). | «Escriba aquí mismo o por WhatsApp y Truly AI le orienta en el siguiente paso.» |
| 2 | blog/arana-de-los-rincones-en-casa, «Cuándo conviene una revisión profesional» | «Escríbale a Truly AI por el chat o por WhatsApp, cuéntele dónde la vio y le orienta en el siguiente paso.» | Mismo problema de sujeto. | «Escriba por el chat o por WhatsApp y cuéntenos dónde la vio: Truly AI le orienta en el siguiente paso.» |
| 3 | blog/hormiga-cortadora-en-el-jardin, «Truly AI le ayuda a encontrar el nido» | «Cuéntele qué plantas cortan y dónde ve los caminos, y le orienta en el siguiente paso.» | Mismo problema de sujeto. | «Cuéntele qué plantas cortan y dónde ve los caminos; Truly AI le orienta en el siguiente paso.» |

## Correcciones opcionales (mejoran, no cambian el veredicto)

| # | Dónde | Texto actual | Problema | Corrección propuesta |
|---|---|---|---|---|
| 4 | Portada (hero), texto del molde de Venezuela | «Prevención y atención para compartir su hogar con tranquilidad.» | Frase inflada y rara: «compartir su hogar» ¿con quién? Suena a convivir con la plaga. | «Prevención y atención para vivir su casa con tranquilidad.» o «Prevención y atención para su casa, todo el año.» |
| 5 | Portada, FAQ «¿Cómo consulto la cobertura?» | «Indique su departamento, su barrio o localidad y el tipo de espacio. Le confirmaremos si podemos atenderle y cómo coordinar la atención.» | Repite atender/atención; además es el mejor lugar para recuperar «apartamento», que se perdió con Hogares. | «Indique su departamento, su barrio o localidad y si es casa, apartamento o local. Le confirmaremos si podemos atenderle y cómo coordinar.» |
| 6 | Meta description y og/twitter de la portada | «Escríbale a Truly AI y le orientamos en el siguiente paso.» | Correcto, pero no coincide con la banda («le orienta», sujeto Truly AI). | «Escriba a Truly AI: le orienta en el siguiente paso.» |
| 7 | servicios/industria, «El servicio» | «Antes de empezar recibe una propuesta con el alcance, la frecuencia y los registros para su planta.» | En vos («recibís») el sujeto era claro; en usted, «recibe» puede leerse como «Truly recibe». | «Antes de empezar, usted recibe una propuesta con el alcance, la frecuencia y los registros para su planta.» |
| 8 | Guías de plagas e industria (títulos de sección) | «Lo que hay que saber.», «Lo que pide la norma.», «Lo que registró el MSP.», «Lo que las atrae.» (×2), «Lo que la atrae.», «Lo que conviene hacer.», «Lo que rodea la planta.», etc. (18 en total) | Tic de molde: la misma fórmula en casi todos los títulos. | Variar algunos: «Las cifras del MSP.», «La norma en Montevideo.», «Qué las atrae.», «Antes de tratar.», «El perímetro.» |
| 9 | plagas/mosquitos | «Tape, vacíe y limpie.» + «Cubrir, vaciar y limpiar. La recomendación de la OMS.» + «Cubrir, vaciar y limpiar los recipientes donde se guarda agua.» | La misma tríada tres veces en la misma sección. | Dejar el título «Tape, vacíe y limpie.» y en el bloque: «La recomendación de la OMS. / Tapar, vaciar y limpiar los recipientes donde se guarda agua.» |
| 10 | Todo el sitio (atenderle, le orienta, le ayudará, le indicaremos) | «le» con verbos transitivos | Leísmo de cortesía: aceptado con usted y evita elegir género, pero en Uruguay se dice «atenderlo/la». | Dejar como está (decisión consciente); solo anotarlo para que sea igual en todas las páginas. |

## Textos de globaltni (decisión del dueño; no cuentan para el veredicto)

Están en usted y no tienen voseo. Se anotan solo para que el dueño los vea:

| Dónde | Texto | Observación |
|---|---|---|
| Portada, FAQ (intro) | «Prevención, comunicación y formación: tres aspectos de nuestro servicio.» | Tríada vacía y no describe las preguntas de abajo (costo, cobertura, visitas). |
| servicios/hogares (dos veces el mismo bloque) | «Con el fin de brindar el servicio de control de plagas más efectivo posible…» / «Esto proporcionará al cliente una solución única a sus problemas de plagas.» | Bloque repetido íntegro; «solución única» es eslogan hueco. Sin «apartamento». |
| servicios/hogares | «¿Le interesa? Haga clic en el enlace de abajo para contactarnos…» | Fórmula de traducción. |
| servicios/comercios | «enfrentan muchos desafíos para garantizar que se cumpla con el nivel más alto de saneamiento…», «sistema de prevención de plagas de última generación», «Si usted no se encuentra dentro de estos sectores, ¡no se preocupe!» | Frases infladas de traducción; párrafo «Brindamos un servicio que es completamente auditable…» repetido en los cuatro sectores. |
| servicios/comercios | «Encuentre su oficina →» (varias veces) | Uruguay no tiene oficina local; el enlace lleva al directorio. |
| Portada, secciones corporativas (TEPS, sanitización, red, historia) | «Conozca a los visitantes que no invitó.», «Un programa para su espacio.», «Elija el servicio que necesita conocer.» | Textos oficiales; correctos en usted. |
