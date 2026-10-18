"use client";

import { useEffect, useState } from "react";

/** Short wait before the HD download button unlocks. */
export function DownloadCountdown({ seconds, downloadHref, fileName }: { seconds: number; downloadHref: string; fileName: string }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  if (left > 0) {
    return (
      <div className="mx-auto max-w-xs">
        <p className="text-sm font-medium text-slate-600">Preparing your HD file… {left}s</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-brand-600 transition-all duration-1000" style={{ width: `${((seconds - left) / seconds) * 100}%` }} />
        </div>
        <noscript>
          <a href={downloadHref} className="mt-4 inline-block font-semibold text-brand-600">Download now</a>
        </noscript>
      </div>
    );
  }

  return (
    <a
      href={downloadHref}
      download={fileName}
      rel="nofollow"
      className="inline-block rounded-xl bg-brand-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
    >
      ⬇ Download HD Image
    </a>
  );
}
