"use client";

/**
 * Slideshow navigation: Previous / Next photo with keyboard arrows.
 * Each step is a real page load with its own URL (= new pageview + ad impressions).
 */
import { useEffect } from "react";

interface NavPhoto {
  id: string;
  title: string;
}

export function PhotoNav({
  prev,
  next,
  index,
  total,
  keyboard = true,
}: {
  prev: NavPhoto;
  next: NavPhoto;
  index: number;
  total: number;
  /** Bind ← / → keys. Enable on only one instance per page. */
  keyboard?: boolean;
}) {
  useEffect(() => {
    if (!keyboard) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]") || document.querySelector("[role=dialog]")) return;
      if (e.key === "ArrowLeft") window.location.href = `/photo/${prev.id}`;
      if (e.key === "ArrowRight") window.location.href = `/photo/${next.id}`;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keyboard, prev.id, next.id]);

  const btn = "flex min-w-0 flex-1 flex-col rounded-xl px-4 py-3 ring-1 ring-slate-200 transition hover:ring-brand-500";
  return (
    <nav aria-label="Photo navigation" className="flex items-stretch gap-3">
      <a href={`/photo/${prev.id}`} rel="prev" className={`${btn} bg-white text-left`}>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">← Previous photo</span>
        <span className="truncate text-sm font-semibold text-slate-800">{prev.title}</span>
      </a>
      <span className="hidden shrink-0 self-center text-xs font-medium text-slate-400 sm:block">
        {index + 1} / {total}
      </span>
      <a href={`/photo/${next.id}`} rel="next" className={`${btn} bg-brand-600 text-right text-white hover:bg-brand-700`}>
        <span className="text-xs font-semibold uppercase tracking-wide text-white/70">Next photo →</span>
        <span className="truncate text-sm font-semibold">{next.title}</span>
      </a>
    </nav>
  );
}
