"use client";

/**
 * ADSTERRA IFRAME BANNER (728x90, 320x50, 300x250, ...)
 *
 * Keys come from src/config/ads.ts. Each banner is rendered inside its own
 * sandbox-free srcDoc iframe because Adsterra's snippet relies on a global
 * `atOptions` variable — running two banners in the same document makes them
 * overwrite each other. Isolating each one fixes that and lets any number of
 * banners live on a page.
 *
 * The wrapper reserves the exact banner size, so the layout never shifts and
 * nothing breaks when the script is blocked (the box just stays empty).
 */
import { BANNER_DIMENSIONS, adsConfig, normalizeScriptUrl, type BannerSize } from "@/config/ads";
import { useInView } from "@/lib/useInView";
import { AdPlaceholder } from "./AdPlaceholder";

interface Props {
  size: BannerSize;
  /** Human-readable slot name shown on the placeholder. */
  label?: string;
  /** Only load the ad when it scrolls near the viewport (better viewability). */
  lazy?: boolean;
  className?: string;
}

function bannerDocument(key: string, width: number, height: number): string {
  const src = normalizeScriptUrl(`//${adsConfig.bannerHost}/${key}/invoke.js`);
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body>
<script type="text/javascript">atOptions = { 'key' : ${JSON.stringify(key)}, 'format' : 'iframe', 'height' : ${height}, 'width' : ${width}, 'params' : {} };</script>
<script type="text/javascript" src="${src}"></script>
</body></html>`;
}

export function AdsterraBanner({ size, label, lazy = true, className = "" }: Props) {
  const key = adsConfig.banners[size];
  const { width, height } = BANNER_DIMENSIONS[size];
  const { ref, inView } = useInView<HTMLDivElement>(lazy);

  if (!key) {
    if (!adsConfig.showPlaceholders) return null;
    return (
      <div className={`flex justify-center ${className}`}>
        <AdPlaceholder label={`${label ?? "Banner"} ${size}`} width={width} height={height} />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="mb-1 text-[10px] uppercase tracking-wider text-slate-400">Advertisement</span>
      <div ref={ref} className="sponsor-box overflow-hidden" style={{ width: `min(100%, ${width}px)`, height }}>
        {inView && (
          <iframe
            title={`Advertisement ${size}`}
            srcDoc={bannerDocument(key, width, height)}
            width={width}
            height={height}
            scrolling="no"
            style={{ border: 0, display: "block", maxWidth: "none" }}
          />
        )}
      </div>
    </div>
  );
}
