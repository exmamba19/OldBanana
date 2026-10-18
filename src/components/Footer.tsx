import { siteConfig } from "@/config/site";
import { getCategories } from "@/lib/photos";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-600 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-slate-900">{siteConfig.name}</p>
          <p className="mt-2">{siteConfig.tagline}.</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Albums</p>
          <ul className="mt-2 space-y-1">
            {getCategories().map((c) => (
              <li key={c.slug}>
                <a href={`/category/${c.slug}`} className="hover:text-brand-600">
                  {c.name} photos
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Explore</p>
          <ul className="mt-2 space-y-1">
            <li><a href="/" className="hover:text-brand-600">Latest photos</a></li>
            <li><a href="/random" rel="nofollow" className="hover:text-brand-600">Random photo</a></li>
            <li><a href="/license" className="hover:text-brand-600">License &amp; usage</a></li>
            <li><a href="/sitemap.xml" className="hover:text-brand-600">Sitemap</a></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {siteConfig.name}. All photos belong to their respective photographers.
      </p>
    </footer>
  );
}
