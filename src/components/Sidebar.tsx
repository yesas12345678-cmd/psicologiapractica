"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, BookOpen, Mail } from "lucide-react";

interface SidebarProps {
  currentCategory?: string;
  categories?: { slug: string; name: string; shortName: string }[];
}

export default function Sidebar({ currentCategory, categories = [] }: SidebarProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const defaultCategories = [
    { slug: "ansiedad-burnout", name: "Ansiedad & Burnout", shortName: "Ansiedad" },
    { slug: "desarrollo-mindfulness", name: "Mindfulness & Desarrollo", shortName: "Mindfulness" },
    { slug: "relaciones-entorno", name: "Relaciones & Entorno", shortName: "Relaciones" },
    { slug: "terapia-salud-mental", name: "Terapia & Salud Mental", shortName: "Terapia" },
  ];

  const catsToUse = categories.length > 0 ? categories : defaultCategories;

  const trendingArticles = [
    {
      title: "Cómo identificar el Síndrome de Burnout a tiempo",
      href: "/ansiedad-burnout/sindrome-burnout-sintomas",
      reads: "12k lecturas",
    },
    {
      title: "5 Ejercicios de Mindfulness para calmar la ansiedad diaria",
      href: "/desarrollo-mindfulness/introduccion-mindfulness-principiantes",
      reads: "9k lecturas",
    },
    {
      title: "Límites saludables en la pareja: claves psicológicas",
      href: "/relaciones-entorno/establecer-limites-saludables",
      reads: "8.5k lecturas",
    },
    {
      title: "Terapia Cognitivo-Conductual: Qué es y cómo funciona",
      href: "/terapia-salud-mental/cuando-ir-al-psicologo",
      reads: "7.2k lecturas",
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <aside className="space-y-8 lg:sticky lg:top-24 max-w-[320px] w-full" aria-label="Barra lateral">
      


      {/* Trending Articles Section */}
      <div className="bg-white p-6 border border-slate-100 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <TrendingUp className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Lo Más Leído
          </h3>
        </div>
        <ul className="space-y-4" id="sidebar-trending-list">
          {trendingArticles.map((article, index) => (
            <li key={index} className="group flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-md bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                {index + 1}
              </span>
              <div className="space-y-1">
                <Link
                  href={article.href}
                  className="text-sm font-semibold text-slate-800 hover:text-teal-700 leading-snug line-clamp-2 transition-colors"
                >
                  {article.title}
                </Link>
                <span className="text-[11px] text-slate-400 block">
                  {article.reads}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Category Silos */}
      <div className="bg-white p-6 border border-slate-100 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <BookOpen className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Categorías
          </h3>
        </div>
        <div className="flex flex-wrap gap-2" id="sidebar-categories-badges">
          {catsToUse.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                currentCategory === cat.slug
                  ? "bg-teal-50 text-teal-700 border border-teal-100"
                  : "bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-teal-700 border border-transparent"
              }`}
            >
              {cat.shortName}
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
}
