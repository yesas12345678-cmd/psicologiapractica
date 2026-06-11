import type { MetadataRoute } from "next";
import prisma from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://psicologiapractica.com";

  // Static routes
  const staticRoutes = [
    "",
    "/articulos",
    "/aviso-legal",
    "/privacidad",
    "/cookies",
    "/sobre-nosotros",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.6,
  }));

  try {
    // Dynamic categories
    const categories = await prisma.category.findMany();
    const categoryRoutes = categories.map((category) => ({
      url: `${baseUrl}/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // Dynamic articles
    const articles = await prisma.article.findMany({
      where: { published: true },
    });
    const articleRoutes = articles.map((article) => {
      let lastModifiedDate = new Date();
      // Try to parse article date (YYYY-MM-DD)
      if (article.date) {
        const parsed = new Date(article.date);
        if (!isNaN(parsed.getTime())) {
          lastModifiedDate = parsed;
        }
      }

      return {
        url: `${baseUrl}/${article.categorySlug}/${article.slug}`,
        lastModified: lastModifiedDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });

    return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
  } catch (error) {
    console.error("Failed to generate sitemap, returning static routes:", error);
    return staticRoutes;
  }
}
