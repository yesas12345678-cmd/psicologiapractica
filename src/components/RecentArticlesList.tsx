"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";

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
  date: string;
  dateLabel: string;
  readingTime: string;
  image: string;
  published: boolean;
  seoTitle: string;
  category: Category;
}

interface RecentArticlesListProps {
  articles: Article[];
}

export default function RecentArticlesList({ articles }: RecentArticlesListProps) {
  const [visibleCount, setVisibleCount] = useState(4);

  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      {visibleArticles.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-2xl border border-slate-100 text-slate-500 text-sm">
          No hay artículos publicados en este momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Link
                  href={`/${article.categorySlug}/${article.slug}`}
                  className="block relative h-44 w-full bg-slate-100 hover:opacity-90 transition-opacity overflow-hidden"
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-w-768px) 100vw, 320px"
                    className="object-cover"
                  />
                </Link>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                    {article.category.shortName}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 hover:text-teal-700 leading-snug">
                    <Link href={`/${article.categorySlug}/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime}
                </span>
                <Link
                  href={`/${article.categorySlug}/${article.slug}`}
                  className="font-bold text-teal-700 flex items-center hover:underline"
                >
                  Leer Artículo
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {visibleCount < articles.length && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-6 py-3 rounded-full border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-350 hover:scale-102 active:scale-98 transition-all shadow-sm text-sm cursor-pointer flex items-center gap-2"
          >
            Ver más artículos
          </button>
        </div>
      )}
    </div>
  );
}
