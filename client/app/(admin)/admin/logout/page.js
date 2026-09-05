import Link from "next/link";
import { LogOut } from "lucide-react";

export default function LogoutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <section className="w-full max-w-md rounded-xl border border-border bg-surface p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-soft text-slate">
          <LogOut size={24} />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate">Ready to leave?</h1>
        <p className="mt-2 text-sm leading-6 text-gray">
          This is a UI screen only. Connect your logout action here when
          authentication is ready.
        </p>
        <Link
          className="mt-6 inline-flex rounded-lg bg-slate px-5 py-3 text-sm font-semibold text-text-light hover:bg-slate-light"
          href="/admin"
        >
          Return to dashboard
        </Link>
      </section>
    </main>
  );
}
