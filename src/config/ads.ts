/**
 * ============================================================================
 *  ADSTERRA CONFIGURATION — the single place where ad codes live.
 * ============================================================================
 *
 *  Every value is read from a NEXT_PUBLIC_* environment variable (see
 *  .env.example). You can also paste the values directly into the strings
 *  below instead of using env vars, e.g.:
 *
 *      popunderSrc: "//pl12345678.profitablecpmrate.com/ab/cd/ef/abcdef.js",
 *
 *  How Adsterra snippets map onto these fields:
 *
 *  Popunder / Social Bar snippet:
 *      <script type='text/javascript' src='//plXXXX.host.com/aa/bb/cc/hash.js'></script>
 *      -> copy the src into popunderSrc / socialBarSrc
 *
 *  Banner snippet (728x90, 320x50, 300x250 ...):
 *      <script type="text/javascript">
 *        atOptions = { 'key' : 'abc123', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} };
 *      </script>
 *      <script type="text/javascript" src="//www.highperformanceformat.com/abc123/invoke.js"></script>
 *      -> copy 'abc123' into the matching banners.* key; the host goes into bannerHost
 *
 *  Native Banner snippet:
 *      <script async="async" data-cfasync="false" src="//plXXXX.host.com/KEY/invoke.js"></script>
 *      <div id="container-KEY"></div>
 *      -> copy the src into native.src and "container-KEY" into native.containerId
 *
 *  Direct Link:
 *      https://www.host.com/xyz?key=abcdef  -> directLinks.download / directLinks.album
 *
 *  An empty value disables that slot: nothing is loaded and (unless
 *  showPlaceholders is on) nothing is rendered, so the layout never depends
 *  on an ad being present.
 */

export type BannerSize = "728x90" | "320x50" | "300x250";

export const adsConfig = {
  /** Show labelled dashed boxes for empty slots (handy while setting up). */
  showPlaceholders: process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true",

  // 1. POPUNDER — loaded once in the root <head>, fires on the first click.
  popunderSrc: process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER_SRC || "",

  // 2. SOCIAL BAR — global floating unit, loaded at the end of <body>.
  socialBarSrc: process.env.NEXT_PUBLIC_ADSTERRA_SOCIALBAR_SRC || "",

  // 3 & 5. IFRAME BANNERS
  bannerHost: process.env.NEXT_PUBLIC_ADSTERRA_BANNER_HOST || "www.highperformanceformat.com",
  banners: {
    "728x90": process.env.NEXT_PUBLIC_ADSTERRA_BANNER_728X90_KEY || "", // header (desktop)
    "320x50": process.env.NEXT_PUBLIC_ADSTERRA_BANNER_320X50_KEY || "", // header (mobile)
    "300x250": process.env.NEXT_PUBLIC_ADSTERRA_BANNER_300X250_KEY || "", // in-grid, sidebar, download page
  } satisfies Record<BannerSize, string>,

  // 4. NATIVE BANNER — below the main image on /photo/[id].
  native: {
    src: process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SRC || "",
    containerId: process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID || "",
  },

  // 6. DIRECT LINKS — opened in a new tab when "Download HD" / "View Full Album" is clicked.
  directLinks: {
    download: process.env.NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_DOWNLOAD || "",
    album:
      process.env.NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_ALBUM ||
      process.env.NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_DOWNLOAD ||
      "",
  },
  /** Don't reopen the same Direct Link for this many minutes (per visitor). */
  directLinkCooldownMinutes: Number(process.env.NEXT_PUBLIC_DIRECT_LINK_COOLDOWN_MINUTES || 10),
} as const;

export type DirectLinkSlot = keyof typeof adsConfig.directLinks;

export const BANNER_DIMENSIONS: Record<BannerSize, { width: number; height: number }> = {
  "728x90": { width: 728, height: 90 },
  "320x50": { width: 320, height: 50 },
  "300x250": { width: 300, height: 250 },
};

/** Adsterra snippets use protocol-relative URLs ("//host/..."); force https. */
export function normalizeScriptUrl(src: string): string {
  if (!src) return "";
  if (src.startsWith("//")) return `https:${src}`;
  if (/^https?:\/\//.test(src)) return src;
  return `https://${src}`;
}
