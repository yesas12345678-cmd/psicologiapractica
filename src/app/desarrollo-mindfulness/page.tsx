import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Sparkles, Clock, Compass, BookOpen, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Desarrollo Personal y Mindfulness | Psicología Práctica",
  description:
    "Descubre técnicas de atención plena (mindfulness), meditación guiada y estrategias psicológicas para potenciar tu desarrollo personal y autorregulación emocional.",
  alternates: {
    canonical: "/desarrollo-mindfulness",
  },
};

export default function DesarrolloMindfulnessPage() {
  const articles = [
    {
      id: "introduccion-mindfulness-principiantes",
      title: "Mindfulness para principiantes: Guía paso a paso para meditar 5 minutos al día",
      excerpt:
        "La meditación no consiste en dejar la mente en blanco, sino en observar tus pensamientos sin juzgar. Descubre cómo empezar con una rutina minimalista.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
      readTime: "5 min",
      date: "09 Jun, 2026",
    },
    {
      id: "inteligencia-emocional-goleman",
      title: "Los 5 pilares de la Inteligencia Emocional según Daniel Goleman",
      excerpt:
        "El cociente intelectual no lo es todo. Conoce cómo la autoconciencia, la autorregulación y la empatía determinan tu éxito en la vida y el trabajo.",
      image: "https://images.unsplash.com/photo-1518072710700-ee4b2c2f6271?auto=format&fit=crop&q=80&w=600",
      readTime: "7 min",
      date: "06 Jun, 2026",
    },
    {
      id: "habitos-atomicos-resumen",
      title: "Hábitos Atómicos: La psicología detrás de los cambios imperceptibles",
      excerpt:
        "Basado en los estudios de comportamiento humano. Aprende cómo el sistema de pequeños incrementos del 1% diario genera transformaciones radicales a largo plazo.",
      image: "https://images.unsplash.com/photo-1488190211105-8b3e6585d116?auto=format&fit=crop&q=80&w=600",
      readTime: "6 min",
      date: "02 Jun, 2026",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/20 py-12 md:py-20" aria-labelledby="hub-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hub Header Section */}
        <header className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            Autoconocimiento y Bienestar
          </span>
          <h1
            id="hub-title"
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            Desarrollo & Mindfulness
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            El crecimiento personal no es un destino, sino un proceso activo. En esta sección abordamos herramientas de atención plena (Mindfulness), el desarrollo de la inteligencia emocional y estrategias conductuales validadas científicamente para ayudarte a cultivar una mente enfocada, resiliente y en paz.
          </p>
        </header>

        {/* SEO Silo Overview & Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Grid for Articles */}
          <section className="lg:col-span-8 space-y-8" aria-label="Listado de artículos de desarrollo personal">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight border-b border-slate-100 pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-slate-700" />
              Artículos Destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-w-768px) 100vw, 350px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 hover:text-teal-700 leading-snug">
                        <Link href={`/desarrollo-mindfulness/${article.id}`}>
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
                          {article.readTime}
                        </span>
                        <span>&bull;</span>
                        <span>{article.date}</span>
                      </div>
                      <Link
                        href={`/desarrollo-mindfulness/${article.id}`}
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
          </section>

          {/* Sidebar Area for Authority Links */}
          <aside className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-700" />
                Herramientas Recomendadas
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                El autoconocimiento es más sencillo cuando se tiene un punto de partida estructurado. Te sugerimos explorar estas prácticas de desarrollo reflexivo:
              </p>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  Escritura terapéutica (Expressive Writing)
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  El escaneo corporal (Body Scan) de Jon Kabat-Zinn
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  La matriz de Eisenhower para priorización
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  Técnica de defusión cognitiva para pensamientos
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Evidencia Científica
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nuestros artículos recopilan y traducen las conclusiones de estudios publicados en revistas de alto impacto como <i>Psychological Science</i>, <i>The Journal of Positive Psychology</i> y ensayos clínicos sobre la reducción del estrés basada en mindfulness (MBSR).
              </p>
            </div>
          </aside>

        </div>

      </div>
    </main>
  );
}
