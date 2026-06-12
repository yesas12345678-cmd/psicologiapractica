import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Sparkles, Users, MessageCircleHeart, ArrowRight, BookOpen, Clock, ShieldCheck, Flame, Compass } from "lucide-react";
import prisma from "@/lib/db";
import Sidebar from "@/components/Sidebar";
import RecentArticlesList from "@/components/RecentArticlesList";

export const revalidate = 0; // dynamic

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: { number: "asc" },
  });

  const recentArticles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
    include: { category: true },
  });


  const getIcon = (slug: string) => {
    switch (slug) {
      case "ansiedad-burnout":
        return Heart;
      case "desarrollo-mindfulness":
        return Sparkles;
      case "relaciones-entorno":
        return Users;
      case "terapia-salud-mental":
        return MessageCircleHeart;
      default:
        return BookOpen;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/20 pb-20">
      
      {/* Hero section */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-transparent border-b border-slate-100" aria-label="Introducción">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <Link
            href="/sobre-nosotros"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs font-semibold"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Divulgación científica rigurosa y avalada clínicamente
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Herramientas Prácticas para el Cuidado de tu{" "}
            <span className="text-teal-700 relative">
              Salud Mental
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Aprende a navegar las emociones complejas de la vida diaria mediante artículos divulgativos rigurosos, guías de autocuidado y respuestas psicológicas científicamente validadas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/articulos"
              className="px-6 py-3 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-600 hover:scale-102 transition-all shadow-sm text-sm"
            >
              Comienza a Aprender
            </Link>
            <Link
              href="/sobre-nosotros"
              className="px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors text-sm"
            >
              Nuestro Proceso Editorial
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="categories-section-title">
        <div className="mb-8">
          <h2
            id="categories-section-title"
            className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight"
          >
            Áreas de Especialidad
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Explora nuestros silos temáticos de contenido estructurado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const IconComponent = getIcon(cat.slug);
            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-101 transition-all duration-300 flex flex-col justify-between group block cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="p-3 rounded-xl border w-fit bg-slate-50 text-slate-700 border-slate-200">
                    <IconComponent className="w-6 h-6 text-teal-700" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-6">
                  <span
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:underline"
                  >
                    Ver Artículos
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Articles & Sidebar Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Recent Articles Section */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight border-b border-slate-100 pb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-slate-700" />
              Artículos Recientes
            </h2>
            
            <RecentArticlesList articles={recentArticles} />
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4">
            <Sidebar categories={categories} />
          </div>

        </div>
      </section>

      {/* EEAT Sincerity Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-label="Garantías del portal">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center gap-8 justify-between border border-slate-900">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <h3 className="text-2xl font-black tracking-tight flex items-center justify-center md:justify-start gap-2">
              <Compass className="w-6 h-6 text-teal-400" />
              ¿Por qué confiar en Psicología Práctica?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              El auto-diagnóstico en Internet puede ser peligroso. En Psicología Práctica trabajamos solo con redactores graduados y revisores médicos. Nuestro compromiso es brindarte información libre de sesgos comerciales y con total honestidad intelectual.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/sobre-nosotros"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-teal-600 text-white font-bold hover:bg-teal-500 transition-colors text-sm shadow-md"
            >
              Conoce al Equipo Clínico
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
