import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Flame, Clock, Heart, BookOpen, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Ansiedad y Burnout: Guías de Superación | Psicología Práctica",
  description:
    "Aprende a identificar, gestionar y superar la ansiedad generalizada, los ataques de pánico y el estrés laboral o síndrome de burnout con bases científicas.",
  alternates: {
    canonical: "/ansiedad-burnout",
  },
};

export default function AnsiedadBurnoutPage() {
  const articles = [
    {
      id: "sindrome-burnout-sintomas",
      title: "El Síndrome de Burnout: Cómo detectar el agotamiento laboral crónico",
      excerpt:
        "¿Te sientes exhausto antes de empezar la jornada? Descubre las diferencias entre el estrés diario y el burnout, y cómo proteger tu salud emocional en el trabajo.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600",
      readTime: "6 min",
      date: "10 Jun, 2026",
    },
    {
      id: "tecnicas-respiracion-ansiedad",
      title: "3 Técnicas de respiración con aval científico para detener un ataque de ansiedad",
      excerpt:
        "La respiración diafragmática y el método 4-7-8 no son modas. Conoce la neurobiología detrás de estas prácticas y cómo activan tu sistema nervioso parasimpático.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
      readTime: "4 min",
      date: "08 Jun, 2026",
    },
    {
      id: "estres-positivo-vs-negativo",
      title: "Distrés y Eustrés: Cuándo el estrés es tu aliado y cuándo tu enemigo",
      excerpt:
        "No todo el estrés es perjudicial. El eustrés nos motiva a actuar, mientras que el distrés desgasta nuestro organismo. Aprende a equilibrar la balanza.",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      readTime: "5 min",
      date: "05 Jun, 2026",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/20 py-12 md:py-20" aria-labelledby="hub-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hub Header Section */}
        <header className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-4">
            <Flame className="w-3.5 h-3.5 text-teal-600" />
            Salud Ocupacional y Estrés
          </span>
          <h1
            id="hub-title"
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            Ansiedad & Burnout
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            El ritmo de vida moderno y las demandas laborales pueden desbordar nuestros mecanismos de defensa. Aquí encontrarás recursos científicos, herramientas prácticas y guías terapéuticas contrastadas para afrontar la ansiedad, el estrés crónico y recuperar el control de tu bienestar.
          </p>
        </header>

        {/* SEO Silo Overview & Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Grid for Articles */}
          <section className="lg:col-span-8 space-y-8" aria-label="Listado de artículos de ansiedad">
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
                        <Link href={`/ansiedad-burnout/${article.id}`}>
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
                        href={`/ansiedad-burnout/${article.id}`}
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
                <Heart className="w-4 h-4 text-teal-600" />
                Guía de Sintomatología
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                ¿Tienes dudas sobre lo que estás sintiendo? Nuestra guía te ayudará a desglosar los síntomas físicos y cognitivos más comunes de los trastornos de ansiedad y el burnout laboral.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  Palpitaciones y taquicardia recurrente
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  Fatiga mental y despersonalización
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  Pensamientos intrusivos catastróficos
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  Dificultad para conciliar el sueño
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Atención Inmediata
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Si te encuentras en una crisis aguda de ansiedad o depresión, no dudes en recurrir a los servicios de emergencia de tu comunidad. En España, puedes contactar de forma gratuita y confidencial con el <strong>Teléfono de la Esperanza (717 003 717)</strong> o el canal de ayuda al suicidio de Sanidad <strong>(024)</strong>.
              </p>
            </div>
          </aside>

        </div>

      </div>
    </main>
  );
}
