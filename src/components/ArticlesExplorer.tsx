"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, ChevronRight, BookOpen } from "lucide-react";

interface Category {
  slug: string;
  name: string;
  shortName: string;
}

interface Article {
  slug: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  readingTime: string;
  image: string;
  category: Category;
}

interface ArticlesExplorerProps {
  initialArticles: Article[];
  categories: Category[];
}

export default function ArticlesExplorer({ initialArticles, categories }: ArticlesExplorerProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesCategory = selectedCategory === "" || article.categorySlug === selectedCategory;
      const matchesSearch =
        search === "" ||
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, search, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título o contenido..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setSelectedCategory("")}
            className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              selectedCategory === ""
                ? "bg-teal-700 text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                selectedCategory === cat.slug
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>

      </div>

      {/* Grid Results */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center text-slate-500 shadow-sm space-y-2">
          <BookOpen className="w-12 h-12 text-slate-350 mx-auto" />
          <p className="font-semibold text-slate-800">No se encontraron artículos</p>
          <p className="text-xs max-w-md mx-auto">
            Prueba a cambiar los términos de búsqueda o a seleccionar otra categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-w-768px) 100vw, 300px"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                    {article.category.shortName}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 hover:text-teal-700 leading-snug line-clamp-2">
                    <Link href={`/${article.categorySlug}/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-400 border-t border-slate-50 mt-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readingTime}</span>
                </div>
                <Link
                  href={`/${article.categorySlug}/${article.slug}`}
                  className="font-bold text-teal-700 flex items-center hover:underline"
                >
                  Leer
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
