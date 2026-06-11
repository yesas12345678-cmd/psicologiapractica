import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Sparkles, Users, MessageCircleHeart, ArrowRight, BookOpen, Clock, ShieldCheck, Flame, Compass } from "lucide-react";

export default function Home() {
  const categories = [
    {
      name: "Ansiedad & Burnout",
      href: "/ansiedad-burnout",
      description: "Supera el agotamiento laboral, gestiona el estrés crónico y recupera el control de tu paz mental con técnicas validadas.",
      colorClass: "bg-slate-50 text-slate-700 border-slate-200",
      icon: Heart,
    },
    {
      name: "Desarrollo & Mindfulness",
      href: "/desarrollo-mindfulness",
      description: "Cultiva la atención plena, aumenta tu autogestión emocional y acelera tu crecimiento personal diario.",
      colorClass: "bg-slate-50 text-slate-750 border-slate-200",
      icon: Sparkles,
    },
    {
      name: "Relaciones & Entorno",
      href: "/relaciones-entorno",
      description: "Aprende a comunicarte de forma asertiva, identifica estilos de apego y establece límites interpersonales saludables.",
      colorClass: "bg-slate-50 text-slate-700 border-slate-200",
      icon: Users,
    },
    {
      name: "Terapia & Salud Mental",
      href: "/terapia-salud-mental",
      description: "Conoce los enfoques terapéuticos modernos, derriba mitos sobre la terapia y encuentra orientación basada en la ciencia.",
      colorClass: "bg-slate-50 text-slate-750 border-slate-200",
      icon: MessageCircleHeart,
    },
  ];

  const featuredArticles = [
    {
      title: "El Síndrome de Burnout: Cómo detectar el agotamiento laboral crónico",
      category: "Ansiedad & Burnout",
      href: "/ansiedad-burnout",
      excerpt: "¿Te sientes exhausto antes de empezar la jornada? Descubre las diferencias entre el estrés diario y el burnout, y cómo proteger tu salud emocional.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600",
      readTime: "6 min",
    },
    {
      title: "Mindfulness para principiantes: Guía paso a paso para meditar 5 minutos al día",
      category: "Desarrollo & Mindfulness",
      href: "/desarrollo-mindfulness",
      excerpt: "La meditación no consiste en dejar la mente en blanco, sino en observar tus pensamientos sin juzgar. Empieza hoy con esta rutina.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
      readTime: "5 min",
    },
    {
      title: "Los 4 tipos de apego: ¿Cómo influye tu infancia en tu relación de pareja?",
      category: "Relaciones & Entorno",
      href: "/relaciones-entorno",
      excerpt: "Apego seguro, ansioso, evitativo y desorganizado. Entender tu estilo de apego es clave para resolver conflictos repetitivos de pareja.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600",
      readTime: "7 min",
    },
  ];

  const popularArticles = [
    {
      title: "3 Técnicas de respiración con aval científico para detener la ansiedad",
      href: "/ansiedad-burnout",
      reads: "12,400 lecturas este mes",
    },
    {
      title: "Señales de que es momento de ir a terapia (aunque todo parezca bien)",
      href: "/terapia-salud-mental",
      reads: "9,800 lecturas este mes",
    },
    {
      title: "Cómo decir 'no' sin culpa: La psicología de los límites personales",
      href: "/relaciones-entorno",
      reads: "8,500 lecturas este mes",
    },
    {
      title: "Los 5 pilares de la Inteligencia Emocional según Daniel Goleman",
      href: "/desarrollo-mindfulness",
      reads: "7,900 lecturas este mes",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/20 pb-20">
      
      {/* Hero section */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-transparent border-b border-slate-100" aria-label="Introducción">
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
              href="/terapia-salud-mental"
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

      {/* Categories Grid (Silos Entrypoints) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="categories-section-title">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-101 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl border w-fit ${cat.colorClass}`}>
                    <IconComponent className="w-6 h-6 text-teal-700" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-755 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline"
                  >
                    Ver Artículos
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured & Most Read */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-label="Contenidos populares y destacados">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Featured Articles Section */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight border-b border-slate-100 pb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-slate-700" />
              Artículos Destacados
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map((article, idx) => (
                <article
                  key={idx}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-44 w-full bg-slate-105">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-w-768px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                        {article.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 hover:text-teal-700 leading-snug">
                        <Link href={article.href}>{article.title}</Link>
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-50">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                      <Link
                        href={article.href}
                        className="font-bold text-teal-700 flex items-center hover:underline"
                      >
                        Leer Artículo
                        <ArrowRight className="w-3 h-3 ml-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Popular / Most Read Column */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight border-b border-slate-100/60 pb-3 flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-600" />
              Más Leídos
            </h2>
            
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
              <ul className="space-y-6" id="home-popular-list">
                {popularArticles.map((article, idx) => (
                  <li key={idx} className="group flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-slate-50 text-slate-400 font-black text-sm flex items-center justify-center group-hover:bg-slate-100 group-hover:text-teal-700 transition-colors">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <Link
                        href={article.href}
                        className="text-sm font-semibold text-slate-800 hover:text-teal-700 leading-snug line-clamp-2 transition-colors"
                      >
                        {article.title}
                      </Link>
                      <span className="text-[10px] text-slate-400 block">
                        {article.reads}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-teal-650 text-white font-bold hover:bg-teal-55 transition-colors text-sm shadow-md"
            >
              Conoce al Equipo Clínico
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
