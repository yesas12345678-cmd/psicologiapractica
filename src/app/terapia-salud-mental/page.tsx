import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { MessageCircleHeart, Clock, ShieldCheck, BookOpen, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terapia y Salud Mental: Tratamientos y Modelos | Psicología Práctica",
  description:
    "Conoce los diferentes enfoques terapéuticos (cognitivo-conductual, aceptación y compromiso, psicoanálisis), cuándo acudir al psicólogo y mitos sobre la salud mental.",
  alternates: {
    canonical: "/terapia-salud-mental",
  },
};

export default function TerapiaSaludMentalPage() {
  const articles = [
    {
      id: "cuando-ir-al-psicologo",
      title: "Señales sutiles de que es momento de ir a terapia (aunque 'todo parezca ir bien')",
      excerpt:
        "No necesitas estar en una situación límite para pedir ayuda. El autoconocimiento, la fatiga emocional constante o la apatía son motivos válidos para acudir a consulta.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
      readTime: "6 min",
      date: "09 Jun, 2026",
    },
    {
      id: "diferencias-psicologo-psiquiatra-coaching",
      title: "Psicólogo, Psiquiatra y Coach: Diferencias cruciales para no equivocarte de profesional",
      excerpt:
        "Conoce la formación académica, las capacidades y el marco legal que distingue a cada uno para tomar una decisión informada y segura para tu mente.",
      image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=600",
      readTime: "5 min",
      date: "03 Jun, 2026",
    },
    {
      id: "terapia-aceptacion-y-compromiso-act",
      title: "Terapia de Aceptación y Compromiso (ACT): La psicología de la flexibilidad",
      excerpt:
        "Perteneciente a las terapias de tercera generación. Descubre cómo ACT nos enseña a aceptar el malestar inevitable para enfocarnos en lo que realmente valoramos.",
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      readTime: "7 min",
      date: "28 May, 2026",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/20 py-12 md:py-20" aria-labelledby="hub-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hub Header Section */}
        <header className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-4">
            <MessageCircleHeart className="w-3.5 h-3.5 text-teal-700" />
            Terapias del Siglo XXI y Ciencia
          </span>
          <h1
            id="hub-title"
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            Terapia & Salud Mental
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            Normalizar el cuidado de la salud mental y desmitificar la psicoterapia es nuestro compromiso primordial. En este espacio exploramos las corrientes terapéuticas más efectivas, explicamos qué esperar del proceso psicoterapéutico y te ofrecemos guías claras para elegir el profesional y enfoque más adaptado a tus necesidades.
          </p>
        </header>

        {/* SEO Silo Overview & Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Grid for Articles */}
          <section className="lg:col-span-8 space-y-8" aria-label="Listado de artículos de terapia">
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
                        <Link href={`/terapia-salud-mental/${article.id}`}>
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
                        href={`/terapia-salud-mental/${article.id}`}
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
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                Evidencia en Terapias
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                El éxito terapéutico depende de aplicar técnicas validadas. Analizamos los enfoques psicológicos de mayor respaldo empírico actual:
              </p>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  Terapia Cognitivo-Conductual (TCC)
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  Terapia de Aceptación y Compromiso (ACT)
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  Terapia Dialéctica Conductual (DBT)
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  EMDR para reprocesamiento de trauma
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Ética y Colegiación
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Toda orientación terapéutica que mencionamos respeta estrictamente los códigos deontológicos de psicología clínica oficiales. Fomentamos únicamente la consulta con psicólogos debidamente registrados y habilitados legalmente.
              </p>
            </div>
          </aside>

        </div>

      </div>
    </main>
  );
}
