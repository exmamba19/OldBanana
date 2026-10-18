import type { Category } from "@/lib/photos";

/** Category filter chips. `active` is the selected slug (undefined = All). */
export function CategoryTags({ categories, active, query }: { categories: Category[]; active?: string; query?: string }) {
  const href = (slug?: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (slug) params.set("category", slug);
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };
  const chip = (isActive: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition ${
      isActive ? "border-brand-600 bg-brand-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-brand-500 hover:text-brand-600"
    }`;

  return (
    <nav aria-label="Categories" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:justify-center">
      <a href={href()} className={chip(!active)}>
        All
      </a>
      {categories.map((c) => (
        <a key={c.slug} href={href(c.slug)} className={chip(active === c.slug)}>
          {c.name}
        </a>
      ))}
    </nav>
  );
}
