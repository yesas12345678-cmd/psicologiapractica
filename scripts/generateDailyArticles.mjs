import pg from "pg";
const { Pool } = pg;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from local env files if they exist (.env.local, .env)
const envFiles = [".env.local", ".env", ".env.production"];
for (const file of envFiles) {
  try {
    const envPath = path.join(process.cwd(), file);
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      envContent.split("\n").forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const index = trimmed.indexOf("=");
          const key = trimmed.slice(0, index).trim();
          const val = trimmed.slice(index + 1).trim();
          process.env[key] = val;
        }
      });
      console.log(`[ENV] Cargadas variables desde: ${file}`);
    }
  } catch (e) {
    console.warn(`No se pudo leer ${file}:`, e.message);
  }
}

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:a1sznyajzq3swl3t@187.127.233.89:5432/postgres";
const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  console.error("ERROR: No se ha encontrado la variable DEEPSEEK_API_KEY.");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: false,
});

// Premium Unsplash images by category for Psychology and Mental Health
const CATEGORY_IMAGES = {
  "ansiedad-burnout": [
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=60", // Soft light, introspection
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60", // Calm, meditation
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=60", // Light through window
    "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&auto=format&fit=crop&q=60"  // Person relaxing
  ],
  "desarrollo-mindfulness": [
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60", // Zen stones
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60", // Yoga on beach
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=60", // Pathway in forest
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=60"  // Notebook/Journaling
  ],
  "relaciones-entorno": [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60", // People talking, warm tones
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=60", // Discussion, active listening
    "https://images.unsplash.com/photo-1464998857633-50e59fbf2fe6?w=800&auto=format&fit=crop&q=60", // Laughing, connections
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60"  // Hands holding, unity
  ],
  "terapia-salud-mental": [
    "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&auto=format&fit=crop&q=60", // Comfortable therapy space
    "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&auto=format&fit=crop&q=60", // Dialogue, professional setup
    "https://images.unsplash.com/photo-1590250596386-414194011381?w=800&auto=format&fit=crop&q=60", // Peaceful interior, plants
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60"  // Serenity
  ]
};

// Seedable random number generator (deterministic based on date)
function seedRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

