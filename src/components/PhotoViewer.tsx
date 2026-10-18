"use client";

/**
 * Main image + fullscreen lightbox with click-to-zoom.
 * The inline image is rendered by next/image (responsive, priority-loaded);
 * the lightbox shows the original full-resolution file.
 */
import Image from "next/image";
import { useCallback, useEffect, useState, type MouseEvent } from "react";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function PhotoViewer({ src, alt, width, height }: Props) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const close = useCallback(() => {
    setOpen(false);
    setZoom(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  function toggleZoom(e: MouseEvent<HTMLImageElement>) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%`);
    setZoom((z) => !z);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-slate-900"
        aria-label="Open full-size image"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
          sizes="(min-width: 1280px) 860px, (min-width: 1024px) 66vw, 100vw"
          className="mx-auto h-auto max-h-[80vh] w-auto max-w-full object-contain"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white opacity-90 backdrop-blur transition group-hover:opacity-100">
          🔍 Click to enlarge
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
            aria-label="Close"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- full original file on purpose */}
          <img
            src={src}
            alt={alt}
            onClick={toggleZoom}
            style={{ transformOrigin: origin }}
            className={`max-h-full max-w-full select-none object-contain transition-transform duration-300 ${zoom ? "scale-[2.2] cursor-zoom-out" : "cursor-zoom-in"}`}
          />
          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
            Click image to {zoom ? "zoom out" : "zoom in"} · Esc to close
          </p>
        </div>
      )}
    </>
  );
}
