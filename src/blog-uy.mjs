// Uruguay blog: topics no other office covers (owner's request, 31-oct-2026). Every figure is tied to an open source.
import { U, A } from './helpers.mjs';

export const SRC_BLOG = {
  mspArana: ['Montevideo Portal (21/10/2022). La mayoría de los casos con araña de los rincones en Uruguay son leves (cita el boletín del MSP de 2013 y el CIAT)', 'https://www.montevideo.com.uy/Archivo/Mayoria-de-casos-con-arana-en-Uruguay-que-dejo-victimas-en-Argentina-son-leves--uc836048'],
  mendoza: ['Ministerio de Salud de Mendoza, Argentina (2017). Recomendaciones ante envenenamiento por arácnidos (referencia regional)', 'https://www.mendoza.gov.ar/salud/wp-content/uploads/sites/16/2014/05/Recomendaciones-Envenenamiento-por-Aracnidos-de-Cuyo-20171.pdf'],
  revistaInia: ['Revista INIA N.º 74 (setiembre de 2023). Hormigas cortadoras en Uruguay', 'https://inia.uy/sites/default/files/publications/2024-10/Revista-INIA-74-set-2023-13.pdf'],
  cartillaInia: ['INIA. Cartilla N.º 36: hormigas cortadoras del género Acromyrmex', 'https://www.inia.uy/sites/default/files/publications/2024-10/inia-cartilla36-Acromyrmex.pdf'],
  laManana: ['La Mañana. Hormigas cortadoras en Uruguay, con Martín Bollazzi (Facultad de Agronomía, UdelaR)', 'https://www.xn--lamaana-7za.uy/?p=48346'],
  tesisFagro: ['Facultad de Agronomía, UdelaR (2018). Tesis de maestría sobre el forrajeo de cebos tóxicos por Acromyrmex', 'https://core.ac.uk/download/513018874.pdf'],
};

export const POSTS_UY = [
  { slug: 'arana-de-los-rincones-en-casa', tag: 'Araña de los rincones', img: `${A}/uy-blog-arana-de-los-rincones.webp`,
    alt: 'Araña de los rincones (Loxosceles laeta) sobre madera',
    title: 'Araña de los rincones en casa: dónde se esconde y qué hacer si pica',
    lead: 'Es la araña que más le importa a la salud pública en Uruguay, según el MSP. Vive tranquila en los rincones oscuros de la casa: te contamos dónde buscarla, cómo evitar una picadura y a quién llamar.' },
  { slug: 'hormiga-cortadora-en-el-jardin', tag: 'Hormiga cortadora', img: `${A}/uy-blog-hormiga-cortadora.webp`,
    alt: 'Hormiga cortadora llevando un trozo de hoja',
    title: 'Hormiga cortadora en el jardín y la huerta: cómo frenarla en Uruguay',
    lead: 'Si amanecés con el rosal pelado y un caminito de hojas en el pasto, es la hormiga cortadora. Te contamos qué dice la investigación uruguaya sobre cuándo y cómo controlarla.' },
];

