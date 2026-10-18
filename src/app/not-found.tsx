export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">This photo wandered off</h1>
      <p className="mt-2 text-slate-600">It may have been moved or removed. Try another one:</p>
      <div className="mt-6 flex justify-center gap-3">
        <a href="/" className="rounded-full bg-brand-600 px-5 py-2 font-semibold text-white">Browse gallery</a>
        <a href="/random" rel="nofollow" className="rounded-full bg-slate-900 px-5 py-2 font-semibold text-white">Random photo</a>
      </div>
    </div>
  );
}
