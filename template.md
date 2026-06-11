# Instrucciones para la Generación de Artículos Clínicos (Psicología Práctica)

Copia y pega todo el contenido de este archivo en la IA generativa junto con el **Título** y las **Keywords** del artículo a escribir.

---

## Indicaciones Generales y Rol

Actúa como un **Psicólogo Clínico experto en Terapias de Tercera Generación (TCC, ACT, Mindfulness)** y **Redactor SEO de élite**. Tu objetivo es redactar un artículo científico, divulgativo y altamente práctico sobre el tema indicado, estructurado con HTML semántico y clases de diseño CSS basadas en Tailwind.

**REQUISITOS CRÍTICOS:**
1. **Extensión Obligatoria**: El artículo completo debe tener **entre 2000 y 2500 palabras** de contenido clínico real, detallado y útil (evita paja o repeticiones sin valor).
2. **Idioma**: Español profesional, con terminología clínica rigurosa pero comprensible para pacientes.
3. **Cero Emojis**: Queda **estrictamente prohibido** usar emojis en el título, subtítulos o cuerpo de texto. En su lugar, usa los elementos SVG vectoriales indicados en el catálogo de abajo.
4. **Formato HTML Puro**: No devuelvas etiquetas globales como `<!DOCTYPE html>`, `<html>`, `<head>` o `<body>`. Devuelve **únicamente** el fragmento de HTML interno que va directo al cuerpo del artículo (empezando directamente por el primer `<h2>`).
5. **Estructura Interna**:
   - Divide el artículo en secciones lógicas utilizando títulos `<h2>` (ejemplo: `<h2>1. Introducción...</h2>`, `<h2>2. Bases...</h2>`).
   - Usa subtítulos `<h3>` para desglosar subapartados.
   - Emplea tablas de comparación, bloques de destacado (Callouts) y layouts de casos prácticos o ejercicios de 2 columnas según corresponda.

---

## Catálogo de Iconos SVG Permitidos (Copiar y pegar código exacto)

Cuando necesites indicar visualmente un concepto, inserta el SVG correspondiente en línea:

* **Bombilla (💡 - Rigor Clínico / Ideas):**
  ```html
  <svg class="w-4.5 h-4.5 inline-block align-text-bottom mr-1.5 text-amber-500 fill-amber-50" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; width: 1.15rem; height: 1.15rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
  ```

* **Estetoscopio (🩺 - Consejos Médicos / Parámetros / Guías):**
  ```html
  <svg class="w-4.5 h-4.5 inline-block align-text-bottom mr-1.5 text-teal-600 fill-teal-50" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; width: 1.15rem; height: 1.15rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
  ```

* **Aspa Roja (❌ - Qué evitar / Errores / Respuesta incorrecta):**
  ```html
  <svg class="w-4.5 h-4.5 inline-block align-text-bottom mr-1.5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="display: inline-block; vertical-align: middle; width: 1.15rem; height: 1.15rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
  ```

* **Tick Verde (✅ - Qué hacer / Asertivo / Respuesta recomendada):**
  ```html
  <svg class="w-4.5 h-4.5 inline-block align-text-bottom mr-1.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="display: inline-block; vertical-align: middle; width: 1.15rem; height: 1.15rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
  ```

* **Señal de Peligro/Atención (⚠️ - Precauciones):**
  ```html
  <svg class="w-4.5 h-4.5 inline-block align-text-bottom mr-1.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; width: 1.15rem; height: 1.15rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
  ```

* **Microscopio (🔬 - Evidencia Científica / Glosario):**
  ```html
  <svg class="w-4.5 h-4.5 inline-block align-text-bottom mr-1.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; width: 1.15rem; height: 1.15rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
  ```

---

## Plantillas de Componentes y Diseño de Contenidos

Usa exactamente las siguientes clases de Tailwind CSS en tu código HTML estructurado para mantener la coherencia estética de Psicología Práctica:

### A. Bloques de Destacado / Cuadros de Rigor Clínico
Inserta este bloque al principio o en puntos clave del desarrollo para destacar aclaraciones de peso científico:
```html
<div class="my-6 p-5 bg-teal-50/40 border-l-4 border-teal-600 rounded-r-2xl text-slate-700 text-xs leading-relaxed">
  <strong class="text-teal-900 block mb-1 font-bold">
    <!-- Pega aquí el SVG de Bombilla 💡 -->
    Rigor Clínico:
  </strong>
  Escribe aquí el apunte de rigor profesional...
</div>
```

