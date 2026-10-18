import type { Photo } from "@/lib/photos";
import { getRandomPhotos, getTrendingPhotos, paginate, toSummary } from "@/lib/photos";
import { siteConfig } from "@/config/site";
import { Pagination } from "./Pagination";
import { PhotoGrid } from "./PhotoGrid";
import { PhotoWidget } from "./PhotoWidget";

/** Shared grid + pagination + bottom widgets used by the homepage and album pages. */
export function GalleryView({ photos, page, hrefFor, emptyMessage }: { photos: Photo[]; page: number; hrefFor: (page: number) => string; emptyMessage?: string }) {
  const result = paginate(photos, page, siteConfig.pageSize);
  const shownIds = result.items.map((p) => p.id);

  return (
    <>
      {result.items.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-slate-200">
          <p className="text-lg font-semibold text-slate-800">{emptyMessage ?? "No photos found."}</p>
          <a href="/" className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white">
            Browse all photos
          </a>
        </div>
      ) : (
        <PhotoGrid photos={result.items.map(toSummary)} />
      )}

      <Pagination page={result.page} totalPages={result.totalPages} hrefFor={hrefFor} />

      {/* Engagement loop: keep visitors clicking into more photo pages. */}
      <div className="mt-12 space-y-6">
        <PhotoWidget title="🔥 Trending Images" layout="strip" photos={getTrendingPhotos(6).map(toSummary)} />
        <PhotoWidget
          title="🎲 Random Photos"
          layout="strip"
          photos={getRandomPhotos(6, `${new Date().toISOString().slice(0, 13)}-${result.page}`, shownIds).map(toSummary)}
          moreHref="/random"
          moreLabel="Surprise me →"
        />
      </div>
    </>
  );
}
