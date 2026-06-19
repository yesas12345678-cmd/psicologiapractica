import React from "react";
import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export const revalidate = 0; // dynamic

export const metadata = {
  title: "Acceso Portal Interno | Psicología Práctica",
  robots: "noindex, nofollow",
};

export default async function PortalInternoPage() {
  const isAuthed = await checkAuth();

  if (isAuthed) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <LoginForm />
    </main>
  );
}
