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
    // Ansiedad & Burnout
    {
      slug: "sindrome-burnout-sintomas",
      categorySlug: "ansiedad-burnout",
      title: "El Síndrome de Burnout: Cómo detectar el agotamiento laboral crónico",
      excerpt: "¿Te sientes exhausto antes de empezar la jornada? Descubre las diferencias entre el estrés diario y el burnout, y cómo proteger tu salud emocional en el trabajo.",
      date: "2026-06-10",
      dateLabel: "10 Jun, 2026",
      readingTime: "6 min de lectura",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "Síndrome de Burnout: Síntomas y Prevención en el Ámbito Laboral",
      body: `
        <h2>¿Qué es realmente el Síndrome de Burnout?</h2>
        <p>El Síndrome de Burnout, o síndrome de desgaste profesional, es una respuesta al estrés laboral crónico que no ha sido gestionado con éxito. Se caracteriza por tres dimensiones principales: agotamiento emocional, despersonalización (cinismo hacia el trabajo) y baja realización personal.</p>
        <h2>Síntomas principales para alarmarse</h2>
        <p>Es común confundir el cansancio de una semana difícil con el burnout. Sin embargo, el burnout se instaura lentamente y de forma persistente. Presta atención a las siguientes señales:</p>
        <ul>
          <li><strong>Agotamiento persistente:</strong> Sensación de no tener energía incluso después de descansar el fin de semana.</li>
          <li><strong>Distanciamiento cognitivo:</strong> Sentimientos de negatividad o cinismo relacionados con el trabajo.</li>
          <li><strong>Bajo rendimiento:</strong> Dificultad extrema para concentrarse y pérdida de la eficacia laboral.</li>
        </ul>
        <h2>Estrategias de prevención y afrontamiento</h2>
        <p>Para salir del ciclo de desgaste profesional, es vital establecer límites claros entre la vida personal y laboral, delegar tareas cuando sea posible y buscar apoyo profesional de un terapeuta para desarrollar estrategias cognitivas de afrontamiento.</p>
      `,
    },
    {
      slug: "tecnicas-respiracion-ansiedad",
      categorySlug: "ansiedad-burnout",
      title: "3 Técnicas de respiración con aval científico para detener un ataque de ansiedad",
      excerpt: "La respiración diafragmática y el método 4-7-8 no son modas. Conoce la neurobiología detrás de estas prácticas y cómo activan tu sistema nervioso parasimpático.",
      date: "2026-06-08",
      dateLabel: "08 Jun, 2026",
      readingTime: "4 min de lectura",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "3 Técnicas de Respiración para Controlar la Ansiedad Rápido",
      body: `
        <h2>La Neurobiología de la Respiración Consciente</h2>
        <p>Cuando sufrimos de ansiedad, nuestro sistema nervioso simpático se activa, provocando hiperventilación y aumento del ritmo cardíaco. Mediante técnicas de respiración controladas, estimulamos el nervio vago, activando el sistema nervioso parasimpático que reduce la presión arterial y induce calma.</p>
        <h2>Las 3 Técnicas Recomendadas</h2>
        <h3>1. Respiración Diafragmática</h3>
        <p>Coloca una mano en el pecho y otra en el abdomen. Inhala profundamente por la nariz asegurándote de que solo se mueva la mano del abdomen. Exhala lentamente por la boca.</p>
        <h3>2. El Método 4-7-8</h3>
        <p>Desarrollado por el Dr. Andrew Weil. Inhala en 4 segundos, retén el aire por 7 segundos y exhala ruidosamente por la boca durante 8 segundos.</p>
        <h3>3. Respiración Cuadrada (Box Breathing)</h3>
        <p>Inhala en 4 segundos, mantén el aire en 4 segundos, exhala en 4 segundos y quédate sin aire en los pulmones por 4 segundos antes de repetir.</p>
      `,
    },
    {
      slug: "estres-positivo-vs-negativo",
      categorySlug: "ansiedad-burnout",
      title: "Distrés y Eustrés: Cuándo el estrés es tu aliado y cuándo tu enemigo",
      excerpt: "No todo el estrés es perjudicial. El eustrés nos motiva a actuar, mientras que el distrés desgasta nuestro organismo. Aprende a equilibrar la balanza.",
      date: "2026-06-05",
      dateLabel: "05 Jun, 2026",
      readingTime: "5 min de lectura",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "Eustrés vs Distrés: Cómo transformar el estrés en motivación",
      body: `
        <h2>¿Qué diferencia el eustrés del distrés?</h2>
        <p>El eustrés o estrés positivo es aquel que nos estimula a enfrentarnos a retos y resolver problemas creativamente. Es temporal y moviliza recursos físicos y mentales de forma beneficiosa. Por el contrario, el distrés o estrés negativo se prolonga en el tiempo, supera nuestra capacidad de adaptación y causa desgaste biológico y psicológico.</p>
      `,
    },
    // Desarrollo Personal & Mindfulness
    {
      slug: "introduccion-mindfulness-principiantes",
      categorySlug: "desarrollo-mindfulness",
      title: "Mindfulness para principiantes: Guía paso a paso para meditar 5 minutos al día",
      excerpt: "La meditación no consiste en dejar la mente en blanco, sino en observar tus pensamientos sin juzgar. Descubre cómo empezar con una rutina minimalista.",
      date: "2026-06-09",
      dateLabel: "09 Jun, 2026",
      readingTime: "5 min de lectura",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "Guía de Mindfulness para Principiantes: Meditación de 5 Minutos",
      body: `
        <h2>Desmitificando el Mindfulness</h2>
        <p>El mindfulness no requiere posturas complejas ni silenciar los pensamientos. Consiste simplemente en prestar atención plena al momento presente de manera intencionada y sin juzgar.</p>
      `,
    },
    {
      slug: "inteligencia-emocional-goleman",
      categorySlug: "desarrollo-mindfulness",
      title: "Los 5 pilares de la Inteligencia Emocional según Daniel Goleman",
      excerpt: "El cociente intelectual no lo es todo. Conoce cómo la autoconciencia, la autorregulación y la empatía determinan tu éxito en la vida y el trabajo.",
      date: "2026-06-06",
      dateLabel: "06 Jun, 2026",
      readingTime: "7 min de lectura",
      image: "https://images.unsplash.com/photo-1518072710700-ee4b2c2f6271?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "Los 5 Pilares de la Inteligencia Emocional de Daniel Goleman",
      body: `
        <h2>El poder de la Inteligencia Emocional</h2>
        <p>Daniel Goleman popularizó el término señalando que el éxito personal y profesional depende más de nuestra capacidad para gestionar emociones que de nuestras habilidades intelectuales (CI).</p>
      `,
    },
    {
      slug: "habitos-atomicos-resumen",
      categorySlug: "desarrollo-mindfulness",
      title: "Hábitos Atómicos: La psicología detrás de los cambios imperceptibles",
      excerpt: "Basado en los estudios de comportamiento humano. Aprende cómo el sistema de pequeños incrementos del 1% diario genera transformaciones radicales a largo plazo.",
      date: "2026-06-02",
      dateLabel: "02 Jun, 2026",
      readingTime: "6 min de lectura",
      image: "https://images.unsplash.com/photo-1488190211105-8b3e6585d116?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "Hábitos Atómicos: Método Científico para Crear Buenos Hábitos",
      body: `
        <h2>La regla del 1% de mejora</h2>
        <p>A menudo pensamos que para cambiar de vida debemos tomar grandes medidas. Los hábitos atómicos demuestran que una pequeña mejora del 1% diario resulta en un cambio exponencial a largo plazo.</p>
      `,
    },
    // Relaciones & Entorno
    {
      slug: "tipos-apego-relaciones-pareja",
      categorySlug: "relaciones-entorno",
      title: "Los 4 tipos de apego: ¿Cómo influye tu infancia en tu relación de pareja?",
      excerpt: "Apego seguro, ansioso, evitativo y desorganizado. Entender tu estilo de apego y el de tu pareja es el primer paso para solucionar conflictos recurrentes.",
      date: "2026-06-07",
      dateLabel: "07 Jun, 2026",
      readingTime: "7 min de lectura",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "Los 4 Tipos de Apego en la Pareja y cómo Sanarlos",
      body: `
        <h2>La Teoría del Apego de John Bowlby</h2>
        <p>La manera en que nos relacionábamos con nuestros cuidadores primarios durante la infancia define cómo creamos vínculos sentimentales de adultos.</p>
      `,
    },
    {
      slug: "comunicacion-asertiva-tecnicas",
      categorySlug: "relaciones-entorno",
      title: "Guía de comunicación asertiva: Di lo que piensas sin generar conflictos",
      excerpt: "La asertividad es el punto medio entre la pasividad y la agresividad. Conoce técnicas prácticas como el 'banco de niebla' o el uso del mensaje en primera persona.",
      date: "2026-06-04",
      dateLabel: "04 Jun, 2026",
      readingTime: "5 min de lectura",
      image: "https://images.unsplash.com/photo-1521791136368-1a9b8275315f?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "Técnicas de Comunicación Asertiva en el Ámbito Familiar y Laboral",
      body: `
        <h2>El arte de comunicarse de manera sana</h2>
        <p>La asertividad nos permite expresar nuestras opiniones, límites y sentimientos de forma honesta y directa, sin agredir a los demás y sin reprimir nuestras necesidades.</p>
      `,
    },
    {
      slug: "establecer-limites-saludables",
      categorySlug: "relaciones-entorno",
      title: "Cómo decir 'no' sin culpa: La psicología de los límites personales",
      excerpt: "Poner límites no es egoísmo; es autocuidado. Aprende a proteger tu espacio y energía emocional frente a demandas excesivas de tu entorno social o familiar.",
      date: "2026-06-01",
      dateLabel: "01 Jun, 2026",
      readingTime: "6 min de lectura",
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "Límites Personales: Aprender a Decir No sin Sentir Culpa",
      body: `
        <h2>La Importancia de los Límites en la Salud Mental</h2>
        <p>Sin límites personales claros, corremos el riesgo de sufrir agotamiento, resentimiento y pérdida de identidad debido a complacer constantemente las expectativas de los demás.</p>
      `,
    },
    // Terapia & Salud Mental
    {
      slug: "cuando-ir-al-psicologo",
      categorySlug: "terapia-salud-mental",
      title: "Señales sutiles de que es momento de ir a terapia (aunque 'todo parezca ir bien')",
      excerpt: "No necesitas estar en una situación límite para pedir ayuda. El autoconocimiento, la fatiga emocional constante o la apatía son motivos válidos para acudir a consulta.",
      date: "2026-06-09",
      dateLabel: "09 Jun, 2026",
      readingTime: "6 min de lectura",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "Cuándo ir al Psicólogo: Señales de que necesitas terapia",
      body: `
        <h2>La terapia como prevención y crecimiento</h2>
        <p>A menudo asociamos ir al psicólogo con sufrir un trastorno mental grave. Sin embargo, la terapia es una excelente herramienta para potenciar el autoconocimiento y resolver conflictos cotidianos.</p>
      `,
    },
    {
      slug: "diferencias-psicologo-psiquiatra-coaching",
      categorySlug: "terapia-salud-mental",
      title: "Psicólogo, Psiquiatra y Coach: Diferencias cruciales para no equivocarte de profesional",
      excerpt: "Conoce la formación académica, las capacidades y el marco legal que distingue a cada uno para tomar una decisión informada y segura para tu mente.",
      date: "2026-06-03",
      dateLabel: "03 Jun, 2026",
      readingTime: "5 min de lectura",
      image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "Diferencias entre Psicólogo, Psiquiatra y Coach explicadas",
      body: `
        <h2>Elegir el apoyo profesional correcto</h2>
        <p>Es fundamental conocer las cualificaciones y competencias legales de cada disciplina para evitar el intrusismo y asegurar que recibimos el tratamiento adecuado.</p>
      `,
    },
    {
      slug: "terapia-aceptacion-y-compromiso-act",
      categorySlug: "terapia-salud-mental",
      title: "Terapia de Aceptación y Compromiso (ACT): La psicología de la flexibilidad",
      excerpt: "Perteneciente a las terapias de tercera generación. Descubre cómo ACT nos enseña a aceptar el malestar inevitable para enfocarnos en lo que realmente valoramos.",
      date: "2026-05-28",
      dateLabel: "28 May, 2026",
      readingTime: "7 min de lectura",
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      published: true,
      seoTitle: "Terapia de Aceptación y Compromiso (ACT): Pilares y Funcionamiento",
      body: `
        <h2>Flexibilidad Psicológica y Valores</h2>
        <p>A diferencia de la terapia cognitivo-conductual tradicional que busca reestructurar o eliminar pensamientos negativos, la Terapia de Aceptación y Compromiso (ACT) propone desarrollar la flexibilidad para aceptar el malestar emocional y tomar acción coherente con nuestros valores vitales.</p>
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
