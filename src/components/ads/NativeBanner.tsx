"use client";

/**
 * NATIVE BANNER SLOT — placed directly below the main image on /photo/[id].
 *
 * Adsterra's native code is:
 *   <script async="async" data-cfasync="false" src="//plXXXX.host.com/KEY/invoke.js"></script>
 *   <div id="container-KEY"></div>
 * Configure both values in src/config/ads.ts (native.src / native.containerId).
 * Use one native unit per page — the script looks up its container by id.
 */
import { useEffect, useRef } from "react";
import { adsConfig, normalizeScriptUrl } from "@/config/ads";
import { AdPlaceholder } from "./AdPlaceholder";

export function NativeBanner({ className = "" }: { className?: string }) {
  const { src, containerId } = adsConfig.native;
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!src || !containerId || !host) return;
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = normalizeScriptUrl(src);
    host.appendChild(script);
    return () => {
      script.remove();
    };
  }, [src, containerId]);

  if (!src || !containerId) {
    if (!adsConfig.showPlaceholders) return null;
    return (
      <div className={className}>
        <AdPlaceholder label="Native Banner (below image)" height={160} />
      </div>
    );
  }

  return (
    <div className={`sponsor-native ${className}`}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Recommended for you</p>
      <div id={containerId} />
      <div ref={hostRef} />
    </div>
  );
}
