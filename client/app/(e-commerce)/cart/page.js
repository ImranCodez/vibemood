import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  return (
    <main className="min-h-[60vh] bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <ShoppingBag className="text-slate" />
          <h1 className="text-3xl font-bold text-slate">Your cart</h1>
        </div>
        <div className="mt-8 rounded-xl border border-border bg-surface p-8 text-center sm:p-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-soft text-slate">
            <ShoppingBag size={28} />
          </div>
          <h2 className="mt-5 text-xl font-bold text-slate">
            Your cart is waiting
          </h2>
          <p className="mx-auto mt-2 max-w-md text-gray">
            Browse the collection and add pieces you love. Your selected items
            will appear here.
          </p>
          <Link
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate px-5 py-3 text-sm font-semibold text-text-light hover:bg-slate-light"
            href="/shop"
          >
            <ArrowLeft size={16} /> Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
