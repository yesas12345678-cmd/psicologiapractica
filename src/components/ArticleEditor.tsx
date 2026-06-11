"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye, Sparkles, Copy, Upload, ShoppingBag, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface Category {
  slug: string;
  name: string;
}

interface Article {
  slug: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  body: string;
  published: boolean;
  seoTitle: string;
}

interface ArticleEditorProps {
  article?: Article | null;
  categories: Category[];
}

export default function ArticleEditor({ article, categories }: ArticleEditorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<"content" | "amazon">("content");

  // Form states
  const getInitialDateTime = () => {
    if (article?.date) {
      return article.date.includes("T") ? article.date : `${article.date}T12:00`;
    }
    const now = new Date();
    const tzoffset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now.getTime() - tzoffset)).toISOString().slice(0, 16);
    return localISOTime;
  };

  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [seoTitle, setSeoTitle] = useState(article?.seoTitle || "");
  const [categorySlug, setCategorySlug] = useState(article?.categorySlug || categories[0]?.slug || "");
  const [date, setDate] = useState(getInitialDateTime());
  const [image, setImage] = useState(article?.image || "");
  const [excerpt, setExcerpt] = useState(article?.excerpt || "");
  const [body, setBody] = useState(article?.body || "");
  const [published, setPublished] = useState(article?.published !== undefined ? article.published : true);

  // Simulated Amazon links states
  const [amazonProduct, setAmazonProduct] = useState("");
  const [amazonLink, setAmazonLink] = useState("");

  // Feedback states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Slug generator
  const handleGenerateSlug = () => {
    if (!title) return;
    const clean = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents
      .replace(/[^a-z0-9 -]/g, "") // remove special chars
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-") // remove duplicate hyphens
      .trim();
    setSlug(clean);
  };

  // Copy title to SEO title
  const handleCopyTitle = () => {
    setSeoTitle(title.slice(0, 70));
  };

  // Upload handler
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setImage(data.url);
      } else {
        setError(data.error || "Error al subir la imagen");
      }
    } catch (err) {
      setError("Error de red al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  // Submit form
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!slug) {
      setError("El slug URL es obligatorio.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          title,
          categorySlug,
          excerpt,
          body,
          date,
          published,
          seoTitle,
          image,
          oldSlug: article?.slug || undefined, // track original slug for rename verification
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        if (!article) {
          // Redirect to edit page of the newly created article to avoid duplication on double click
          router.push(`/portal-clinico/editor/${slug}`);
        } else if (article.slug !== slug) {
          // If slug changed, redirect to new URL
          router.push(`/portal-clinico/editor/${slug}`);
        }
        router.refresh();
      } else {
        setError(data.error || "Ocurrió un error al guardar");
      }
    } catch (err) {
      setError("Error de red. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/portal-clinico/dashboard")}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Dashboard
        </button>

        <h1 className="text-xl font-extrabold text-slate-900">
          {article ? "Editar Artículo" : "Redactar Nuevo Artículo"}
        </h1>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-800 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>¡Guardado con éxito!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => setActiveTab("content")}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
            activeTab === "content"
              ? "border-teal-700 text-teal-700"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          ARTICLE CONTENT
        </button>
        <button
          onClick={() => setActiveTab("amazon")}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
            activeTab === "amazon"
              ? "border-teal-700 text-teal-700"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          AMAZON LINKS
        </button>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
        
        {/* TAB 1: ARTICLE CONTENT */}
        {activeTab === "content" && (
          <div className="space-y-5">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Título del Artículo</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escribe un título llamativo y optimizado"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 font-semibold"
              />
            </div>

            {/* Meta Title and copy button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">SEO Meta-Title</label>
                  <span className="text-[10px] text-slate-400">{seoTitle.length}/70 caracteres</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={70}
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Meta-título personalizado para las búsquedas de Google"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleCopyTitle}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Copiar título principal"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copiar
                  </button>
                </div>
              </div>

              {/* Slug with clean URL generator */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">URL Slug</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="ej: sindrome-burnout-sintomas"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateSlug}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Generar slug automática"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    Generar
                  </button>
                </div>
              </div>
            </div>

            {/* Category selection and publication date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Categoría</label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900"
                >
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Fecha de Publicación</label>
                <input
                  type="datetime-local"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Cover Image URL and upload button */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Imagen de Portada (URL)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Introduce la URL de la imagen o utiliza el botón Upload"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleUploadFile}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5" />
                  {uploading ? "Subiendo..." : "UPLOAD"}
                </button>
              </div>
              {/* Dynamic live image preview */}
              {image && (
                <div className="relative h-44 w-full max-w-md bg-slate-100 rounded-xl overflow-hidden border border-slate-100">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Extracto Breve (Tarjetas)</label>
              <textarea
                required
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Escribe una pequeña síntesis de 2-3 líneas para la vista previa en el portal..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900"
              />
            </div>

            {/* Body */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Cuerpo del Artículo (formato HTML)</label>
              <textarea
                required
                rows={12}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Escribe el cuerpo del artículo utilizando etiquetas HTML (como <h2>, <p>, <ul>, <li>, <strong>, etc.)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 font-mono"
              />
            </div>

            {/* Published State */}
            <div className="flex items-center gap-2.5 pt-2">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded text-teal-700 border-slate-300 focus:ring-teal-500 cursor-pointer"
              />
              <label htmlFor="published" className="text-xs font-bold text-slate-750 cursor-pointer">
                Publicar directamente en la web (si está desactivado se guardará como borrador)
              </label>
            </div>
          </div>
        )}

        {/* TAB 2: AMAZON LINKS (SIMULATED) */}
        {activeTab === "amazon" && (
          <div className="space-y-5">
            <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl space-y-1.5 text-xs text-amber-900">
              <span className="font-bold block">Configuración de Afiliación de Amazon (Simulado)</span>
              <p className="leading-relaxed text-slate-655">
                Esta sección te permite configurar los enlaces de afiliación para productos de recomendación médica/psicológica (como libros, agendas de mindfulness, etc.) que se enlazan de forma dinámica en los artículos.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Nombre del Producto</label>
                <input
                  type="text"
                  value={amazonProduct}
                  onChange={(e) => setAmazonProduct(e.target.value)}
                  placeholder="ej: El fin de la ansiedad - Libro por Gio Zararri"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Enlace de Afiliado (Amazon Tagged Link)</label>
                <input
                  type="text"
                  value={amazonLink}
                  onChange={(e) => setAmazonLink(e.target.value)}
                  placeholder="ej: https://www.amazon.es/dp/123456789/?tag=psicologiapractica-21"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="border-t border-slate-100 pt-6 flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {loading ? "Guardando..." : "Guardar Artículo"}
          </button>
        </div>

      </form>
    </div>
  );
}
