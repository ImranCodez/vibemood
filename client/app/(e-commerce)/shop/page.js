"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { demoProducts, withProductDefaults } from "../../../lib/catalog";

export default function ShopPage() {
  const [products, setProducts] = useState(demoProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/product/getproduct?limit=24")
      .then((response) => response.json())
      .then((result) => {
        if (result.data?.prodcuts?.length)
          setProducts(result.data.prodcuts.map(withProductDefaults));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7042df]">
              VibeMood collection
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate">
              All the good stuff
            </h1>
            <p className="mt-2 max-w-lg text-gray">
              Thoughtful essentials for your everyday rotation.
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 border border-border bg-surface px-4 py-3 text-sm font-bold text-slate">
            <SlidersHorizontal size={17} /> Filters
          </button>
        </div>
        {loading && <p className="mt-8 text-gray">Loading the collection...</p>}
        {!loading && products.length === 0 && (
          <p className="mt-8 text-gray">No products are available right now.</p>
        )}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              className="group overflow-hidden bg-surface"
              key={product._id}
            >
              <div className="relative aspect-[0.84] overflow-hidden bg-gray-soft">
                <Link
                  href={`/productDetails/${product.slug}`}
                  aria-label={`View ${product.title}`}
                >
                  <img
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </Link>
                <Link
                  href={`/productDetails/${product.slug}`}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white px-3 py-2 text-xs font-extrabold text-black shadow-sm transition hover:bg-[#ef6c2f] hover:text-white"
                >
                  <ShoppingCart size={14} /> + Cart
                </Link>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7042df]">
                  {product.category?.name || "Collection"}
                </p>
                <h2 className="mt-2 text-lg font-extrabold text-[#172033]">
                  {product.title}
                </h2>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-extrabold text-slate">
                    ৳ {Number(product.price).toLocaleString()}
                  </span>
                  <Link
                    className="inline-flex items-center gap-1 text-sm font-semibold text-slate hover:underline"
                    href={`/productDetails/${product.slug}`}
                  >
                    View details <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
