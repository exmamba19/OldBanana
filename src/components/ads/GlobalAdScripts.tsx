/**
 * GLOBAL ADSTERRA SCRIPTS — rendered once from the root layout.
 *
 *  - PopunderScript: goes inside <head>. Adsterra's popunder waits for the
 *    visitor's first click on the page and then opens the advertiser tab.
 *  - SocialBarScript: loaded after the page is interactive; it injects its
 *    own floating unit at the bottom/side of the viewport.
 *
 * Paste the script URLs into src/config/ads.ts (or the env vars). If they are
 * empty, or an ad blocker drops them, nothing else on the page depends on them.
 */
import Script from "next/script";
import { adsConfig, normalizeScriptUrl } from "@/config/ads";

export function PopunderScript() {
  if (!adsConfig.popunderSrc) return null;
  // Plain <script> so it lands in the server-rendered <head> exactly like Adsterra's snippet.
  return <script type="text/javascript" async data-cfasync="false" src={normalizeScriptUrl(adsConfig.popunderSrc)} />;
}

export function SocialBarScript() {
  if (!adsConfig.socialBarSrc) return null;
  return <Script id="adsterra-social-bar" strategy="afterInteractive" src={normalizeScriptUrl(adsConfig.socialBarSrc)} />;
}
