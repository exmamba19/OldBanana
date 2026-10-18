"use client";

/**
 * HEADER BANNER SLOT — 728x90 on tablets/desktops, 320x50 on phones.
 * Rendered above the navigation in the root layout. Only one size is mounted
 * (decided after hydration) so you never pay for a hidden impression.
 */
import { useEffect, useState } from "react";
import { adsConfig } from "@/config/ads";
import { AdsterraBanner } from "./AdsterraBanner";

const enabled = adsConfig.showPlaceholders || Boolean(adsConfig.banners["728x90"] || adsConfig.banners["320x50"]);

export function HeaderBanner() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Nothing configured: render nothing at all instead of an empty strip.
  if (!enabled) return null;

  return (
    // The min-heights reserve the banner's space before hydration (no layout shift).
    <div className="flex min-h-[66px] w-full items-center justify-center bg-slate-100 py-2 md:min-h-[122px]">
      {isDesktop === null ? null : isDesktop ? (
        <AdsterraBanner size="728x90" label="Header" lazy={false} />
      ) : (
        <AdsterraBanner size="320x50" label="Header (mobile)" lazy={false} />
      )}
    </div>
  );
}
