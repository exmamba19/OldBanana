import { Fragment } from "react";
import { siteConfig } from "@/config/site";
import type { PhotoSummary } from "@/lib/photos";
import { AdsterraBanner } from "./ads/AdsterraBanner";
import { PhotoCard } from "./PhotoCard";

/**
 * Pinterest-style masonry grid (CSS columns — no JS needed).
 * IN-CONTENT BANNER SLOT (300x250): inserted after every `adEvery`-th photo.
 */
export function PhotoGrid({ photos, adEvery = siteConfig.inGridAdEvery, priorityCount = 3 }: { photos: PhotoSummary[]; adEvery?: number; priorityCount?: number }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
      {photos.map((photo, i) => (
        <Fragment key={photo.id}>
          <PhotoCard photo={photo} priority={i < priorityCount} />
          {adEvery > 0 && (i + 1) % adEvery === 0 && i < photos.length - 1 && (
            <AdsterraBanner size="300x250" label="In-content" className="rounded-2xl bg-white py-3 ring-1 ring-slate-200" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
