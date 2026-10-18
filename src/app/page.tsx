import type { Metadata } from "next";
import { CategoryTags } from "@/components/CategoryTags";
import { GalleryView } from "@/components/GalleryView";
import { JsonLd } from "@/components/JsonLd";
import { SearchBar } from "@/components/SearchBar";
import { siteConfig } from "@/config/site";
import { getCategories, getCategory, paginate, searchPhotos } from "@/lib/photos";
import { imageGallerySchema, websiteSchema } from "@/lib/seo";

type SearchParams = Promise<{ q?: string | string[]; category?: string | string[]; page?: string | string[] }>;

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

async function readParams(searchParams: SearchParams) {
  const sp = await searchParams;
  const q = first(sp.q)?.trim().slice(0, 100) || undefined;
  const categorySlug = first(sp.category);
  const category = categorySlug ? getCategory(categorySlug) : undefined;
  const page = Math.max(1, Number.parseInt(first(sp.page) ?? "1", 10) || 1);
  return { q, category, page };
}

function buildHref(params: { q?: string; category?: string; page?: number }) {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.category) qs.set("category", params.category);
  if (params.page && params.page > 1) qs.set("page", String(params.page));
  const s = qs.toString();
  return s ? `/?${s}` : "/";
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { q, category, page } = await readParams(searchParams);
  const suffix = page > 1 ? ` — Page ${page}` : "";
  if (q) {
    // Search result pages are thin/duplicate content: keep them out of the index.
    return { title: `“${q}” photos${suffix}`, robots: { index: false, follow: true } };
  }
  if (category) {
    // Canonicalise filtered views to the dedicated album page.
    return { title: `${category.name} Photos${suffix}`, alternates: { canonical: `/category/${category.slug}${page > 1 ? `?page=${page}` : ""}` } };
  }
  return {
    title: page > 1 ? `Latest HD Photos${suffix}` : undefined,
    alternates: { canonical: buildHref({ page }) },
    openGraph: { title: siteConfig.name, description: siteConfig.description, url: buildHref({ page }) },
  };
}

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const { q, category, page } = await readParams(searchParams);
  const photos = searchPhotos({ q, category: category?.slug });
  const current = paginate(photos, page, siteConfig.pageSize);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <JsonLd data={[websiteSchema(), imageGallerySchema(`${siteConfig.name} gallery`, buildHref({ q, category: category?.slug, page }), current.items)]} />

      <section className="mx-auto mb-8 max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {q ? <>Results for “{q}”</> : category ? <>{category.name} Photos</> : <>Free HD Photos &amp; Stories</>}
        </h1>
        <p className="mt-3 text-slate-600">
          {q
            ? `${photos.length} photo${photos.length === 1 ? "" : "s"} found${category ? ` in ${category.name}` : ""}.`
            : category
              ? category.blurb
              : siteConfig.description}
        </p>
        <div className="mt-6">
          <SearchBar defaultValue={q} category={category?.slug} />
        </div>
        <div className="mt-5">
          <CategoryTags categories={getCategories()} active={category?.slug} query={q} />
        </div>
      </section>

      <GalleryView
        photos={photos}
        page={page}
        hrefFor={(p) => buildHref({ q, category: category?.slug, page: p })}
        emptyMessage={q ? `No photos match “${q}”. Try another keyword.` : undefined}
      />
    </div>
  );
}
