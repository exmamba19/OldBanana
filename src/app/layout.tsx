import type { Metadata, Viewport } from "next";
import { HeaderBanner } from "@/components/ads/HeaderBanner";
import { PopunderScript, SocialBarScript } from "@/components/ads/GlobalAdScripts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: { type: "website", siteName: siteConfig.name, locale: siteConfig.locale },
  twitter: { card: "summary_large_image", site: siteConfig.twitterHandle },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  // Adsterra / Pinterest / Google site-verification meta tags can go here:
  // verification: { google: "...", other: { "p:domain_verify": "..." } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e11d48",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ============ ADSTERRA SLOT 1: POPUNDER (global <head>) ============
            Configure NEXT_PUBLIC_ADSTERRA_POPUNDER_SRC / src/config/ads.ts.
            Fires on the visitor's first click anywhere on the site. */}
        <PopunderScript />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* ============ ADSTERRA SLOT 3: HEADER BANNER (728x90 / 320x50) ============
            Sits above the main navigation. */}
        <HeaderBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* ============ ADSTERRA SLOT 2: SOCIAL BAR (global floating) ============
            Configure NEXT_PUBLIC_ADSTERRA_SOCIALBAR_SRC / src/config/ads.ts. */}
        <SocialBarScript />
      </body>
    </html>
  );
}
