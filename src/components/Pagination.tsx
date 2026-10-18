/** Numbered pagination with Previous/Next. Plain links => full reload => new ad impressions. */
export function Pagination({ page, totalPages, hrefFor }: { page: number; totalPages: number; hrefFor: (page: number) => string }) {
  if (totalPages <= 1) return null;

  const pages: Array<number | "…"> = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  const base = "grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold transition";
  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <a href={hrefFor(page - 1)} rel="prev" className={`${base} bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-brand-500`}>
          ← Previous
        </a>
      ) : null}
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-slate-400">
            …
          </span>
        ) : (
          <a
            key={p}
            href={hrefFor(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${base} ${p === page ? "bg-brand-600 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-brand-500"}`}
          >
            {p}
          </a>
        ),
      )}
      {page < totalPages ? (
        <a href={hrefFor(page + 1)} rel="next" className={`${base} bg-brand-600 text-white hover:bg-brand-700`}>
          Next →
        </a>
      ) : null}
    </nav>
  );
}
