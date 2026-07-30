import React from "react";
import { Metadata } from "next";
import { Mail, Clock, ShieldCheck, Heart } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Psicología Práctica",
  description:
    "Ponte en contacto con el equipo de Psicología Práctica. Resolveremos tus dudas, sugerencias o propuestas de colaboración.",
  alternates: {
    canonical: "/contacto",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-12 md:py-20" aria-labelledby="contact-title">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700">
            <Heart className="w-3.5 h-3.5" />
            Atención al Lector
          </span>
          <h1
            id="contact-title"
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
          >
            Ponte en Contacto con Nosotros
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            ¿Tienes alguna duda sobre nuestros artículos, una propuesta de colaboración o alguna sugerencia para mejorar el portal? Estaremos encantados de escucharte.
          </p>
        </header>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Info Column (left) */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight border-b border-slate-100 pb-3">
                Canales de Atención
              </h2>

              <div className="flex gap-4">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 w-fit h-fit mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Correo Institucional</h3>
                  <p className="text-xs text-teal-700 font-semibold pt-0.5">contacto@psicologiapractica.tech</p>
                  <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                    Escríbenos directamente o usa el formulario. Respondemos a todas las consultas de lectores.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 w-fit h-fit mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Tiempo de Respuesta</h3>
                  <p className="text-xs text-slate-600 font-medium pt-0.5">Menos de 48 horas hábiles</p>
                  <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                    Nuestro equipo editorial se esfuerza por responder de la forma más rápida y rigurosa posible.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 w-fit h-fit mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Garantía E-E-A-T</h3>
                  <p className="text-xs text-slate-600 font-medium pt-0.5">Tratamiento Seguro de Datos</p>
                  <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                    Tus datos personales se utilizarán estrictamente para dar respuesta a tu mensaje, bajo los estándares de la RGPD europea.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form Column (right) */}
          <div className="md:col-span-7">
            <ContactForm />
          </div>

        </div>

      </div>
    </main>
  );
}
