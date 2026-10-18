/** Global site settings. Change the name/branding here. */
export const siteConfig = {
  name: "PixelVault",
  tagline: "High-resolution photos with stories behind them",
  description:
    "Browse thousands of free high-resolution photos with detailed captions — nature, travel, architecture, animals, food and abstract art. Download in HD quality.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_US",
  twitterHandle: "@pixelvault",
  /** Photos per page on the homepage / album grids. */
  pageSize: 12,
  /** An in-content 300x250 banner is inserted after every Nth grid item. */
  inGridAdEvery: 6,
  /** Optional: page explaining photo licensing (used in ImageObject schema). */
  licensePath: "/license",
} as const;

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
