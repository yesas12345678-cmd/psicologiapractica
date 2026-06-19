import { PrismaClient } from '../src/generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function generateSitemap() {
  console.log("Generando sitemap estático...");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://psicologiapractica.tech";

  // Static routes
  const staticRoutes = [
    "",
    "/articulos",
    "/aviso-legal",
    "/privacidad",
    "/cookies",
    "/sobre-nosotros",
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Add static routes
  for (const route of staticRoutes) {
    const priority = route === "" ? "1.0" : "0.6";
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${route}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  try {
    // 2. Add dynamic categories
    const categories = await prisma.category.findMany();
    for (const category of categories) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/${category.slug}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }

    // 3. Add dynamic articles
    const articles = await prisma.article.findMany({
      where: { published: true },
    });
    for (const article of articles) {
      let lastModifiedDate = new Date();
      if (article.date) {
        const parsed = new Date(article.date);
        if (!isNaN(parsed.getTime())) {
          lastModifiedDate = parsed;
        }
      }

      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/${article.categorySlug}/${article.slug}</loc>\n`;
      xml += `    <lastmod>${lastModifiedDate.toISOString()}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }
  } catch (err) {
    console.error("Error al consultar la base de datos:", err.message);
  }

  xml += `</urlset>\n`;

  const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`¡Sitemap estático guardado con éxito en: ${outputPath}!`);

  await prisma.$disconnect();
  await pool.end();
}

generateSitemap().catch(async (e) => {
  console.error("Error al generar el sitemap:", e);
  await prisma.$disconnect();
  await pool.end();
  process.exit(1);
});
