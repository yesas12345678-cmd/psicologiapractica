"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus("sending");

    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
      {status === "success" ? (
        <div className="text-center py-10 space-y-4">
          <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">¡Mensaje enviado con éxito!</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Gracias por ponerte en contacto con nosotros. Nuestro equipo editorial o de revisión clínica revisará tu mensaje y te responderá en un plazo máximo de 48 horas hábiles.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Nombre Completo
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. María García"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-800"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Correo Electrónico
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej. maria@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-800"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Mensaje o Consulta
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe tu consulta detalladamente aquí..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-800 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 bg-teal-700 hover:bg-teal-600 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {status === "sending" ? (
              <span>Enviando...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Mensaje</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
