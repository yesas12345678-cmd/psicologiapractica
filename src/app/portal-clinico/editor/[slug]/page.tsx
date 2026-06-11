import React from "react";
import { redirect, notFound } from "next/navigation";
import { checkAuth } from "@/lib/auth";
import prisma from "@/lib/db";
import ArticleEditor from "@/components/ArticleEditor";

export const revalidate = 0; // dynamic

export const metadata = {
  title: "Editar Artículo | Portal de Administración",
  robots: "noindex, nofollow",
};

interface EditArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const isAuthed = await checkAuth();

  if (!isAuthed) {
    redirect("/portal-clinico");
  }

  const { slug } = await params;

  // Load article
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    notFound();
  }

  // Load categories
  const categories = await prisma.category.findMany({
    orderBy: { number: "asc" },
  });

  return (
    <main className="min-h-screen bg-slate-50/50 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleEditor article={article} categories={categories} />
      </div>
    </main>
  );
}
