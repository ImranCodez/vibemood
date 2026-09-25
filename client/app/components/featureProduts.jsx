"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { withProductDefaults } from "../../lib/catalog";

const API_URL = "http://localhost:8000";

function ProductCard({ product }) {
  const price = product.price * (1 - (product.discountpercentage || 0) / 100);

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[0.84] overflow-hidden bg-[#e8e5de]">
        <Link
          href={`/productDetails/${product.slug}`}
          aria-label={`View ${product.title}`}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>
        {product.discountpercentage > 0 && (
          <span className="absolute left-3 top-3 bg-[#e17000] px-2.5 py-1 text-[11px] font-extrabold text-white">
            -{product.discountpercentage}%
          </span>
        )}
        <Link
          href={`/productDetails/${product.slug}`}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white px-3 py-2 text-xs font-extrabold text-black shadow-sm transition hover:bg-[#e17000] hover:text-white"
        >
          <ShoppingCart size={14} /> + Cart
        </Link>
      </div>
      <div className="pt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e17000]">
          {product.category?.name || "Collection"}
        </p>
        <Link href={`/productDetails/${product.slug}`}>
          <h3 className="mt-1.5 truncate text-sm font-extrabold text-[#151515] hover:text-[#e17000] sm:text-base">
            {product.title}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm font-extrabold sm:text-base">
            ৳ {Math.round(price).toLocaleString()}
          </span>
          {product.discountpercentage > 0 && (
            <span className="text-xs text-[#99958e] line-through">
              ৳ {Number(product.price).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_URL}/product/getproduct?limit=8`, {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((result) => {
        setProducts((result.data?.prodcuts || []).map(withProductDefaults));
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-[#e5e2dc] pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e17000]">
              Just dropped
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The latest pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-bold hover:text-[#e17000]"
          >
            Shop all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product._id || product.slug} product={product} />
          ))}
        </div>
        {products.length === 0 && (
          <p className="py-12 text-center text-sm text-[#77746f]">
            No products are available yet.
          </p>
        )}
      </div>
    </section>
  );
}
