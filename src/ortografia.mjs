// Spelling and style fixes applied to every built page (5-nov-2026, Carlos: «todo en español, cero palabras en otro
// idioma, ortografía perfecta»). Most come from the globaltni.com/es copies (Hogares, Comercios, portada), which have
// translation mistakes. Each pair is [wrong, right]; build.mjs reports any pair that no longer matches anything.
export const ORTOGRAFIA = [
  // accents and spelling
  ['atención medica a largo plazo', 'atención médica a largo plazo'],
  ['Envasado y re envasado de alimentos', 'Envasado y reenvasado de alimentos'],
  // RAE: avoid «y/o»; «o» already includes both
  ['normas regulatorias de la industria y / o los requisitos', 'normas regulatorias de la industria o los requisitos'],
  // stray periods and slashes in lists
  ['>Centros de asistencia prolongada.</li>', '>Centros de asistencia prolongada</li>'],
  ['>Almacenamiento y distribución de alimentos.</li>', '>Almacenamiento y distribución de alimentos</li>'],
  ['Instalaciones de atención / tratamiento de pacientes', 'Instalaciones de atención y tratamiento de pacientes'],
  ['Suministros médicos / Almacenes', 'Suministros médicos y almacenes'],
  ['Campos de Logística', 'Campos de la logística'],
  ['cuanto al servicio comercial de control de plagas</p>', 'cuanto al servicio comercial de control de plagas.</p>'],
  // grammar
  ['que van más allá de solamente control.', 'que van más allá del control.'],
  ['que van más allá de solamente el control.', 'que van más allá del control.'],
  ['La inspección y el tratamiento se realizará en toda la casa.', 'La inspección y el tratamiento se realizarán en toda la casa.'],
  ['ofrece un Programa de Protocolo de 3 zonas.', 'ofrece un programa de protocolo de tres zonas.'],
  ['La zona roja (Interior de la casa)', 'La zona roja (interior de la casa)'],
  ['La zona verde (Las áreas verdes, como césped, macizos de flores).', 'La zona verde (las áreas verdes, como el césped y los macizos de flores).'],
  ['¿Interesado? Haga clic', '¿Le interesa? Haga clic'],
  // words in another language -> Spanish (DLE)
  ['>Catering</li>', '>Servicios de comida</li>'],
  ['fabricación, catering y mucho más', 'fabricación, servicios de comida y mucho más'],
  ['fabricación y catering, entre muchos otros sectores', 'fabricación y servicios de comida, entre muchos otros sectores'],
  ['Servicio premium', 'Servicio prémium'],
  // one wording across the site («empezar por» + action)
  ['Todo empieza con contarnos qué vio.', 'Todo empieza por contarnos qué vio.'],
  // voice judge (5-nov-2026): the visitor writes, Truly AI guides (closing band of every page)
  ['Escríbale a Truly AI aquí mismo o por WhatsApp y le orienta en el siguiente paso.', 'Escriba aquí mismo o por WhatsApp y Truly AI le orienta en el siguiente paso.'],

  // ---- Text decisions shared by Bogotá, Cali and Uruguay (5-nov-2026, decisiones-texto-5nov.md), same wording on the 3 sites
  // system name, no English: «Truly Elite Protection System» -> «sistema TEPS»; «TNI» -> «Truly Nolen»
  ['>Truly Elite Protection System (TEPS) ', '>El sistema TEPS '],
  ['>Truly Elite Protection System<', '>Sistema TEPS<'],
  ['Nuestro sistema de protección Truly Elite (TEPS)', 'Nuestro sistema TEPS'],
  ['Nuestro sistema de protección Truly Elite', 'Nuestro sistema TEPS'],
  ['Diagrama oficial de TNI:', 'Diagrama oficial de Truly Nolen:'],
  ['Contactar a TNI<', 'Contactar a Truly Nolen<'],
  // Hogares (globaltni copy): zones protocol and wording
  ['TNI ofrece un programa de protocolo de tres zonas.', 'Truly Nolen ofrece el protocolo de las tres zonas.'],
  ['>– La zona roja (interior de la casa)<', '>Zona roja: el interior de la casa.<'],
  ['>– La zona amarilla (perímetro inmediato de la casa)<', '>Zona amarilla: el perímetro inmediato de la casa.<'],
  ['>– La zona verde (las áreas verdes, como el césped y los macizos de flores).<', '>Zona verde: las áreas verdes, como el césped y los jardines.<'],
  ['En cada una de estas áreas, Truly Nolen International implementará los protocolos correctos. Esto proporcionará al cliente una solución única a sus problemas de plagas.', 'En cada una de estas áreas, Truly Nolen aplicará el protocolo que corresponde. Así usted tendrá una solución completa para sus problemas de plagas.'],
  ['¿Le interesa? Haga clic en el enlace de abajo para contactarnos y recibir más información.', '¿Le interesa? Escríbanos con el botón de abajo y le damos más información.'],
  ['alt="Material de Truly Nolen International"', 'alt="Diagrama de una casa con el interior en rojo, el perímetro en amarillo y las áreas verdes en verde"'],
  // Comercios (globaltni copy)
  ['rehabilitación física o mental, enfrentan', 'rehabilitación física o mental enfrentan'],
  ['de última generación, tales como:</p>', 'de última generación.</p>'],
  ['de última generación, como:</p>', 'de última generación.</p>'],
  ['¿Quién se beneficia con este programa?', '¿Quién se beneficia de este programa?'],
  ['cumple con toda la documentación y registros requeridos', 'cumple con toda la documentación y todos los registros requeridos'],
  ['Servicios de alimentación y hospitalidad', 'Servicios de alimentación y hotelería'],
  ['Cualquier corporación que se involucre en la logística del traslado diario de bienes y servicios.', 'Atendemos a cualquier empresa que participe en el transporte diario de mercancías.'],
  ['Truly Nolen International está aquí para asegurarse de que no tenga', 'Truly Nolen International se encarga de que no tenga'],
  ['alt="Un entorno del archivo de servicios de TNI."', 'alt="Archivo de servicios de Truly Nolen."'],
  ['>Centros de atención de emergencias<', '>Centros de atención de urgencias<'],
  // Home (globaltni corporate text)
  ['<span class="section-tag">Una red internacional</span>', '<span class="section-tag">Oficinas en el mundo</span>'],
  ['Un programa de Manejo Integrado de Plagas', 'Un programa de manejo integrado de plagas'],
  ['aspectos regulatorios y soporte de auditoría.', 'aspectos regulatorios y apoyo en auditorías.'],
  ['el servicio y el programa adecuado para', 'el servicio y el programa adecuados para'],
  ['las medidas que aplican al servicio', 'las medidas que se aplican al servicio'],

  // ---- Uruguay copy editor (5-nov-2026): suggestions on the globaltni texts
  ['Consejos para prevenir plagas y cómo trabajamos.', 'Consejos de prevención y nuestra forma de trabajar.'],
  // «saneamiento» here is the cleaning of the premises, not the sewer network
  ['el nivel más alto de saneamiento mientras', 'el nivel más alto de higiene mientras'],
  ['desarrollo de estrategias de saneamiento y manejo de plagas', 'desarrollo de estrategias de higiene y manejo de plagas'],
  ['un servicio que es totalmente auditable', 'un servicio que es completamente auditable'],
  ['Si usted no se encuentra dentro de estos sectores', 'Si su actividad no está entre estos sectores'],

  // ---- Coordinator adjustment (5-nov, afternoon), same as Bogotá and Cali: no sentence twice on Comercios (recipe 6c).
  // Each sector of the globaltni copy repeated the same TEPS, audit and «¿Quién se beneficia…?» texts; one wording per
  // sector, same meaning, no new facts. Anchored on data-source-paragraph / the h3 id so each sector gets its own text.
  // TEPS closing paragraph (wording given by the coordinator)
  ['<p data-source-paragraph="1-2">Nuestro sistema TEPS está diseñado para clientes que requieren sistemas de prevención de plagas de última generación.', '<p data-source-paragraph="1-2">Por eso, el sistema TEPS es la opción para plantas que necesitan prevención de plagas de última generación.'],
  ['<p data-source-paragraph="2-3">Nuestro sistema TEPS está diseñado para clientes que requieren un sistema de prevención de plagas de última generación.', '<p data-source-paragraph="2-3">El sistema TEPS está pensado para empresas de alimentos que necesitan la prevención más exigente.'],
  ['<p data-source-paragraph="3-3">Nuestro sistema TEPS está diseñado para clientes que requieren un sistema de prevención de plagas de última generación.', '<p data-source-paragraph="3-3">Con el sistema TEPS, su operación logística cuenta con prevención de plagas de última generación.'],
  // «¿Quién se beneficia…?», one per sector (wording given by the coordinator)
  ['<h3 id="healthcare-facilities">¿Quién se beneficia de este programa?', '<h3 id="healthcare-facilities">¿Quién se beneficia en el sector salud?'],
  ['<h3 id="industrial-facilities">¿Quién se beneficia de este programa?', '<h3 id="industrial-facilities">¿Quién se beneficia en la industria?'],
  ['<h3 id="food-processing-facilities">¿Quién se beneficia de este programa?', '<h3 id="food-processing-facilities">¿Quién se beneficia en el comercio de alimentos?'],
  ['<h3 id="logistics-facilities">¿Quién se beneficia de este programa?', '<h3 id="logistics-facilities">¿Quién se beneficia en la logística?'],
  // «Brindamos un servicio… auditable» (Salud keeps globaltni's wording)
  ['<p data-source-paragraph="1-1">Brindamos un servicio que es completamente auditable y cumple con toda la documentación y todos los registros requeridos para satisfacer los requisitos del cliente.', '<p data-source-paragraph="1-1">Cada servicio se puede auditar de principio a fin y genera la documentación y los registros que exige cada cliente.'],
  ['<p data-source-paragraph="2-2">Brindamos un servicio que es completamente auditable y cumple con toda la documentación y todos los registros requeridos para satisfacer las normas regulatorias de la industria o los requisitos de los clientes más estrictos del mundo.', '<p data-source-paragraph="2-2">Cada visita queda documentada para las auditorías, con los registros que piden las normas del sector y los clientes más exigentes.'],
  ['<p data-source-paragraph="3-2">Brindamos un servicio que es completamente auditable y cumple con toda la documentación y todos los registros requeridos para satisfacer las normas regulatorias de la industria o los requisitos de los clientes más estrictos del mundo.', '<p data-source-paragraph="3-2">El servicio se puede auditar en cada etapa y entrega la documentación que exigen las normas del rubro y sus clientes.'],
  // «El sistema TEPS… ofrece prevención y minimiza el riesgo…» (Salud keeps globaltni's wording)
  ['<p data-source-paragraph="1-0">El sistema TEPS ofrece prevención y minimiza el riesgo de actividad de plagas y contaminación química.', '<p data-source-paragraph="1-0">En plantas y almacenes, el sistema TEPS se centra en la prevención y reduce el riesgo de plagas y de contaminación química.'],
  ['<p data-source-paragraph="2-1">El sistema TEPS se desarrolló para instalaciones minoristas que requieren servicios que van más allá del control. Nuestro sistema ofrece prevención y minimiza el riesgo de actividad de plagas y contaminación química.', '<p data-source-paragraph="2-1">El sistema TEPS se desarrolló para instalaciones minoristas que necesitan algo más que el control. Se enfoca en prevenir y reduce al mínimo la presencia de plagas y la contaminación química.'],
  ['<p data-source-paragraph="3-1">El sistema TEPS fue desarrollado para corporaciones que requieren servicios que van más allá del control. Nuestro sistema ofrece prevención y minimiza el riesgo de actividad de plagas y contaminación química.', '<p data-source-paragraph="3-1">El sistema TEPS fue pensado para empresas que buscan más que una respuesta a la plaga: pone la prevención primero y protege la carga de plagas y de contaminación química.'],
];

export function corregir(html, usados) {
  for (const [a, b] of ORTOGRAFIA) {
    if (html.includes(a)) { html = html.split(a).join(b); usados.add(a); }
  }
  return html;
}
