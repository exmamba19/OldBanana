import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdsterraBanner } from "@/components/ads/AdsterraBanner";
import { DirectLinkButton } from "@/components/ads/DirectLinkButton";
import { NativeBanner } from "@/components/ads/NativeBanner";
import { JsonLd } from "@/components/JsonLd";
import { PhotoGrid } from "@/components/PhotoGrid";
import { PhotoNav } from "@/components/PhotoNav";
import { PhotoViewer } from "@/components/PhotoViewer";
import { PhotoWidget } from "@/components/PhotoWidget";
import { ShareButtons } from "@/components/ShareButtons";
import { absoluteUrl } from "@/config/site";
import { getAdjacentPhotos, getAllPhotos, getPhoto, getRandomPhotos, getRelatedPhotos, getTrendingPhotos, toSummary } from "@/lib/photos";
import { breadcrumbSchema, imageObjectSchema } from "@/lib/seo";

type Params = Promise<{ id: string }>;

// Pre-render every photo page at build time; re-generate hourly so the
// "Random Photos" widget rotates. New ids are rendered on demand.
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllPhotos().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const photo = getPhoto((await params).id);
  if (!photo) return { title: "Photo not found", robots: { index: false } };

  const title = `${photo.title} — HD ${photo.categoryName} Photo`;
  const description = `${photo.caption} ${photo.story}`.slice(0, 158);
  const path = `/photo/${photo.id}`;
  const image = { url: photo.src, width: photo.width, height: photo.height, alt: photo.title };

  return {
    title,
    description,
    keywords: [...photo.tags, photo.categoryName, "HD photo", "free download"],
    alternates: { canonical: path },
    authors: [{ name: photo.photographer }],
    openGraph: {
      type: "article",
      title,
      description,
      url: path,
      images: [image],
      publishedTime: photo.publishedAt,
      authors: [photo.photographer],
      tags: photo.tags,
    },
    twitter: { card: "summary_large_image", title, description, images: [photo.src] },
    // Pinterest Rich Pins read the OpenGraph tags above.
    other: { "pinterest-rich-pin": "true" },
  };
}

export default async function PhotoPage({ params }: { params: Params }) {
  const photo = getPhoto((await params).id);
  if (!photo) notFound();

  const { prev, next, index, total } = getAdjacentPhotos(photo.id);
  const related = getRelatedPhotos(photo, 6);
  const trending = getTrendingPhotos(5, photo.id);
  const random = getRandomPhotos(5, `${photo.id}-${new Date().toISOString().slice(0, 13)}`, [photo.id, ...related.map((p) => p.id), ...trending.map((p) => p.id)]);
  const pageUrl = absoluteUrl(`/photo/${photo.id}`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <JsonLd
        data={[
          imageObjectSchema(photo),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: photo.categoryName, path: `/category/${photo.category}` },
            { name: photo.title, path: `/photo/${photo.id}` },
          ]),
        ]}
      />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <a href="/" className="hover:text-brand-600">Home</a>
        <span className="mx-2">/</span>
        <a href={`/category/${photo.category}`} className="hover:text-brand-600">{photo.categoryName}</a>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{photo.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* ------------------------------------------------ Main column */}
        <article className="min-w-0 space-y-6">
          <PhotoViewer src={photo.src} alt={`${photo.title} — ${photo.caption}`} width={photo.width} height={photo.height} />

          <PhotoNav prev={{ id: prev.id, title: prev.title }} next={{ id: next.id, title: next.title }} index={index} total={total} />

          {/* ============ ADSTERRA SLOT 4: NATIVE BANNER (below main image) ============ */}
          <NativeBanner className="rounded-2xl bg-white p-4 ring-1 ring-slate-200" />

          <header>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{photo.title}</h1>
            <p className="mt-2 text-lg text-slate-600">{photo.caption}</p>
          </header>

          {/* ============ ADSTERRA SLOT 6: DIRECT LINK CTAs ============
              Each button opens the Direct Link configured in src/config/ads.ts in
              a new tab and continues to its real destination in this tab. */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <DirectLinkButton
              slot="download"
              href={`/download/${photo.id}`}
              rel="nofollow"
              className="flex-1 rounded-xl bg-brand-600 px-6 py-4 text-center text-base font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
            >
              ⬇ Download HD Quality
              <span className="block text-xs font-medium text-white/80">
                {photo.width} × {photo.height} px · JPG
              </span>
            </DirectLinkButton>
            <DirectLinkButton
              slot="album"
              href={`/category/${photo.category}`}
              className="flex-1 rounded-xl bg-slate-900 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-slate-700"
            >
              🖼 View Full Album
              <span className="block text-xs font-medium text-white/70">All {photo.categoryName} photos</span>
            </DirectLinkButton>
          </div>

          <ShareButtons url={pageUrl} title={`${photo.title} — ${photo.caption}`} image={photo.src} />

          <section aria-labelledby="about-photo" className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 id="about-photo" className="mb-3 text-xl font-bold text-slate-900">About this photo</h2>
            <div className="space-y-4 leading-relaxed text-slate-700">
              {photo.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 text-sm sm:grid-cols-4">
              {[
                ["Photographer", photo.photographer],
                ["Location", photo.location],
                ["Camera", photo.camera],
                ["Settings", photo.settings],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{k}</dt>
                  <dd className="mt-0.5 font-medium text-slate-800">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-5 flex flex-wrap gap-2">
              {photo.tags.map((tag) => (
                <li key={tag}>
                  <a href={`/?q=${encodeURIComponent(tag)}`} rel="nofollow" className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700">
                    #{tag}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <PhotoNav prev={{ id: prev.id, title: prev.title }} next={{ id: next.id, title: next.title }} index={index} total={total} keyboard={false} />

          <section aria-labelledby="related">
            <h2 id="related" className="mb-4 text-xl font-bold text-slate-900">You May Also Like</h2>
            <PhotoGrid photos={related.map(toSummary)} priorityCount={0} adEvery={0} />
            <a href={`/category/${photo.category}`} className="mt-2 inline-block text-sm font-semibold text-brand-600 hover:underline">
              See all {photo.categoryName} photos →
            </a>
          </section>
        </article>

        {/* ------------------------------------------------ Sidebar */}
        <aside className="space-y-6">
          {/* Sidebar 300x250 — reuses the in-content banner key. */}
          <AdsterraBanner size="300x250" label="Sidebar" />
          <PhotoWidget title="🔥 Trending Images" photos={trending.map(toSummary)} />
          <PhotoWidget title="🎲 Random Photos" photos={random.map(toSummary)} moreHref="/random" moreLabel="Shuffle →" />
        </aside>
      </div>
    </div>
  );
}
