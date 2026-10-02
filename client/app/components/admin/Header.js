"use client";

export default function Header() {
  return (
    <header className="flex flex-col items-start justify-between gap-4 border-b border-[#E5E7EB] bg-[#F8F9FC] px-5 py-5 sm:flex-row sm:items-center sm:px-8">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#6C3FEA]">
          VibeMood admin
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate sm:text-3xl">
          Dashboard
        </h2>

        <p className="text-sm text-gray">Welcome back, Admin</p>
      </div>

      <div className="flex w-full items-center gap-4 sm:w-auto">
        <div className="relative min-w-0 flex-1 sm:w-64">
          <input
            placeholder="Search..."
            className="w-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm outline-none focus:border-[#6C3FEA]"
          />
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#101827] text-sm font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}
