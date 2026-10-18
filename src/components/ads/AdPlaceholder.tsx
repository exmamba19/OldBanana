/** Dashed box shown for an empty slot when NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true. */
export function AdPlaceholder({ label, width, height }: { label: string; width?: number; height?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-md border-2 border-dashed border-slate-300 bg-slate-50 text-center text-xs font-medium text-slate-400"
      style={{ width: width ? `min(100%, ${width}px)` : "100%", height: height ?? 120 }}
    >
      <span className="px-2">Adsterra slot · {label}</span>
    </div>
  );
}
