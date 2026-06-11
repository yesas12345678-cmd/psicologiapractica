import React from "react";
import { Metadata } from "next";
import { Scale, BookOpen, AlertCircle, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Aviso Legal y Condiciones de Uso | Psicología Práctica",
  description:
    "Aviso legal aplicable a las visitas y lectura de Psicología Práctica. Consulta las condiciones de uso, derechos de propiedad intelectual y exención de responsabilidad médica.",
  alternates: {
    canonical: "/aviso-legal",
  },
};

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-12 md:py-20" aria-labelledby="legal-title">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-slate-100 rounded-3xl p-6 md:p-12 shadow-sm">
        
        {/* Title */}
        <header className="border-b border-slate-100 pb-6 mb-8">
          <div className="flex items-center gap-2.5 text-indigo-600 mb-2">
            <Scale className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider">Cumplimiento Legal</span>
          </div>
          <h1
            id="legal-title"
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            Aviso Legal y Condiciones de Uso
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Última actualización: 11 de junio de 2026
          </p>
        </header>

        {/* Content */}
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pt-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            1. Información General del Sitio
          </h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa de los siguientes datos identificativos del portal:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-500 text-xs">
            <li><strong>Denominación social:</strong> Portal Nicho &ldquo;Psicología Práctica&rdquo;</li>
            <li><strong>Correo de contacto:</strong> legal@psicologiapractica.com</li>
            <li><strong>Actividad:</strong> Divulgación de artículos sobre psicología, desarrollo personal y salud mental.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pt-4">
            <AlertCircle className="w-5 h-5 text-indigo-600" />
            2. Condiciones de Uso y Acceso
          </h2>
          <p>
            El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación total de las cláusulas aquí especificadas. El usuario se compromete a hacer un uso adecuado de los contenidos, evitando la reproducción no autorizada de artículos o código del portal.
          </p>

          {/* MEDICAL DISCLAIMER */}
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pt-4 text-amber-600">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            3. Exención de Responsabilidad Profesional y Médica
          </h2>
          <div className="bg-amber-50/40 border border-amber-200/50 p-5 rounded-2xl">
            <p className="font-semibold text-slate-800 mb-2">
              Importante: No sustituye la consulta médica o psicológica
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Toda la información y las guías prácticas compartidas en <strong>Psicología Práctica</strong> tienen carácter puramente informativo. Los artículos no constituyen consejo diagnóstico ni planes de tratamiento clínico. La lectura del contenido del sitio no establece una relación de psicólogo-paciente de ninguna clase. Si sospecha que sufre algún trastorno o está atravesando una crisis emocional grave, debe consultar inmediatamente con un terapeuta habilitado o un médico psiquiatra.
            </p>
          </div>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            4. Propiedad Intelectual
          </h2>
          <p>
            Todos los textos, el diseño web, las ilustraciones y el código de programación son propiedad intelectual exclusiva del titular de Psicología Práctica o de sus respectivos licenciantes. Queda prohibida la reproducción, distribución o comunicación pública, total o parcial, del contenido sin autorización por escrito.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            5. Legislación Aplicable y Jurisdicción
          </h2>
          <p>
            Para la resolución de todas las controversias o cuestiones relacionadas con este sitio web, será de aplicación la legislación española, siendo competentes para la resolución de todos los conflictos derivados de su uso los Juzgados y Tribunales de Madrid (España).
          </p>
        </div>

      </div>
    </main>
  );
}
