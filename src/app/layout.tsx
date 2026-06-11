import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Psicología Práctica | Salud Mental y Bienestar Emocional",
    template: "%s | Psicología Práctica",
  },
  description:
    "Descubre guías, herramientas y consejos prácticos sobre ansiedad, burnout, mindfulness, relaciones de pareja y salud mental. Escrito por psicólogos y revisado científicamente.",
  metadataBase: new URL("https://psicologiapractica.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Psicología Práctica | Salud Mental y Bienestar Emocional",
    description:
      "Descubre guías, herramientas y consejos prácticos sobre ansiedad, burnout, mindfulness, relaciones de pareja y salud mental. Escrito por psicólogos y revisado científicamente.",
    url: "https://psicologiapractica.com",
    siteName: "Psicología Práctica",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Psicología Práctica | Salud Mental y Bienestar Emocional",
    description:
      "Descubre guías, herramientas y consejos prácticos sobre ansiedad, burnout, mindfulness, relaciones de pareja y salud mental. Escrito por psicólogos y revisado científicamente.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-slate-800 transition-colors duration-200">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
