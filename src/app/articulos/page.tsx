import React from "react";
import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import prisma from "@/lib/db";
import ArticlesExplorer from "@/components/ArticlesExplorer";

export const revalidate = 0; // dynamic

export const metadata: Metadata = {
  title: "Explorador de Artículos | Psicología Práctica",
  description:
    "Busca y filtra todos los artículos publicados en Psicología Práctica. Encuentra guías de salud mental, técnicas de meditación y consejos relacionales.",
  alternates: {
    canonical: "/articulos",
  },
};

export default async function ArticulosPage() {
  const categories = await prisma.category.findMany({
    orderBy: { number: "asc" },
  });

  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
    include: { category: true },
  });

  return (
    <main className="min-h-screen bg-slate-50/20 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <header className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            <BookOpen className="w-3.5 h-3.5 text-teal-700" />
            Archivo de Publicaciones
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Explorar Artículos
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Utiliza el buscador o los filtros por categoría para acceder de forma rápida a todas nuestras guías de psicología clínica, mindfulness y bienestar.
          </p>
        </header>

        {/* Dynamic Explorer Component */}
        <ArticlesExplorer initialArticles={articles} categories={categories} />

      </div>
    </main>
  );
}
