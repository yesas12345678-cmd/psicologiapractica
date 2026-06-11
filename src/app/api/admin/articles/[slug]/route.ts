import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import prisma from "@/lib/db";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const isAuthed = await checkAuth();
  if (!isAuthed) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { slug } = await params;
    
    // Check if article exists
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
    }

    // Delete
    await prisma.article.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting article:", error);
    return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
  }
}
