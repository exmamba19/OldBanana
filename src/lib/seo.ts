/** schema.org JSON-LD builders. */
import { absoluteUrl, siteConfig } from "@/config/site";
import type { Photo } from "./photos";

export function imageObjectSchema(photo: Photo) {
  const pageUrl = absoluteUrl(`/photo/${photo.id}`);
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${pageUrl}#image`,
    name: photo.title,
    caption: photo.caption,
    description: photo.description.split("\n\n")[0],
    contentUrl: photo.src,
    thumbnailUrl: photo.src,
    url: pageUrl,
    width: { "@type": "QuantitativeValue", value: photo.width, unitCode: "E37" },
    height: { "@type": "QuantitativeValue", value: photo.height, unitCode: "E37" },
    encodingFormat: "image/jpeg",
    uploadDate: photo.publishedAt,
    datePublished: photo.publishedAt,
    keywords: photo.tags.join(", "),
    genre: photo.categoryName,
    contentLocation: { "@type": "Place", name: photo.location },
    author: { "@type": "Person", name: photo.photographer },
    creator: { "@type": "Person", name: photo.photographer },
    creditText: photo.photographer,
    copyrightNotice: `© ${photo.photographer}`,
    license: absoluteUrl(siteConfig.licensePath),
    acquireLicensePage: absoluteUrl(siteConfig.licensePath),
    exifData: [
      { "@type": "PropertyValue", name: "Camera", value: photo.camera },
      { "@type": "PropertyValue", name: "Settings", value: photo.settings },
    ],
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/WatchAction",
      userInteractionCount: photo.views,
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.url}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function imageGallerySchema(name: string, path: string, photos: Photo[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    url: absoluteUrl(path),
    image: photos.map((p) => ({
      "@type": "ImageObject",
      name: p.title,
      caption: p.caption,
      contentUrl: p.src,
      url: absoluteUrl(`/photo/${p.id}`),
      creator: { "@type": "Person", name: p.photographer },
      creditText: p.photographer,
      license: absoluteUrl(siteConfig.licensePath),
      acquireLicensePage: absoluteUrl(siteConfig.licensePath),
    })),
  };
}
