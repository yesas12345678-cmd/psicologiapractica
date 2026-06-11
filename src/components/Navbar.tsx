"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Brain, Heart, Users, Sparkles, MessageCircleHeart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Add scroll class for sticky effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/ansiedad-burnout", label: "Ansiedad & Burnout", icon: Heart },
    { href: "/desarrollo-mindfulness", label: "Desarrollo & Mindfulness", icon: Sparkles },
    { href: "/relaciones-entorno", label: "Relaciones & Entorno", icon: Users },
    { href: "/terapia-salud-mental", label: "Terapia & Salud Mental", icon: MessageCircleHeart },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl md:text-2xl font-black tracking-tight text-slate-800 group"
              id="main-logo-link"
            >
              <div className="p-2 rounded-xl bg-teal-50 text-teal-700 group-hover:scale-105 transition-transform duration-200">
                <Brain className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <span className="flex flex-col leading-none">
                <span>Psicología</span>
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                  Práctica
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                  }`}
                  id={`nav-link-${link.href.replace("/", "")}`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action / EEAT Badge */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Link
              href="/sobre-nosotros"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200"
            >
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Revisado Clínicamente
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-teal-700 hover:bg-slate-50 focus:outline-none transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Abrir menú de navegación"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 border-b border-slate-100"
            : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-slate-100 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                }`}
                id={`mobile-nav-link-${link.href.replace("/", "")}`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 pb-2 border-t border-slate-100 mx-4">
            <Link
              href="/sobre-nosotros"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200"
            >
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Equipo Editorial & Revisores Médicos
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
