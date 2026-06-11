import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://psicologiapractica.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/portal-clinico/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
