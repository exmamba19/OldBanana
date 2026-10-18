/** Plain GET form -> /?q=... (works without JavaScript, triggers a full page load). */
export function SearchBar({ defaultValue = "", category, compact = false }: { defaultValue?: string; category?: string; compact?: boolean }) {
  return (
    <form action="/" method="get" role="search" className="relative w-full">
      <label htmlFor={compact ? "q-compact" : "q"} className="sr-only">
        Search photos
      </label>
      <input
        id={compact ? "q-compact" : "q"}
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search photos, tags, places…"
        className={`w-full rounded-full border border-slate-200 bg-white pl-11 pr-24 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${
          compact ? "h-10 text-sm" : "h-14 text-base"
        }`}
      />
      {category && <input type="hidden" name="category" value={category} />}
      <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <button
        type="submit"
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-brand-600 px-4 font-semibold text-white transition hover:bg-brand-700 ${
          compact ? "h-7 text-xs" : "h-11 text-sm"
        }`}
      >
        Search
      </button>
    </form>
  );
}
