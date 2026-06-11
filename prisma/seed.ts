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
        <p>El estrés prolongado en el ámbito de trabajo puede conducir a un estado de agotamiento absoluto conocido clínicamente como el <strong>Síndrome de Burnout</strong> o desgaste profesional. Reconocido formalmente por la Organización Mundial de la Salud (OMS) en la Clasificación Internacional de Enfermedades (CIE-11) como un fenómeno puramente ocupacional, representa un colapso del sistema de adaptación biológica.</p>
        
        <div class="my-6 p-5 bg-teal-50/40 border-l-4 border-teal-600 rounded-r-2xl text-slate-700 text-xs leading-relaxed">
          <strong class="text-teal-900 block mb-1 font-bold">💡 Rigor Clínico:</strong>
          El burnout no es una debilidad de carácter o una simple baja motivación laboral. Es una desregulación fisiológica real del cortisol y los neurotransmisores, generada por una discrepancia prolongada entre las exigencias del entorno y los recursos de control del individuo.
        </div>

        <h2>2. La Neurobiología del Agotamiento Crónico</h2>
        <p>La exposición mantenida al estrés laboral activa de forma ininterrumpida el eje hipotalámico-hipofisario-adrenal (HHA). Esta activación genera una secreción continuada de cortisol y catecolaminas. Con el tiempo, este mecanismo desencadena resistencia al cortisol en los receptores neuronales, provocando una respuesta inflamatoria sistémica y una desregulación en la plasticidad sináptica.</p>
        <p>Investigaciones mediante resonancia magnética funcional demuestran que las personas que sufren de burnout presentan una disminución en el volumen de materia gris en la corteza prefrontal dorsolateral y una hiperactividad en la amígdala (núcleo del miedo y la alerta). Esto explica la dificultad extrema para concentrarse y la neblina mental.</p>

        <h2>3. Las Tres Dimensiones del Síndrome de Burnout</h2>
        <p>De acuerdo con el modelo desarrollado por Christina Maslach, el burnout se evalúa a través de tres pilares esenciales que debes aprender a detectar en tu propia rutina:</p>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3.5">Característica</th>
                <th class="p-3.5">Estrés Común</th>
                <th class="p-3.5">Síndrome de Burnout</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Emociones</td>
                <td class="p-3.5">Sobre-reactividad, urgencia, hiperactividad emocional.</td>
                <td class="p-3.5 font-semibold text-teal-800">Agotamiento emocional, aplanamiento afectivo, cinismo defensivo.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Enfoque físico</td>
                <td class="p-3.5">Pérdida de energía física (cansancio temporal).</td>
                <td class="p-3.5 font-semibold text-teal-800">Colapso total de energía, insomnio de conciliación, dolores musculares severos.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Actitud</td>
                <td class="p-3.5">Preocupación por las consecuencias de no terminar el trabajo.</td>
                <td class="p-3.5 font-semibold text-teal-800">Desapego absoluto, apatía, aislamiento, sentimiento de incompetencia crónico.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>4. Ejercicios Diarios de Recuperación Fisiológica</h2>
        <p>Para reprogramar el sistema nervioso autónomo y pasar del estado de alerta simpática al modo de calma parasimpática, es fundamental instaurar pautas corporales específicas todos los días:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div class="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <span class="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs">1</span>
            <h4 class="font-bold text-slate-900 text-xs">Descompresión Post-Jornada</h4>
            <p class="text-xs text-slate-500 leading-relaxed">
              Realiza una pausa de transición de 15 minutos al acabar tu jornada laboral. Ejecuta respiración en caja (inhalar, retener, exhalar y sostener vacío en ciclos de 4 segundos) para indicarle al tronco encefálico que el peligro laboral ha cesado.
            </p>
          </div>
          <div class="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <span class="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs">2</span>
            <h4 class="font-bold text-slate-900 text-xs">Desconexión Digital Estricta</h4>
            <p class="text-xs text-slate-500 leading-relaxed">
              Silencia por completo las notificaciones de trabajo a partir de una hora límite fija (ej: 19:30). Evita el uso de pantallas de noche para favorecer la síntesis natural de melatonina y la inducción de un sueño reparador.
            </p>
          </div>
        </div>

        <h2>5. Plan de Establecimiento de Límites Laborales</h2>
        <p>Superar el burnout exige reconfigurar tu manera de interactuar con el entorno laboral. Te proponemos aplicar la técnica de la <em>Negociación Asertiva Progresiva</em>:</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div class="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl">
            <h4 class="font-bold text-rose-800 text-xs mb-1.5 flex items-center gap-1">❌ Qué Evitar (Reactivo)</h4>
            <p class="text-slate-655 text-xs leading-relaxed">
              "No puedo hacer esto hoy, estoy colapsado y no llego a nada." (Transmite falta de control y despierta fricción).
            </p>
          </div>
          <div class="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
            <h4 class="font-bold text-emerald-800 text-xs mb-1.5 flex items-center gap-1">✅ Qué Aplicar (Asertivo)</h4>
            <p class="text-slate-655 text-xs leading-relaxed">
              "Para garantizar la calidad de este informe, puedo entregarlo el jueves o delegar el análisis de datos. ¿Cuál priorizamos?" (Redefine expectativas sin conflicto).
            </p>
          </div>
        </div>

        <h2>6. El Diario de Valores y Logros Diarios</h2>
        <p>Para combatir la pérdida de autoestima y realización personal, mantén un registro escrito en tu cuaderno. Cada noche antes de dormir, anota tres tareas que hayas resuelto de manera satisfactoria (por pequeñas que sean) y describe cómo esas tareas se alinean con tus valores personales (ej: rigor, compañerismo, creatividad). Esto ayuda a redirigir la atención selectiva del cerebro, sesgada habitualmente hacia las preocupaciones y el estrés.</p>
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
        <p>Un ataque de pánico, o crisis de angustia, es la aparición repentina de un miedo o malestar intenso que alcanza su pico máximo en cuestión de minutos. Los síntomas físicos incluyen taquicardia, sudoración, temblores, disnea (sensación de asfixia), opresión en el pecho, náuseas, mareos y despersonalización (sentirse desconectado de uno mismo).</p>
        
        <div class="my-6 p-5 bg-amber-50/40 border-l-4 border-amber-500 rounded-r-2xl text-slate-700 text-xs leading-relaxed">
          <strong class="text-amber-900 block mb-1 font-bold">⚠️ Atención:</strong>
          La sensación de "asfixia" y los temblores no se deben a una falta real de oxígeno, sino al fenómeno de la hiperventilación, el cual disminuye el nivel de dióxido de carbono en sangre (hipocapnia) y altera temporalmente el pH sanguíneo. Esto causa cosquilleos inofensivos.
        </div>

        <h2>2. La Cascada del Pánico: ¿Qué Ocurre en el Cerebro?</h2>
        <p>Durante una crisis de pánico, el cerebro sufre un secuestro emocional. La amígdala detecta una amenaza potencial (que puede ser un pensamiento, una sensación física menor como un latido acelerado, o un estímulo externo) y activa instantáneamente el sistema de alarma de lucha o huida. Envía una señal al hipotálamo, que estimula el sistema de alerta simpático.</p>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3.5">Característica</th>
                <th class="p-3.5">Ataque de Pánico</th>
                <th class="p-3.5">Ataque de Ansiedad</th>
                <th class="p-3.5">Infarto de Miocardio</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Inicio y Duración</td>
                <td class="p-3.5 font-semibold text-teal-800">Súbito. Pico en 10 minutos; remite en unos 20-30 min.</td>
                <td class="p-3.5">Gradual. Vinculado a rumiación; prolongado en el tiempo.</td>
                <td class="p-3.5 text-rose-800 font-semibold">Súbito o tras esfuerzo. Dolor sostenido que no remite al respirar.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Dolor en Pecho</td>
                <td class="p-3.5 font-semibold text-teal-800">Puntual, sensación de pinchazo o ahogo al inspirar fuerte.</td>
                <td class="p-3.5">Opresión difusa en la parte superior.</td>
                <td class="p-3.5 text-rose-800 font-semibold">Opresión severa y aplastante en el centro del pecho que irradia al brazo izquierdo o mandíbula.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Origen Clínico</td>
                <td class="p-3.5 font-semibold text-teal-800">Activación simpática por alarma inofensiva de la amígdala.</td>
                <td class="p-3.5">Acumulación de estrés cognitivo o social.</td>
                <td class="p-3.5 text-rose-800 font-semibold">Obstrucción física de una arteria coronaria (urgencia médica).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Desarmar la Interpretación Catastrofista</h2>
        <p>El núcleo de la crisis de pánico reside en la <strong>interpretación catastrofista</strong> de las sensaciones físicas normales. Si sientes palpitaciones y piensas "Estoy sufriendo un infarto", la amígdala interpretará ese pensamiento como confirmación del peligro y liberará más adrenalina.</p>

        <div class="my-6 p-5 bg-teal-50/40 border border-teal-100 rounded-2xl space-y-3">
          <h4 class="text-sm font-bold text-teal-900 uppercase">Técnica de Autorregulación: Grounding 5-4-3-2-1</h4>
          <p class="text-xs text-slate-655 leading-relaxed">
            Para desviar la atención secuestrada por el miedo interno y reconectarte con la realidad física, observa tu entorno y nombra detalladamente:
          </p>
          <ul class="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-[10px] font-bold text-slate-700">
            <li class="p-3 bg-white border border-slate-100 rounded-xl"><span class="block text-teal-700 text-lg mb-1">5</span>Cosas que ves</li>
            <li class="p-3 bg-white border border-slate-100 rounded-xl"><span class="block text-teal-700 text-lg mb-1">4</span>Texturas que tocas</li>
            <li class="p-3 bg-white border border-slate-100 rounded-xl"><span class="block text-teal-700 text-lg mb-1">3</span>Sonidos que oyes</li>
            <li class="p-3 bg-white border border-slate-100 rounded-xl"><span class="block text-teal-700 text-lg mb-1">2</span>Olores que hueles</li>
            <li class="p-3 bg-white border border-slate-100 rounded-xl"><span class="block text-teal-700 text-lg mb-1">1</span>Sabor en tu boca</li>
          </ul>
        </div>

        <h2>4. Técnicas Fisiológicas de Desactivación Inmediata</h2>
        <p>Una vez reestructurado el pensamiento, aplica técnicas físicas para forzar al sistema parasimpático a tomar el control:</p>
        
        <h3>La Maniobra de Respiración Diafragmática Lenta</h3>
        <p>Inhala aire por la nariz lentamente durante 4 segundos expandiendo tu diafragma (el abdomen debe elevarse, no el pecho). Mantén el aire 2 segundos y exhala soplando suavemente por la boca durante 6 segundos. Repite este ciclo durante 5 minutos. El alargamiento de la exhalación estimula mecánicamente el nervio vago, induciendo un descenso inmediato en la frecuencia cardíaca.</p>

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
        <p>El <strong>Mindfulness</strong> o atención plena se ha trasladado en las últimas décadas del misticismo oriental al laboratorio de neurociencia. Definido por el Dr. Jon Kabat-Zinn como la conciencia que surge al prestar atención de forma deliberada en el momento presente y sin juzgar, ha demostrado ser una de las herramientas no farmacológicas más potentes para optimizar la salud mental y la plasticidad cerebral.</p>

        <div class="my-6 p-5 bg-teal-50/40 border-l-4 border-teal-600 rounded-r-2xl text-slate-700 text-xs leading-relaxed">
          <strong class="text-teal-900 block mb-1 font-bold">🔬 Evidencia Neurocientífica:</strong>
          La atención plena no requiere cambios en tus creencias religiosas. Funciona entrenando físicamente tu atención selectiva, lo cual incrementa el grosor cortical y desactiva las vías neuronales del estrés crónico.
        </div>

        <h2>2. Neuroplasticidad: El Cerebro Meditativo bajo el Escáner</h2>
        <p>La introducción de la neuroimagen ha permitido a los científicos constatar que la meditación recurrente altera físicamente la morfología de áreas cerebrales esenciales. Este fenómeno se conoce como neuroplasticidad autodirigida.</p>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3.5">Área Cerebral</th>
                <th class="p-3.5">Cambio Anatómico (MBSR)</th>
                <th class="p-3.5">Impacto Clínico y Funcional</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Córtex Prefrontal</td>
                <td class="p-3.5 font-semibold text-emerald-700">Aumento del grosor cortical</td>
                <td class="p-3.5">Mejora la concentración, la toma de decisiones racionales y la inhibición de impulsos destructivos.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Amígdala Cerebral</td>
                <td class="p-3.5 font-semibold text-rose-700">Disminución de tamaño</td>
                <td class="p-3.5">Menor reactividad fisiológica e inmunológica ante situaciones estresantes cotidianas.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Hipocampo</td>
                <td class="p-3.5 font-semibold text-emerald-700">Aumento de materia gris</td>
                <td class="p-3.5">Facilitación en la consolidación de la memoria y la regulación neuroendocrina del cortisol.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. La Red Neuronal por Defecto (RND) y el Vagabundeo Mental</h2>
        <p>Cuando no estamos realizando ninguna tarea concreta, el cerebro activa la <strong>Red Neuronal por Defecto (RND)</strong>. Esta red está asociada con el vagabundeo mental, los pensamientos autorreferenciales ("¿qué piensan de mí?"), la rumiación sobre el pasado y la preocupación por el futuro.</p>
        <p>El mindfulness tiene la capacidad de inhibir la RND. Al focalizar la atención en sensaciones físicas inmediatas, el cerebro desconecta la red por defecto y activa la Red de Atención Directa, reduciendo el ruido mental.</p>

        <div class="my-6 p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
          <h4 class="text-sm font-bold text-slate-900 uppercase">Guía Práctica: Iniciarse en la Atención Plena</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div class="p-4 bg-white border border-slate-100 rounded-xl space-y-1.5">
              <span class="font-bold text-teal-800">1. Postura Corporal</span>
              <p class="text-slate-500 leading-relaxed">Siéntate con la espalda erguida y los pies apoyados en el suelo. Relaja los hombros.</p>
            </div>
            <div class="p-4 bg-white border border-slate-100 rounded-xl space-y-1.5">
              <span class="font-bold text-teal-800">2. Foco Respiratorio</span>
              <p class="text-slate-500 leading-relaxed">Cierra los ojos y atiende exclusivamente a la entrada y salida de aire en tu nariz.</p>
            </div>
            <div class="p-4 bg-white border border-slate-100 rounded-xl space-y-1.5">
              <span class="font-bold text-teal-800">3. Retorno Amigable</span>
              <p class="text-slate-500 leading-relaxed">Si tu mente divaga, reconócelo con suavidad y vuelve a enfocar la respiración sin juzgarte.</p>
            </div>
          </div>
        </div>

        <h2>4. El Fortalecimiento Prefrontal</h2>
        <p>El verdadero ejercicio de fortalecimiento cognitivo ocurre en el momento de darte cuenta de la distracción y reorientar la atención. Cada vez que realizas esta acción, estás fortaleciendo las conexiones prefrontales de tu cerebro. Con la práctica repetida, la atención plena se convierte en un hábito orgánico que mejora la resiliencia mental frente a cualquier conflicto.</p>
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

        <div class="my-6 p-5 bg-teal-50/40 border-l-4 border-teal-600 rounded-r-2xl text-slate-700 text-xs leading-relaxed">
          <strong class="text-teal-900 block mb-1 font-bold">💡 Autoconocimiento:</strong>
          Identificar y etiquetar la emoción exacta que sentimos (ej: "frustración" en lugar de un genérico "estoy mal") reduce la respuesta defensiva y sobreexcitada de la amígdala cerebral mediante el proceso cognitivo de etiquetado afectivo.
        </div>

        <h2>2. Los Pilares de la Inteligencia Emocional</h2>
        <p>De acuerdo con la formulación clásica de Daniel Goleman, la inteligencia emocional se compone de cinco dimensiones básicas:</p>
        <ul>
          <li><strong>Autoconciencia:</strong> Capacidad de reconocer las propias emociones en el instante en que ocurren.</li>
          <li><strong>Autorregulación:</strong> Capacidad de canalizar e inhibir los impulsos emocionales destructivos.</li>
          <li><strong>Automotivación:</strong> Enfoque de la energía emocional hacia metas y metas personales de valor.</li>
          <li><strong>Empatía:</strong> Habilidad para sintonizar y comprender los sentimientos y necesidades de otras personas.</li>
          <li><strong>Habilidades Sociales:</strong> Capacidad de comunicarse de forma persuasiva y resolver conflictos interpersonales de manera constructiva.</li>
        </ul>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3.5">Pilar</th>
                <th class="p-3.5">Falta de Inteligencia Emocional</th>
                <th class="p-3.5">Respuesta de Alta Inteligencia Emocional</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Autoconciencia</td>
                <td class="p-3.5">Gritar y quejarse sin saber si es por hambre, fatiga o estrés.</td>
                <td class="p-3.5 font-semibold text-teal-800">"Siento frustración porque no he descansado bien hoy".</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Autorregulación</td>
                <td class="p-3.5">Reaccionar agresivamente de forma inmediata ante un correo hostil.</td>
                <td class="p-3.5 font-semibold text-teal-800">Cerrar el correo, respirar, pasear y contestar 10 minutos después con firmeza asertiva.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Empatía</td>
                <td class="p-3.5">Invalidar la tristeza ajena con frases como "eso no es nada".</td>
                <td class="p-3.5 font-semibold text-teal-800">"Lamento que te sientas así, entiendo perfectamente tu enfado".</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Ejercicios Prácticos: El Termómetro Emocional</h2>
        <p>La autoconciencia se entrena activamente. Programa una alarma suave en tu móvil dos veces al día. Cuando suene, detente durante un minuto y anota:</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 text-xs text-center">
          <div class="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <span class="font-bold text-teal-800 block mb-1">Emoción Precisa</span>
            Etiqueta con exactitud tu estado (irritabilidad, desgana, entusiasmo, etc.).
          </div>
          <div class="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <span class="font-bold text-teal-800 block mb-1">Manifestación Física</span>
            Detecta mandíbula apretada, hombros tensos o respiración acelerada.
          </div>
          <div class="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <span class="font-bold text-teal-800 block mb-1">Causa Raíz</span>
            Identifica qué pensamiento o situación provocó este estado emocional.
          </div>
        </div>

        <h2>4. Habilidades Sociales y Empatía</h2>
        <p>El desarrollo de la empatía requiere una escucha activa no reactiva. Al interactuar con otros, busca sintonizar con su estado afectivo eliminando distractores electrónicos y concentrándote en su expresión facial y tono de voz. Expresar de forma explícita que has captado su emoción disminuye la tensión interpersonal y abre canales de comunicación de gran valor.</p>
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
        <p>La forma en que nos relacionamos emocionalmente en nuestras parejas está profundamente influenciada por la teoría del apego, formulada por John Bowlby. El apego describe la necesidad biológica de establecer vínculos estables con figuras de protección durante la infancia.</p>
        
        <div class="my-6 p-5 bg-teal-50/40 border-l-4 border-teal-600 rounded-r-2xl text-slate-700 text-xs leading-relaxed">
          <strong class="text-teal-900 block mb-1 font-bold">💡 Teoría del Apego:</strong>
          Tus reacciones ante el distanciamiento o los silencios de tu pareja no son caprichosas. Suelen ser patrones conductuales automatizados que tu sistema nervioso integró durante tu infancia.
        </div>

        <h2>2. Los Cuatro Estilos de Apego Adulto</h2>
        <p>En el contexto de las relaciones adultas, se distinguen cuatro patrones básicos de vinculación afectiva:</p>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3.5">Estilo de Apego</th>
                <th class="p-3.5">Visión de Uno Mismo / Del Otro</th>
                <th class="p-3.5">Patrón de Comportamiento</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Seguro</td>
                <td class="p-3.5">Positiva / Positiva</td>
                <td class="p-3.5 font-semibold text-teal-800">Cómodo con la intimidad y la autonomía. Expresa necesidades sin miedo al conflicto.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Ansioso-Preocupado</td>
                <td class="p-3.5">Negativa / Positiva</td>
                <td class="p-3.5 font-semibold text-teal-800">Miedo intenso al abandono. Busca reaseguramiento constante, hipervigila la distancia de la pareja.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Evitativo-Alejado</td>
                <td class="p-3.5">Positiva / Negativa</td>
                <td class="p-3.5 font-semibold text-teal-800">Independencia defensiva. Reprime emociones, se distancia ante la vulnerabilidad y huye del conflicto.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Desorganizado</td>
                <td class="p-3.5">Negativa / Negativa</td>
                <td class="p-3.5 font-semibold text-teal-800">Oscila entre la necesidad urgente de afecto y el temor a la intimidad emocional.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. La Trampa Relacional: El Bucle Ansioso-Evitativo</h2>
        <p>Es sumamente común que personas con apego ansioso se sientan atraídas por personas de apego evitativo, creando un ciclo repetitivo altamente destructivo conocido como el <strong>bucle de la persecución</strong>. El ansioso demanda atención; el evitativo, al sentirse abrumado, se cierra emocionalmente; lo que aumenta la ansiedad del primero y perpetúa el conflicto.</p>

        <div class="my-6 p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
          <h4 class="text-sm font-bold text-slate-900 uppercase">Ejercicios Clínicos de Descalibración de Apego</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-4 bg-white border border-slate-100 rounded-xl space-y-1.5">
              <span class="font-bold text-teal-800 block">Pauta para Perfiles Ansiosos:</span>
              Cuando sientas urgencia de escribir o llamar por un silencio de tu pareja, detén la mano. Escribe tus pensamientos en un diario e identifica si provienen del presente o de tus miedos de abandono infantil.
            </div>
            <div class="p-4 bg-white border border-slate-100 rounded-xl space-y-1.5">
              <span class="font-bold text-teal-800 block">Pauta para Perfiles Evitativos:</span>
              Cuando sientas ganas de huir en una discusión, quédate. Explica asertivamente tus necesidades: "Me siento abrumado y necesito 15 minutos solo. Volveré para hablarlo con tranquilidad".
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
        <p>En nuestras interacciones cotidianas, adoptamos de manera inconsciente diferentes estilos de comunicación. Los dos extremos disfuncionales son la pasividad (priorizar los deseos ajenos sacrificando los propios por miedo al conflicto) y la agresividad (imponer las opiniones propias). La <strong>asertividad</strong> se sitúa en el centro sano: expresa sentimientos, pensamientos y límites con honestidad y firmeza, respetando los derechos de los demás.</p>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3.5">Estilo</th>
                <th class="p-3.5">Comportamiento Corporal</th>
                <th class="p-3.5">Ejemplo ante Petición Extra Inviable</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Pasivo</td>
                <td class="p-3.5">Evita el contacto visual, sumisión. Trata de complacer a toda costa.</td>
                <td class="p-3.5">"Claro, yo me encargo de ese informe..." (Aunque no tenga tiempo).</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Agresivo</td>
                <td class="p-3.5">Invasión del espacio, tono hostil, juzga. Implica superioridad.</td>
                <td class="p-3.5 text-rose-700 font-semibold">"¿Pero tú te crees que yo no tengo nada que hacer? ¡Hazlo tú!".</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Asertivo</td>
                <td class="p-3.5 font-semibold text-teal-800">Contacto visual directo, tono calmado y seguro.</td>
                <td class="p-3.5 font-semibold text-teal-800">"Entiendo tu prisa, pero mi agenda de hoy está completa y no puedo redactar ese informe".</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>2. Por Qué Nos Cuesta Poner Límites: El Miedo al Rechazo</h2>
        <p>Decir "no" o marcar un límite genera habitualmente una respuesta de alerta vinculada a distorsiones cognitivas irracionales: "si digo que no, dejarán de quererme", "soy egoísta si no ayudo en todo".</p>
        <p>La psicología clínica recuerda que los límites personales son esenciales para preservar la salud emocional y la autoestima. Un límite claro no distancia a las personas sanas; al contrario, clarifica las reglas de interacción y construye relaciones basadas en el respeto mutuo.</p>

        <div class="my-6 p-5 bg-teal-50/40 border border-teal-100 rounded-2xl space-y-3">
          <h4 class="text-sm font-bold text-teal-900 uppercase">La Fórmula del Mensaje en Primera Persona</h4>
          <p class="text-xs text-slate-655 leading-relaxed">
            Una herramienta verbal muy eficaz para expresar desacuerdos o marcar límites sin despertar la defensividad en el otro es el **Mensaje en Primera Persona**:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-4 bg-white border border-slate-100 rounded-xl space-y-1">
              <span class="font-bold text-teal-800 block">Estructura del Mensaje</span>
              1. Hechos objetivos (sin evaluar).<br>
              2. Sentimiento propio ("me siento...").<br>
              3. Petición clara y concreta.<br>
              4. Beneficio común.
            </div>
            <div class="p-4 bg-white border border-slate-100 rounded-xl space-y-1">
              <span class="font-bold text-teal-800 block">Ejemplo Práctico</span>
              "Cuando me interrumpes en las reuniones (Hechos), me siento frustrado (Sentimiento). Te pido que esperes a que acabe para intervenir (Petición). Así avanzaremos mejor (Beneficio)".
            </div>
          </div>
        </div>

        <h2>3. Técnicas Verbales Asertivas de Emergencia</h2>
        <p>Ante conversaciones difíciles con personas insistentes, entrena el **Disco Rayado** (repetir tu punto de vista de forma calmada y persistente, con el mismo tono de voz, sin alterarte ni desviar el tema) y el **Banco de Niebla** (dar la razón en parte a la crítica del interlocutor sin ceder en tu postura personal, calmando la hostilidad).</p>
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
        <p>La <strong>Terapia Cognitivo-Conductual (TCC)</strong> es la corriente psicoterapéutica que cuenta con el mayor respaldo empírico en el tratamiento de trastornos como la ansiedad generalizada, la depresión y las fobias específicas. Fundamentada en la integración de la psicología cognitiva y las teorías del aprendizaje conductual, parte de una premisa central: no son las situaciones cotidianas las que nos perturban, sino la interpretación subjetiva que hacemos de ellas.</p>

        <div class="my-6 p-5 bg-teal-50/40 border-l-4 border-teal-600 rounded-r-2xl text-slate-700 text-xs leading-relaxed">
          <strong class="text-teal-900 block mb-1 font-bold">💡 Triángulo Cognitivo:</strong>
          La TCC funciona bajo la premisa de que nuestros **Pensamientos**, nuestras **Emociones** y nuestras **Conductas** se influyen mutuamente de forma circular. Al modificar tus pensamientos distorsionados, cambias directamente tus emociones y tus comportamientos.
        </div>

        <h2>2. El Modelo A-B-C de Albert Ellis</h2>
        <p>Para comprender cómo funciona el proceso psicoterapéutico de la TCC, es vital analizar el modelo clásico <strong>A-B-C</strong> desarrollado por Albert Ellis:</p>
        <ul>
          <li><strong>A (Activating Event / Evento Activador):</strong> La situación objetiva que ocurre (ej: recibir una crítica de tu jefe).</li>
          <li><strong>B (Beliefs / Creencias y Pensamientos):</strong> La interpretación cognitiva subjetiva que procesa el cerebro (ej: "Soy inútil, me despedirán").</li>
          <li><strong>C (Consequences / Consecuencias):</strong> Las respuestas emocionales y de comportamiento resultantes (ej: ansiedad severa, aislamiento).</li>
        </ul>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3.5">Sesgo Cognitivo</th>
                <th class="p-3.5">Definición</th>
                <th class="p-3.5">Pensamiento Automático</th>
                <th class="p-3.5">Reestructuración Cognitiva</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Pensamiento de Todo o Nada</td>
                <td class="p-3.5">Clasificar la realidad en extremos rígidos (éxito total o fracaso absoluto).</td>
                <td class="p-3.5 text-rose-800">"Si el informe tiene una errata, he fracasado en todo".</td>
                <td class="p-3.5 font-semibold text-teal-800">"El informe tiene un error, pero el contenido restante es riguroso y útil".</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Catastrofismo</td>
                <td class="p-3.5">Esperar de forma infundada el peor escenario posible ante una incertidumbre.</td>
                <td class="p-3.5 text-rose-800">"Si me pongo nervioso en la charla, se reirán y perderé mi trabajo".</td>
                <td class="p-3.5 font-semibold text-teal-800">"Aunque me ponga nervioso, la gente comprenderá la situación y mi trabajo no depende de una sola charla".</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-slate-900">Personalización</td>
                <td class="p-3.5">Atribuirse la culpa de eventos externos que no controlamos.</td>
                <td class="p-3.5 text-rose-800">"Mi amigo está callado hoy, seguro está enfadado por algo que dije".</td>
                <td class="p-3.5 font-semibold text-teal-800">"Tiene preocupaciones propias que no me involucran. Le preguntaré si necesita ayuda".</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Técnicas Fundamentales Empleadas en Consulta</h2>
        <p>Durante el tratamiento de TCC, el terapeuta y el paciente trabajan de forma colaborativa aplicando diversas técnicas:</p>
        
        <h3>El Diálogo Socrático</h3>
        <p>El terapeuta realiza preguntas reflexivas al paciente para cuestionar la validez y utilidad de sus pensamientos automáticos, ayudándole a encontrar interpretaciones alternativas más objetivas y adaptativas basadas en la evidencia.</p>
        
        <h3>La Exposición con Prevención de Respuesta (EPR)</h3>
        <p>Consiste en exponer al paciente al estímulo que le genera ansiedad de forma gradual y controlada, impidiéndole realizar la conducta de evitación o compulsión habitual, facilitando el proceso biológico de habituación.</p>
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
        <p>La <strong>Terapia de Aceptación y Compromiso (ACT)</strong> pertenece a las terapias conductuales de tercera generación. A diferencia del enfoque cognitivo tradicional de la TCC que busca debatir o eliminar los pensamientos incómodos y las emociones negativas, ACT propone una perspectiva radical: el sufrimiento emocional es un componente inevitable de la experiencia humana.</p>
        
        <div class="my-6 p-5 bg-teal-50/40 border-l-4 border-teal-600 rounded-r-2xl text-slate-700 text-xs leading-relaxed">
          <strong class="text-teal-900 block mb-1 font-bold">💡 Aceptación:</strong>
          Aceptar no es resignarse de forma pasiva. Es la decisión voluntaria de darle espacio al malestar para poder dirigir tu energía hacia conductas valiosas, en lugar de quedarte paralizado luchando contra tus emociones.
        </div>

        <h2>2. Los Seis Pilares del Hexaflex de ACT</h2>
        <p>La flexibilidad psicológica se entrena mediante seis procesos clave ilustrados en el modelo del <em>Hexaflex</em>:</p>
        <ul>
          <li><strong>Aceptación:</strong> Dar espacio a las emociones y sensaciones incómodas, en lugar de luchar por evitarlas.</li>
          <li><strong>Defusión Cognitiva:</strong> Observar tus pensamientos como eventos mentales pasajeros, no como verdades absolutas.</li>
          <li><strong>Contacto con el Presente:</strong> Estar plenamente consciente del aquí y el ahora.</li>
          <li><strong>El Yo-Contexto:</strong> Reconocer que tú eres el observador seguro donde ocurren los pensamientos y emociones.</li>
          <li><strong>Valores Vitales:</strong> Clarificar lo que realmente importa en tu vida, las direcciones que deseas seguir.</li>
          <li><strong>Acción Comprometida:</strong> Ejecutar conductas coherentes con tus valores, incluso en presencia de dudas o miedo.</li>
        </ul>

        <div class="my-6 overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
                <th class="p-3.5">Agenda del Control (Lucha Inútil)</th>
                <th class="p-3.5">Agenda de la Aceptación (Enfoque ACT)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3.5">"No asistiré a la reunión de amigos hasta que no se me quite la timidez por completo".</td>
                <td class="p-3.5 font-semibold text-teal-800">"Asistiré a la reunión sintiendo timidez si es necesario, porque el valor de la amistad me importa".</td>
              </tr>
              <tr>
                <td class="p-3.5">"Tengo que debatir mi pensamiento de inutilidad y hacerme sentir seguro".</td>
                <td class="p-3.5 font-semibold text-teal-800">"Nombro el pensamiento: 'Estoy pensando que no soy capaz', y continúo con mi plan de acción".</td>
              </tr>
              <tr>
                <td class="p-3.5">Evitar presentar tu proyecto para no pasar por el malestar de la evaluación ajena.</td>
                <td class="p-3.5 font-semibold text-teal-800">Presentar el proyecto dando espacio al miedo a fallar, alineado con tu valor del desarrollo profesional.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Ejercicios Prácticos de Defusión Cognitiva</h2>
        <p>Para desarmar la influencia paralizante de tus pensamientos negativos, practica estos ejercicios sencillos de defusión en tu día a día:</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 text-xs">
          <div class="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1.5">
            <span class="font-bold text-teal-800">"Estoy teniendo el pensamiento de..."</span>
            <p class="text-slate-500 leading-relaxed">
              Ante una autocrítica como "No valgo para nada", refrásala mentalmente como: *“Estoy teniendo el pensamiento de que no valgo para nada”*. Crea una distancia inmediata y reduce el impacto emocional.
            </p>
          </div>
          <div class="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1.5">
            <span class="font-bold text-teal-800">Pensamiento en Pantalla de Cine</span>
            <p class="text-slate-500 leading-relaxed">
              Cierra los ojos e imagina tu preocupación escrita en letras de colores sobre una pantalla de cine distante. Observa cómo cambian de tamaño, quitándoles su solemnidad literal.
            </p>
          </div>
        </div>

        <h2>4. Definir Valores vs. Establecer Metas</h2>
        <p>En ACT, se distingue claramente entre un valor y una meta. Una **meta** es un destino final que se puede conseguir y tachar de una lista (ej: "aprobar un examen"). Un **valor**, en cambio, es una brújula de orientación permanente que nunca se agota (ej: "ser un estudiante comprometido"). Al enfocar tu vida en los valores en lugar de obsesionarte con los resultados, aseguras dirección vital robusta ante cualquier contratiempo.</p>
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
