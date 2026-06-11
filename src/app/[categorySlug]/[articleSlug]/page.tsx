import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BookOpen, ChevronRight } from "lucide-react";
import prisma from "@/lib/db";
import ArticleLayout from "@/components/ArticleLayout";

export const revalidate = 0; // dynamic

interface PageProps {
  params: Promise<{
    categorySlug: string;
    articleSlug: string;
  }>;
}

// E-E-A-T Authorship details mapping
const AUTHORS = {
  elena: {
    name: "Elena Martínez",
    role: "Redactora de Salud Mental y Divulgadora",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
  },
};

const REVIEWERS = {
  alejandro: {
    name: "Dr. Alejandro Gómez",
    role: "Psicólogo Clínico y Neuropsicólogo",
    credentials: "Colegiado Nº M-34521 (Colegio Oficial de la Psicología de Madrid)",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
  },
  laura: {
    name: "Dra. Laura Benítez",
    role: "Psiquiatra y Psicoterapeuta",
    credentials: "Colegiada Nº 282865431 (Ilustre Colegio de Médicos de Madrid)",
    avatar: "https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=300",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug, articleSlug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug: articleSlug },
  });

  if (!article || article.categorySlug !== categorySlug) {
    return {};
  }

  const title = article.seoTitle || `${article.title} | Psicología Práctica`;

  return {
    title,
    description: article.excerpt,
    alternates: {
      canonical: `/${categorySlug}/${articleSlug}`,
    },
    openGraph: {
      title,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { categorySlug, articleSlug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug: articleSlug },
    include: { category: true },
  });

  if (!article || article.categorySlug !== categorySlug) {
    notFound();
  }

  // Get 3 recommended articles
  const recommended = await prisma.article.findMany({
    where: {
      published: true,
      slug: { not: articleSlug },
    },
    take: 3,
    orderBy: { date: "desc" },
    include: { category: true },
  });

  // Determine reviewer based on category to keep E-E-A-T dynamic
  const reviewer = categorySlug === "ansiedad-burnout" || categorySlug === "terapia-salud-mental"
    ? REVIEWERS.alejandro
    : REVIEWERS.laura;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://psicologiapractica.com";

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": AUTHORS.elena.name,
      "url": `${baseUrl}/sobre-nosotros`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Psicología Práctica",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/icon.svg`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/${categorySlug}/${articleSlug}`,
    },
  };

  return (
    <>
      {/* Injected Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleLayout
        title={article.title}
        description={article.excerpt}
        category={{
          name: article.category.name,
          href: `/${article.category.slug}`,
        }}
        author={AUTHORS.elena}
        reviewer={reviewer}
        publishDate={article.dateLabel}
        readTime={article.readingTime.replace(" de lectura", "")}
        imageUrl={article.image}
      >
        {/* Article content from DB */}
        <div dangerouslySetInnerHTML={{ __html: article.body }} />



        {/* Recommended Readings Section */}
        {recommended.length > 0 && (
          <section className="space-y-6 pt-10 border-t border-slate-100 mt-10">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-slate-700" />
              Lecturas Recomendadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommended.map((rec) => (
                <article
                  key={rec.slug}
                  className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <Link
                    href={`/${rec.categorySlug}/${rec.slug}`}
                    className="block relative h-32 w-full bg-slate-100 hover:opacity-90 transition-opacity overflow-hidden"
                  >
                    <Image
                      src={rec.image}
                      alt={rec.title}
                      fill
                      sizes="(max-w-768px) 100vw, 200px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-teal-700 uppercase tracking-wider block">
                        {rec.category.shortName}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-teal-700 leading-snug">
                        <Link href={`/${rec.categorySlug}/${rec.slug}`}>
                          {rec.title}
                        </Link>
                      </h4>
                    </div>
                    <Link
                      href={`/${rec.categorySlug}/${rec.slug}`}
                      className="text-[10px] font-bold text-teal-700 flex items-center hover:underline"
                    >
                      Leer
                      <ChevronRight className="w-3 h-3 ml-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </ArticleLayout>
    </>
  );
}
