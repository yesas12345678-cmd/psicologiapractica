"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Eye, Edit, Trash2, LogOut, CheckCircle, FileText, AlertCircle } from "lucide-react";

interface Article {
  slug: string;
  categorySlug: string;
  title: string;
  date: string;
  dateLabel: string;
  published: boolean;
  body: string;
  category: {
    name: string;
  };
  image: string;
}

interface DashboardListProps {
  initialDrafts: Article[];
  initialPublished: Article[];
}

const getKeywordsFromTitle = (title: string): string => {
  let clean = title.trim();
  
  // Remove parentheses (like (hipocondría))
  clean = clean.replace(/\s*\([^)]*\)/g, "");
  
  // 1. Split by colon if present
  if (clean.includes(":")) {
    clean = clean.split(":")[0].trim();
  }
  
  // 2. Remove common prefixes
  const prefixes = [
    /^[qQ]ué es la /i,
    /^[qQ]ué es el /i,
    /^[qQ]ué es /i,
    /^[cC]ómo /i,
    /^[cC]ómo la /i,
    /^[lL]as mejores /i,
    /^[lL]os mejores /i,
    /^[cC]ómo dejar de /i,
    /^[cC]ómo superar el /i,
    /^[cC]ómo hablar con tus /i,
    /^[cC]ómo hablar con tu /i,
    /^[cC]ómo ayudar a /i,
    /^[cC]ómo salir de la /i,
    /^[fF]amilia con un miembro con /i
  ];
  
  for (const prefix of prefixes) {
    if (prefix.test(clean)) {
      clean = clean.replace(prefix, "");
      break;
    }
  }
  
  // 3. Remove trailing clauses starting with specific prepositions or conjunctions
  const splitters = [
    / y cómo/i,
    / y por qué/i,
    / y qué/i,
    / que /i,
    / qué /i,
    / si /i,
    / sin /i,
    / paso a paso/i,
    / y padres/i,
    / tras/i
  ];
  
  for (const splitter of splitters) {
    const parts = clean.split(splitter);
    if (parts.length > 1) {
      clean = parts[0];
      break;
    }
  }
  
  return clean.trim().toLowerCase();
};

export default function DashboardList({ initialDrafts, initialPublished }: DashboardListProps) {
  const [drafts, setDrafts] = useState<Article[]>(initialDrafts);
  const [published, setPublished] = useState<Article[]>(initialPublished);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const getWordCount = (body: string) => {
    const text = body.replace(/<[^>]*>/g, " ");
    return text.trim().split(/\s+/).filter((w) => w.length > 0).length;
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/portal-clinico");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleDelete = async (slug: string, isPublished: boolean) => {
    setLoading(slug);
    setError("");

    try {
      const res = await fetch(`/api/admin/articles/${slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        if (isPublished) {
          setPublished((prev) => prev.filter((a) => a.slug !== slug));
        } else {
          setDrafts((prev) => prev.filter((a) => a.slug !== slug));
        }
        setDeleteConfirm(null);
      } else {
        const data = await res.json();
        setError(data.error || "Error al eliminar el artículo");
      }
    } catch (err) {
      setError("Error de conexión al eliminar");
    } finally {
      setLoading(null);
    }
  };

  const renderTable = (articlesList: Article[], isPublishedSection: boolean) => {
    if (articlesList.length === 0) {
      return (
        <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center text-slate-500 text-xs">
          No hay artículos en esta sección.
        </div>
      );
    }

    return (
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs text-slate-600">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
                <th className="p-4">Título</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Palabras</th>
                {!isPublishedSection && <th className="p-4">Datos para IA (Título + Keywords)</th>}
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {articlesList.map((article) => {
                const words = getWordCount(article.body);
                const isDeleting = loading === article.slug;
                const isConfirming = deleteConfirm === article.slug;

                return (
                  <tr key={article.slug} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 max-w-xs md:max-w-md">
                      <div className="flex items-center gap-3">
                        {article.image ? (
                          <div className="w-12 h-8 rounded-lg overflow-hidden border border-slate-200/60 bg-slate-50 flex-shrink-0 relative group shadow-sm">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-8 rounded-lg border border-slate-200/60 bg-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                        )}
                        <span className="font-bold text-slate-900 truncate" title={article.title}>
                          {article.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-slate-100 rounded-md font-semibold text-slate-600">
                        {article.category.name}
                      </span>
                    </td>
                    <td className="p-4 text-slate-550">{article.dateLabel}</td>
                    <td className="p-4 text-slate-600">{words} palabras</td>
                    {!isPublishedSection && (
                      <td className="p-4">
                        <div className="flex flex-col gap-1.5 min-w-[200px]">
                          <div className="text-[10px] text-slate-500 font-medium leading-normal">
                            Key: <span className="font-bold text-teal-850 bg-teal-50/70 px-1.5 py-0.5 rounded border border-teal-100/50">{getKeywordsFromTitle(article.title)}</span>
                          </div>
                          <button
                            onClick={() => {
                              const kw = getKeywordsFromTitle(article.title);
                              const textToCopy = `Título: ${article.title}\nKeywords a atacar: ${kw}`;
                              navigator.clipboard.writeText(textToCopy);
                              setCopiedSlug(article.slug);
                              setTimeout(() => setCopiedSlug(null), 2000);
                            }}
                            className="inline-flex items-center justify-center gap-1 w-max px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            {copiedSlug === article.slug ? "¡Copiado!" : "Copiar para IA"}
                          </button>
                        </div>
                      </td>
                    )}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Preview */}
                        <Link
                          href={`/${article.categorySlug}/${article.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg border border-slate-100 hover:border-slate-200 text-slate-500 hover:text-teal-700 bg-white shadow-sm transition-all"
                          title="Ver vista previa"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/portal-clinico/editor/${article.slug}`}
                          className="p-1.5 rounded-lg border border-slate-100 hover:border-slate-200 text-slate-500 hover:text-teal-750 bg-white shadow-sm transition-all"
                          title="Editar"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        {/* Delete Double Confirmation */}
                        {isConfirming ? (
                          <div className="flex items-center gap-1 bg-rose-50 border border-rose-100 p-0.5 rounded-lg animate-pulse">
                            <span className="text-[10px] text-rose-800 font-bold px-1.5">¿Eliminar?</span>
                            <button
                              onClick={() => handleDelete(article.slug, isPublishedSection)}
                              disabled={isDeleting}
                              className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] font-bold cursor-pointer"
                            >
                              Sí
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-[10px] font-bold cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(article.slug)}
                            className="p-1.5 rounded-lg border border-slate-100 hover:border-rose-200 hover:text-rose-750 text-slate-500 bg-white shadow-sm transition-all cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Panel de Control</h1>
          <p className="text-xs text-slate-500">Gestiona las publicaciones y borradores del portal.</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/portal-clinico/editor"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nuevo Artículo
          </Link>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-250 text-slate-655 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-800 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Drafts Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-slate-700">
          <FileText className="w-4 h-4 text-slate-450" />
          <h2 className="text-base font-bold text-slate-800">Borradores</h2>
        </div>
        {renderTable(drafts, false)}
      </div>

      {/* Published Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-teal-700">
          <CheckCircle className="w-4 h-4 text-teal-550" />
          <h2 className="text-base font-bold text-slate-800">Artículos Publicados</h2>
        </div>
        {renderTable(published, true)}
      </div>
    </div>
  );
}
