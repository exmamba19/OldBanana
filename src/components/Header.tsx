/*
 * Navigation note: the site intentionally uses plain <a> tags instead of
 * next/link for gallery navigation. Every click is a full page load, which
 * re-runs the Adsterra scripts and produces fresh ad impressions per pageview.
 */
import { siteConfig } from "@/config/site";
import { getCategories } from "@/lib/photos";
import { SearchBar } from "./SearchBar";

export function Header() {
  const categories = getCategories();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <a href="/" className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">P</span>
          {siteConfig.name}
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 text-sm font-medium text-slate-600 lg:flex">
          {categories.map((c) => (
            <a key={c.slug} href={`/category/${c.slug}`} className="rounded-full px-3 py-1.5 hover:bg-slate-100 hover:text-slate-900">
              {c.name}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden w-64 md:block">
          <SearchBar compact />
        </div>
        <a
          href="/random"
          rel="nofollow"
          className="ml-auto shrink-0 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-600 md:ml-0"
        >
          🎲 Random
        </a>
      </div>
    </header>
  );
}
