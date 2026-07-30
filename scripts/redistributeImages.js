const { Pool } = require('pg');

const connectionString = "postgresql://postgres:a1sznyajzq3swl3t@187.127.233.89:5432/postgres";
const pool = new Pool({ connectionString, ssl: false });

const CATEGORY_IMAGES = {
  "ansiedad-burnout": [
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1474418386616-3d234c28a96e?w=800&auto=format&fit=crop&q=60"
  ],
  "desarrollo-mindfulness": [
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60"
  ],
  "relaciones-entorno": [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1464998857633-50e59fbf2fe6?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1521791136368-1a8ac2749a1a?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60"
  ],
  "terapia-salud-mental": [
    "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1590250596386-414194011381?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1584515906207-52c616682c65?w=800&auto=format&fit=crop&q=60"
  ]
};

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

async function main() {
  console.log("Iniciando redistribución de imágenes en base de datos...");
  const client = await pool.connect();
  
  try {
    const res = await client.query('SELECT slug, "categorySlug" FROM "Article"');
    const articles = res.rows;
    console.log(`Total artículos encontrados: ${articles.length}`);

    let updatedCount = 0;
    for (const article of articles) {
      const slug = article.slug;
      const catSlug = article.categorySlug;

      const imgList = CATEGORY_IMAGES[catSlug] || CATEGORY_IMAGES["ansiedad-burnout"];
      const articleRng = seedRandom(slug);
      const selectedImg = imgList[Math.floor(articleRng() * imgList.length)];

      await client.query(
        'UPDATE "Article" SET image = $1 WHERE slug = $2',
        [selectedImg, slug]
      );
      updatedCount++;
    }
    console.log(`¡Redistribución completada! Se han actualizado ${updatedCount} artículos.`);
  } catch (err) {
    console.error("Error al actualizar imágenes:", err);
  } finally {
    client.release();
  }
  await pool.end();
}

main();
