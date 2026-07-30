const { Pool } = require('pg');

const connectionString = "postgresql://postgres:a1sznyajzq3swl3t@187.127.233.89:5432/postgres";
const pool = new Pool({ connectionString, ssl: false });

const QUERY_MAP = {
  "ansiedad-burnout": ["burnout", "stress", "anxiety", "overwhelmed", "worry", "tiredness", "exhaustion", "tension", "calm"],
  "desarrollo-mindfulness": ["mindfulness", "meditation", "personal growth", "zen", "introspection", "serenity", "peaceful", "nature calm"],
  "relaciones-entorno": ["relationships", "friendship", "family support", "active listening", "empathy", "communication", "hug", "connection"],
  "terapia-salud-mental": ["psychotherapy", "mental health", "counseling", "therapy session", "psychology study", "support group", "clinical psychology"]
};

// Extract unique ID from Unsplash photo URL
function getPhotoId(url) {
  const match = url.match(/photo-([a-zA-Z0-9-]+)/);
  return match ? match[1] : url;
}

async function main() {
  console.log("Iniciando redistribución completa de imágenes sin repetición...");
  const client = await pool.connect();
  
  try {
    // 1. Obtener todos los artículos de la base de datos (usando slug como identificador principal)
    const res = await client.query('SELECT slug, "categorySlug" FROM "Article"');
    const articles = res.rows;
    console.log(`Total artículos a procesar: ${articles.length}`);

    // 2. Poblar el pool de imágenes únicas de Unsplash por categoría
    const categoryPools = {
      "ansiedad-burnout": [],
      "desarrollo-mindfulness": [],
      "relaciones-entorno": [],
      "terapia-salud-mental": []
    };

    const globalUsedIds = new Set();

    for (const [category, queries] of Object.entries(QUERY_MAP)) {
      console.log(`Buscando imágenes únicas para la categoría: ${category}...`);
      const seenInPool = new Set();
      
      for (const query of queries) {
        try {
          const searchUrl = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=30`;
          const response = await fetch(searchUrl);
          if (response.ok) {
            const data = await response.json();
            if (data.results) {
              for (const photo of data.results) {
                const imgUrl = photo.urls.regular;
                
                // Skip premium / watermarked photos
                if (imgUrl.includes('plus.unsplash.com') || imgUrl.includes('premium_photo')) {
                  continue;
                }

                const photoId = getPhotoId(imgUrl);
                
                if (!seenInPool.has(photoId)) {
                  seenInPool.add(photoId);
                  const cleanUrl = imgUrl.split('?')[0] + "?w=800&auto=format&fit=crop&q=60";
                  categoryPools[category].push({ id: photoId, url: cleanUrl });
                }
              }
            }
          }
          // Pequeña pausa para evitar rate limit de red
          await new Promise(r => setTimeout(r, 100));
        } catch (err) {
          console.error(`Error buscando "${query}":`, err);
        }
      }
      console.log(`Categoría "${category}": se han cargado ${categoryPools[category].length} imágenes candidatas.`);
    }

    // 3. Asignar imágenes únicas a cada artículo sin que se repita NINGUNA en toda la web
    let updatedCount = 0;
    
    for (const article of articles) {
      const slug = article.slug;
      const cat = article.categorySlug;
      const poolList = categoryPools[cat] || [];
      
      let assigned = false;
      
      // Buscar la primera imagen de su categoría que no haya sido usada globalmente
      for (const candidate of poolList) {
        if (!globalUsedIds.has(candidate.id)) {
          globalUsedIds.add(candidate.id);
          
          await client.query(
            'UPDATE "Article" SET image = $1 WHERE slug = $2',
            [candidate.url, slug]
          );
          
          assigned = true;
          updatedCount++;
          break;
        }
      }
      
      // Si el pool de su categoría se queda corto, buscamos de otras categorías
      if (!assigned) {
        console.log(`¡Advertencia! El pool de la categoría "${cat}" se ha agotado. Buscando en otras categorías...`);
        for (const [otherCat, otherList] of Object.entries(categoryPools)) {
          for (const candidate of otherList) {
            if (!globalUsedIds.has(candidate.id)) {
              globalUsedIds.add(candidate.id);
              await client.query(
                'UPDATE "Article" SET image = $1 WHERE slug = $2',
                [candidate.url, slug]
              );
              assigned = true;
              updatedCount++;
              break;
            }
          }
          if (assigned) break;
        }
      }
      
      if (!assigned) {
        console.error(`Error: No se pudo encontrar una imagen única para el artículo ${slug}`);
      }
    }
    
    console.log(`¡Redistribución completada! Se han actualizado ${updatedCount} artículos con imágenes 100% únicas.`);
  } catch (err) {
    console.error("Error general de ejecución:", err);
  } finally {
    client.release();
  }
  await pool.end();
}

main();
