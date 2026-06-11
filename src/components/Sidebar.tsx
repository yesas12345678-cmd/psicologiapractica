"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, BookOpen } from "lucide-react";

interface SidebarProps {
  currentCategory?: string;
}

export default function Sidebar({ currentCategory }: SidebarProps) {
  // Mocking trending articles to build siloing link authority
  const trendingArticles = [
    {
      title: "Cómo identificar el Síndrome de Burnout a tiempo",
      href: "/ansiedad-burnout",
      reads: "12k lecturas",
    },
    {
      title: "5 Ejercicios de Mindfulness para calmar la ansiedad diaria",
      href: "/desarrollo-mindfulness",
      reads: "9k lecturas",
    },
    {
      title: "Límites saludables en la pareja: claves psicológicas",
      href: "/relaciones-entorno",
      reads: "8.5k lecturas",
    },
    {
      title: "Terapia Cognitivo-Conductual: Qué es y cómo funciona",
      href: "/terapia-salud-mental",
      reads: "7.2k lecturas",
    },
  ];

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
          <Link
            href="/ansiedad-burnout"
            className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-all"
          >
            Ansiedad & Burnout
          </Link>
          <Link
            href="/desarrollo-mindfulness"
            className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-all"
          >
            Mindfulness
          </Link>
          <Link
            href="/relaciones-entorno"
            className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-all"
          >
            Relaciones
          </Link>
          <Link
            href="/terapia-salud-mental"
            className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-all"
          >
            Terapia
          </Link>
        </div>
      </div>

    </aside>
  );
}
