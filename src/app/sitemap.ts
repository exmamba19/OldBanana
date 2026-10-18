import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getAllPhotos, getCategories } from "@/lib/photos";

export default function sitemap(): MetadataRoute.Sitemap {
  const photos = getAllPhotos();
  return [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    ...getCategories().map((c) => ({ url: absoluteUrl(`/category/${c.slug}`), changeFrequency: "daily" as const, priority: 0.8 })),
    // `images` produces <image:image> entries (Google image sitemap extension).
    ...photos.map((p) => ({
      url: absoluteUrl(`/photo/${p.id}`),
      lastModified: p.publishedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: [p.src],
    })),
    { url: absoluteUrl("/license"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
