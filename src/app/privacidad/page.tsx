import React from "react";
import { Metadata } from "next";
import { Eye, Shield, Lock, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad | Psicología Práctica",
  description:
    "Conoce cómo recopilamos, tratamos y protegemos tus datos personales, y nuestras políticas relativas a las cookies de navegación.",
  alternates: {
    canonical: "/privacidad",
  },
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-12 md:py-20" aria-labelledby="privacy-title">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-slate-100 rounded-3xl p-6 md:p-12 shadow-sm">
        
        {/* Title */}
        <header className="border-b border-slate-100 pb-6 mb-8">
          <div className="flex items-center gap-2.5 text-indigo-600 mb-2">
            <Shield className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider">Marco Legal</span>
          </div>
          <h1
            id="privacy-title"
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            Política de Privacidad
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Última actualización: 11 de junio de 2026
          </p>
        </header>

        {/* Content */}
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <p>
            En <strong>Psicología Práctica</strong>, la privacidad de nuestros visitantes es de extrema importancia para nosotros. Este documento de política de privacidad describe detalladamente los tipos de información personal que se recopila y registra, y cómo la utilizamos.
          </p>

          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pt-4">
            <Lock className="w-5 h-5 text-indigo-600" />
            1. Recopilación y Uso de Información
          </h2>
          <p>
            No solicitamos ni almacenamos datos de registro ni información de identificación personal para la lectura habitual del portal. Únicamente recopilamos información estadística no identificable (como tipo de navegador, proveedor de servicios de Internet, páginas de referencia/salida y número de clics) a través de archivos de registro del servidor para analizar tendencias y administrar el sitio.
          </p>

          {/* COOKIES SECTION */}
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pt-4">
            <Cookie className="w-5 h-5 text-indigo-600" />
            2. Cookies y Tecnologías de Seguimiento
          </h2>
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
            <p className="font-semibold text-slate-800">
              Información sobre el uso de cookies en este portal:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-500">
              <li>
                <strong>Cookies Técnicas:</strong> Utilizamos únicamente cookies técnicas esenciales para garantizar el correcto funcionamiento del sitio web y recordar sus preferencias de navegación.
              </li>
              <li>
                <strong>Análisis Estadístico:</strong> Podemos emplear herramientas de analítica web básicas y respetuosas con la privacidad para medir el tráfico del portal agregando datos de forma completamente anónima.
              </li>
              <li>
                <strong>Inhabilitación:</strong> En cualquier momento puede restringir, bloquear o borrar las cookies de este o cualquier otro sitio web utilizando la configuración de su navegador.
              </li>
            </ul>
          </div>

          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pt-4">
            <Shield className="w-5 h-5 text-indigo-600" />
            3. Proveedores de Publicidad y Google AdSense
          </h2>
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
            <p className="text-xs text-slate-600">
              Este sitio web puede utilizar <strong>Google AdSense</strong> y otros proveedores publicitarios asociados para mostrar anuncios cuando visitas nuestro portal. Para ello, se emplean cookies de publicidad de terceros:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-500">
              <li>
                <strong>Cookies de Google:</strong> Google, como proveedor asociado, utiliza cookies para publicar anuncios en este sitio web basándose en las visitas anteriores del usuario a este u otros sitios web de Internet.
              </li>
              <li>
                <strong>DoubleClick:</strong> El uso de la cookie de DoubleClick permite a Google y a sus socios presentar anuncios basados en las visitas del usuario a este portal y a otros sitios de la red.
              </li>
              <li>
                <strong>Gestión de publicidad personalizada:</strong> Puedes inhabilitar la publicidad personalizada de Google accediendo directamente a la <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Configuración de Anuncios de Google</a>. Adicionalmente, puedes desactivar el uso de cookies para publicidad personalizada de otros proveedores terceros visitando <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">AboutAds Choices</a>.
              </li>
            </ul>
          </div>

          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pt-4">
            <Eye className="w-5 h-5 text-indigo-600" />
            4. Control de Cookies por parte del Usuario
          </h2>
          <p>
            Si desea desactivar las cookies, puede hacerlo a través de las opciones de configuración de su navegador web individual. La información detallada sobre la gestión de cookies en navegadores específicos se puede encontrar en los sitios web respectivos de los navegadores (Chrome, Firefox, Safari, Edge, etc.).
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            5. Consentimiento
          </h2>
          <p>
            Al utilizar nuestro sitio web, usted acepta expresamente nuestra política de privacidad y está de acuerdo con sus términos y el uso de las cookies de conformidad con las opciones seleccionadas.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            6. Contacto
          </h2>
          <p>
            Si requiere más información o tiene alguna pregunta sobre nuestra política de privacidad, no dude en ponerse en contacto con nosotros a través del correo electrónico:{" "}
            <span className="font-mono text-indigo-600 font-bold">contacto@psicologiapractica.com</span>.
          </p>
        </div>

      </div>
    </main>
  );
}
