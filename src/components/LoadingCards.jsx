export default function LoadingCards({ count = 4 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-slate-200/80 bg-white p-5.5 shadow-soft"
          aria-hidden="true"
        >
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-slate-100 ring-1 ring-slate-200/50" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/5 rounded-md bg-slate-100" />
              <div className="h-3 w-2/5 rounded-md bg-slate-100/70" />
            </div>
          </div>
          <div className="mt-4 flex gap-1.5">
            <div className="h-6 w-20 rounded-full bg-slate-100" />
            <div className="h-6 w-24 rounded-full bg-slate-100" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-slate-100/70" />
            <div className="h-3 w-4/5 rounded bg-slate-100/60" />
          </div>
          <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="h-4 w-20 rounded bg-slate-100" />
            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-xl bg-slate-100" />
              <div className="h-9 w-28 rounded-xl bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