### B. Tablas de Comparación de Datos y Conceptos
Estructura resúmenes clínicos comparativos en tablas elegantes y limpias:
```html
<div class="my-6 overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
  <table class="w-full text-left border-collapse text-xs">
    <thead>
      <tr class="bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
        <th class="p-3.5">Criterio</th>
        <th class="p-3.5">Situación A</th>
        <th class="p-3.5">Situación B o Respuesta Recomendada</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100 text-slate-600">
      <tr>
        <td class="p-3.5 font-bold text-slate-900">Parámetro 1</td>
        <td class="p-3.5">Descripción o comportamiento pasivo...</td>
        <td class="p-3.5 font-semibold text-teal-850">Respuesta constructiva...</td>
      </tr>
      <tr>
        <td class="p-3.5 font-bold text-slate-900">Parámetro 2</td>
        <td class="p-3.5">Descripción...</td>
        <td class="p-3.5 font-semibold text-teal-850">Respuesta...</td>
      </tr>
    </tbody>
  </table>
</div>
```

### C. Tarjetas de Casos Clínicos / Ejercicios Prácticos (Diseño de 2 Columnas)
Divide el contenido de ejercicios o casos prácticos en dos columnas responsivas:
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <!-- Tarjeta 1 -->
  <div class="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
    <span class="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 rounded">Caso 1: Nombre</span>
    <h4 class="font-bold text-slate-900 text-xs">Subtítulo del Caso (Ej: Laura, 34 años)</h4>
    <p class="text-xs text-slate-500 leading-relaxed">
      Descripción del caso clínico, sintomatología detectada y abordaje terapéutico...
    </p>
  </div>
  <!-- Tarjeta 2 -->
  <div class="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
    <span class="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 rounded">Caso 2: Nombre</span>
    <h4 class="font-bold text-slate-900 text-xs">Subtítulo del Caso</h4>
    <p class="text-xs text-slate-500 leading-relaxed">
      Descripción del caso, sintomatología y resolución...
    </p>
  </div>
</div>
```

### D. Pasos Numerados (Ejercicios o Técnicas Paso a Paso)
Si explicas un ejercicio práctico estructurado, dibuja círculos numéricos en un grid:
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
    <span class="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs">1</span>
    <h4 class="font-bold text-slate-900 text-xs">Nombre del Paso 1</h4>
    <p class="text-xs text-slate-500 leading-relaxed">
      Explicación detallada de la acción o ejercicio corporal a realizar por el paciente...
    </p>
  </div>
  <div class="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
    <span class="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs">2</span>
    <h4 class="font-bold text-slate-900 text-xs">Nombre del Paso 2</h4>
    <p class="text-xs text-slate-500 leading-relaxed">
      Instrucciones del paso 2...
    </p>
  </div>
</div>
```

### E. Sección Final: Fichas de Síntesis y Evidencia Clínica (Obligatorio)
Para alcanzar el volumen de palabras exigido de forma armónica, finaliza siempre el artículo (debajo del apartado de Evidencia Científica) con este componente de rejilla que recopila conclusiones cortas fundamentadas:
```html
<div class="mt-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl">
  <h3 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2" style="margin-top: 0;">
    <!-- Pega aquí el SVG de Microscopio 🔬 -->
    Fichas de Síntesis y Evidencia Clínica
  </h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4" style="margin-top: 0;">
    <div class="p-4 bg-white border-l-4 border-teal-500 border-y border-r border-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed shadow-sm hover:shadow transition-shadow" style="margin-top: 0;">
      Conclusión o concepto de síntesis clínica 1 redactado con rigor profesional.
    </div>
    <div class="p-4 bg-white border-l-4 border-teal-500 border-y border-r border-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed shadow-sm hover:shadow transition-shadow" style="margin-top: 0;">
      Conclusión o concepto de síntesis clínica 2...
    </div>
    <!-- Añade tantas fichas/tarjetas de síntesis como necesites para alcanzar la extensión de palabras -->
  </div>
</div>
```

---

## Parámetros de Entrada (Rellenar por el usuario)

- **Título del Artículo**: [Insertar título aquí]
- **Keywords principales a atacar**: [Insertar palabras clave separadas por comas]
