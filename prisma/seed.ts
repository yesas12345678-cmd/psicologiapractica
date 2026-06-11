import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding categories...");

  const categories = [
    {
      slug: "ansiedad-burnout",
      number: "01/",
      name: "Ansiedad y Burnout",
      shortName: "Ansiedad",
      description: "Supera el agotamiento y el estrés diario con herramientas basadas en la evidencia.",
      intro: "El ritmo de vida moderno y las demandas laborales pueden desbordar nuestros mecanismos de defensa. Aquí encontrarás recursos científicos, herramientas prácticas y guías terapéuticas contrastadas para afrontar la ansiedad, el estrés crónico y recuperar el control de tu bienestar.",
    },
    {
      slug: "desarrollo-mindfulness",
      number: "02/",
      name: "Desarrollo Personal y Mindfulness",
      shortName: "Desarrollo",
      description: "Cultiva la atención plena y el crecimiento personal día a día.",
      intro: "El crecimiento personal no es un destino, sino un proceso activo. En esta sección abordamos herramientas de atención plena (Mindfulness), el desarrollo de la inteligencia emocional y estrategias conductuales validadas científicamente para ayudarte a cultivar una mente enfocada, resiliente y en paz.",
    },
    {
      slug: "relaciones-entorno",
      number: "03/",
      name: "Relaciones y Entorno Social",
      shortName: "Relaciones",
      description: "Construye vínculos saludables, asertivos y fuertes con tu entorno.",
      intro: "Somos seres profundamente sociales y la calidad de nuestras relaciones determina gran parte de nuestra salud mental. Explora cómo funciona el apego emocional, aprende a comunicarte de manera asertiva, a establecer límites saludables y a sanar vínculos con tu pareja, familia y entorno laboral.",
    },
    {
      slug: "terapia-salud-mental",
      number: "04/",
      name: "Terapia y Salud Mental",
      shortName: "Terapia",
      description: "Aprende sobre corrientes terapéuticas, cuándo acudir al psicólogo y mitos de la mente.",
      intro: "Normalizar el cuidado de la salud mental y desmitificar la psicoterapia es nuestro compromiso primordial. En este espacio exploramos las corrientes terapéuticas más efectivas, explicamos qué esperar del proceso psicoterapéutico y te ofrecemos guías claras para elegir el profesional y enfoque más adaptado a tus necesidades.",
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  console.log("Seeding articles...");

  const articles = [
    // --- CATEGORY 1: ANSIEDAD & BURNOUT ---
    {
      slug: "guia-completa-combatir-burnout-ejercicios",
      categorySlug: "ansiedad-burnout",
      title: "Guía definitiva para superar el Síndrome de Burnout: Ejercicios diarios y límites laborales",
      excerpt: "El agotamiento laboral crónico daña tu salud y rendimiento. Aprende a identificar los síntomas neurobiológicos y aplica un plan de recuperación conductual paso a paso.",
      date: "2026-06-11",
      dateLabel: "11 Jun, 2026",
      readingTime: "12 min de lectura",
      image: "/images/burnout_recuperacion_guide.png",
      published: true,
      seoTitle: "Cómo Superar el Síndrome de Burnout: Guía Práctica de Recuperación",
      body: `
        <h2>1. Introducción al Desgaste Ocupacional</h2>
        <p>El estrés prolongado en el ámbito de trabajo puede conducir a un estado de agotamiento absoluto conocido clínicamente como el <strong>Síndrome de Burnout</strong> o síndrome de desgaste profesional. Reconocido formalmente por la Organización Mundial de la Salud (OMS) en la Clasificación Internacional de Enfermedades (CIE-11) como un fenómeno puramente ocupacional, no debe ser subestimado como un cansancio rutinario. Representa un colapso multidimensional del sistema de adaptación del organismo que afecta la salud cognitiva, fisiológica y emocional de manera profunda.</p>
        <p>A lo largo de esta guía definitiva, analizaremos de manera rigurosa la etiología del burnout, sus bases neurobiológicas y te dotaremos de un plan práctico estructurado de recuperación con ejercicios cognitivos y conductuales diarios diseñados por psicólogos clínicos.</p>

        <h2>2. La Neurobiología del Agotamiento Crónico</h2>
        <p>El burnout no es una simple actitud mental; tiene un correlato orgánico. La exposición mantenida al estrés laboral activa de forma ininterrumpida el eje hipotalámico-hipofisario-adrenal (HHA). Esta activación genera una secreción continuada de cortisol y catecolaminas. Con el tiempo, este mecanismo desencadena resistencia al cortisol en los receptores neuronales, provocando una respuesta inflamatoria sistémica y una desregulación en la plasticidad sináptica.</p>
        <p>Investigaciones mediante resonancia magnética funcional demuestran que las personas que sufren de burnout presentan una disminución en el volumen de materia gris en la corteza prefrontal dorsolateral (zona encargada de la toma de decisiones y el autocontrol) y una hiperactividad en la amígdala (núcleo del miedo y la alerta). Esto explica la dificultad extrema para concentrarse, la labilidad emocional y la sensación de desconexión cognitiva (neblina mental).</p>

        <h2>3. Las Tres Dimensiones del Síndrome de Burnout</h2>
        <p>De acuerdo con el modelo desarrollado por Christina Maslach, el burnout se evalúa a través de tres pilares esenciales que debes aprender a detectar en tu propia rutina:</p>
        <ul>
          <li><strong>Agotamiento Emocional:</strong> Vaciamiento completo de los recursos internos. El trabajador siente que ya no puede dar más de sí mismo a nivel afectivo ni cognitivo.</li>
          <li><strong>Despersonalización (Cinismo):</strong> Desarrollo de actitudes frías, distantes y cínicas hacia las tareas, los clientes o los compañeros de equipo como un mecanismo defensivo desadaptativo.</li>
          <li><strong>Baja Realización Personal:</strong> Autoevaluación negativa de las capacidades y del rendimiento. Surge un sentimiento constante de incompetencia e inutilidad profesional.</li>
        </ul>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3">Característica</th>
                <th class="p-3">Estrés Común</th>
                <th class="p-3">Síndrome de Burnout</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3 font-bold text-slate-900">Emociones</td>
                <td class="p-3">Sobre-reactividad, hiperactividad emocional.</td>
                <td class="p-3 font-semibold text-teal-800">Agotamiento emocional, aplanamiento afectivo, cinismo.</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Enfoque físico</td>
                <td class="p-3">Pérdida de energía física (cansancio temporal).</td>
                <td class="p-3 font-semibold text-teal-800">Colapso total de energía, insomnio de conciliación, dolores musculares crónicos.</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Actitud</td>
                <td class="p-3">Preocupación, prisa, urgencia por resolver tareas.</td>
                <td class="p-3 font-semibold text-teal-800">Desapego absoluto, apatía, aislamiento, sentimiento de incompetencia.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>4. Ejercicios Diarios de Recuperación Fisiológica</h2>
        <p>Para reprogramar el sistema nervioso autónomo y pasar del estado de alerta simpática al modo de calma parasimpática, es fundamental instaurar pautas corporales específicas todos los días:</p>
        
        <h3>El Bloqueo de Descompresión Post-Jornada</h3>
        <p>Nada más terminar la jornada de trabajo, realiza una pausa de transición de 15 minutos. Siéntate en un lugar neutral, apaga los dispositivos electrónicos y ejecuta respiraciones en caja: inhala en 4 segundos, retén el aire 4 segundos, exhala en 4 segundos y permanece vacío 4 segundos. Este patrón respiratorio le indica a tu tronco encefálico que el peligro ha cesado, facilitando el descenso de la frecuencia cardíaca y del tono muscular.</p>
        
        <h3>Desconexión Digital Estricta</h3>
        <p>Establece un horario límite inflexible de desconexión. A partir de las 19:30 o 20:00, las notificaciones de trabajo deben silenciarse por completo. Utiliza el filtro de luz cálida en tus pantallas y prioriza actividades analógicas para favorecer la síntesis natural de melatonina y la inducción de un sueño reparador.</p>

        <div class="my-6 p-5 bg-teal-50/50 border border-teal-100 rounded-2xl space-y-3">
          <h4 class="text-sm font-bold text-teal-900 uppercase tracking-wider">Plan de Acción: El Límite Asertivo Progresivo</h4>
          <p class="text-xs text-slate-655 leading-relaxed">
            Superar el burnout exige reconfigurar tu manera de interactuar con el entorno laboral. Te proponemos aplicar fórmulas basadas en la capacidad real y no en la urgencia ajena:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-3.5 bg-rose-50 border border-rose-100 rounded-xl">
              <span class="font-bold text-rose-800 block mb-1">Evita (Reactivo):</span>
              "No puedo hacer esto hoy, estoy colapsado." (Suena defensivo y provoca fricción).
            </div>
            <div class="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl">
              <span class="font-bold text-emerald-800 block mb-1">Aplica (Asertivo):</span>
              "Para garantizar la calidad de este informe, necesito posponer la entrega al jueves o delegar el análisis. ¿Cuál priorizamos?" (Redefine expectativas sin conflicto).
            </div>
          </div>
        </div>

        <h2>5. El Diario de Valores y Logros Diarios</h2>
        <p>Para combatir la pérdida de autoestima y realización personal, mantén un registro escrito en tu cuaderno. Cada noche antes de dormir, anota tres tareas que hayas resuelto de manera satisfactoria (por pequeñas que sean) y describe cómo esas tareas se alinean con tus valores personales (ej: rigor, compañerismo, creatividad). Esto ayuda a redirigir la atención selectiva del cerebro, sesgada habitualmente hacia las preocupaciones y el estrés.</p>

        <h2>6. Cuándo es Necesario Solicitar Asistencia Profesional</h2>
        <p>Si a pesar de aplicar estos cambios conductuales experimentas llanto recurrente, problemas digestivos severos, insomnio prolongado o ideaciones de incapacidad total, es fundamental acudir a terapia psicológica. La terapia cognitivo-conductual (TCC) y la terapia de aceptación y compromiso (ACT) proporcionan el marco seguro para sanar el sistema de alarma del cerebro y evitar recaídas en el desgaste crónico.</p>
      `,
    },
    {
      slug: "ataques-panico-guia-neurobiologia-afrontamiento",
      categorySlug: "ansiedad-burnout",
      title: "Cómo detener un ataque de pánico: Explicación neurocientífica y técnicas de autorregulación",
      excerpt: "La crisis de angustia es una respuesta de alarma extrema. Descubre el papel de la amígdala en el pánico y domina las herramientas cognitivo-conductuales para desactivarla.",
      date: "2026-06-10",
      dateLabel: "10 Jun, 2026",
      readingTime: "11 min de lectura",
      image: "/images/panic_attack_calm.png",
      published: true,
      seoTitle: "Guía para Detener un Ataque de Pánico: Neurobiología y Calma",
      body: `
        <h2>1. ¿Qué es un Ataque de Pánico?</h2>
        <p>Un ataque de pánico, o crisis de angustia, es la aparición repentina de un miedo o malestar intenso que alcanza su pico máximo en cuestión de minutos. Los síntomas físicos incluyen taquicardia, sudoración, temblores, disnea (sensación de asfixia), opresión en el pecho, náuseas, mareos y despersonalización (sentirse desconectado de uno mismo). Estos síntomas van acompañados del temor irracional a perder el control, volverse loco o morir de forma inminente.</p>
        <p>Entender qué le ocurre a tu cuerpo durante esta tormenta neuroquímica es el primer paso indispensable para recuperar la calma y frenar la espiral del pánico.</p>

        <h2>2. La Cascada del Pánico: ¿Qué Ocurre en el Cerebro?</h2>
        <p>Durante una crisis de pánico, el cerebro sufre un secuestro emocional. La amígdala detecta una amenaza potencial (que puede ser un pensamiento, una sensación física menor como un latido acelerado, o un estímulo externo) y activa instantáneamente el sistema de alarma de lucha o huida. Envía una señal al hipotálamo, que estimula el sistema nervioso simpático.</p>
        <p>Esta activación provoca la liberación masiva de adrenalina y noradrenalina desde las glándulas suprarrenales. Los vasos sanguíneos se contraen en los órganos no vitales y se dilatan en los músculos grandes; la respiración se acelera para oxigenar los tejidos; y el corazón bombea sangre con fuerza. Si no hay peligro real que requiera correr o luchar, el exceso de oxígeno en sangre genera hiperventilación, la cual altera el pH sanguíneo (alcalosis respiratoria), provocando hormigueo en las extremidades, mareo y más pánico. Es un circuito cerrado de retroalimentación.</p>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3">Característica</th>
                <th class="p-3">Ataque de Pánico</th>
                <th class="p-3">Ataque de Ansiedad</th>
                <th class="p-3">Infarto de Miocardio</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3 font-bold text-slate-900">Inicio y Duración</td>
                <td class="p-3 font-semibold text-teal-800">Súbito. Pico en 10 minutos; remite en unos 20-30 min.</td>
                <td class="p-3">Gradual. Vinculado a rumiación; prolongado en el tiempo.</td>
                <td class="p-3 text-rose-800">Súbito o tras esfuerzo. Dolor sostenido que no remite al respirar.</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Dolor en Pecho</td>
                <td class="p-3 font-semibold text-teal-800">Puntual, sensación de pinchazo o ahogo, hiperventilación.</td>
                <td class="p-3">Opresión difusa en la parte superior.</td>
                <td class="p-3 text-rose-800">Opresión severa y aplastante en el centro del pecho que irradia al brazo/mandíbula.</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Origen Clínico</td>
                <td class="p-3 font-semibold text-teal-800">Activación simpática por secuestro amigdalino inofensivo.</td>
                <td class="p-3">Acumulación de estrés cognitivo o social.</td>
                <td class="p-3 text-rose-800">Obstrucción física de una arteria coronaria (urgencia médica).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Desarmar la Interpretación Catastrofista</h2>
        <p>El núcleo de la crisis de pánico reside en la <strong>interpretación catastrofista</strong> de las sensaciones físicas normales. Si sientes palpitaciones y piensas "Estoy sufriendo un infarto", la amígdala interpretará ese pensamiento como confirmación del peligro y liberará más adrenalina.</p>
        <p>Para romper este ciclo, debes aplicar la reestructuración cognitiva inmediata: recuerda que las sensaciones físicas son molestas pero seguras. Repítete de forma consciente: "Mi corazón late rápido porque mi cuerpo tiene un exceso de adrenalina temporal. Esto no es peligroso y pasará en unos minutos. Estoy a salvo".</p>

        <h2>4. Técnicas Fisiológicas de Desactivación Inmediata</h2>
        <p>Una vez reestructurado el pensamiento, aplica técnicas físicas para forzar al sistema parasimpático a tomar el control:</p>
        
        <h3>La Maniobra de Respiración Diafragmática Lenta</h3>
        <p>Inhala aire por la nariz lentamente durante 4 segundos expandiendo tu diafragma (el abdomen debe elevarse, no el pecho). Mantén el aire 2 segundos y exhala soplando suavemente por la boca durante 6 segundos. Repite este ciclo durante 5 minutos. El alargamiento de la exhalación estimula mecánicamente el nervio vago, induciendo un descenso inmediato en la frecuencia cardíaca.</p>

        <div class="my-6 p-5 bg-teal-50/50 border border-teal-100 rounded-2xl space-y-2.5">
          <h4 class="text-sm font-bold text-teal-900 uppercase">La Técnica de Anclaje 5-4-3-2-1 (Grounding)</h4>
          <p class="text-xs text-slate-655 leading-relaxed">
            Para desviar la atención secuestrada por el miedo interno, dirige tus sentidos hacia el entorno inmediato y nombra mentalmente:
          </p>
          <ul class="text-xs text-slate-700 space-y-1">
            <li><strong>5 objetos</strong> que puedas ver (ej: una silla, una ventana, tu reloj).</li>
            <li><strong>4 texturas</strong> que puedas tocar (ej: la textura de tus vaqueros, el frío del suelo).</li>
            <li><strong>3 sonidos</strong> diferentes (ej: el tráfico lejano, un aire acondicionado).</li>
            <li><strong>2 olores</strong> que percibas (ej: café, colonia).</li>
            <li><strong>1 sabor</strong> o sensación en tu boca.</li>
          </ul>
        </div>

        <h2>5. La Exposición Controlada y la Curva de Ansiedad</h2>
        <p>El pánico sigue una curva biológica: sube con rapidez, alcanza una meseta y desciende de forma inevitable cuando los niveles de adrenalina son reabsorbidos por el organismo (generalmente en 10-20 minutos). Intentar huir o luchar contra la sensación prolonga la duración del ataque.</p>
        <p>La estrategia más efectiva a largo plazo es la aceptación radical. Permítete sentir el malestar sin huir de la situación. Al comprobar de forma repetida que las sensaciones disminuyen por sí solas sin causar daño real, tu cerebro desaprenderá el condicionamiento del miedo.</p>
      `,
    },
    // --- CATEGORY 2: DESARROLLO & MINDFULNESS ---
    {
      slug: "mindfulness-neurociencia-guia-meditacion-practica",
      categorySlug: "desarrollo-mindfulness",
      title: "Neurociencia del Mindfulness: Cómo la atención plena modifica la estructura cerebral",
      excerpt: "Descubre los mecanismos neurológicos de la meditación y domina un programa de entrenamiento diario para mejorar tu concentración y plasticidad mental.",
      date: "2026-06-09",
      dateLabel: "09 Jun, 2026",
      readingTime: "12 min de lectura",
      image: "/images/neuroscience_mindfulness.png",
      published: true,
      seoTitle: "Neurociencia del Mindfulness: Beneficios Cerebrales y Guía",
      body: `
        <h2>1. El Auge Científico de la Atención Plena</h2>
        <p>El término <strong>Mindfulness</strong> o atención plena se ha trasladado en las últimas décadas del misticismo oriental al laboratorio de neurociencia. Definido por el Dr. Jon Kabat-Zinn como la conciencia que surge al prestar atención de forma deliberada en el momento presente y sin juzgar, ha demostrado ser una de las herramientas no farmacológicas más potentes para optimizar la salud mental y la plasticidad cerebral.</p>
        <p>A lo largo de este artículo, exploraremos las últimas evidencias sobre cómo el entrenamiento atencional cambia la materia gris del cerebro y te ofreceremos una guía paso a paso para consolidar una práctica diaria con base científica.</p>

        <h2>2. Neuroplasticidad: El Cerebro Meditativo bajo el Escáner</h2>
        <p>La introducción de la neuroimagen (como la resonancia magnética estructural y funcional) ha permitido a los científicos constatar que la meditación recurrente altera físicamente la morfología de áreas cerebrales esenciales. Este fenómeno se conoce como neuroplasticidad autodirigida.</p>
        <p>Estudios liderados por la Dra. Sara Lazar en la Universidad de Harvard revelaron que tras un programa de 8 semanas de reducción del estrés basado en mindfulness (MBSR), se producen cambios anatómicos constatables:</p>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3">Área Cerebral</th>
                <th class="p-3">Cambio Anatómico</th>
                <th class="p-3">Impacto Clínico y Funcional</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3 font-bold text-slate-900">Córtex Prefrontal</td>
                <td class="p-3 font-semibold text-emerald-700">Aumento de grosor cortical</td>
                <td class="p-3">Mejora de la concentración sostenida, la toma de decisiones y la regulación de emociones.</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Amígdala Cerebral</td>
                <td class="p-3 font-semibold text-rose-700">Disminución del volumen</td>
                <td class="p-3">Menor reactividad fisiológica ante factores estresantes cotidianos; reducción de la alerta constante.</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Hipocampo</td>
                <td class="p-3 font-semibold text-emerald-700">Aumento de materia gris</td>
                <td class="p-3">Facilitación del aprendizaje, mejor retención de la memoria a largo plazo y mejor control hormonal del estrés.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. La Red Neuronal por Defecto (RND) y el Vagabundeo Mental</h2>
        <p>Cuando no estamos realizando ninguna tarea concreta, el cerebro activa la <strong>Red Neuronal por Defecto (RND)</strong>. Esta red está asociada con el vagabundeo mental, los pensamientos autorreferenciales ("¿qué piensan de mí?"), la rumiación sobre el pasado y la preocupación por el futuro. Una RND hiperactiva se asocia clínicamente con la ansiedad y el estado de ánimo deprimido.</p>
        <p>El mindfulness tiene la capacidad de inhibir la RND. Al focalizar la atención en sensaciones físicas inmediatas (la respiración o los sonidos del entorno), el cerebro desconecta la red por defecto y activa la Red de Atención Directa, reduciendo el ruido mental y facilitando la calma cognitiva.</p>

        <div class="my-6 p-5 bg-teal-50/50 border border-teal-100 rounded-2xl">
          <h4 class="text-sm font-bold text-teal-900 uppercase mb-2">Instrucciones de Meditación Formal (10 min/día)</h4>
          <ol class="text-xs text-slate-700 space-y-2 list-decimal pl-4">
            <li><strong>Postura estable:</strong> Siéntate erguido en una silla cómoda con los pies bien apoyados en el suelo. Relaja los hombros.</li>
            <li><strong>Focalización sensorial:</strong> Cierra los ojos y atiende exclusivamente a la entrada y salida de aire por las fosas nasales, sintiendo el flujo del aire o el movimiento de tu abdomen.</li>
            <li><strong>Reorientación sin juicio:</strong> Cuando notes que tu mente divaga hacia rumiaciones o planes futuros, no te culpes. Simplemente date cuenta de la distracción con amabilidad y devuelve suavemente tu atención a la respiración.</li>
          </ol>
        </div>

        <h2>4. El Fortalecimiento Prefrontal</h2>
        <p>El verdadero ejercicio de fortalecimiento cognitivo ocurre en el momento de darte cuenta de la distracción y reorientar la atención. Cada vez que realizas esta acción, estás fortaleciendo las conexiones prefrontales de tu cerebro y debilitando la respuesta de alarma amigdalina. Con la práctica repetida, la atención plena se convierte en un hábito orgánico que mejora la resiliencia mental frente a cualquier conflicto laboral o personal.</p>
      `,
    },
    {
      slug: "inteligencia-emocional-desarrollo-relaciones-exito",
      categorySlug: "desarrollo-mindfulness",
      title: "Desarrollo de la Inteligencia Emocional: Estrategias de autoconocimiento y regulación",
      excerpt: "Domina tus emociones para potenciar tu éxito personal y profesional. Descubre el método práctico para entrenar la autoconciencia y la empatía social.",
      date: "2026-06-08",
      dateLabel: "08 Jun, 2026",
      readingTime: "11 min de lectura",
      image: "/images/emotional_intelligence.png",
      published: true,
      seoTitle: "Cómo Desarrollar la Inteligencia Emocional: Guía Práctica",
      body: `
        <h2>1. Más Allá del Cociente Intelectual</h2>
        <p>Durante décadas, el cociente intelectual (CI) se consideró el principal predictor de éxito y bienestar en la vida. Sin embargo, las investigaciones han demostrado que las habilidades técnicas e intelectuales resultan insuficientes si carecemos de la capacidad de reconocer y regular nuestros propios estados afectivos e interpretar los de los demás. Esta habilidad es lo que denominamos <strong>Inteligencia Emocional (IE)</strong>.</p>
        <p>Clave para la resiliencia personal, la resolución de conflictos interpersonales y el liderazgo asertivo, la inteligencia emocional no es una característica fija con la que se nace; es una competencia maleable que puede desarrollarse sistemáticamente.</p>

        <h2>2. Los Pilares Fundamentales de la Inteligencia Emocional</h2>
        <p>De acuerdo con la formulación clásica de Daniel Goleman, la inteligencia emocional se compone de cinco dimensiones básicas:</p>
        <ul>
          <li><strong>Autoconciencia:</strong> Capacidad de reconocer las propias emociones en el instante en que ocurren, identificando su origen y su impacto en nuestro comportamiento.</li>
          <li><strong>Autorregulación:</strong> Capacidad de canalizar e inhibir los impulsos emocionales destructivos, adaptando nuestra respuesta de manera reflexiva a las demandas del entorno.</li>
          <li><strong>Automotivación:</strong> Enfoque de la energía emocional hacia metas y objetivos personales, superando los contratiempos con resiliencia y optimismo realista.</li>
          <li><strong>Empatía:</strong> Habilidad para sintonizar y comprender los sentimientos, necesidades e inquietudes de otras personas, leyendo sus señales verbales y no verbales.</li>
          <li><strong>Habilidades Sociales:</strong> Capacidad de comunicarse de forma de cooperación y resolver conflictos de forma constructiva.</li>
        </ul>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3">Pilar de la IE</th>
                <th class="p-3">Reactividad Habitual (Falta de IE)</th>
                <th class="p-3">Respuesta Asertiva (Con IE)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3 font-bold text-slate-900">Autoconciencia</td>
                <td class="p-3">Sentir enfado repentino sin comprender qué pensamiento o fatiga lo causó.</td>
                <td class="p-3 font-semibold text-teal-800">Identificar: "Me siento irritado por la sobrecarga y el cansancio acumulado".</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Autorregulación</td>
                <td class="p-3">Gritar, contestar impulsivamente o bloquearse en una discusión.</td>
                <td class="p-3 font-semibold text-teal-800">Postergar la respuesta, respirar diafragmáticamente e intervenir con asertividad.</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Empatía</td>
                <td class="p-3">Juzgar o invalidar el enfado de un compañero tachándolo de exagerado.</td>
                <td class="p-3 font-semibold text-teal-800">Comprender su perspectiva: "Sé que esta entrega te preocupa mucho y entiendo tu estrés".</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Ejercicios Prácticos para Desarrollar la Autoconciencia</h2>
        <p>La autoconciencia es la piedra angular de la inteligencia emocional. Para entrenarla, aplica el <strong>Termómetro Emocional</strong> tres veces al día. Configura una alarma suave en tu teléfono y, cuando suene, detente durante un minuto para responder internamente:</p>
        <ol>
          <li>¿Qué emoción estoy experimentando en este instante preciso? (Nómbrala con la mayor precisión: ej: irritabilidad, cansancio, impaciencia, entusiasmo).</li>
          <li>¿Cómo se manifiesta esta emoción a nivel corporal? (ej: tensión en las mandíbulas, respiración superficial, opresión estomacal).</li>
          <li>¿Qué pensamiento o situación ha desencadenado este estado emocional?</li>
        </ol>
        <p>El simple hecho de etiquetar verbalmente una emoción (proceso conocido como <em>affect labeling</em>) activa el córtex prefrontal y reduce de inmediato la reactividad de la amígdala, permitiéndote recuperar el control racional.</p>

        <div class="my-6 p-5 bg-teal-50/50 border border-teal-100 rounded-2xl space-y-2 text-xs">
          <span class="font-bold text-teal-900 uppercase block">La Regla de los 10 Segundos de Viktor Frankl</span>
          <p class="text-slate-655 leading-relaxed">
            "Entre el estímulo y la respuesta hay un espacio. En ese espacio reside nuestra libertad para elegir la respuesta adecuada". Cuando sientas un secuestro amigdalino por rabia, posterga tu intervención verbal 10 segundos, realiza dos exhalaciones lentas e interrógate sobre qué respuesta constructiva puedes aportar a la conversación.
          </p>
        </div>

        <h2>4. Habilidades Sociales y Empatía</h2>
        <p>El desarrollo de la empatía requiere una escucha activa no reactiva. Al interactuar con otros, busca sintonizar con su estado afectivo eliminando distractores electrónicos y concentrándote en su expresión facial y tono de voz. Expresar de forma explícita que has captado su emoción ("veo que esto te frustra bastante") disminuye la tensión interpersonal y abre canales de comunicación de gran valor tanto para tus relaciones de pareja como para tu crecimiento profesional.</p>
      `,
    },
    // --- CATEGORY 3: RELACIONES & ENTORNO ---
    {
      slug: "sanar-estilos-apego-inseguro-relaciones-sanas",
      categorySlug: "relaciones-entorno",
      title: "De la inseguridad a la estabilidad: Guía completa para sanar los estilos de apego en pareja",
      excerpt: "Los patrones de apego infantil moldean tus relaciones de adulto. Aprende a transitar del apego ansioso o evitativo hacia un apego seguro con herramientas clínicas.",
      date: "2026-06-07",
      dateLabel: "07 Jun, 2026",
      readingTime: "12 min de lectura",
      image: "/images/attachment_styles_couple.png",
      published: true,
      seoTitle: "Cómo Sanar los Estilos de Apego en Pareja: Guía Completa",
      body: `
        <h2>1. Los Cimientos del Vínculo Amoroso</h2>
        <p>La forma en que nos relacionamos emocionalmente en nuestras parejas no es aleatoria. Está profundamente influenciada por la teoría del apego, formulada inicialmente por el psiquiatra John Bowlby. El apego describe la necesidad biológica y psicológica de establecer vínculos estables con figuras de protección durante la infancia.</p>
        <p>Esos primeros patrones grabados por nuestros cuidadores primarios configuran esquemas mentales (modelos operativos internos) que guían nuestras expectativas de confianza, vulnerabilidad y proximidad emocional con nuestra pareja adulta.</p>

        <h2>2. Diagnóstico de los Cuatro Estilos de Apego</h2>
        <p>En el contexto de las relaciones adultas, se distinguen cuatro patrones básicos de vinculación afectiva:</p>
        <ul>
          <li><strong>Apego Seguro:</strong> Autoimagen positiva y visión positiva de los demás. Confortable con la intimidad y la independencia. Expresión emocional sana y resolución empática de conflictos.</li>
          <li><strong>Apego Ansioso-Preocupado (Inseguro):</strong> Autoimagen negativa y visión positiva de los demás. Temor intenso al abandono y la soledad. Necesidad de validación constante.</li>
          <li><strong>Apego Evitativo-Alejado (Inseguro):</strong> Autoimagen positiva y visión negativa de los demás. Deseo de independencia defensiva. Evitación del contacto íntimo y represión emocional.</li>
          <li><strong>Apego Desorganizado:</strong> Patrón inestable y complejo que fluctúa entre la necesidad obsesiva de afecto y el miedo al contacto íntimo ("te necesito pero te temo").</li>
        </ul>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3">Estilo de Apego</th>
                <th class="p-3">Creencia de Fondo</th>
                <th class="p-3">Comportamiento en Conflicto</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3 font-bold text-slate-900">Seguro</td>
                <td class="p-3">"Es seguro confiar en otros y mostrarme vulnerable".</td>
                <td class="p-3 font-semibold text-teal-800">Habla con calma, escucha, busca reparar el vínculo sin atacar.</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Ansioso-Preocupado</td>
                <td class="p-3">"Si mi pareja se aleja, significa que va a abandonarme".</td>
                <td class="p-3 font-semibold text-teal-800">Persigue, reclama, envía múltiples mensajes, hipervigila la distancia.</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Evitativo-Alejado</td>
                <td class="p-3">"Depender de alguien es peligroso; debo protegerme solo".</td>
                <td class="p-3 font-semibold text-teal-800">Se cierra en silencio, se marcha físicamente de la habitación, evade la intimidad.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. La Trampa Relacional: El Bucle Ansioso-Evitativo</h2>
        <p>Es sumamente común que personas con apego ansioso se sientan atraídas por personas de apego evitativo, creando un ciclo repetitivo altamente destructivo conocido como el <strong>bucle de la persecución</strong>. El ansioso, al percibir distancia, presiona y demanda atención; el evitativo, al sentirse acosado y abrumado, se distancia físicamente o se cierra emocionalmente; lo que aumenta la ansiedad del primero y perpetúa el conflicto indefinidamente.</p>

        <div class="my-6 p-5 bg-teal-50/50 border border-teal-100 rounded-2xl space-y-3">
          <h4 class="text-sm font-bold text-teal-900 uppercase">Ejercicios Clínicos de Descalibración de Apego</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-3.5 bg-white border border-slate-100 rounded-xl space-y-1">
              <span class="font-bold text-teal-800 block">Pauta para Perfiles Ansiosos:</span>
              Cuando tu pareja se distancie, realiza una pausa de 20 minutos de autocalma antes de escribir. Anota tus pensamientos catastróficos e identifica si están basados en hechos o en miedos históricos.
            </div>
            <div class="p-3.5 bg-white border border-slate-100 rounded-xl space-y-1">
              <span class="font-bold text-teal-800 block">Pauta para Perfiles Evitativos:</span>
              Cuando sientas el impulso de escapar de una conversación, quédate e introduce una frase asertiva: "Me siento abrumado en este momento. Necesito 15 minutos en silencio y luego vuelvo a conversar".
            </div>
          </div>
        </div>

        <h2>4. Hacia la Seguridad Adquirida</h2>
        <p>Aunque los patrones de apego son estables, no son inmutables. La neurociencia y la terapia de pareja demuestran que es posible desarrollar un <em>apego seguro adquirido</em> a través del autoconocimiento, la de-escalada consciente de los conflictos interpersonales y la construcción de acuerdos afectivos claros basados en la asertividad y el respeto mutuo.</p>
      `,
    },
    {
      slug: "guia-comunicacion-asertiva-resolucion-conflictos",
      categorySlug: "relaciones-entorno",
      title: "El arte de la asertividad: Guía de comunicación efectiva y establecimiento de límites",
      excerpt: "Aprende a decir 'no' sin culpa y expresa tus necesidades con firmeza y respeto. Domina las técnicas verbales de resolución de conflictos interpersonales.",
      date: "2026-06-04",
      dateLabel: "04 Jun, 2026",
      readingTime: "11 min de lectura",
      image: "/images/assertive_communication.png",
      published: true,
      seoTitle: "Guía de Comunicación Asertiva y Límites Personales",
      body: `
        <h2>1. El Espectro de la Comunicación Interpersonal</h2>
        <p>En nuestras interacciones cotidianas, adoptamos de manera inconsciente diferentes estilos de comunicación. Los dos extremos disfuncionales son la pasividad (priorizar los deseos ajenos sacrificando los propios por miedo al conflicto) y la agresividad (imponer las opiniones y deseos propios avasallando los derechos de los demás). La <strong>asertividad</strong> se sitúa en el centro sano: es la capacidad de expresar nuestros sentimientos, pensamientos y límites de forma honesta, directa y firme, respetando al mismo tiempo la dignidad del interlocutor.</p>
        <p>Ser asertivo no es una personalidad con la que se nace; es una competencia verbal y emocional que se adquiere con la práctica diaria.</p>

        <h2>2. Por Qué Nos Cuesta Poner Límites: El Miedo al Rechazo</h2>
        <p>Decir "no" o marcar un límite genera habitualmente una respuesta fisiológica incómoda (tensión en el pecho, taquicardia) vinculada a distorsiones cognitivas irracionales: "si digo que no, dejarán de quererme", "soy egoísta si no ayudo en todo".</p>
        <p>La psicología clínica recuerda que los límites personales son esenciales para preservar la salud emocional y la autoestima. Un límite claro no distancia a las personas sanas; al contrario, clarifica las reglas de interacción y construye relaciones basadas en el respeto mutuo.</p>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3">Estilo</th>
                <th class="p-3">Postura Corporal e Intención</th>
                <th class="p-3">Ejemplo de Respuesta ante Petición Extra</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3 font-bold text-slate-900">Pasivo</td>
                <td class="p-3">Sumisión, evitar el contacto visual. Complacer para ser aceptado.</td>
                <td class="p-3">"Claro, yo me encargo..." (Aunque no tenga tiempo y se sobrecargue).</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Agresivo</td>
                <td class="p-3">Invasión del espacio, tono cortante. Imponer su criterio.</td>
                <td class="p-3">"¿Estás loco? ¡Hazlo tú, que para eso te pagan!" (Genera hostilidad).</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Asertivo</td>
                <td class="p-3 font-semibold text-teal-800">Contacto visual directo, tono calmado y firme. Defender derechos con respeto.</td>
                <td class="p-3 font-semibold text-teal-800">"Entiendo que es importante, pero mi agenda está completa hoy y no puedo asumir esa tarea".</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. La Fórmula Asertiva del Mensaje en Primera Persona</h2>
        <p>Una de las herramientas verbales más eficaces para expresar desacuerdos o marcar límites sin despertar la defensividad en el otro es la estructura del <strong>Mensaje en Primera Persona</strong> (Mensaje Yo). Consiste en formular tus frases siguiendo cuatro pasos objetivos:</p>
        <ol>
          <li><strong>Hechos objetivos:</strong> Expresa lo sucedido sin juzgar ni etiquetar (ej: "Cuando interrumpes mi turno de palabra durante las reuniones...").</li>
          <li><strong>Sentimiento propio:</strong> Explica cómo te hace sentir esa conducta de forma honesta (ej: "...me siento frustrado y siento que mis propuestas no son tomadas en cuenta").</li>
          <li><strong>Petición clara:</strong> Propón de manera concreta el cambio que esperas (ej: "Por ello, te pido que esperes a que termine mi exposición antes de intervenir").</li>
          <li><strong>Consecuencia positiva:</strong> Explica el beneficio para la relación (ej: "De este modo, podremos avanzar de manera más coordinada y efectiva").</li>
        </ol>

        <div class="my-6 p-5 bg-teal-50/50 border border-teal-100 rounded-2xl space-y-3">
          <h4 class="text-sm font-bold text-teal-900 uppercase">Técnicas de Emergencia Verbal</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-3.5 bg-white border border-slate-100 rounded-xl">
              <span class="font-bold text-teal-800 block mb-1">El Disco Rayado:</span>
              Repetir tu punto de vista de forma calmada y persistente sin cambiar las palabras ante la insistencia. "Comprendo lo que dices, pero no puedo asumir este proyecto extra".
            </div>
            <div class="p-3.5 bg-white border border-slate-100 rounded-xl">
              <span class="font-bold text-teal-800 block mb-1">El Banco de Niebla:</span>
              Dar la razón en parte a la crítica del interlocutor sin ceder en tu postura personal. "Es cierto que este informe se podría haber entregado antes, no obstante la carga de trabajo actual no permitía acelerar el plazo".
            </div>
          </div>
        </div>

        <h2>4. Conclusión</h2>
        <p>Marcar límites personales es un ejercicio de respeto propio e higiene mental. Al adoptar una comunicación asertiva, reduces la carga de estrés interpersonal, evitas dinámicas pasivo-agresivas perjudiciales y sientas las bases de relaciones sentimentales, familiares y laborales verdaderamente sanas y cooperativas.</p>
      `,
    },
    // --- CATEGORY 4: TERAPIA & SALUD MENTAL ---
    {
      slug: "terapia-cognitivo-conductual-que-es-aplicaciones",
      categorySlug: "terapia-salud-mental",
      title: "Terapia Cognitivo-Conductual (TCC): Historia, técnicas fundamentales y qué esperar",
      excerpt: "Conoce el enfoque terapéutico con mayor aval científico en la actualidad. Descubre cómo la reestructuración cognitiva modifica tus conductas y emociones.",
      date: "2026-06-03",
      dateLabel: "03 Jun, 2026",
      readingTime: "12 min de lectura",
      image: "/images/cognitive_behavioral_therapy.png",
      published: true,
      seoTitle: "Terapia Cognitivo-Conductual (TCC): Técnicas y Funcionamiento",
      body: `
        <h2>1. El Paradigma de la Terapia Cognitivo-Conductual</h2>
        <p>La <strong>Terapia Cognitivo-Conductual (TCC)</strong> es la corriente psicoterapéutica que cuenta con el mayor volumen de estudios clínicos y respaldo empírico en el tratamiento de una amplia variedad de trastornos de salud mental, incluyendo la ansiedad generalizada, la depresión, los trastornos de conducta alimentaria y las fobias específicas. Fundamentada en la integración de la psicología cognitiva y las teorías del aprendizaje conductual, parte de una premisa central: no son las situaciones cotidianas las que nos perturban, sino la interpretación subjetiva que hacemos de ellas.</p>
        <p>A lo largo de este artículo, detallaremos el origen histórico de este paradigma, sus técnicas fundamentales de reestructuración y cómo es una sesión clínica real de TCC.</p>

        <h2>2. El Modelo A-B-C de Albert Ellis</h2>
        <p>Para comprender cómo funciona el proceso psicoterapéutico de la TCC, es vital analizar el modelo clásico <strong>A-B-C</strong> desarrollado por el psicólogo Albert Ellis:</p>
        <ul>
          <li><strong>A (Activating Event / Evento Activador):</strong> La situación objetiva que ocurre en la realidad (ej: recibir una crítica constructiva de tu jefe).</li>
          <li><strong>B (Beliefs / Creencias y Pensamientos):</strong> La interpretación cognitiva subjetiva que procesa el cerebro acerca del evento (ej: "Soy un incompetente, me van a despedir de inmediato").</li>
          <li><strong>C (Consequences / Consecuencias):</strong> Las respuestas emocionales y conductuales resultantes de esa interpretación (ej: tristeza, ansiedad intensa, evitación de tareas).</li>
        </ul>
        <p>La intervención de la TCC se centra en el pilar <strong>B</strong>. Al modificar los pensamientos automáticos sesgados e irracionales, logramos reestructurar de manera directa las emociones y conductas resultantes.</p>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3">Distorsión Cognitiva</th>
                <th class="p-3">Definición Clínica</th>
                <th class="p-3">Pensamiento Automático Irracional</th>
                <th class="p-3">Reestructuración Racional (TCC)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3 font-bold text-slate-900">Pensamiento Todo o Nada</td>
                <td class="p-3">Evaluar las situaciones de forma dicotómica sin matices intermedios.</td>
                <td class="p-3 text-rose-800">"Si este proyecto tiene fallos, soy un fracaso absoluto".</td>
                <td class="p-3 font-semibold text-teal-800">"El proyecto tiene áreas de mejora, pero he resuelto la mayoría de puntos bien".</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Catastrofismo</td>
                <td class="p-3">Imaginar y dar por sentado el peor escenario posible ante una incertidumbre.</td>
                <td class="p-3 text-rose-800">"Tengo un leve dolor de cabeza, seguro es un tumor cerebral".</td>
                <td class="p-3 font-semibold text-teal-800">"Es más probable que sea deshidratación o cansancio. Beberé agua y descansaré".</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Lectura de Mente</td>
                <td class="p-3">Asumir pensamientos ajenos negativos sin pruebas reales.</td>
                <td class="p-3 text-rose-800">"Se están riendo en el pasillo, seguro hablan de mí".</td>
                <td class="p-3 font-semibold text-teal-800">"No puedo saber de qué se ríen sin preguntarles; hay mil motivos que no me involucran".</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Técnicas Fundamentales Empleadas en Consulta</h2>
        <p>Durante el tratamiento de TCC, el terapeuta y el paciente trabajan de forma colaborativa aplicando diversas técnicas:</p>
        
        <h3>El Diálogo Socrático</h3>
        <p>El terapeuta realiza preguntas reflexivas al paciente para cuestionar la validez y utilidad de sus pensamientos automáticos, ayudándole a encontrar interpretaciones alternativas más objetivas y adaptativas basadas en la evidencia.</p>
        
        <h3>La Exposición con Prevención de Respuesta (EPR)</h3>
        <p>Muy aplicada en fobias y TOC. Consiste en exponer al paciente al estímulo que le genera ansiedad de forma gradual y controlada, impidiéndole realizar la conducta de evitación o compulsión habitual, facilitando el proceso biológico de habituación.</p>

        <div class="my-6 p-5 bg-teal-50/50 border border-teal-100 rounded-2xl space-y-2">
          <h4 class="text-sm font-bold text-teal-900 uppercase">Qué esperar en un Proceso de TCC</h4>
          <p class="text-xs text-slate-655 leading-relaxed">
            A diferencia de otras corrientes de corte psicoanalítico, la TCC es **estructurada, activa y orientada a metas**. Las sesiones tienen una agenda específica y se asignan tareas conductuales inter-sesión para consolidar lo aprendido en la consulta.
          </p>
        </div>

        <h2>4. Conclusión</h2>
        <p>Al dotar al paciente de herramientas prácticas de auto-observación y reestructuración mental, la TCC promueve la autonomía y la resiliencia a largo plazo, convirtiéndose en una de las mejores inversiones para el bienestar de la salud mental de las personas.</p>
      `,
    },
    {
      slug: "terapia-aceptacion-compromiso-flexibilidad-valores",
      categorySlug: "terapia-salud-mental",
      title: "Terapia de Aceptación y Compromiso (ACT): Flexibilidad psicológica y valores vitales",
      excerpt: "Descubre el paradigma de las terapias de tercera generación. Aprende a convivir con el malestar inevitable para construir una vida orientada a lo que valoras.",
      date: "2026-05-28",
      dateLabel: "28 May, 2026",
      readingTime: "11 min de lectura",
      image: "/images/acceptance_commitment_therapy.png",
      published: true,
      seoTitle: "Terapia de Aceptación y Compromiso (ACT): Flexibilidad y Valores",
      body: `
        <h2>1. El Cambio de Paradigma en la Tercera Generación</h2>
        <p>La <strong>Terapia de Aceptación y Compromiso (ACT)</strong> pertenece a las terapias conductuales de tercera generación. A diferencia del enfoque cognitivo tradicional de la TCC que busca debatir, reestructurar o eliminar los pensamientos incómodos y las emociones negativas, ACT propone un cambio radical de perspectiva: el sufrimiento emocional es un componente natural e inevitable de la experiencia humana. Intentar eliminarlo a toda costa suele generar más frustración y parálisis vital.</p>
        <p>El objetivo de ACT no es reducir el síntoma, sino aumentar la <strong>flexibilidad psicológica</strong> para construir una vida rica y con propósito, orientada hacia nuestros valores más profundos.</p>

        <h2>2. Los Seis Pilares del Hexaflex de ACT</h2>
        <p>La flexibilidad psicológica se entrena mediante seis procesos clave ilustrados en el modelo del <em>Hexaflex</em>:</p>
        <ul>
          <li><strong>Aceptación:</strong> Adoptar una actitud activa y receptiva para dar espacio a las emociones y sensaciones incómodas, en lugar de luchar por evitarlas.</li>
          <li><strong>Defusión Cognitiva:</strong> Aprender a observar tus pensamientos como eventos mentales pasajeros, no como realidades incuestionables. Desprenderse del peso literal de las palabras.</li>
          <li><strong>Contacto con el Presente:</strong> Estar plenamente consciente del aquí y el ahora, interactuando con el entorno mediante técnicas de mindfulness.</li>
          <li><strong>El Yo-Contexto:</strong> Reconocer que tú eres el observador, el espacio seguro donde ocurren los pensamientos y emociones, diferenciándote de tus estados mentales transitorios.</li>
          <li><strong>Valores Vitales:</strong> Clarificar lo que realmente importa en tu vida, las direcciones vitales que deseas seguir (ej: honestidad, autocuidado, amor familiar).</li>
          <li><strong>Acción Comprometida:</strong> Diseñar y ejecutar conductas coherentes con tus valores, incluso en presencia de dudas o miedo.</li>
        </ul>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3">Agenda del Control (Lucha Inútil)</th>
                <th class="p-3">Agenda de la Aceptación (Enfoque ACT)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3">"No haré el viaje hasta que no se me quite la ansiedad por completo".</td>
                <td class="p-3 font-semibold text-teal-800">"Hago el viaje llevando la ansiedad conmigo si es necesario, porque viajar es un valor para mí".</td>
              </tr>
              <tr>
                <td class="p-3">"Debo debatir este pensamiento de incompetencia y demostrar que valgo".</td>
                <td class="p-3 font-semibold text-teal-800">"Nombro el pensamiento: 'Estoy teniendo el pensamiento de que no valgo', lo dejo estar y actúo".</td>
              </tr>
              <tr>
                <td class="p-3">Evitar situaciones sociales incómodas para no experimentar vergüenza o rechazo.</td>
                <td class="p-3 font-semibold text-teal-800">Participar activamente en reuniones dando espacio a la vergüenza, alineado con el valor de la amistad.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Ejercicios Prácticos de Defusión Cognitiva</h2>
        <p>Para desarmar la influencia paralizante de tus pensamientos negativos, practica estos ejercicios sencillos de defusión en tu día a día:</p>
        
        <h3>La Fórmula: "Estoy teniendo el pensamiento de..."</h3>
        <p>Cuando te asalte una autocrítica destructiva como "Soy un desastre y no valgo para nada", repite mentalmente la frase anteponiendo la fórmula cognitiva: <em>"Estoy teniendo el pensamiento de que soy un desastre y no valgo para nada"</em>. Esto crea una separación inmediata entre tu identidad y el pensamiento, reduciendo su impacto emocional.</p>
        
        <h3>El Pensamiento en una Pantalla de Cine</h3>
        <p>Cierra los ojos e imagina tu pensamiento negativo escrito en letras grandes sobre una pantalla de cine. Imagina que las letras cambian de color, se vuelven borrosas o se transforman en una animación divertida. Este distanciamiento lúdico desarma la gravedad con la que el cerebro procesa la preocupación.</p>

        <div class="my-6 p-5 bg-teal-50/50 border border-teal-100 rounded-2xl space-y-1.5 text-xs text-slate-700">
          <span class="font-bold text-teal-900 uppercase block">Definir Valores vs. Establecer Metas</span>
          <p class="leading-relaxed">
            En ACT, se distingue claramente entre un valor y una meta. Una **meta** es un destino final que se puede tachar de una lista (ej: "aprobar un examen"). Un **valor**, en cambio, es una brújula de orientación permanente que nunca termina de alcanzarse (ej: "ser un estudiante comprometido con el aprendizaje"). Al enfocar tu vida en los valores en lugar de obsesionarte con los resultados, aseguras un sentido de dirección vital robusto ante cualquier contratiempo.
          </p>
        </div>

        <h2>4. Conclusión</h2>
        <p>A través de la aceptación activa y la acción comprometida coherente con tus valores existenciales, la terapia de aceptación y compromiso fomenta una flexibilidad psicológica fundamental para vivir una vida plena, consciente y con sentido.</p>
      `,
    },
  ];

  for (const art of articles) {
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: art,
      create: art,
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
