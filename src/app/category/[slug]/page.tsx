import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryTags } from "@/components/CategoryTags";
import { GalleryView } from "@/components/GalleryView";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import { getCategories, getCategory, paginate, searchPhotos } from "@/lib/photos";
import { breadcrumbSchema, imageGallerySchema } from "@/lib/seo";

/** "Full Album" page: /category/[slug]?page=N */
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ page?: string | string[] }>;

async function readPage(searchParams: SearchParams) {
  const raw = (await searchParams).page;
  return Math.max(1, Number.parseInt((Array.isArray(raw) ? raw[0] : raw) ?? "1", 10) || 1);
}

const hrefFor = (slug: string) => (page: number) => (page > 1 ? `/category/${slug}?page=${page}` : `/category/${slug}`);

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: SearchParams }): Promise<Metadata> {
  const category = getCategory((await params).slug);
  if (!category) return { title: "Album not found", robots: { index: false } };
  const page = await readPage(searchParams);
  const cover = searchPhotos({ category: category.slug })[0];
  const title = `${category.name} Photos — Free HD ${category.name} Images${page > 1 ? ` (Page ${page})` : ""}`;
  return {
    title,
    description: `${category.blurb} Browse and download free high-resolution ${category.name.toLowerCase()} photos on ${siteConfig.name}.`,
    alternates: { canonical: hrefFor(category.slug)(page) },
    openGraph: { title, url: hrefFor(category.slug)(page), images: cover ? [{ url: cover.src, width: cover.width, height: cover.height }] : undefined },
  };
}

export default async function CategoryPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const category = getCategory((await params).slug);
  if (!category) notFound();
  const page = await readPage(searchParams);
  const photos = searchPhotos({ category: category.slug });
  const current = paginate(photos, page, siteConfig.pageSize);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <JsonLd
        data={[
          imageGallerySchema(`${category.name} Photos`, hrefFor(category.slug)(current.page), current.items),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: category.name, path: `/category/${category.slug}` },
          ]),
        ]}
      />
      <section className="mx-auto mb-8 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Album</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{category.name} Photos</h1>
        <p className="mt-3 text-slate-600">
          {category.blurb} {photos.length} high-resolution photos.
        </p>
        <div className="mt-5">
          <CategoryTags categories={getCategories()} active={category.slug} />
        </div>
      </section>
      <GalleryView photos={photos} page={page} hrefFor={hrefFor(category.slug)} />
    </div>
  );
}
