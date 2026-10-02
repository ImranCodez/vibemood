"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaPlus, FaSearch, FaEdit } from "react-icons/fa";
import { useGetproductsQuery, useGetCategoriesQuery } from "../../services/api";

const EMPTY_PRODUCTS = [];

// const products = [
//   {
//     id: 1,
//     title: "Premium Oversized Hoodie",
//     // image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
//     category: "Men",
//     price: 2990,
//     stock: 120,
//     status: "Active",
//   },
//   {
//     id: 2,
//     title: "Classic Black T-Shirt",
//     // image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
//     category: "Men",
//     price: 1290,
//     stock: 85,
//     status: "Active",
//   },
//   {
//     id: 3,
//     title: "Cargo Jogger Pant",
//     // image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
//     category: "Men",
//     price: 2490,
//     stock: 32,
//     status: "Active",
//   },
//   {
//     id: 4,
//     title: "Denim Jacket",
//     // image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
//     category: "Men",
//     price: 4490,
//     stock: 0,
//     status: "Out of Stock",
//   },
//   {
//     id: 5,
//     title: "Women's Sweatshirt",
//     // image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400",
//     category: "Women",
//     price: 2190,
//     stock: 45,
//     status: "Active",
//   },
//   {
//     id: 6,
//     title: "Summer Polo Shirt",
//     // image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
//     category: "Men",
//     price: 1790,
//     stock: 15,
//     status: "Low Stock",
//   },
// ];

export default function ProductsPage() {
  const { data, isLoading, isError } = useGetproductsQuery({ limit: 100 });
  const { data: categoriesResponse } = useGetCategoriesQuery();
  const products = data?.data?.prodcuts || EMPTY_PRODUCTS;
  const categories = categoriesResponse?.data || [];
  const totalProducts = data?.data?.pagination?.totall ?? products.length;
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const outOfStockProducts = products.filter(
    (product) =>
      (product.variants || []).reduce(
        (total, variant) => total + (variant.stock || 0),
        0,
      ) === 0,
  ).length;
  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    const result = products.filter((product) => {
      const stock = (product.variants || []).reduce(
        (sum, variant) => sum + (variant.stock || 0),
        0,
      );
      const matchesTerm =
        !term ||
        `${product.title} ${product.slug}`.toLowerCase().includes(term);
      const matchesCategory =
        categoryFilter === "all" || product.category?.slug === categoryFilter;
      const status = stock === 0 ? "out" : stock < 10 ? "low" : "active";
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      return matchesTerm && matchesCategory && matchesStatus;
    });
    return result.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [products, search, categoryFilter, statusFilter, sortBy]);
  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:p-8">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#6C3FEA]">
            Catalog control
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101827]">
            Products
          </h1>
          <p className="mt-1 text-[#667085]">
            Manage all products in your store.
          </p>
        </div>

        <Link
          href="/admin/product/new"
          className="flex items-center gap-2 bg-[#6C3FEA] px-5 py-3 font-extrabold text-white transition hover:bg-[#101827]"
        >
          <FaPlus />
          Create Product
        </Link>
      </div>

      {/* Stats */}

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
          <h4 className="text-gray-500">Total Products</h4>
          <p className="mt-2 text-3xl text-gray-700 font-bold">
            {totalProducts}
          </p>
        </div>

        <div className="border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
          <h4 className="text-gray-500">Active</h4>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {products.length}
          </p>
        </div>

        <div className="border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
          <h4 className="text-gray-500">Out of Stock</h4>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {outOfStockProducts}
          </p>
        </div>

        <div className="border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
          <h4 className="text-gray-500">Categories</h4>
          <p className="mt-2 text-3xl font-bold text-gray-500 ">
            {categories.length}
          </p>
        </div>
      </div>

      {/* Search & Filters */}

      <div className="mb-6 flex flex-col gap-4 border border-[#E5E7EB] bg-white p-5 shadow-[0_8px_24px_rgba(16,24,39,0.04)] lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-96">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full border border-[#E5E7EB] py-3 pl-11 pr-4 outline-none text-gray-500 focus:border-[#6C3FEA]"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-lg border px-4 text-gray-500 py-3 outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border px-4 py-3 text-gray-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="out">Out of Stock</option>
            <option value="low">Low Stock</option>
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-lg border px-4 py-3 text-gray-500 outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price-low">Price Low</option>
            <option value="price-high">Price High</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>
      {/* Table */}

      <div className="overflow-hidden border border-[#E5E7EB] bg-white shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#F8F9FC]">
              <tr className="text-left">
                <th className="px-6 py-4 text-gray-500 ">Image</th>
                <th className="px-6 py-4 text-gray-500 ">Product</th>
                <th className="px-6 py-4 text-gray-500 ">Category</th>
                <th className="px-6 py-4 text-gray-500 ">Price</th>
                <th className="px-6 py-4 text-gray-500 ">Stock</th>
                <th className="px-6 py-4 text-gray-500 ">Status</th>
                <th className="px-6 py-4 text-gray-500 ">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td className="px-6 py-8 text-gray-500" colSpan={7}>
                    Loading products...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td className="px-6 py-8 text-red-700" colSpan={7}>
                    Could not load products.
                  </td>
                </tr>
              )}
              {!isLoading &&
                !isError &&
                filteredProducts.map((product) => {
                  const stock = (product.variants || []).reduce(
                    (total, variant) => total + (variant.stock || 0),
                    0,
                  );
                  const status =
                    stock === 0
                      ? "Out of Stock"
                      : stock < 10
                        ? "Low Stock"
                        : "Active";
                  return (
                    <tr
                      key={product._id}
                      className="border-t transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                          <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                            {/* ✅ FIX: Render Image only when image URL exists */}

                            <Image
                              src={product.thumbnail}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-500 ">
                        {product.title}
                      </td>

                      {/* ✅ FIX: Show category name instead of whole object */}
                      <td className="px-6 py-5 text-gray-500">
                        {product.category?.name}
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-500 ">
                        ৳ {product.price}
                      </td>
                      <td className="px-6 py-5 text-gray-500">{stock}</td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            status === "Active"
                              ? "bg-green-100 text-green-700"
                              : status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <Link
                          href={`/admin/product/${product.slug}/update`}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#6C3FEA] px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                        >
                          <FaEdit />
                          Update Product
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              {!isLoading && !isError && filteredProducts.length === 0 && (
                <tr>
                  <td className="px-6 py-8 text-gray-500" colSpan={7}>
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}

        <div className="flex flex-col items-center justify-between gap-4 border-t px-6 py-5 md:flex-row">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} loaded products of {totalProducts}{" "}
            total
          </p>
        </div>
      </div>
    </div>
  );
}
