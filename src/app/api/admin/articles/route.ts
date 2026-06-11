import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import prisma from "@/lib/db";

function formatDateToSpanish(dateStr: string): string {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  
  const monthName = months[monthIdx] || "Enero";
  return `${day} ${monthName}, ${year}`;
}

function calculateReadingTime(body: string): string {
  const text = body.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min de lectura`;
}

export async function POST(request: Request) {
  const isAuthed = await checkAuth();
  if (!isAuthed) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const bodyData = await request.json();
    const {
      slug,
      title,
      categorySlug,
      excerpt,
      body,
      date,
      published,
      seoTitle,
      oldSlug,
    } = bodyData;

    // Validation
    if (!slug || !title || !categorySlug || !excerpt || !body) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (slug, title, categorySlug, excerpt, body)" },
        { status: 400 }
      );
    }

    const calculatedReadingTime = calculateReadingTime(body);
    const formattedDate = date ? date : new Date().toISOString().split("T")[0];
    const dateLabel = formatDateToSpanish(formattedDate);

    const articleData = {
      slug,
      title,
      categorySlug,
      excerpt,
      body,
      date: formattedDate,
      dateLabel,
      readingTime: calculatedReadingTime,
      image: bodyData.image || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
      published: published !== undefined ? published : true,
      seoTitle: seoTitle || "",
    };

    // Check if it's an edit with a slug change
    if (oldSlug && oldSlug !== slug) {
      // 1. Verify that new slug is not duplicated
      const existing = await prisma.article.findUnique({
        where: { slug },
      });
      if (existing) {
        return NextResponse.json(
          { error: "El nuevo slug ya está siendo utilizado por otro artículo" },
          { status: 400 }
        );
      }

      // 2. Delete the old record
      await prisma.article.delete({
        where: { slug: oldSlug },
      });

      // 3. Create the new record
      const newArticle = await prisma.article.create({
        data: articleData,
      });

      return NextResponse.json({ success: true, article: newArticle });
    }

    // Edit without slug change
    if (oldSlug && oldSlug === slug) {
      const updatedArticle = await prisma.article.update({
        where: { slug },
        data: articleData,
      });
      return NextResponse.json({ success: true, article: updatedArticle });
    }

    // New article creation
    // Check duplication
    const existing = await prisma.article.findUnique({
      where: { slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "El slug ya existe" },
        { status: 400 }
      );
    }

    const createdArticle = await prisma.article.create({
      data: articleData,
    });

    return NextResponse.json({ success: true, article: createdArticle });
  } catch (error: any) {
    console.error("Error creating/updating article:", error);
    return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
  }
}
