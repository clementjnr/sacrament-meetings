
export default function MeetingsLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-8 h-9 w-64 animate-pulse rounded bg-slate-200" />

      <div className="mb-8 h-12 w-full animate-pulse rounded-lg bg-slate-200" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-slate-200 bg-white p-6"
          >
            <div className="mb-4 h-5 w-3/4 rounded bg-slate-200" />
            <div className="mb-3 h-4 w-1/2 rounded bg-slate-200" />
            <div className="h-4 w-2/3 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
