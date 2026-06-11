import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MessageCircleHeart, Clock, ShieldCheck, BookOpen, ChevronRight, HelpCircle } from "lucide-react";
import prisma from "@/lib/db";
import Sidebar from "@/components/Sidebar";

export const revalidate = 0; // dynamic

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

const FAQS_MAP: Record<string, Array<{ question: string; answer: string }>> = {
  "ansiedad-burnout": [
    {
      question: "¿Cuál es la diferencia entre estrés y burnout?",
      answer: "El estrés es una respuesta de activación puntual ante demandas elevadas, mientras que el burnout o desgaste ocupacional es un agotamiento crónico que se prolonga en el tiempo y altera la actitud hacia el trabajo."
    },
    {
      question: "¿Cómo saber si mi ansiedad es patológica?",
      answer: "La ansiedad se vuelve problemática cuando es recurrente, desproporcionada ante los estímulos, paralizante y limita el normal desarrollo de tus relaciones, trabajo o vida personal."
    },
    {
      question: "¿Se puede superar el burnout sin renunciar al trabajo?",
      answer: "Sí, a través del desarrollo de límites interpersonales, reestructuración cognitiva, asertividad en la organización y acompañamiento psicoterapéutico profesional."
    }
  ],
  "desarrollo-mindfulness": [
    {
      question: "¿Qué es el mindfulness y cómo comenzar?",
      answer: "Mindfulness es centrar la atención plenamente en el presente sin juzgar. Puedes comenzar dedicando tan solo 5 minutos a sentarte en calma y seguir el compás natural de tu respiración."
    },
    {
      question: "¿De qué forma beneficia la meditación al cerebro?",
      answer: "Los estudios muestran que meditar con frecuencia disminuye la reactividad de la amígdala (centro del miedo) y refuerza la corteza prefrontal, encargada de modular las respuestas emocionales."
    },
    {
      question: "¿Qué significa la defusión cognitiva?",
      answer: "Es una técnica propia de las terapias de tercera generación que ayuda a distanciarse de los pensamientos intrusivos, reconociéndolos como eventos de la mente y no como realidades incuestionables."
    }
  ],
  "relaciones-entorno": [
    {
      question: "¿Cuáles son las banderas rojas en una relación?",
      answer: "El control constante, los celos injustificados, el aislamiento inducido, el chantaje emocional y las dinámicas donde no existe reciprocidad o respeto mutuo."
    },
    {
      question: "¿De qué manera repercute el apego infantil en el amor adulto?",
      answer: "Los modelos de apego forjados con los cuidadores guían el grado de intimidad, seguridad y vulnerabilidad que nos permitimos experimentar con nuestras parejas de adultos."
    },
    {
      question: "¿Cómo establecer límites firmes sin sentir culpabilidad?",
      answer: "Entendiendo que delimitar tu espacio es un ejercicio de autocuidado básico y respeto hacia ti mismo. Un 'no' asertivo protege tu salud mental y fomenta relaciones sinceras."
    }
  ],
  "terapia-salud-mental": [
    {
      question: "¿Cómo elegir el enfoque terapéutico correcto?",
      answer: "Según lo que busques. La TCC es genial para fobias y reestructuración; la terapia ACT se centra en flexibilidad y valores; y la terapia humanista se orienta al crecimiento personal."
    },
    {
      question: "¿Qué distingue a un psicólogo de un psiquiatra?",
      answer: "El psiquiatra es médico y prescribe tratamientos farmacológicos; el psicólogo se especializa en psicoterapia, analizando conductas, esquemas de pensamiento y dinámicas emocionales."
    },
    {
      question: "¿Cuándo es aconsejable buscar terapia?",
      answer: "No necesitas una crisis extrema. Si detectas apatía recurrente, dificultades de gestión emocional o deseas potenciar tu autodescubrimiento, es el momento idóneo."
    }
  ]
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} | Psicología Práctica`,
    description: category.description,
    alternates: {
      canonical: `/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { categorySlug } = await params;

  // Load category and its articles
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      articles: {
        where: { published: true },
        orderBy: { date: "desc" },
      },
    },
  });

  if (!category) {
    notFound();
  }

  // Load all categories for sidebar
  const allCategories = await prisma.category.findMany({
    orderBy: { number: "asc" },
  });

  const faqs = FAQS_MAP[categorySlug] || [];

  return (
    <main className="min-h-screen bg-slate-50/20 py-12 md:py-20" aria-labelledby="hub-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hub Header Section */}
        <header className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-4">
            <MessageCircleHeart className="w-3.5 h-3.5 text-teal-700" />
            Especialidad {category.number}
          </span>
          <h1
            id="hub-title"
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            {category.name}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {category.intro}
          </p>
        </header>

        {/* Grid for Articles & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Content Area */}
          <section className="lg:col-span-8 space-y-12">
            
            {/* Articles List */}
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight border-b border-slate-100 pb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-slate-700" />
                Artículos de la Categoría
              </h2>
              
              {category.articles.length === 0 ? (
                <div className="bg-white p-8 text-center rounded-2xl border border-slate-100 text-slate-500 text-sm">
                  Próximamente publicaremos nuevos artículos en esta sección.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.articles.map((article) => (
                    <article
                      key={article.slug}
                      className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                    >
                      <Link
                        href={`/${category.slug}/${article.slug}`}
                        className="block relative h-48 w-full bg-slate-100 hover:opacity-90 transition-opacity overflow-hidden"
                      >
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="(max-w-768px) 100vw, 350px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-slate-900 hover:text-teal-700 leading-snug">
                            <Link href={`/${category.slug}/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-50 pt-4">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {article.readingTime}
                            </span>
                            <span>&bull;</span>
                            <span>{article.dateLabel}</span>
                          </div>
                          <Link
                            href={`/${category.slug}/${article.slug}`}
                            className="font-bold text-teal-700 flex items-center hover:underline"
                          >
                            Leer
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* FAQs Section */}
            {faqs.length > 0 && (
              <section className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6" aria-labelledby="faqs-section-title">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 text-teal-700">
                  <HelpCircle className="w-5 h-5" />
                  <h2 id="faqs-section-title" className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Preguntas Frecuentes ({category.shortName})
                  </h2>
                </div>
                <div className="space-y-6">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="font-bold text-slate-800 text-sm leading-snug">
                        {faq.question}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed pl-4 border-l-2 border-slate-200">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <Sidebar categories={allCategories} currentCategory={category.slug} />
          </aside>

        </div>

      </div>
    </main>
  );
}
