"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ShieldCheck, ChevronRight, Home } from "lucide-react";
import Sidebar from "./Sidebar";
import Avatar from "./Avatar";

interface ArticleLayoutProps {
  title: string;
  description: string;
  category: {
    name: string;
    href: string;
  };
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  reviewer?: {
    name: string;
    role: string;
    credentials: string; // Colegiado nº etc
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  imageUrl?: string;
  children: React.ReactNode;
}

export default function ArticleLayout({
  title,
  description,
  category,
  author,
  reviewer,
  publishDate,
  readTime,
  imageUrl,
  children,
}: ArticleLayoutProps) {
  return (
    <article className="w-full bg-slate-50/30 py-8 md:py-12" aria-labelledby="article-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SEO Breadcrumbs */}
        <nav className="flex items-center gap-1 text-xs text-slate-550 mb-6 overflow-x-auto whitespace-nowrap py-1" aria-label="Migas de pan">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-teal-700 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link
            href={category.href}
            className="hover:text-teal-700 transition-colors font-medium"
          >
            {category.name}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-700 font-semibold truncate max-w-[200px] md:max-w-xs">
            {title}
          </span>
        </nav>

        {/* Heading 1 (Strict SEO Rule: Single H1 per page) */}
        <header className="mb-8 max-w-4xl">
          <h1
            id="article-title"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4"
          >
            {title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal mb-6">
            {description}
          </p>

          {/* E-E-A-T Authorship Header Metadata Card */}
          <div className="flex flex-wrap items-center gap-4 py-4 px-5 bg-white rounded-2xl border border-slate-100 shadow-sm text-sm">
            <div className="flex items-center gap-2">
              <Avatar src={author.avatar} alt={author.name} size={32} priority />
              <div>
                <span className="block font-semibold text-slate-800">
                  Escrito por <span className="text-teal-700">{author.name}</span>
                </span>
                <span className="text-xs text-slate-500">{author.role}</span>
              </div>
            </div>

            {reviewer && (
              <div className="flex items-center gap-2 sm:border-l sm:border-slate-100 sm:pl-4">
                <Avatar src={reviewer.avatar} alt={reviewer.name} size={32} />
                <div>
                  <span className="flex items-center gap-1 font-semibold text-slate-800 text-xs sm:text-sm">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    Revisado por <span className="text-teal-700">{reviewer.name}</span>
                  </span>
                  <span className="text-xs text-slate-500">
                    {reviewer.role} &bull; {reviewer.credentials}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1 text-xs text-slate-550 ml-auto w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={publishDate}>{publishDate}</time>
              </div>
              <div>&bull;</div>
              <div>{readTime} de lectura</div>
            </div>
          </div>

          {imageUrl && (
            <div className="relative h-64 md:h-[400px] w-full rounded-3xl overflow-hidden mt-6 shadow-sm border border-slate-100">
              <Image
                src={imageUrl}
                alt={title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}
        </header>

        {/* 2-Column Content Layout (Desktop Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Body Column */}
          <main className="lg:col-span-8 bg-white p-6 md:p-10 border border-slate-100 rounded-3xl shadow-sm space-y-6">
            
            {/* The article body (renders naturally without ads) */}
            <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-700 prose-headings:font-extrabold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-slate-900 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-slate-800">
              {children}
            </div>

            {/* EEAT Reviewer Feedback / Verification Info */}
            {reviewer && (
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mt-8">
                <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  Garantía de Rigor Científico
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  En Psicología Práctica, nos comprometemos a ofrecer contenidos verificados, contrastados y de máxima calidad. Este artículo ha sido minuciosamente revisado por un profesional clínico certificado para garantizar que el contenido sea preciso, esté actualizado y se base en la evidencia científica actual (como estudios de la APA o manuales DSM-5).
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="/sobre-nosotros"
                    className="text-xs font-semibold text-teal-700 hover:underline"
                  >
                    Conoce más sobre nuestro proceso de revisión &rarr;
                  </Link>
                </div>
              </div>
            )}

          </main>

          {/* Sidebar Column (Visible only on lg and larger viewports) */}
          <div className="hidden lg:block lg:col-span-4">
            <Sidebar currentCategory={category.name} />
          </div>

        </div>

      </div>
    </article>
  );
}
