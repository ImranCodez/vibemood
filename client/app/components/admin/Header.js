"use client";

export default function Header() {
  return (
    <header className="flex flex-col items-start justify-between gap-4 border-b border-border bg-surface px-5 py-5 sm:flex-row sm:items-center sm:px-8">
      <div>
        <h2 className="text-2xl font-bold text-slate sm:text-3xl">Dashboard</h2>

        <p className="text-sm text-gray">Welcome back, Admin</p>
      </div>

      <div className="flex w-full items-center gap-4 sm:w-auto">
        <div className="relative min-w-0 flex-1 sm:w-64">
          <input
            placeholder="Search..."
            className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-slate"
          />
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate text-sm font-bold text-text-light">
          A
        </div>
      </div>
    </header>
  );
}
