"use client";

import React from "react";
import Link from "next/link";
import { Brain, ArrowUp, AlertTriangle, Heart } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200" aria-label="Pie de página">
      
      {/* Disclaimer section (EEAT/YMYL necessity) */}
      <div className="bg-slate-100/50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center text-xs text-slate-500">
            <div className="flex-shrink-0 flex items-center gap-1.5 font-bold text-amber-600 uppercase tracking-wider">
              <AlertTriangle className="w-4.5 h-4.5" />
              <span>Aviso de Salud</span>
            </div>
            <p className="leading-relaxed">
              La información contenida en <strong>Psicología Práctica</strong> se proporciona únicamente con fines informativos y educativos. No pretende sustituir el diagnóstico, consejo o tratamiento psicológico o médico profesional. Siempre busca el asesoramiento de tu médico u otro profesional de la salud calificado ante cualquier pregunta que puedas tener sobre una condición médica o trastorno mental.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-black tracking-tight text-slate-900 group"
              id="footer-logo-link"
            >
              <div className="p-2 rounded-xl bg-teal-50 text-teal-700 group-hover:scale-105 transition-transform duration-200">
                <Brain className="w-5 h-5" />
              </div>
              <span className="flex flex-col leading-none">
                <span>Psicología</span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500">
                  Práctica
                </span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Divulgación científica sobre salud mental, desarrollo personal y bienestar emocional. Herramientas prácticas para navegar tu día a día.
            </p>
          </div>

          {/* Col 2: Hub Categories */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Secciones
            </h3>
            <ul className="space-y-2.5 text-sm" id="footer-categories-list">
              <li>
                <Link
                  href="/ansiedad-burnout"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Ansiedad y Burnout
                </Link>
              </li>
              <li>
                <Link
                  href="/desarrollo-mindfulness"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Desarrollo y Mindfulness
                </Link>
              </li>
              <li>
                <Link
                  href="/relaciones-entorno"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Relaciones y Entorno
                </Link>
              </li>
              <li>
                <Link
                  href="/terapia-salud-mental"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Terapia y Salud Mental
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: EEAT & Info */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Sobre Nosotros
            </h3>
            <ul className="space-y-2.5 text-sm" id="footer-about-list">
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  ¿Quiénes Somos?
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-nosotros#review-team"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Equipo de Revisores
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legals & Actions */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Políticas y Legal
            </h3>
            <ul className="space-y-2.5 text-sm mb-6" id="footer-legal-list">
              <li>
                <Link
                  href="/aviso-legal"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-cookie-settings"))}
                  className="hover:text-teal-700 transition-colors duration-200 text-left cursor-pointer"
                >
                  Configuración de Cookies
                </button>
              </li>
            </ul>
            <button
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-200 hover:bg-slate-350 text-xs font-bold text-slate-800 transition-colors duration-200 focus:outline-none"
              aria-label="Volver arriba"
              id="scroll-to-top-btn"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Volver Arriba
            </button>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Psicología Práctica. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Diseñado para tu bienestar mental</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline-block align-middle ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
