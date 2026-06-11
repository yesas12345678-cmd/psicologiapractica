import React from "react";
import { Metadata } from "next";
import { Cookie, ShieldAlert, Eye, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Cookies | Psicología Práctica",
  description:
    "Consulta nuestra política de cookies. Conoce qué cookies utilizamos en Psicología Práctica, su finalidad y cómo puedes gestionarlas o desactivarlas en tu navegador.",
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-12 md:py-20" aria-labelledby="cookies-title">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-slate-100 rounded-3xl p-6 md:p-12 shadow-sm">
        
        {/* Title */}
        <header className="border-b border-slate-100 pb-6 mb-8">
          <div className="flex items-center gap-2.5 text-indigo-600 mb-2">
            <Cookie className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider">Marco Legal</span>
          </div>
          <h1
            id="cookies-title"
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            Política de Cookies
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Última actualización: 11 de junio de 2026
          </p>
        </header>

        {/* Content */}
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <p>
            En <strong>Psicología Práctica</strong>, queremos informarte de manera transparente sobre el uso de cookies en nuestro portal, de conformidad con lo establecido en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
          </p>

          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pt-4">
            <ShieldAlert className="w-5 h-5 text-indigo-600" />
            1. ¿Qué son las Cookies?
          </h2>
          <p>
            Una cookie es un pequeño archivo de texto que se descarga en tu navegador (ordenador, dispositivo móvil, etc.) al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y facilitar la navegación.
          </p>

          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pt-4">
            <Settings className="w-5 h-5 text-indigo-600" />
            2. Tipos de Cookies que Utiliza este Portal
          </h2>
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-xs">a) Cookies Técnicas (Estrictamente Necesarias)</h3>
              <p className="text-xs text-slate-500">
                Son aquellas que permiten al usuario la navegación a través de una página web y la utilización de las diferentes opciones o servicios que en ella existan. Al no usar sistemas de login ni carritos de compra, nuestras cookies técnicas únicamente guardan variables de sesión temporales para optimizar la carga del portal y recordar si has aceptado o rechazado la barra informativa de cookies.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-xs">b) Cookies de Análisis Estadístico (Anónimas)</h3>
              <p className="text-xs text-slate-500">
                En caso de emplear herramientas de medición de visitas, estas cookies recopilan datos analíticos anónimos agregados (como país, páginas más visitadas y duración de la visita) para evaluar el rendimiento del sitio sin identificar en ningún momento al usuario.
              </p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pt-4">
            <Eye className="w-5 h-5 text-indigo-600" />
            3. Desactivación o Eliminación de Cookies
          </h2>
          <p>
            Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador. A continuación te facilitamos los enlaces de ayuda para los navegadores más habituales:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-500">
            <li>
              <strong>Google Chrome:</strong>{" "}
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                Configurar Cookies en Chrome
              </a>
            </li>
            <li>
              <strong>Mozilla Firefox:</strong>{" "}
              <a
                href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                Configurar Cookies en Firefox
              </a>
            </li>
            <li>
              <strong>Apple Safari:</strong>{" "}
              <a
                href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                Configurar Cookies en Safari
              </a>
            </li>
            <li>
              <strong>Microsoft Edge:</strong>{" "}
              <a
                href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-y-administrar-cookies-168dab11-0753-243d-7c16-ede5947fc64d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                Configurar Cookies en Edge
              </a>
            </li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            4. Modificaciones de la Política de Cookies
          </h2>
          <p>
            Es posible que modifiquemos esta Política de Cookies en función de nuevas exigencias legislativas, reglamentarias o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos (AEPD).
          </p>
        </div>

      </div>
    </main>
  );
}
