import Image from "next/image";
import type { PhotoSummary } from "@/lib/photos";

export function PhotoCard({ photo, priority = false }: { photo: PhotoSummary; priority?: boolean }) {
  const href = `/photo/${photo.id}`;
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg">
      <a href={href} className="relative block bg-slate-100" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
        <Image
          src={photo.src}
          alt={`${photo.title} — ${photo.caption}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          priority={priority}
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {photo.categoryName}
        </span>
      </a>
      <div className="p-4">
        <h3 className="font-semibold leading-snug text-slate-900">
          <a href={href} className="hover:text-brand-600">
            {photo.title}
          </a>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{photo.caption}</p>
        <a
          href={href}
          className="mt-3 inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-600"
        >
          View Full Image <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}
