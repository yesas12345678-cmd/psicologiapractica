import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const isAuthed = await checkAuth();
  if (!isAuthed) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    // Validate mime type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "El archivo debe ser una imagen válida" }, { status: 400 });
    }

    // Generate unique name
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}_${cleanName}`;

    // Read file bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure directory exists in public/uploads (which maps to the persistent volume mount)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Write file
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // Return relative url
    const relativeUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: relativeUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Error interno al subir archivo" }, { status: 500 });
  }
}
