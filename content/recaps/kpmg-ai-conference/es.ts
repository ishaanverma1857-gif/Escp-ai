/** KPMG × IA — resumen en español (traducido con IA desde la versión inglesa). */
const es = {
  summary: `
*Una tarde con KPMG dedicada a la inteligencia artificial, organizada para estudiantes de escuela de negocios (ESCP). Dos ponentes de KPMG — un socio (Xavier), con trayectoria en auditoría y Transaction Services, y un analista del equipo de Transaction Services / Deal Advisory — explicaron cómo la IA está transformando la profesión, cómo deben adoptarla las empresas, y mostraron en directo una herramienta de IA desarrollada internamente con Claude de Anthropic.*

## Visión general

La sesión empezó con una pregunta sencilla a la sala — *¿quién de vosotros usa ChatGPT?* — y una provocación: las escuelas a menudo desaconsejan a los estudiantes usar la IA, pero en KPMG la IA ya forma parte del trabajo diario de los consultores. El mensaje central de los ponentes: la IA no consiste en sustituir a las personas, sino en repensar las empresas en torno a ella.

## Ideas clave

**La IA es una transformación, no una herramienta.** KPMG lleva cuatro años trabajando en IA. Para la firma, limitarse a automatizar las tareas existentes destruye valor; la verdadera oportunidad es rediseñar los modelos operativos, la oferta, la forma de prestar los servicios y las carreras profesionales en torno a la IA. «Transformarse o declinar»: citando al inversor David S. Rose, los ponentes defendieron que cualquier empresa que no se transforme en unos tres años corre el riesgo de quedar fuera de su mercado.

**Las personas siguen siendo el factor diferencial.** Citando un estudio sobre las principales empresas de la economía digital (KPMG, Accenture, Apple y otras), los ponentes señalaron que la ventaja competitiva decisiva no son los modelos ni las plataformas propias, sino las personas. El consejo para los estudiantes: combinar conocimientos de finanzas con competencias en datos e IA, una combinación sólida y cada vez más buscada. KPMG está acelerando, no reduciendo, la contratación de estos perfiles «duales».

**La profesión de auditoría no deja de ampliarse.** La auditoría ha pasado de ser puramente financiera a incluir la auditoría no financiera / de sostenibilidad (CSRD, ESG), y ahora la auditoría de la propia tecnología. Un ejemplo concreto: una empresa de software francesa pidió a KPMG que «abriera la caja negra» de su herramienta de decisión de crédito basada en IA y la certificara, un nuevo tipo de certificación de IA que abarca la gobernanza, la seguridad de los datos, la ciberseguridad y el cumplimiento de la Ley de IA de la UE (AI Act).

**Escalar la IA depende de la confianza y de la gestión del cambio.** Pasar de unos pocos casos de uso a una adopción en toda la empresa requiere (1) confianza en la tecnología y (2) gestión del cambio. El cuello de botella más difícil son los mandos intermedios, cuyas rutinas consolidadas frenan la adopción. La respuesta de KPMG es un acompañamiento continuo — talleres «Wake Up Call», hackathons — planteado como 7.000 transformaciones individuales entre su plantilla, no como un programa impuesto desde arriba.

**Cuatro temas tecnológicos se repiten con los directores financieros y los consejos de administración:** escalar una IA de confianza; redefinir los roles dentro de la función financiera; la resiliencia tecnológica; y la soberanía de los datos y de la tecnología (dónde se almacenan los datos, la dependencia de un único proveedor informático, el riesgo de «kill switch»). En ciberseguridad, los ponentes destacaron el fuerte aumento de los ataques — incluidos ataques que llegan al mundo físico — y el auge de documentos y notas de gastos falsos generados con IA, así como el papel de las marcas de agua (watermarking) y la trazabilidad. Un último ejemplo, Delta Air Lines, mostró que gran parte del valor de una empresa puede estar en sus datos (por ejemplo, un programa de fidelización) más que en su actividad principal.

## Demo en directo — Transaction Services & Anthropic

El equipo de Transaction Services / Deal Advisory (unos 300 profesionales en Francia) asesora en operaciones del lado comprador y del lado vendedor, normalizando métricas financieras como el EBITDA para llegar a un valor de empresa justo. Hace unos meses, KPMG firmó una alianza con **Anthropic** para dar a sus equipos acceso a **Claude**.

El equipo creó un centro de excelencia de IA, el **«Lighthouse»**, con dos líneas de trabajo: formar a toda la plantilla (programas de 2 a 4 días, casos concretos, creación y orquestación de agentes) y desarrollar soluciones internas. A los equipos se les enseña un marco sencillo, las **«4D»**, para usar la IA de forma responsable:

- **Delegación**: decidir qué se confía a la IA (resúmenes, detección de anomalías, revisión de documentos) sin delegar nunca el juicio profesional; mantener siempre a una persona en el proceso.
- **Descripción**: escribir buenos prompts — asignar un rol, dar contexto, citar fuentes, especificar el formato de salida. Así se reducen las alucinaciones, las iteraciones y los tokens desperdiciados.
- **Discernimiento**: tratar a la IA como un compañero de reflexión y cuestionar siempre sus respuestas.
- **Diligencia**: revisar cada resultado de la IA y asumir su responsabilidad. El trabajo pasa de la producción a la revisión.

Entre las herramientas mostradas: Microsoft **Copilot** (conectado a todo el entorno de Microsoft) y **Digital Gateway**, una plataforma creada con Anthropic que automatiza en minutos la creación de data books a partir de extracciones brutas del ERP. La demo principal fue el **«VDD Flash Reader»**: en el lado comprador, un analista arrastra un informe de Vendor Due Diligence y la herramienta genera un resumen de alto nivel (cifras financieras clave, estructura jurídica, descripción del negocio), propone unas 30 preguntas dirigidas a la contraparte y vincula cada afirmación con su página de origen, para que los revisores puedan comprobarla en el original y detectar cualquier alucinación. Basada en un enfoque de generación aumentada por recuperación (RAG) sobre la base de conocimiento privada de la firma, acelera las revisiones con plazos ajustados — permite a los analistas dominar un documento en una o dos horas — y se desplegará internamente de forma más amplia en unas semanas, a la espera de la validación de integración y seguridad.
`,
  transcript: `
*Esta es una transcripción en español editada del evento. La grabación se transcribió automáticamente, se tradujo al inglés y se pulió ligeramente para facilitar la lectura; esta versión en español se tradujo después con IA a partir de la transcripción inglesa. El sentido y el desarrollo siguen fielmente el original en francés, pero la redacción exacta no es la pronunciada en la sala, y algunos nombres propios y cifras (señalados cuando son dudosos) no se han podido confirmar a partir del audio. La atribución de las intervenciones es aproximada.*

---

## Introducción

**Presentador / KPMG:** Buenas tardes a todos. Os presento rápidamente al equipo que nos acompaña esta tarde: compañeros de nuestros equipos de Digital y Transaction Services, entre ellos un manager y un analista sénior de Transaction Services. Le paso la palabra a Xavier.

**Xavier (socio de KPMG):** Esta diapositiva no es la más interesante: simplemente muestra los clientes de la firma. Trabajamos prácticamente con todo el CAC 40 y con muchos grandes grupos. Antes de empezar, os voy a hacer una pregunta, porque esta tarde vamos a hablar mucho de inteligencia artificial: ¿quién de vosotros usa ChatGPT?

*(La mayoría de la sala responde.)*

**Xavier:** Eso es, casi todos. ¿Y en la ESCP os enseñan a usar la IA en vuestras asignaturas?

*(Respuestas dispares en la sala.)*

**Xavier:** Creo que es un papel que las escuelas tendrán que asumir cada vez más. A los estudiantes se les dice que no usen la IA; sin embargo, mañana, y en realidad ya hoy, la IA forma parte del trabajo diario de nuestros equipos y consultores. Es más, creo que vuestros profesores deberían enseñaros a usar mejor la IA en el día a día.

Llevamos cuatro años trabajando en inteligencia artificial. Mi equipo de innovación y yo le hemos dedicado mucho esfuerzo. Con perspectiva, no lo hemos hecho todo bien, pero hemos avanzado mucho. Al principio trabajamos en una cantidad enorme de casos de uso. Hoy tenemos una idea mucho más clara de lo que funciona bien y de lo que funciona peor, y no solo en el trabajo relacionado con las finanzas.

## Retorno de la inversión, y para qué sirve realmente la IA

**Xavier:** Con perspectiva, la pregunta evidente es: ¿cuál es el retorno de la inversión? En mi puesto trato con muchos directores financieros y departamentos financieros del CAC 40, y lo primero que preguntan es exactamente eso: el ROI, las ganancias de productividad. ¿Las medís? ¿Vais a compartir esas ganancias con nosotros? La respuesta no es sencilla. Si se analiza, no creo que nadie dude ya de que la IA permite ahorrar tiempo; todo el mundo está de acuerdo.

Pero detrás hay preguntas más profundas. La primera: ¿qué vamos a hacer con esas ganancias? Podemos imaginar empresas que ya están bajo presión y dicen: «Lo primero que voy a hacer para mejorar la rentabilidad es reducir plantilla». ¿Y por dónde empezarían? Por desgracia para vosotros, a menudo por los más jóvenes, los que entran en el mercado laboral en los próximos años. Ya se nota cierta tensión en el mercado de contratación, y no solo en el extranjero; también en las empresas francesas.

Creo que sería un error. Hizo falta un estudio para entender el factor diferencial entre las empresas de la economía digital: firmas como KPMG, Accenture, Apple y otras. ¿Por qué ese sector? Porque va algo por delante en su reflexión y desarrollo, lo cual tiene sentido, ya que esas empresas ayudan a otras a transformarse. ¿Y sabéis cuál dijeron que era el factor diferencial? No son los modelos propios ni las plataformas o agentes desarrollados internamente, aunque se habla mucho de agentes. Son las personas. Las mujeres y los hombres, primero.

La idea es esta: el futuro no consiste en sustituir a los trabajadores de oficina por IA. Eso no significa que no vayamos a usar la IA, pero si lo único que hacemos es automatizar las tareas que hoy realizan nuestros equipos, entonces, a escala de la firma y de la economía, en realidad destruimos valor. Y eso no es bueno. La verdadera pregunta es qué hacemos con la IA: no salpicar la empresa de IA, sino repensar la empresa — repensar los modelos — en torno a la IA. Estamos adaptando nuestra oferta, nuestro go-to-market, la forma de prestar nuestros servicios en torno a la IA y las competencias de nuestros equipos.

## Consejos sobre competencias

**Xavier:** Hasta ahora, en finanzas, contratábamos sobre todo a personas de escuelas de negocios y perfiles similares, simplemente porque necesitábamos gente que hablara el mismo idioma que nuestros clientes y entendiera cómo se organizan las empresas. Eso es esencial. Pero con el giro de la década de 2010, los datos se volvieron esenciales para los negocios. Los datos son el punto de partida de cualquier directivo que toma una decisión y que dirige su empresa y su actividad. Así que los datos son el segundo pilar de nuestra estrategia.

En cuanto a competencias, esta es mi recomendación: mantened ese interés por las finanzas — es esencial —, pero desarrollad también verdaderas competencias en datos e inteligencia artificial. Creo que habéis elegido una buena combinación. Hoy hay que combinar estas competencias para ser todavía más atractivos en el mercado.

¿Por qué lo digo? Porque si las empresas no se transforman — y si nosotros mismos no emprendemos una transformación profunda de todos nuestros modelos, no solo de cómo prestamos los servicios, sino de nuestra oferta, nuestra gente, nuestra academia y nuestras carreras —, dentro de tres años no solo seremos menos competitivos o menos rentables: estaremos completamente fuera del mercado, tanto en atractivo para los clientes como para nuestros propios equipos. Dejaremos de ser relevantes, y eso es el declive. Es la idea de «click or decline». Se aplica a firmas como la nuestra y a todas las empresas del mundo. Hoy no hay realmente ningún sector a salvo de esta transformación.

Tenéis a la vez la oportunidad — y tampoco es un momento pasivo para vosotros, dada la tensión en la contratación — y la ocasión de vivir esta transformación y de ser la primera generación nativa de la IA. Todo va muy rápido. Sois nativos digitales por naturaleza. Por eso no hemos reducido la contratación; al contrario, la estamos acelerando, contratando perfiles duales que combinan finanzas e IA. Sois la generación que nos permitirá llevar a cabo nuestra propia transformación, y eso importa.

## La trayectoria de Xavier y sus consejos

**Xavier:** ¿Por qué me incorporé a KPMG? Hubo varios motivos. El primero era trabajar en una firma con una verdadera dimensión internacional; eso era esencial.

Os cuento una pequeña historia. Durante mucho tiempo trabajé en la auditoría de una gran empresa de servicios informáticos. Un manager francés que dirigía la parte estadounidense tenía que volver a Francia, y me dijeron que yo iría a sustituirle en el extranjero. Al final nunca volvió, pero eso me abrió puertas. Más tarde me dijeron que, como no iba a ser Estados Unidos, me enviarían a Londres, para empezar con los socios británicos. Iba a ser en septiembre de 2015.

Entonces, justo antes — hacia finales de junio / principios de julio de 2015, dos meses antes —, la firma realizó la mayor adquisición de su historia hasta ese momento: una empresa india especializada. Así que tres semanas después aterrizaba en Bangalore. Me quedé siete meses: una experiencia maravillosa, tanto en lo profesional como en lo personal. India es un país al que le tengo mucho cariño. Trabajé con los equipos locales de KPMG India, enormemente talentosos y enormemente comprometidos.

Al volver a Francia, decidí crear un área dedicada a las relaciones franco-indias. A diferencia de las empresas de servicios informáticos que deslocalizaban tareas a India — lo que se llama «offshoring», todos habéis oído hablar de ello —, yo hice lo contrario. Me dije: traigamos a Francia el mejor talento indio para trabajar en nuestros proyectos. Traje a decenas de managers indios, algo enriquecedor tanto para ellos como para nuestros equipos.

Todo esto para deciros que en vuestra carrera surgirán oportunidades. Hay que dar mucho para que aparezcan, y hay que saber aprovecharlas y saber recuperarse. Si tenéis una idea — «me gustaría desarrollar un nuevo servicio, una nueva oferta» —, no dudéis, sea cual sea vuestra trayectoria. Nos alegra muchísimo que alguien proponga ampliar nuestro campo de juego. También es posible en una firma: desde fuera puede parecer cerrada y rígida, pero por dentro es todo lo contrario. Tony también puede hablar de ello.

## La digitalización — y la ampliación — de la auditoría

**Xavier:** ¿Por qué vine a KPMG y a esta actividad? Me interesaban las finanzas, pero siempre me ha apasionado también la tecnología, el mundo digital. La mayor parte de mi cartera estaba ligada al sector tecnológico: editores de software, etc.

Hace unos años asumimos lo que se llama la auditoría digital: la digitalización de la propia auditoría. Durante mucho tiempo enseñé auditoría externa, e incluso entonces me parecía algo anticuada: volvíamos a las hojas de trabajo en papel. No estoy seguro de que despertara mucha pasión. Nos dijimos que aquello ya no era sostenible: no podemos pedir a nuestros equipos que trabajen como si siguiéramos en los años ochenta. Así que empezamos a digitalizar, con mucha ayuda de la transformación de nuestros clientes, que habían desmaterializado sus procesos y lanzado sus propios programas digitales. Hoy hay software en todas partes, así que el auditor se apoya de forma natural en la transformación del cliente. Ahora tenemos agentes en todas partes que ayudan en cada paso del proceso de auditoría, y lo mismo ocurre en consultoría y en nuestras demás actividades. Es bastante impresionante.

Nuestras profesiones se han transformado por completo. Pero podríais pensar que el camino ha terminado; al contrario, no ha hecho más que empezar. La promesa de la IA no se limita a ahorrar tiempo.

Un ejemplo concreto: durante 18 o 20 años solo hicimos auditoría financiera. La auditoría financiera es, en esencia, una garantía sobre la información financiera de las grandes empresas francesas. Luego, hace dos o tres años, dimos un segundo giro: la auditoría no financiera. CSRD, ESG: todos habéis oído hablar de ello. Las grandes empresas deben ahora informar sobre sus acciones para reducir su huella de carbono, promover la inclusión, etc. Así que es un segundo sombrero para el auditor: el auditor financiero y el auditor no financiero.

Y ahora también nos estamos convirtiendo en auditores de la tecnología. Puede sonar un poco raro, así que me explico. Cada vez más, con la IA, no se trata solo de la disponibilidad o la calidad de los datos; la mayoría de las empresas lo han resuelto más o menos. El verdadero reto es escalar: pasar de unos cuantos casos de uso aquí y allá a un uso masivo de la IA en toda la empresa. Si solo el 10 % de los empleados usa la IA, el negocio no se transforma. Y escalar no ocurre sin condiciones; hay varias. La primera es la confianza.

## La confianza en la tecnología

**Xavier:** La confianza es enormemente importante. Pensadlo: si hace 20 años, recién sacado el carné de conducir, alguien os hubiera pedido subir a un coche totalmente autónomo — sin volante, sin pedales, como los últimos robotaxis —, no creo que yo lo hubiera hecho. Del mismo modo, si le pedís a alguien de 40 años que siempre ha usado Excel y revisa cada fórmula de cada celda que de repente confíe en una IA, tendrá serias reservas. Así que la confianza en la tecnología es esencial.

Un ejemplo. Nos contactó una empresa de software francesa cuyo programa permite a los bancos dar un sí o un no rápido a una solicitud de hipoteca. Cuando compráis un piso y vais a vuestro banco, no es vuestro asesor quien decide según si le caéis bien: tiene un software que recalcula el valor razonable de mercado del inmueble que compráis y lo compara con el precio que pagáis. Si pagáis bastante más que el valor estimado por el software, el banco os dice: «Os financio, pero no el 100 %; quizá el 70 %, o el 30 %».

Esa empresa — nuestro cliente — vino a vernos y nos dijo, en esencia: «Tengo un problema de IA». El problema es la caja negra: la IA sufre el síndrome de la caja negra. Cuando la gente no entiende lo que hay dentro, la confianza cae, y eso frena la adopción del software. Así que nos pidieron simplemente que abriéramos la caja negra, la explicáramos y, sobre todo, que la certificáramos: que emitiéramos una especie de certificación sobre la tecnología.

Lo menciono porque es algo nuevo: nadie nos había pedido nunca una certificación sobre IA. Si desarrolláis soluciones de IA y queréis venderlas a empresas, esas empresas pueden deciros: «Muy bien, pero ¿habéis tratado la gobernanza, la seguridad de los datos, la ciberseguridad? ¿Habéis puesto controles internos en torno a vuestra solución? ¿Os habéis asegurado de que cumple la Ley de IA de la UE?». Quizá no: queríais ir rápido y lanzar el producto, lo cual es normal. Pero puede que necesitéis un tercero de confianza que le ponga un sello, para generar confianza. Eso es lo que ahora nos piden.

Así, auditores que antes solo hacían auditoría financiera, y luego de sostenibilidad, abren ahora un nuevo campo de juego: la auditoría de la tecnología. Lo hacemos con la IA; también podríamos hacerlo con la computación cuántica — ese tema ha desaparecido del radar por ahora, pero volverá —. La idea es que la nuestra es una profesión en constante movimiento, que se adapta a su entorno y busca crear valor con nuevos servicios. Creo de verdad que son la tecnología — y las personas — las que nos lo permiten. Es mi lado optimista: el futuro, tal como lo veo, es positivo, aunque haya motivos de pesimismo en lo que vemos a nuestro alrededor.

Os dejo una reflexión. ¿Conocéis a David S. Rose, el inversor? Su idea — y es exactamente lo que decía — es que si no os transformáis en tres años, estáis fuera del mercado, sea cual sea vuestro sector. Incluso Amazon podría verse cuestionada. Así que: transformaos.

## Gestión del cambio

**Xavier:** He dicho que hay dos factores para una adopción rápida y sólida. El primero es la confianza, de la que acabamos de hablar. El segundo es la gestión del cambio.

A vosotros todavía no os afecta mucho: sois nativos de la IA, estáis empezando. Afecta más a las personas con 5 a 10 años de experiencia, normalmente algunos managers. ¿Por qué? Porque han construido una rutina. Tras cuatro o cinco años en un puesto, uno se instala en una especie de zona de confort; cada día hace bien las cosas, así que cambiar la rutina y adoptar nuevas herramientas cuesta. Es muy difícil cuando llevas diez años con el mismo método y de repente te dicen que mañana cambies, que pases al RAG o a otra cosa.

Un estudio con más de 1.000 clientes analizó la adopción de la IA entre directivos, responsables, personal de primera línea y mandos intermedios, buscando dónde estaba el gran cuello de botella. Sistemáticamente, vuelve a los managers, porque han creado rutinas, y cambiarlas es complicado.

Y, de nuevo, la idea no es solo decirle a la gente que use un poco Microsoft Copilot, o ChatGPT, o lo que sea. Automatizar sin más lo que se hace hoy aporta poco valor. La idea es repensar el papel y las responsabilidades de los managers y los roles asignados al personal. Es muy difícil de hacer. Hablamos realmente de una transformación humana: no un problema tecnológico, sino humano. Es el mayor reto de todas las empresas: hacer evolucionar a las personas y repensar todo el modelo — prestación del servicio, oferta, carreras — en torno a la IA.

No decimos haberlo resuelto, pero lo estamos afrontando de frente. Hemos creado talleres. Quería darles un nombre algo provocador, así que los llamamos «The Wake Up Call». El objetivo es que nuestros managers tomen conciencia de que nuestra transformación no ocurrirá solo porque un pequeño equipo de transformación haya decidido transformar la firma: ocurrirá porque cada uno contribuye a su manera. No tenemos una única transformación de la firma que realizar; tenemos 7.000 transformaciones individuales, una por persona. No es una formación obligatoria una vez al año lo que cambia algo; es un acompañamiento continuo. También organizamos muchos hackathons y muchas otras iniciativas para acompañar el cambio en nuestros equipos.

## Cuatro temas tecnológicos que se repiten con directores financieros y consejos

**Xavier:** En contacto constante con directores financieros, consejos de administración y directivos, hay cuatro temas tecnológicos que surgen casi sistemáticamente.

**1. «IA en todas partes» no significa nada — así que: escalado e IA de confianza.** ¿Cómo escalar y cómo asegurarla, la famosa «IA de confianza»?

**2. Redefinir roles y responsabilidades dentro de la función financiera.** ¿Qué hará mañana el controller de gestión? Seguramente algo distinto, en momentos distintos, de lo que hace hoy.

**3. Resiliencia tecnológica:** saber que, si hay un problema, todo sigue funcionando. ¿Quién sabe qué es la resiliencia tecnológica?

**4. Soberanía de los datos y de la tecnología.** Hace dos años habría hablado de soberanía de los datos: dónde se almacenan nuestros datos. Preferimos datos almacenados en Europa, porque si se almacenan en Estados Unidos, el gobierno estadounidense puede, en virtud de ciertas leyes, acceder a ellos. Es una preocupación para todas las empresas, especialmente las europeas. Pero hoy vamos mucho más allá, hacia la soberanía tecnológica: ¿qué proveedor informático usáis? Si dependéis al 100 % de un proveedor estadounidense — habéis oído hablar del «kill switch» —, alguien podría, en teoría, pulsar un botón y cortar los servicios de Microsoft a una empresa. Sin servicios de Microsoft no hay correo; si vuestro software de facturación depende de ellos, no podéis facturar; si vuestro ERP depende de ellos, perdéis la contabilidad, etc. Es claramente complicado. Así que hoy somos capaces de medir la dependencia tecnológica — el corolario de la soberanía — y ayudamos a los clientes a construir una estrategia. No todos los datos tienen el mismo nivel de sensibilidad y criticidad, pero algunos son hipercríticos y deben estar bien protegidos. Es esencial.

## Ciberseguridad

**Xavier:** En ciberseguridad — todos habéis visto los últimos ataques; el aumento es sencillamente increíble —. Quizá hayáis oído hablar de un ataque a un sistema de refrigeración / almacenamiento en frío. Había un riesgo para la seguridad alimentaria: si alguien hubiera subido la temperatura a 4 °C y desactivado o suprimido las alarmas, nadie lo habría notado, y se podría haber contaminado a algo así como un millón de personas. Al final las alarmas saltaron y se detectó bastante rápido. Hubo que tirar muchos productos, pero por suerte nadie los compró ni los consumió después. Aun así, es un verdadero problema de ciberseguridad: aquí es donde el mundo digital ataca al mundo físico.

Hasta hace poco, los ataques consistían sobre todo en robar datos y pedir un rescate por devolverlos. Hoy los ataques son más dirigidos. También vemos «documentos falsos»: documentos generados o falsificados con IA. En una empresa, alguien puede crear cuentas de compra falsas; cada vez hay más notas de gastos falsas. El otro día vimos un caso — público, y nada bonito — en el que se reconoció que el 10 % de las notas de gastos eran falsas. Y como quien pagaba era un organismo financiado con dinero público, es un problema serio. Nunca había sido tan fácil generar una nota de gastos falsa.

Es un tema real y, para quienes os interese, es algo que seguimos de cerca. Algunos modelos están empezando a integrar marcas de agua, para rastrear y no solo verificar lo que se ha generado.

## ¿Dónde está el valor? El ejemplo de Delta

**Xavier:** El último ejemplo — rápido, porque es interesante —. La pregunta es: ¿dónde está el valor? Tomemos una aerolínea. ¿Está el valor en la actividad — hacer volar aviones con pasajeros que pagan —, que genera cierta facturación? ¿O en el programa de fidelización?

*(La sala apuesta por la actividad.)*

**Xavier:** En realidad es el programa de fidelización, y con mucha diferencia. El orden de magnitud del programa de fidelización era de algo así como 30.000 millones de dólares. Fue el responsable de fusiones y adquisiciones de Delta quien hizo este análisis. Al final no lo separaron para sacarlo a bolsa, porque ambos están ligados: si la actividad principal sufre, el programa también.

Vuestro programa de fidelización no son solo puntos. Son datos sobre vuestros clientes: adónde viajan, en qué clase, cuánto gastan, también con socios. Se ganan millas volando y gastando en comercios y a través de otros programas. La idea detrás son los datos de los clientes — lo que hacen en su día a día —, que luego se pueden revender a otras empresas. Y eso es exactamente lo que hacen: revenden toda esa información. Las empresas están sentadas sobre una mina de oro de datos, y pocas la monetizan bien. Así que — dejando aparte el RGPD y todo lo demás — la tecnología está bien, pero son los datos lo que de verdad se trabaja. Ahí está el valor.

---

## Transaction Services — presentación y demo

**Analista de TS (KPMG, Transaction Services):** Buenas tardes a todos; espero que esto funcione. Soy analista en KPMG. Me incorporé a KPMG hace tres años.

Antes de empezar, unas palabras sobre nuestro trabajo. Como ha explicado Xavier, con la inteligencia artificial… dejadme primero explicar qué es Transaction Services.

Trabajamos en contextos transaccionales. Somos asesores, del lado vendedor o del lado comprador. En un contexto de venta, asesoramos al vendedor; nuestros clientes pueden ser fundadores, accionistas o un fondo de private equity que recurre a nosotros para preparar la venta de una empresa de su cartera. Antes de que la empresa salga al mercado, hay que preparar la información financiera — la historia detrás de las cifras —, que luego sirve a los bancos de inversión para llevar el proceso y contactar con posibles compradores.

También trabajamos del lado comprador. Imaginad un fondo de private equity europeo o estadounidense que quiere hacer una adquisición en Francia. Necesita una visión más profunda, así que estudiamos el histórico de la empresa para dar una imagen fiel de las cifras: la facturación, las magnitudes ajustadas, un histórico normalizado.

Transaction Services es una actividad de asesoramiento en operaciones de KPMG Francia: unos 300 profesionales, en el periodo FY23–25. *(Aquí se citaron algunas cifras de operaciones que no se han podido transcribir de forma fiable, por ejemplo un valor de empresa del orden de decenas de millones de euros.)*

Formo parte del equipo generalista, que trabaja en distribución, energía, servicios financieros, inmobiliario y otros sectores. Estos tres últimos años han sido una experiencia muy rica, con una curva de aprendizaje intensa y una exposición excelente: puedes encontrarte en una sala con directores financieros y altos directivos. Es una excelente iniciación a las finanzas corporativas.

Más en concreto, ¿qué aportamos a nuestro cliente? Os pongo un ejemplo sencillo. Recibimos datos financieros brutos — por ejemplo, un EBITDA reportado —. El EBITDA es la métrica clave para valorar una empresa; sirve de base al comprador para calcular el precio a pagar. Nuestro análisis es un auténtico trabajo de investigación: intentamos identificar todo lo que afecta al rendimiento actual y ajustarlo para reflejar una visión más realista, tanto para el precio de compra como para el rendimiento futuro de la empresa. Cada ajuste del EBITDA, combinado con el múltiplo de EBITDA — un múltiplo que se usa por sector para obtener el valor de empresa —, puede mover la valoración de forma significativa. Hacemos el mismo ejercicio desde otros ángulos también, incluida la facturación.

## La IA en Transaction Services de KPMG

**Analista de TS:** Hoy, en la era de la IA, KPMG se está transformando, y nosotros en Transaction Services también. Hace unos meses, KPMG firmó una alianza con **Anthropic** para dar acceso a los modelos **Claude**. La idea es aportar nuestra experiencia de negocio — que sigue siendo la piedra angular — junto con las ganancias de productividad y objetividad que puede aportar la IA.

Recientemente, dentro de nuestra unidad de negocio, creamos lo que llamamos un **«Lighthouse»**: un centro de excelencia de IA. Son personas bastante familiarizadas con la IA, que ayudan a impulsar este cambio y proponen soluciones internas; forma plenamente parte del enfoque de la alianza. Formo parte de este centro de excelencia desde hace cuatro o cinco meses. Trabajamos principalmente en dos líneas.

La **primera línea es la formación del personal.** En septiembre y octubre organizamos bootcamps de IA con casos concretos para formar a la gente en la orquestación de agentes y en sacar el máximo partido a las herramientas disponibles.

La **segunda línea es el desarrollo de soluciones.** La experiencia de negocio sigue siendo la entrada: siempre hacen falta ingenieros para la seguridad y la integración; pero, con nuestro conocimiento del sector, podemos crear automatizaciones y soluciones para nuestra unidad de negocio. Paralelamente, algunas personas se incorporan a la célula con un mandato rotatorio de cuatro a cinco meses, dos personas a la vez. Durante ese periodo no hacen finanzas: hacen vigilancia de la IA y del mercado, y resuelven problemas del personal que trabaja en proyectos en curso. Cada semana hay una nueva funcionalidad: Claude lanzó una hace unos días; hace un par de semanas hubo nuevos asistentes. Así que cada semana estamos atentos a lo que llega al mercado, para debatir internamente qué podemos integrar y cómo encaja en nuestro futuro.

## La formación y el marco de las «4D»

**Analista de TS:** En cuanto a la formación, afecta a todos los niveles, de analistas a asociados, con los mismos pilares pero formatos diferenciados, de dos a cuatro días. Hoy todo el mundo puede hacer cosas con IA, pero es muy importante saber cuándo existe un riesgo real. Con un enfoque riguroso — por ejemplo, un prompting cuidadoso — se pueden evitar muchos problemas de alucinación, y eso es lo que intentamos explicar a nuestros equipos.

Hay un marco que quería compartir, llamado las **4D**. Antes de cada uso de la IA, hay que tener en cuenta cuatro cosas:

**1. Delegación.** Preguntaos si delegar o no esa tarea en la IA. La IA interviene para acelerar las tareas que consumen tiempo: puede resumir notas, detectar anomalías en un gran data book de Excel, ayudar a leer un documento largo para encontrar una cláusula concreta o señales de alerta (para ajustes de EBITDA o de deuda neta, por ejemplo). Pero la parte de juicio nunca debe delegarse en la IA. Nosotros seguimos siendo los orquestadores. Nos corresponde decidir qué conservar y qué no, mantener el control sobre los temas más sensibles y críticos — una revisión, por ejemplo, es algo que hacemos a menudo y que nunca debemos confiar a la IA —. Siempre «human in the loop»: nunca perdáis ese reflejo.

**2. Descripción (el prompting).** Un buen prompt reduce drásticamente el riesgo de alucinación y mejora el rendimiento en consumo de tokens. Si escribo malos prompts, me decepcionará el resultado, haré una segunda y una tercera iteración, perdiendo tiempo y gastando tokens. Mi consejo para un buen prompt: dadle un rol. Si queréis análisis para una de vuestras asignaturas, decidle que actúe en consecuencia; si son finanzas, decidle que actúe como asesor de TS o como banquero de inversión. Es decir: especificad el sombrero / el rol, y luego el contexto. En nuestro trabajo, los enfoques buy-side y sell-side son distintos: el buy-side es más crítico, más parecido a la auditoría. Indicad el rol, precisad el contexto, citad en qué archivo buscar, pedidle que traiga la fuente — de qué página o de qué información sale la afirmación —, pedid ese tipo de respaldo y especificad cómo debe ser el resultado: una tabla, un Excel, un PowerPoint. Un prompt bien construido ahorra tiempo y aporta mucho más valor que uno genérico.

**3. Discernimiento.** Imaginad que trabajáis con la IA como compañero de reflexión: podéis hacer una lluvia de ideas juntos. Cuando os dé una primera respuesta, llevad siempre la reflexión más allá: cuestionadla, preguntadle si ha mirado todas las fuentes, si está segura, si esto contradice aquello. Empujad hacia un razonamiento más profundo.

**4. Diligencia.** En ningún momento debe ser «la IA hizo el trabajo» o «la IA ayudó y nos quedamos ahí». Siempre asumimos la responsabilidad del trabajo hecho por la IA, después de revisarlo. Nuestro trabajo está cambiando: un poco menos de producción y mucha más revisión, y hay que mantener a la gente alineada en eso. Os ayude la IA en lo que os ayude, al final sois vosotros quienes presentáis el trabajo al cliente.

## Herramientas y demo — VDD Flash Reader

**Analista de TS:** Más en concreto, en el ámbito de la innovación, en nuestra unidad de negocio tenemos acceso a **Copilot**, el asistente de IA de Microsoft, conectado a todo nuestro entorno Microsoft, con variantes en Excel y Word que permiten trabajar directamente dentro del archivo. Esto ayuda a todos a crear **agentes** adecuados para cada proyecto. El enfoque no es que unas pocas personas construyan agentes para todos y el resto se limite a usarlos: el sentido del seminario de formación para toda la plantilla es que cada uno, según su contexto, pueda crear su propio agente para su propia necesidad, con los conectores y las instrucciones adecuados.

**Digital Gateway** — un breve paréntesis — es una plataforma que es en parte fruto de nuestra colaboración con Anthropic. Automatiza los data books: imaginad que tenéis datos brutos, una extracción del ERP de SAP o de otro sistema; arrastráis los datos brutos y, en pocos minutos, tenéis el data book listo y podéis empezar la revisión analítica, después de comprobar la mecánica del documento, claro. Funciona en Excel pero también en diapositivas. Reduce nuestro trabajo de producción y aumenta enormemente el de revisión: ahí es donde se transforma el negocio.

Os enseño una breve demo de una solución que hemos desarrollado internamente. Decidimos llamarla **VDD Flash Reader.** En un contexto buy-side recibimos documentación: normalmente VDD (Vendor Due Diligence), IM (Information Memoranda), teasers, etc. Tenemos que leer rápidamente ciertos temas, identificar los puntos clave y, si hace falta, plantear preguntas a la contraparte, a menudo con plazos ajustados. Así que es un asistente de lectura.

Así es la solución. El panel inicial muestra todos los documentos disponibles en la plataforma. Supongamos que sois asesores buy-side en Transaction Services y recibís un nuevo VDD de otro asesor, también de las Big Four. Creáis una nueva entrada VDD y arrastráis el documento. Hago una prueba rápida.

A partir de un documento, necesitáis algunas ideas de preguntas. Así que le digo: quiero unas treinta preguntas sobre temas como la facturación, los temas prioritarios sobre los que preguntar. Luego lanzo el análisis; tarda unos minutos, pero prácticamente está hecho en un momento. Lo voy a parar y os enseño un resultado anterior para que veamos el consumo de tokens.

Aquí tenemos un primer resultado. Es sobre datos públicos, así que no hay problema. La idea es que genera un resumen de alto nivel con las cifras financieras clave, el contexto del VDD, el organigrama jurídico, la descripción del negocio, lo que ocurre en torno a la operación y el rendimiento histórico. En nuestro trabajo de revisión, cuando tenemos una afirmación que queremos verificar, siempre tenemos la página de origen del VDD: hacéis clic y obtenéis una captura, para comprobar que no ha alucinado ni leído mal nada. Esa es una vista; también hay una vista por secciones, siguiendo el índice.

También muestra las preguntas que pedí al principio: ha generado una serie de preguntas. Puedo revisarlas, conservarlas, exportarlas a Excel para editarlas y enriquecerlas. Y aquí hay un bot integrado en la plataforma que permite conversar directamente con el VDD para hacerle preguntas.

## Preguntas y respuestas

**P (público):** Lo que habéis construido, ¿es un RAG?

**Analista de TS:** Sí. Tenéis vuestra base de conocimiento — lo que habéis hecho en el pasado — más acceso a nuestros datos privados. No es solo el modelo base el que genera: también hay conocimiento y acceso a nuestros datos privados. De ahí viene el valor añadido de la solución. No puedo contarlo todo a este nivel, pero esa es la idea.

**P:** Gracias por la presentación. Con este agente en marcha, ¿cuánto se tardaba antes en analizar un documento?

**Analista de TS:** Seguimos haciendo el trabajo completo, incluso con el agente. Interviene para acelerar en contextos de plazos ajustados, cuando hay que leer rápido o centrarse en temas críticos. En ningún momento dejamos de leer el documento. Actúa como acelerador — una herramienta de lectura para centrarse en un tema concreto — y permite hacerse con el tema en una o dos horas desde que se recibe el primer documento. Cada vez trabajamos con plazos más ajustados, con más exigencia de rapidez por parte de los clientes, así que esto nos ayuda a seguir el ritmo. No hemos medido el ahorro de tiempo exacto, porque depende del VDD: algunos tienen 500 páginas y otros 80. Todavía no lo hemos desplegado entre el personal, así que habéis tenido un pequeño adelanto. Lo pidió nuestro propio personal — organizamos talleres para recoger sugerencias — y aporta un valor real a nuestra gente.

**P:** ¿Cuándo lo vais a poner a disposición de vuestro personal?

**Analista de TS:** Está en discusión. Debería llegar en las próximas semanas, pero antes hay que resolver temas de integración y seguridad, además de los accesos de administrador, lo que lleva algo de tiempo.

**Presentador:** Muchas gracias.

*(Fin de la grabación.)*
`,
};

export default es;
