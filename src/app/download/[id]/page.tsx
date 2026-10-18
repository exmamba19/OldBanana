import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AdsterraBanner } from "@/components/ads/AdsterraBanner";
import { DownloadCountdown } from "@/components/DownloadCountdown";
import { PhotoWidget } from "@/components/PhotoWidget";
import { getPhoto, getRelatedPhotos, toSummary } from "@/lib/photos";

/**
 * Download interstitial: an extra pageview with its own ad slots, a short
 * countdown, then the real HD file. Not indexed (thin page).
 */
type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const photo = getPhoto((await params).id);
  return {
    title: photo ? `Download ${photo.title} (HD)` : "Download",
    robots: { index: false, follow: true },
  };
}

export default async function DownloadPage({ params }: { params: Params }) {
  const photo = getPhoto((await params).id);
  if (!photo) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-slate-200 sm:p-10">
        <div className="relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-xl bg-slate-100">
          <Image src={photo.src} alt={photo.title} fill sizes="160px" className="object-cover" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Download “{photo.title}”</h1>
        <p className="mt-2 text-sm text-slate-500">
          {photo.width} × {photo.height} px · by {photo.photographer}
        </p>

        {/* In-content 300x250 above the download button. */}
        <AdsterraBanner size="300x250" label="Download page" lazy={false} className="my-6" />

        <DownloadCountdown seconds={5} downloadHref={`/api/download/${photo.id}`} fileName={`${photo.id}.jpg`} />

        <a href={`/photo/${photo.id}`} className="mt-6 inline-block text-sm font-semibold text-brand-600 hover:underline">
          ← Back to photo
        </a>
      </div>

      <div className="mt-8">
        <PhotoWidget title="More photos you’ll love" layout="strip" photos={getRelatedPhotos(photo, 6).map(toSummary)} />
      </div>
    </div>
  );
}
