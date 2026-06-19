import React from "react";
import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/auth";
import prisma from "@/lib/db";
import DashboardList from "@/components/DashboardList";

export const revalidate = 0; // dynamic

export const metadata = {
  title: "Dashboard de Administración | Psicología Práctica",
  robots: "noindex, nofollow",
};

export default async function DashboardPage() {
  const isAuthed = await checkAuth();

  if (!isAuthed) {
    redirect("/admin");
  }

  // Load articles
  const drafts = await prisma.article.findMany({
    where: { published: false },
    orderBy: { date: "desc" },
    include: { category: true },
  });

  const published = await prisma.article.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
    include: { category: true },
  });

  return (
    <main className="min-h-screen bg-slate-50/50 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardList initialDrafts={drafts} initialPublished={published} />
      </div>
    </main>
  );
}
