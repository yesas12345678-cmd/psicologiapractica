import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface RouteParams {
  params: Promise<{
    filename: string;
  }>;
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
      case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    case ".ico":
      return "image/x-icon";
    default:
      return "application/octet-stream";
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { filename } = await params;

    // Sanitization against directory traversal
    const safeFilename = path.basename(filename);

    // Candidate directories where the image might be stored
    const candidates = [
      path.join(process.cwd(), "public", "uploads", safeFilename),
      path.join(process.cwd(), "public", "images", safeFilename),
      path.join(process.cwd(), "public", safeFilename),
    ];

    let fileBuffer: Buffer | null = null;
    let foundPath = "";

    for (const candPath of candidates) {
      try {
        fileBuffer = await fs.readFile(candPath);
        foundPath = candPath;
        break; // found, exit loop
      } catch {
        // file not found in this candidate, try next
      }
    }

    if (!fileBuffer) {
      return new Response("Imagen no encontrada", { status: 404 });
    }

    const mimeType = getMimeType(foundPath);

    return new Response(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Image server error:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}
