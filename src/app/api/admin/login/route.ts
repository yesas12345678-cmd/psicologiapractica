import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (password && process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      const sessionValue = crypto
        .createHash("sha256")
        .update(process.env.ADMIN_PASSWORD + "_session_salt_2026")
        .digest("hex");

      cookieStore.set("admin_session", sessionValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
