import Link from "next/link";
import { ArrowRight, Heart, Package, UserRound } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-[60vh] bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray">
              Your space
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate">Profile</h1>
            <p className="mt-2 text-gray">
              Your orders, details, and saved pieces in one place.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate hover:underline"
            href="/signin"
          >
            Sign in to your account <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <section className="rounded-xl border border-border bg-surface p-6 md:col-span-2">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate text-text-light">
                <UserRound size={24} />
              </div>
              <div>
                <h2 className="font-bold text-slate">Welcome to VibeMood</h2>
                <p className="text-sm text-gray">
                  Sign in to view your personal profile.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                className="flex items-center justify-between rounded-lg border border-border p-4 text-sm font-semibold text-slate hover:border-slate"
                href="/cart"
              >
                <span className="flex items-center gap-3">
                  <Package size={18} /> My orders
                </span>
                <ArrowRight size={16} />
              </Link>
              <Link
                className="flex items-center justify-between rounded-lg border border-border p-4 text-sm font-semibold text-slate hover:border-slate"
                href="/shop"
              >
                <span className="flex items-center gap-3">
                  <Heart size={18} /> Wishlist
                </span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
          <aside className="rounded-xl bg-slate p-6 text-text-light">
            <p className="text-sm text-gray-light">Member benefit</p>
            <h2 className="mt-3 text-xl font-bold">Find your next favorite.</h2>
            <p className="mt-2 text-sm leading-6 text-gray-soft">
              Explore new arrivals selected for your everyday style.
            </p>
            <Link
              className="mt-6 inline-flex rounded-lg bg-text-light px-4 py-2 text-sm font-semibold text-slate"
              href="/shop"
            >
              Explore shop
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
