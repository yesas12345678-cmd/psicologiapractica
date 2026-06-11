import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Award, Heart, CheckCircle2, GraduationCap, FileText } from "lucide-react";
import Avatar from "@/components/Avatar";

export const metadata: Metadata = {
  title: "Quiénes Somos y Rigor Editorial | Psicología Práctica",
  description:
    "Conoce al equipo editorial y médico detrás de Psicología Práctica. Descubre nuestras credenciales, metodología de revisión clínica y compromiso con el rigor científico.",
  alternates: {
    canonical: "/sobre-nosotros",
  },
};

export default function SobreNosotrosPage() {
  const reviewers = [
    {
      name: "Dr. Alejandro Gómez",
      role: "Psicólogo Clínico y Neuropsicólogo",
      credentials: "Colegiado Nº M-34521 (Colegio Oficial de la Psicología de Madrid)",
      education: "Doctor en Psicología Clínica (UCM) | Máster en Neuropsicología Cognitiva",
      bio: "Con más de 12 años de experiencia en consulta clínica y docencia universitaria. Especialista en trastornos del estado de ánimo, terapia de tercera generación y evaluación neuropsicológica.",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    },
    {
      name: "Dra. Laura Benítez",
      role: "Psiquiatra y Psicoterapeuta",
      credentials: "Colegiada Nº 282865431 (Ilustre Colegio de Médicos de Madrid)",
      education: "Licenciada en Medicina (UAM) | Especialidad en Psiquiatría del Adulto (Hospital Ramón y Cajal)",
      bio: "Médico psiquiatra dedicada a la integración del tratamiento farmacológico y la terapia conductual. Especialista en estrés laboral, trastorno límite de la personalidad y trauma complejo.",
      avatar: "https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=300",
    },
  ];

  const authors = [
    {
      name: "Elena Martínez",
      role: "Redactora de Salud Mental y Divulgadora",
      credentials: "Graduada en Psicología (UV)",
      bio: "Apasionada por la comunicación científica. Elena se encarga de revisar los últimos estudios de psicología y adaptarlos a un lenguaje comprensible y útil para el día a día.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 md:py-20" aria-labelledby="about-title">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Header */}
        <header className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600">
            <Award className="w-3.5 h-3.5" />
            Compromiso E-E-A-T
          </span>
          <h1
            id="about-title"
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
          >
            Quiénes Somos & Rigor Editorial
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            En <strong>Psicología Práctica</strong> creemos que el acceso a la información sobre salud mental debe ser riguroso, seguro y basado puramente en la evidencia científica. Por eso, nuestros contenidos son elaborados por profesionales y auditados clínicamente.
          </p>
        </header>

        {/* Clinical Review Team Section */}
        <section className="space-y-8 mb-20 shadow-sm bg-white p-6 md:p-10 border border-slate-100 rounded-3xl" id="review-team" aria-labelledby="review-team-title">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2
                id="review-team-title"
                className="text-2xl font-extrabold text-slate-900 tracking-tight"
              >
                Equipo de Revisión Clínica
              </h2>
              <p className="text-xs text-slate-500">
                Médicos y psicólogos colegiados que auditan la exactitud científica de nuestras publicaciones.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {reviewers.map((reviewer, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row gap-5 p-5 bg-slate-50/50 rounded-2xl border border-slate-100"
              >
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <Avatar src={reviewer.avatar} alt={reviewer.name} size={96} />
                </div>
                <div className="space-y-2.5 text-center sm:text-left flex-1">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
                      {reviewer.name}
                    </h3>
                    <p className="text-xs font-bold text-emerald-600">
                      {reviewer.role}
                    </p>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-center gap-1 justify-center sm:justify-start">
                      <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{reviewer.education}</span>
                    </p>
                    <p className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded inline-block">
                      {reviewer.credentials}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed pt-1.5 border-t border-slate-100">
                    {reviewer.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Team Section */}
        <section className="space-y-8 mb-20 shadow-sm bg-white p-6 md:p-10 border border-slate-100 rounded-3xl" aria-labelledby="editorial-team-title">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2
                id="editorial-team-title"
                className="text-2xl font-extrabold text-slate-900 tracking-tight"
              >
                Equipo de Redacción
              </h2>
              <p className="text-xs text-slate-500">
                Psicólogos y periodistas de salud especializados en divulgación empírica.
              </p>
            </div>
          </div>

          <div className="pt-4">
            {authors.map((author, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row gap-5 p-5 bg-slate-50/50 rounded-2xl border border-slate-100 max-w-xl"
              >
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <Avatar src={author.avatar} alt={author.name} size={80} />
                </div>
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {author.name}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600">
                      {author.role} &bull; <span className="text-slate-400 font-normal">{author.credentials}</span>
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed pt-1 border-t border-slate-100">
                    {author.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Policy / Review guidelines */}
        <section
          className="bg-white p-6 md:p-10 border border-slate-100 rounded-3xl shadow-sm space-y-6"
          id="editorial-policy"
          aria-labelledby="policy-title"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2
                id="policy-title"
                className="text-2xl font-extrabold text-slate-900 tracking-tight"
              >
                Política y Proceso Editorial
              </h2>
              <p className="text-xs text-slate-500">
                Cómo nos aseguramos de que cada artículo en Psicología Práctica sea digno de tu confianza.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Fuentes de Confianza</h4>
                  <p className="text-xs text-slate-500">
                    Únicamente citamos estudios académicos validados, bases de datos como PubMed, manuales diagnósticos oficiales (DSM-5 / CIE-11) y guías elaboradas por asociaciones profesionales líderes (como la APA).
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Proceso de Doble Revisión</h4>
                  <p className="text-xs text-slate-500">
                    Cada borrador pasa por dos filtros. Primero, nuestro editor valida la claridad y estructura pedagógica. Segundo, un profesional clínico certificado evalúa el rigor neurobiológico y la precisión psicológica.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Actualización Constante</h4>
                  <p className="text-xs text-slate-500">
                    La ciencia evoluciona. Nuestro equipo revisa y revalida periódicamente las guías publicadas para asegurar que sigan los últimos consensos de la comunidad de salud mental.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Ausencia de Conflicto de Intereses</h4>
                  <p className="text-xs text-slate-500">
                    No recibimos patrocinio de farmacéuticas ni promocionamos terapias pseudocientíficas. La imparcialidad científica es la base de nuestra línea editorial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
