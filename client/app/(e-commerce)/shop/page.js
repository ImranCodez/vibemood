"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { withProductDefaults } from "../../../lib/catalog";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    fetch("http://localhost:8000/product/getproduct?limit=24")
      .then((response) => response.json())
      .then((result) => {
        setProducts((result.data?.prodcuts || []).map(withProductDefaults));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    ...new Set(
      products.map((product) => product.category?.name).filter(Boolean),
    ),
  ];
  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const categoryMatches =
        categoryFilter === "all" || product.category?.name === categoryFilter;
      const stock = (product.variants || []).reduce(
        (total, variant) => total + (variant.stock || 0),
        0,
      );
      const stockMatches =
        stockFilter === "all" ||
        (stockFilter === "available" ? stock > 0 : stock === 0);
      return categoryMatches && stockMatches;
    });
    return [...result].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [products, categoryFilter, stockFilter, sortBy]);

  return (
    <main className="bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e17000]">
              VibeMood collection
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate">
              All the good stuff
            </h1>
            <p className="mt-2 max-w-lg text-gray">
              Thoughtful essentials for your everyday rotation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            className="inline-flex items-center justify-center gap-2 border border-border bg-surface px-4 py-3 text-sm font-bold text-slate"
          >
            <SlidersHorizontal size={17} /> Filters
          </button>
        </div>
        {filtersOpen && (
          <div className="mt-5 grid gap-3 border border-border bg-surface p-4 sm:grid-cols-3 sm:p-5">
            <label className="text-xs font-bold uppercase tracking-widest text-gray">
              Category
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="mt-2 w-full border border-border bg-white p-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#e17000]"
              >
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold uppercase tracking-widest text-gray">
              Stock
              <select
                value={stockFilter}
                onChange={(event) => setStockFilter(event.target.value)}
                className="mt-2 w-full border border-border bg-white p-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#e17000]"
              >
                <option value="all">All stock</option>
                <option value="available">Available</option>
                <option value="soldout">Sold out</option>
              </select>
            </label>
            <label className="text-xs font-bold uppercase tracking-widest text-gray">
              Sort by
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="mt-2 w-full border border-border bg-white p-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#e17000]"
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price low to high</option>
                <option value="price-high">Price high to low</option>
                <option value="name">Name A-Z</option>
              </select>
            </label>
          </div>
        )}
        {loading && <p className="mt-8 text-gray">Loading the collection...</p>}
        {!loading && filteredProducts.length === 0 && (
          <p className="mt-8 text-gray">No products are available right now.</p>
        )}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
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
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white px-3 py-2 text-xs font-extrabold text-black shadow-sm transition hover:bg-[#e17000] hover:text-white"
                >
                  <ShoppingCart size={14} /> + Cart
                </Link>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e17000]">
                  {product.category?.name || "Collection"}
                </p>
                <h2 className="mt-2 text-lg font-extrabold text-slate">
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
