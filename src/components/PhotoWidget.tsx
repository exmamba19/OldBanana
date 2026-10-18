import Image from "next/image";
import type { PhotoSummary } from "@/lib/photos";

/**
 * "Trending Images" / "Random Photos" widget.
 * layout="list" for sidebars, layout="strip" for bottom-of-page rows.
 */
export function PhotoWidget({
  title,
  photos,
  layout = "list",
  moreHref,
  moreLabel,
}: {
  title: string;
  photos: PhotoSummary[];
  layout?: "list" | "strip";
  moreHref?: string;
  moreLabel?: string;
}) {
  if (photos.length === 0) return null;
  return (
    <section className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        {moreHref && (
          <a href={moreHref} rel="nofollow" className="text-xs font-semibold text-brand-600 hover:underline">
            {moreLabel ?? "More"}
          </a>
        )}
      </div>
      {layout === "list" ? (
        <ol className="space-y-3">
          {photos.map((p, i) => (
            <li key={p.id}>
              <a href={`/photo/${p.id}`} className="group flex items-center gap-3">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  <Image src={p.src} alt={p.title} fill sizes="64px" className="object-cover transition group-hover:scale-110" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-800 group-hover:text-brand-600">
                    <span className="mr-1 text-slate-400">{i + 1}.</span>
                    {p.title}
                  </span>
                  <span className="block text-xs text-slate-500">
                    {p.categoryName} · {p.views.toLocaleString("en-US")} views
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {photos.map((p) => (
            <li key={p.id}>
              <a href={`/photo/${p.id}`} className="group block">
                <span className="relative block aspect-square overflow-hidden rounded-xl bg-slate-100">
                  <Image src={p.src} alt={p.title} fill sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw" className="object-cover transition group-hover:scale-105" />
                </span>
                <span className="mt-1.5 block truncate text-xs font-semibold text-slate-700 group-hover:text-brand-600">{p.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