// Date formatter in Spanish (e.g. "19 de junio de 2026")
function formatSpanishDate(d) {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

// Format date to YYYY-MM-DD
function formatISODate(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Clean HTML tag stripper to count words in the article text
function getWordCount(html) {
  if (!html) return 0;
  const plainText = html.replace(/<[^>]*>/g, " ");
  return plainText.trim().split(/\s+/).filter(Boolean).length;
}

// Cleaner/Extractor for JSON and HTML
function extractContentHTML(rawText, originalTitle, originalExcerpt) {
  try {
    let cleanJSON = rawText.trim();
    if (cleanJSON.startsWith("```")) {
      cleanJSON = cleanJSON
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/s, "")
        .trim();
    }
    const parsed = JSON.parse(cleanJSON);
    if (parsed && parsed.content) {
      return {
        title: parsed.title || originalTitle,
        meta_title: parsed.meta_title || parsed.metaTitle || originalTitle,
        meta_description: parsed.meta_description || parsed.metaDescription || originalExcerpt,
        excerpt: parsed.excerpt || originalExcerpt,
        content: parsed.content
      };
    }
  } catch (e) {
    // Fallback manual parse if JSON parsing fails
  }

  // Regex fallback
  const contentRegex = /"content"\s*:\s*"(.*)/s;
  const match = rawText.match(contentRegex);
  if (match && match[1]) {
    let contentStr = match[1].trim();
    let endIdx = -1;
    for (let j = 0; j < contentStr.length; j++) {
      if (contentStr[j] === '"' && (j === 0 || contentStr[j - 1] !== '\\')) {
        const sub = contentStr.slice(j + 1).trim();
        if (sub === "" || sub === "}" || sub.startsWith(",") || sub.startsWith('"')) {
          endIdx = j;
          break;
        }
      }
    }
    if (endIdx !== -1) {
      contentStr = contentStr.slice(0, endIdx);
    } else {
      contentStr = contentStr.replace(/["\}\,\s]+$/, "");
    }
    const unescapedHTML = contentStr
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '')
      .replace(/\\\\/g, '\\');

    let title = originalTitle;
    let meta_title = originalTitle;
    let meta_description = originalExcerpt;
    let excerpt = originalExcerpt;

    const titleMatch = rawText.match(/"title"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (titleMatch) title = titleMatch[1].replace(/\\"/g, '"');
    const metaTitleMatch = rawText.match(/"meta_title"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (metaTitleMatch) meta_title = metaTitleMatch[1].replace(/\\"/g, '"');
    const metaDescMatch = rawText.match(/"meta_description"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (metaDescMatch) meta_description = metaDescMatch[1].replace(/\\"/g, '"');
    const excerptMatch = rawText.match(/"excerpt"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (excerptMatch) excerpt = excerptMatch[1].replace(/\\"/g, '"');

    return {
      title,
      meta_title: meta_title || title,
      meta_description: meta_description || originalExcerpt,
      excerpt: excerpt || originalExcerpt,
      content: unescapedHTML
    };
  }

  const fallbackHTML = rawText
    .replace(/^```html\s*/i, "")
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/s, "")
    .trim();

  return {
    title: originalTitle,
    meta_title: originalTitle,
    meta_description: originalExcerpt,
    excerpt: originalExcerpt,
    content: fallbackHTML
  };
}

async function main() {
  console.log("=== CRON DE GENERACIÓN DIARIA DE ARTÍCULOS DE PSICOLOGÍA PRÁCTICA ===");

  const todayStr = formatISODate(new Date());

  // Generate deterministic random times for today using seedRandom
  const rng = seedRandom(todayStr);

  // Random hour 1: between 09:00 and 14:00 (5 hours window)
  const h1 = 9 + Math.floor(rng() * 5);
  const m1 = Math.floor(rng() * 60);
  const time1Str = `${String(h1).padStart(2, "0")}:${String(m1).padStart(2, "0")}`;

  // Random hour 2: between 15:00 and 21:00 (6 hours window)
  const h2 = 15 + Math.floor(rng() * 6);
  const m2 = Math.floor(rng() * 60);
  const time2Str = `${String(h2).padStart(2, "0")}:${String(m2).padStart(2, "0")}`;

  console.log(`[PLAN] Horas planificadas para hoy (${todayStr}):`);
  console.log(`  - Artículo 1: a partir de las ${time1Str}`);
  console.log(`  - Artículo 2: a partir de las ${time2Str}`);

  // Get current time
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeStr = `${String(currentHour).padStart(2, "0")}:${String(currentMinute).padStart(2, "0")}`;
  console.log(`[CRON] Hora actual del servidor: ${currentTimeStr}`);

  // 1. Get count of articles already published/created today
  console.log(">> Comprobando artículos ya publicados hoy...");
  const countRes = await pool.query('SELECT COUNT(*) FROM "Article" WHERE date = $1', [todayStr]);
  const countToday = parseInt(countRes.rows[0].count, 10);
  console.log(`[BD] Se han encontrado ${countToday} artículos publicados hoy (${todayStr}).`);

  let shouldGenerate = false;
  let articleIndex = 0;

  if (countToday === 0) {
    if (currentTimeStr >= time1Str) {
      shouldGenerate = true;
      articleIndex = 1;
    } else {
      console.log(`[CRON] Aún no es la hora para el primer artículo (${time1Str}).`);
    }
  } else if (countToday === 1) {
    if (currentTimeStr >= time2Str) {
      shouldGenerate = true;
      articleIndex = 2;
    } else {
      console.log(`[CRON] Ya hay 1 artículo. Aún no es la hora para el segundo artículo (${time2Str}).`);
    }
  } else {
    console.log(`[CRON] Ya se han publicado ${countToday} artículos hoy (límite diario de 2 alcanzado).`);
  }

  if (shouldGenerate) {
    console.log(`\n>> HORA DE GENERAR ARTÍCULO ${articleIndex}: Iniciando proceso de redacción...`);

    // 1. Get existing articles from DB to avoid duplicate topics
    console.log(">> Obteniendo artículos existentes para control de unicidad...");
    const existingRes = await pool.query('SELECT slug, title FROM "Article"');
    const existingArticles = existingRes.rows;
    console.log(`[BD] Encontrados ${existingArticles.length} artículos en base de datos.`);

    const existingTitlesList = existingArticles.map(a => ` - ${a.title}`).join("\n");

    // 2. Load template_general.md template
    const templatePath = path.join(process.cwd(), "template_general.md");
    if (!fs.existsSync(templatePath)) {
      console.error("ERROR: No se encuentra 'template_general.md' en la raíz del proyecto.");
      process.exit(1);
    }
    const templateContent = fs.readFileSync(templatePath, "utf-8");

    // 3. Propose a unique topic
    console.log(">> Solicitando propuesta de tema único a DeepSeek...");
    const promptPropuestas = `
Eres el director editorial de psicologiapractica.tech, un portal de divulgación científica en Español sobre psicología y salud mental.
Queremos publicar un artículo de blog altamente informativo y relevante.

Aquí está la lista de artículos que YA están en la web:
${existingTitlesList}

Por favor, propón UN tema completamente nuevo en español que no esté en la lista anterior.
Debes devolver la respuesta estrictamente como un objeto JSON con la siguiente estructura:
{
  "title": "Un título SEO muy atractivo y profesional sobre psicología o salud mental, sin emojis",
  "slug": "un-slug-amigable-para-la-url-ej-sindrome-impostor-como-superarlo",
  "excerpt": "Un resumen introductorio o excerpt de 2 líneas para la tarjeta de previsualización",
  "category_name": "Debe ser exactamente una de estas cuatro: 'Ansiedad y Burnout', 'Desarrollo Personal y Mindfulness', 'Relaciones y Entorno Social', 'Terapia y Salud Mental'",
  "category_slug": "Debe ser exactamente una de estas cuatro correspondientes: 'ansiedad-burnout', 'desarrollo-mindfulness', 'relaciones-entorno', 'terapia-salud-mental'",
  "read_time": "Lectura de X min (ej: '5 min de lectura')"
}
Devuelve únicamente el objeto JSON.
`;

    let prop = null;
    let propAttempts = 0;
    while (propAttempts < 3 && !prop) {
      propAttempts++;
      try {
        const res = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: "Eres un director editorial que responde estrictamente en JSON." },
              { role: "user", content: promptPropuestas }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
          })
        });

        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        const data = await res.json();
        const cleanJSON = data.choices[0].message.content.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/s, "").trim();
        const parsed = JSON.parse(cleanJSON);

        const slugNorm = parsed.slug.toLowerCase().trim();
        const isSlugDup = existingArticles.some(a => a.slug.toLowerCase().trim() === slugNorm);

        if (!isSlugDup) {
          prop = parsed;
        } else {
          console.warn(`[DUPLICADO] El slug propuesto '${parsed.slug}' ya existe en la BD. Reintentando...`);
        }
      } catch (err) {
        console.error("Error obteniendo propuesta:", err.message);
      }
    }

    if (!prop) {
      console.error("ERROR: No se pudo obtener una propuesta de tema única.");
      process.exit(1);
    }

    console.log(`[OK] Propuesta seleccionada: [${prop.category_name}] ${prop.title} (Slug: ${prop.slug})`);

    // 4. Generate the complete article
    const promptRedaccion = `
Plantilla de Instrucciones y Reglas de Formato:
${templateContent}

Parámetros de Entrada para este Artículo:
*   Título del Artículo: ${prop.title}
*   Categoría: ${prop.category_name}

REQUISITOS OBLIGATORIOS DE ESTRUCTURA Y LONGITUD (CRÍTICO):
Para garantizar que el artículo tenga estrictamente entre 2.000 y 3.000 palabras de texto real (sin contar etiquetas HTML) y nunca baje de 2.000 palabras bajo ninguna circunstancia, DEBES desarrollar con extrema amplitud y de forma muy extensa cada una de las siguientes secciones en el HTML del campo 'content':

1. INTRODUCCIÓN DETALLADA (mínimo 250 palabras): Pon en contexto el tema, antecedentes y relevancia actual en la psicología científica.
2. BASES CIENTÍFICAS Y NEUROBIOLOGÍA (mínimo 300 palabras): Explica detalladamente los mecanismos cerebrales, neurotransmisores, hormonas (como cortisol, serotonina) o teorías psicológicas clave.
3. DESARROLLO TÉCNICO Y SÍNTOMAS (mínimo 450 palabras): Explica de forma minuciosa las manifestaciones clínicas, conductuales y cognitivas de esta condición o tema.
4. ERRORES COMUNES Y EXCLUSIONES (mínimo 400 palabras): Detalla qué enfoques desadaptativos, mitos urbanos o errores de autoayuda comunes NO funcionan. Utiliza el bloque de alerta (ámbar) para llamar la atención del lector con explicaciones muy extensas.
5. PAUTAS Y EJERCICIOS PRÁCTICOS DE AUTOCUIDADO (mínimo 350 palabras): Recomendaciones clave y ejercicios paso a paso de corte cognitivo-conductual o mindfulness. Utiliza el bloque de recomendación (teal).
6. CASOS CLÍNICOS Y EJEMPLOS DE LA VIDA REAL (mínimo 450 palabras): Explica detalladamente al menos dos casos clínicos ilustrativos (ej: Laura, 34 años, Tomás, 41 años), sus síntomas iniciales, la intervención aplicada en terapia y su evolución detallada. Utiliza una grilla de tarjetas.
7. TABLA COMPARATIVA SEMÁNTICA (mínimo 250 palabras de texto descriptivo + tabla): Desarrolla un análisis comparativo y dibuja una tabla con estados de color semántico (Verde: Positivo/Eficiente, Amarillo: Moderado/Opcional, Rojo: Negativo/Excluido).
8. SECCIÓN DE PREGUNTAS FRECUENTES (FAQ) INTERACTIVA (mínimo 4 acordeones desplegables con <details>, con respuestas muy detalladas y explicativas de al menos 95 palabras cada una).
9. CONCLUSIÓN Y RECOMENDACIÓN FINAL DEL TERAPEUTA (mínimo 200 palabras): Un resumen formal sobre cómo actuar y cuándo buscar acompañamiento psicoterapéutico profesional.

Por favor, no resumas ni uses viñetas cortas. Desarrolla cada párrafo de forma sumamente extensa y completa para garantizar la máxima profundidad y superar ampliamente el límite mínimo de 2.000 palabras totales. Si el contenido de 'content' tiene menos de 2.000 palabras de texto real, tu respuesta será rechazada.
`;

    let finalResult = null;
    let attempt = 0;
    const maxAttempts = 3;
    let extraInstruction = "";

    while (attempt < maxAttempts) {
      try {
        attempt++;
        console.log(`  Intento ${attempt}: Conectando con DeepSeek para redactar el cuerpo...`);
        const res = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: "Eres un redactor experto en SEO y salud mental. Debes responder estrictamente en formato JSON." },
              { role: "user", content: promptRedaccion + extraInstruction }
            ],
            temperature: 0.5,
            max_tokens: 8000,
            response_format: { type: "json_object" }
          })
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`API Error (${res.status}): ${errText}`);
        }

        const data = await res.json();
        const rawContent = data.choices[0].message.content;
        const parsedResult = extractContentHTML(rawContent, prop.title, prop.excerpt);
        
        const wordCount = getWordCount(parsedResult.content);
        console.log(`  -> Intento ${attempt}: El artículo tiene ${wordCount} palabras de texto real.`);

        if (wordCount >= 2000) {
          finalResult = parsedResult;
          break;
        } else {
          console.warn(`  -> ADVERTENCIA: El artículo generado tiene menos de 2000 palabras (${wordCount}). Reintentando con instrucciones de expansión estrictas...`);
          extraInstruction = `\n\n[ATENCIÓN CRÍTICA: Tu redacción anterior contenía únicamente ${wordCount} palabras. Es obligatorio que el artículo tenga más de 2.200 palabras y nunca baje de 2.000 palabras. Por favor, reescribe el artículo con muchísima más profundidad: duplica la extensión de cada H2 y H3, añade más casos prácticos detallados, cita teorías psicológicas de renombre, detalla de forma sumamente exhaustiva las pautas y expande todas las explicaciones para superar ampliamente el límite mínimo de 2.000 palabras.]`;
        }
      } catch (err) {
        console.error(`  Error en intento ${attempt}:`, err.message);
        if (attempt < maxAttempts) {
          console.log("  Esperando 10 segundos antes de reintentar...");
          await new Promise(res => setTimeout(res, 10000));
        }
      }
    }

    if (!finalResult) {
      console.error(`[ERROR] No se pudo generar el artículo con la longitud suficiente para: ${prop.title}`);
      process.exit(1);
    }

    // Assign premium image from list
    const imgList = CATEGORY_IMAGES[prop.category_slug] || CATEGORY_IMAGES["ansiedad-burnout"];
    const randomImg = imgList[Math.floor(rng() * imgList.length)];

    const pubDate = new Date();
    const dateStr = todayStr;
    const dateLabelStr = formatSpanishDate(pubDate);

    // Save to database
    console.log(`  Guardando en la BD con fecha de publicación: ${dateStr} (${dateLabelStr})...`);

    await pool.query(
      `INSERT INTO "Article" (
        slug, "categorySlug", title, excerpt, 
        date, "dateLabel", "readingTime", image, 
        body, published, "seoTitle"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        body = EXCLUDED.body,
        "seoTitle" = EXCLUDED."seoTitle",
        date = EXCLUDED.date,
        "dateLabel" = EXCLUDED."dateLabel"`,
      [
        prop.slug,
        prop.category_slug,
        finalResult.title || prop.title,
        finalResult.excerpt || prop.excerpt,
        dateStr,
        dateLabelStr,
        prop.read_time,
        randomImg,
        finalResult.content,
        true, // Set directly to true (published) at scheduled time!
        finalResult.meta_title || prop.title
      ]
    );

    console.log(`[OK] Artículo guardado y publicado con éxito para slug: ${prop.slug}`);
  }

  await pool.end();
}

main().catch(async (err) => {
  console.error("Excepción general en el proceso del cron:", err);
  await pool.end();
});