export const CUERPOS = {
  'arana-de-los-rincones-en-casa': {
    body: `<p>La araña de los rincones (<em>Loxosceles laeta</em>) no busca a las personas: busca un lugar oscuro y quieto. El problema aparece cuando ese lugar es una campera colgada, una caja del placard o el hueco detrás de la cama. Un boletín del Ministerio de Salud Pública de 2013, citado por Montevideo Portal, la considera la araña de mayor importancia para la salud pública en Uruguay.</p>
<h2>Cómo reconocerla</h2>
<p>Es marrón, de patas largas y finas, y tiene una mancha oscura con forma de violín sobre la parte delantera del cuerpo. Por eso en la región también le dicen «araña violinista». No teje grandes telas en el medio de la habitación: deja una tela irregular y floja en los rincones, detrás de los muebles o dentro de cajas.</p>
<p>Si encontrás una y podés atraparla sin tocarla, por ejemplo con un frasco, guardala: las recomendaciones sanitarias de la región indican que identificar al animal ayuda al médico a decidir el tratamiento.</p>
<h2>Dónde se esconde en una casa uruguaya</h2>
<p>Las recomendaciones del Ministerio de Salud de Mendoza (Argentina), que comparte la misma especie con Uruguay, describen sus lugares favoritos: sitios oscuros y poco movidos, como galpones, altillos y sótanos, y dentro de la casa, detrás de cuadros y muebles, entre la ropa colgada y en los rincones de las habitaciones.</p>
<p>En una casa de acá eso se traduce en lugares muy concretos:</p>
<ul>
<li><strong>El placard y el ropero</strong>, sobre todo la ropa de otra temporada que no se mueve hace meses.</li>
<li><strong>Detrás de la cama y de los muebles</strong> que están pegados a la pared.</li>
<li><strong>Detrás de cuadros y espejos</strong>.</li>
<li><strong>El galpón del fondo, el entretecho y el sótano</strong>, donde se guardan cajas y herramientas.</li>
<li><strong>Los zapatos</strong> que quedan en el piso del placard.</li>
</ul>
<h2>Por qué importa una picadura</h2>
<p>Según la nota de Montevideo Portal, su veneno es necrosante: puede dañar la piel y los tejidos alrededor de la picadura. La misma nota aclara que la mayoría de los casos en Uruguay son leves. Eso no significa que haya que esperar a ver cómo evoluciona: ante la sospecha, se consulta.</p>
<p>Muchas picaduras pasan al vestirse o al acostarse, cuando la araña quedó atrapada entre la ropa o las sábanas y se siente apretada contra la piel.</p>
<h2>Qué hacer si sospechás una picadura</h2>
<ol>
<li><strong>Llamá al CIAT al 1722.</strong> Es el Centro de Información y Asesoramiento Toxicológico, y es el número que recomienda la nota del MSP citada por Montevideo Portal.</li>
<li><strong>Consultá a tu prestador de salud</strong> aunque al principio duela poco.</li>
<li><strong>Si podés, llevá la araña</strong> en un frasco cerrado para que la identifiquen.</li>
</ol>
<p>Esta guía es información general sobre prevención en casa y no reemplaza la consulta médica.</p>
<h2>Cómo prevenir: mover, sacudir y revisar</h2>
<p>Las recomendaciones de Mendoza coinciden en tres hábitos simples:</p>
<ul>
<li><strong>Limpiar seguido los rincones</strong>, detrás de muebles y cuadros. La aspiradora ayuda a sacar telas y huevos.</li>
<li><strong>Revisar la ropa y los zapatos antes de usarlos</strong>, sobre todo los que estuvieron guardados.</li>
<li><strong>No colgar ropa contra la pared</strong> y separar un poco la cama y los muebles.</li>
</ul>
<p>A eso se suma ordenar el placard y el galpón: menos cajas apiladas y menos ropa amontonada significa menos escondites.</p>
<h2>Cuándo conviene una revisión profesional</h2>
<p>Si encontrás más de una araña, si aparecen seguido en el mismo ambiente o si en la casa hay chicos o personas mayores, conviene revisar la casa entera: dónde se esconden, qué las atrae y qué se puede sellar. Escribile a Truly AI por el chat o por WhatsApp, contale dónde la viste y te orienta en el siguiente paso. Para repasar sus señales, entrá a la <a href="${U}/plagas/arana-de-los-rincones/">guía de la araña de los rincones</a>.</p>`,
    faq: [
      ['¿La araña de los rincones es peligrosa?', 'Su veneno es necrosante y el MSP la considera la araña de mayor importancia para la salud pública en Uruguay. Aun así, según la nota citada de Montevideo Portal, la mayoría de los casos en el país son leves. Ante una sospecha, llamá al CIAT al 1722.'],
      ['¿Dónde se esconde?', 'En lugares oscuros y quietos: placares, ropa guardada, detrás de muebles y cuadros, galpones, altillos y sótanos.'],
      ['¿Qué hago si me pica?', 'Llamá al CIAT al 1722 y consultá a tu prestador de salud. Si podés, llevá la araña en un frasco cerrado para que la identifiquen.'],
      ['¿Cómo evito que aparezca?', 'Limpiá seguido los rincones, revisá ropa y zapatos antes de usarlos, no cuelgues ropa contra la pared y ordená placares y galpones.'],
    ],
    src: ['mspArana', 'mendoza'],
    prompts: [
      ['Vi una araña violinista', 'Creo que vi una araña de los rincones en casa. ¿Qué hago?'],
      ['Quiero revisar mi casa', 'Quiero revisar si hay arañas de los rincones en mi casa.'],
      ['Tengo un galpón con cajas', 'Tengo un galpón o un placard con muchas cajas. ¿Cómo lo reviso?'],
    ],
  },
  'hormiga-cortadora-en-el-jardin': {
    body: `<p>Un rosal que amanece sin hojas, una fila de hormigas cargando pedacitos verdes y un montículo de tierra suelta en el pasto: es la hormiga cortadora. En Uruguay, según la Revista INIA (setiembre de 2023), las del género <em>Acromyrmex</em> son las de distribución más amplia y las responsables de los daños en los cultivos.</p>
<h2>Cuántas hay y por qué importan</h2>
<p>Los números cambian según la fuente. La Cartilla N.º 36 del INIA habla de 12 especies de <em>Acromyrmex</em> en Uruguay. Martín Bollazzi, de la Facultad de Agronomía (UdelaR), habló en La Mañana de unas 14 especies de <em>Acromyrmex</em> y 2 de <em>Atta</em>. Coinciden en lo importante: <em>Acromyrmex</em> es el género que más problemas causa, también en los jardines.</p>
<p>La misma cartilla del INIA da una idea del tamaño del problema: una sola colonia adulta puede llegar a atacar en promedio el 12 % de una hectárea. Y en plantines jóvenes, quedarse sin hojas puede matar a la planta.</p>
<h2>No comen hojas: cultivan un hongo</h2>
<p>Las cortadoras no se comen las hojas que cargan. Las llevan al hormiguero, bajo tierra, donde cultivan el hongo del que se alimenta la colonia. Por eso el daño se ve en las plantas, pero el problema está en el nido, que a veces queda lejos del cantero atacado.</p>
<h2>Las señales en tu jardín</h2>
<ul>
<li><strong>Caminos limpios en el pasto</strong>, como senderos finitos, por donde pasan cargadas.</li>
<li><strong>Hojas cortadas en media luna</strong> y plantas peladas de un día para el otro, muchas veces de noche.</li>
<li><strong>Montículos de tierra suelta</strong> con agujeros, cerca de muros, canteros o raíces.</li>
<li><strong>Filas de hormigas con trozos verdes</strong> en los horarios frescos.</li>
</ul>
<h2>Qué funciona y qué no</h2>
<p>Bollazzi explicó en La Mañana que el polvo funciona por contacto y no es un control recomendable: mata algunas obreras y baja el corte por unos días, pero la colonia sigue. Las fuentes técnicas coinciden en que el camino es llegar al nido. Los cebos que las propias hormigas llevan al hormiguero son el método más citado.</p>
<p>Tampoco es infalible. La cartilla del INIA explica que las obreras «tienen memoria» y pueden rechazar los cebos después de una aplicación fallida, un fenómeno que la Facultad de Agronomía y el INIA investigan juntos. Una tesis de maestría de la Facultad de Agronomía (2018) también estudió los problemas de eficacia del control con cebos. Por eso conviene hacerlo bien la primera vez.</p>
<h2>El mejor momento: la primavera</h2>
<p>Según la cartilla del INIA, la mejor época para controlarlas es la primavera, antes de los vuelos nupciales, cuando salen las reinas aladas a fundar hormigueros nuevos. Actuar a tiempo evita que una colonia se convierta en varias.</p>
<p>Mientras tanto, en casa podés:</p>
<ol>
<li>Recorrer el jardín al atardecer y seguir las filas hasta el nido.</li>
<li>Anotar qué plantas atacan y dónde están los montículos.</li>
<li>No remover el hormiguero ni tirarle polvo: solo dispersa a la colonia.</li>
</ol>
<h2>Truly AI te ayuda a encontrar el nido</h2>
<p>Si las hormigas vuelven cada temporada o atacan la huerta, escribile a Truly AI por el chat o por WhatsApp. Contale qué plantas cortan y dónde ves los caminos, y te orienta en el siguiente paso. Para repasar cómo distinguirlas de la hormiga de la cocina, entrá a la <a href="${U}/plagas/hormigas/">guía de hormigas</a>.</p>`,
    faq: [
      ['¿Cuántas especies de hormiga cortadora hay en Uruguay?', 'Depende de la fuente: la Cartilla N.º 36 del INIA habla de 12 especies de Acromyrmex, y Martín Bollazzi (Facultad de Agronomía) mencionó en La Mañana unas 14 de Acromyrmex y 2 de Atta.'],
      ['¿Sirve el polvo hormiguicida?', 'Según Bollazzi, el polvo funciona por contacto y no es un control recomendable: mata algunas obreras pero no a la colonia.'],
      ['¿Cuándo conviene controlarlas?', 'La cartilla del INIA indica que la mejor época es la primavera, antes de los vuelos nupciales.'],
      ['¿Por qué vuelven después de aplicar un cebo?', 'Las obreras pueden rechazar cebos después de una aplicación fallida. La Facultad de Agronomía y el INIA investigan ese rechazo; por eso conviene que el control llegue bien al nido la primera vez.'],
    ],
    src: ['revistaInia', 'cartillaInia', 'laManana', 'tesisFagro'],
    prompts: [
      ['Me cortan las plantas', 'Las hormigas me están cortando las plantas del jardín. ¿Qué hago?'],
      ['Atacan mi huerta', 'Las hormigas cortadoras atacan mi huerta. ¿Cómo encuentro el nido?'],
      ['Vuelven cada primavera', 'Las hormigas vuelven cada primavera aunque las controlo. ¿Qué puedo hacer?'],
    ],
  },
};
