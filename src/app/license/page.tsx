import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "License & Usage",
  description: `How you may use photos downloaded from ${siteConfig.name}.`,
  alternates: { canonical: "/license" },
};

/** Edit this page to match the real license of your photos. */
export default function LicensePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900">License &amp; Usage</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-slate-700">
        <p>Photos on {siteConfig.name} are free to download for personal use such as wallpapers, mood boards and inspiration.</p>
        <p>For commercial use, please credit the photographer named on each photo page and check any additional terms they provide.</p>
        <p>You may not sell unaltered copies of the photos or claim them as your own work.</p>
      </div>
    </div>
  );
}
