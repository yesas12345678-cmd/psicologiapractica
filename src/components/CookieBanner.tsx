"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, Settings, ShieldCheck, X, Check, BarChart2, ShieldAlert } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("psicologia_cookie_preferences");
    if (!savedPreferences) {
      setShowBanner(true);
    } else {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
        applyCookies(parsed);
      } catch (e) {
        setShowBanner(true);
      }
    }

    // Listen for custom event to reopen settings
    const handleReopen = () => {
      setShowBanner(true);
      setShowConfig(true);
    };

    window.addEventListener("open-cookie-settings", handleReopen);
    return () => {
      window.removeEventListener("open-cookie-settings", handleReopen);
    };
  }, []);

  const applyCookies = (prefs: CookiePreferences) => {
    // 1. Necessary cookies are always set (like the preference marker itself)
    const expiry = "; max-age=31536000; path=/; SameSite=Lax";
    document.cookie = `cookie_consent_necessary=accepted${expiry}`;

    // 2. Analytics
    if (prefs.analytics) {
      document.cookie = `cookie_consent_analytics=accepted${expiry}`;
      // Set a mock GA cookie to demonstrate it is set when accepted
      if (!getCookie("_ga_mock_id")) {
        const mockGaId = `GA1.2.${Math.floor(1000000000 + Math.random() * 9000000000)}.${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        document.cookie = `_ga_mock_id=${mockGaId}${expiry}`;
      }
    } else {
      // Delete analytics cookies
      deleteCookie("cookie_consent_analytics");
      deleteCookie("_ga_mock_id");
      deleteCookie("_ga");
      deleteCookie("_gid");
    }

    // 3. Marketing
    if (prefs.marketing) {
      document.cookie = `cookie_consent_marketing=accepted${expiry}`;
      if (!getCookie("_fb_pixel_mock")) {
        const mockFbId = `FB_PIXEL_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        document.cookie = `_fb_pixel_mock=${mockFbId}${expiry}`;
      }
    } else {
      // Delete marketing cookies
      deleteCookie("cookie_consent_marketing");
      deleteCookie("_fb_pixel_mock");
    }
  };

  const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
    // Also try with no domain and other path settings to be thorough
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  };

  const savePreferences = (newPrefs: CookiePreferences) => {
    localStorage.setItem("psicologia_cookie_preferences", JSON.stringify(newPrefs));
    setPreferences(newPrefs);
    applyCookies(newPrefs);
    setShowBanner(false);
    setShowConfig(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const allRejected = { necessary: true, analytics: false, marketing: false };
    savePreferences(allRejected);
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-white border border-slate-200/90 shadow-2xl rounded-2xl p-5 md:p-6 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 text-teal-600">
          <Cookie className="w-6 h-6 animate-pulse" />
          <h2 className="text-base font-bold text-slate-900">Configuración de Privacidad</h2>
        </div>
        <button
          onClick={() => setShowBanner(false)}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-lg"
          aria-label="Cerrar banner temporalmente"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {!showConfig ? (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Utilizamos cookies propias y de terceros para analizar el tráfico del portal, mejorar tu experiencia de navegación y recordar tus preferencias. Puedes aceptar todas las cookies, rechazarlas o configurar tus preferencias. Consulta nuestra{" "}
            <Link
              href="/cookies"
              className="text-teal-600 font-bold hover:underline hover:text-teal-700"
            >
              Política de Cookies
            </Link>{" "}
            para más detalles.
          </p>
          <div className="flex flex-col gap-2 pt-1">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAcceptAll}
                className="w-full py-2 px-3 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl shadow-sm transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Aceptar todas
              </button>
              <button
                onClick={handleRejectAll}
                className="w-full py-2 px-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
              >
                Rechazar todas
              </button>
            </div>
            <button
              onClick={() => setShowConfig(true)}
              className="text-center text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline py-1.5 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              Configurar preferencias
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 mb-3">
            Selecciona las categorías de cookies que deseas habilitar en tu dispositivo:
          </p>

          <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
            {/* Category: Necessary */}
            <div className="flex items-start justify-between gap-3 p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  Técnicas / Necesarias
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Permiten el correcto funcionamiento de la web, la sesión técnica y guardar tu configuración de cookies. No se pueden desactivar.
                </p>
              </div>
              <div className="flex items-center pt-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Siempre</span>
                <div className="w-8 h-4.5 bg-slate-300 rounded-full p-0.5 cursor-not-allowed">
                  <div className="w-3.5 h-3.5 bg-white rounded-full translate-x-3.5"></div>
                </div>
              </div>
            </div>

            {/* Category: Analytics */}
            <div className="flex items-start justify-between gap-3 p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                  <BarChart2 className="w-4 h-4 text-teal-600" />
                  Analíticas / Estadísticas
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Recopilan información completamente anónima del tráfico para medir qué secciones son las más visitadas y optimizar el portal.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
                }
                className="flex items-center pt-0.5 focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ${
                    preferences.analytics ? "bg-teal-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full transition-transform duration-200 ${
                      preferences.analytics ? "translate-x-3.5" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </button>
            </div>

            {/* Category: Marketing */}
            <div className="flex items-start justify-between gap-3 p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  Marketing y Anuncios
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Utilizadas para ofrecerte contenido adaptado, recomendaciones relevantes y perfiles de publicidad externa en redes asociadas.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setPreferences((prev) => ({ ...prev, marketing: !prev.marketing }))
                }
                className="flex items-center pt-0.5 focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ${
                    preferences.marketing ? "bg-teal-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full transition-transform duration-200 ${
                      preferences.marketing ? "translate-x-3.5" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleSaveCustom}
              className="w-2/3 py-2 px-3 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl shadow-sm transition-all text-center cursor-pointer"
            >
              Guardar selección
            </button>
            <button
              onClick={() => setShowConfig(false)}
              className="w-1/3 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all text-center cursor-pointer"
            >
              Atrás
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
