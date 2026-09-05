"use client";

import Link from "next/link";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/product/getproduct?limit=24")
      .then((response) => response.json())
      .then((result) => setProducts(result.data?.prodcuts || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray">
              The collection
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate">
              Shop all pieces
            </h1>
            <p className="mt-2 max-w-lg text-gray">
              Thoughtful essentials for your everyday rotation.
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-semibold text-slate">
            <SlidersHorizontal size={17} /> Filters
          </button>
        </div>
        {loading && <p className="mt-8 text-gray">Loading the collection...</p>}
        {!loading && products.length === 0 && <p className="mt-8 text-gray">No products are available right now.</p>}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              className="group overflow-hidden rounded-xl border border-border bg-surface"
              key={product._id}
            >
              <div className="aspect-[4/5] overflow-hidden bg-gray-soft">
                <img
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  src={product.thumbnail}
                  alt={product.title}
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray">
                  {product.category?.name || "Collection"}
                </p>
                <h2 className="mt-2 text-lg font-bold text-slate">
                  {product.title}
                </h2>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-slate">${Number(product.price).toFixed(2)}</span>
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
