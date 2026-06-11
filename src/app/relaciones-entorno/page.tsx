import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Users, Clock, MessageSquare, BookOpen, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Relaciones y Entorno Social: Vínculos Saludables | Psicología Práctica",
  description:
    "Aprende sobre dinámicas de pareja, apego emocional, comunicación asertiva y cómo gestionar relaciones tóxicas en tu ámbito familiar, laboral o social.",
  alternates: {
    canonical: "/relaciones-entorno",
  },
};

export default function RelacionesEntornoPage() {
  const articles = [
    {
      id: "tipos-apego-relaciones-pareja",
      title: "Los 4 tipos de apego: ¿Cómo influye tu infancia en tu relación de pareja?",
      excerpt:
        "Apego seguro, ansioso, evitativo y desorganizado. Entender tu estilo de apego y el de tu pareja es el primer paso para solucionar conflictos recurrentes.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600",
      readTime: "7 min",
      date: "07 Jun, 2026",
    },
    {
      id: "comunicacion-asertiva-tecnicas",
      title: "Guía de comunicación asertiva: Di lo que piensas sin generar conflictos",
      excerpt:
        "La asertividad es el punto medio entre la pasividad y la agresividad. Conoce técnicas prácticas como el 'banco de niebla' o el uso del mensaje en primera persona.",
      image: "https://images.unsplash.com/photo-1521791136368-1a9b8275315f?auto=format&fit=crop&q=80&w=600",
      readTime: "5 min",
      date: "04 Jun, 2026",
    },
    {
      id: "establecer-limites-saludables",
      title: "Cómo decir 'no' sin culpa: La psicología de los límites personales",
      excerpt:
        "Poner límites no es egoísmo; es autocuidado. Aprende a proteger tu espacio y energía emocional frente a demandas excesivas de tu entorno social o familiar.",
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600",
      readTime: "6 min",
      date: "01 Jun, 2026",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/20 py-12 md:py-20" aria-labelledby="hub-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hub Header Section */}
        <header className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-4">
            <Users className="w-3.5 h-3.5 text-teal-700" />
            Vínculos, Familia y Pareja
          </span>
          <h1
            id="hub-title"
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            Relaciones & Entorno
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            Somos seres profundamente sociales y la calidad de nuestras relaciones determina gran parte de nuestra salud mental. Explora cómo funciona el apego emocional, aprende a comunicarte de manera asertiva, a establecer límites saludables y a sanar vínculos con tu pareja, familia y entorno laboral.
          </p>
        </header>

        {/* SEO Silo Overview & Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Grid for Articles */}
          <section className="lg:col-span-8 space-y-8" aria-label="Listado de artículos de relaciones">
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
                        <Link href={`/relaciones-entorno/${article.id}`}>
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
                        href={`/relaciones-entorno/${article.id}`}
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
                <MessageSquare className="w-4 h-4 text-teal-700" />
                Dinámicas Relacionales
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Mejorar la calidad de tu comunicación requiere constancia. Pon en práctica estos pilares fundamentales en tus interacciones diarias:
              </p>
              <ul className="space-y-2 text-xs text-slate-650 font-medium">
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  Escucha activa (suspender el juicio antes de responder)
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  Validación emocional (reconocer el sentir del otro)
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  Expresión de necesidades con enunciados &quot;Yo&quot;
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
                  Resolución negociada de desacuerdos (ganar-ganar)
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Enfoque Sistémico
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Analizamos las relaciones humanas bajo el prisma de la psicología sistémica y la teoría del apego de John Bowlby, aportando un enfoque comprensivo y de fácil aplicación para resolver tensiones de forma madura.
              </p>
            </div>
          </aside>

        </div>

      </div>
    </main>
  );
}
