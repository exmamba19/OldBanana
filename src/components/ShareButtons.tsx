/** Social share links (no third-party scripts, so they work with ad blockers too). */
export function ShareButtons({ url, title, image }: { url: string; title: string; image: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${u}&media=${encodeURIComponent(image)}&description=${t}`, cls: "bg-[#E60023]" },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, cls: "bg-[#1877F2]" },
    { name: "Twitter", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, cls: "bg-black" },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, cls: "bg-[#229ED9]" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-slate-700">Share:</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={`${l.cls} rounded-full px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90`}
        >
          {l.name}
        </a>
      ))}
    </div>
  );
}
