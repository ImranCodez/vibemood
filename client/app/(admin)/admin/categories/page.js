"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useGetCategoriesQuery } from "../../services/api";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const categories = data?.data || [];
  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:p-8">
      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#6C3FEA]">
            Catalog control
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101827]">
            Categories
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your VibeMood product categories.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 bg-[#6C3FEA] px-5 py-3 font-extrabold text-white transition hover:bg-[#101827]"
        >
          <FaPlus />
          Add Category
        </Link>
      </div>

      {/* Search */}

      <div className="mb-6 border border-[#E5E7EB] bg-white p-5 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[#E5E7EB] py-3 pl-11 pr-4 outline-none focus:border-[#6C3FEA]"
          />
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden border border-[#E5E7EB] bg-white shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FC]">
              <tr className="text-left text-gray-600">
                <th className="px-6 py-4 ">Image</th>

                <th className="px-6 py-4 ">Category</th>

                <th className="px-6 py-4 ">Slug</th>

                <th className="px-6 py-4 ">Description</th>

                <th className="px-6 py-4 ">Status</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td className="px-6 py-8 text-gray-500" colSpan={5}>
                    Loading categories...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td className="px-6 py-8 text-red-700" colSpan={5}>
                    Could not load categories.
                  </td>
                </tr>
              )}
              {!isLoading &&
                !isError &&
                filtered.map((category) => (
                  <tr
                    key={category._id}
                    className="border-t hover:bg-gray-200 transition"
                  >
                    <td>
                      {category.thumbnail && (
                        <Image
                          src={category.thumbnail}
                          alt={category.name}
                          width={70}
                          height={70}
                          className="rounded object-cover"
                        />
                      )}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-500">
                      {category.name}
                    </td>

                    <td className="px-6 py-4 text-gray-500">{category.slug}</td>

                    <td className="px-6 py-4 text-gray-500">
                      {category.description || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          category.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              {!isLoading && !isError && filtered.length === 0 && (
                <tr>
                  <td className="px-6 py-8 text-gray-500" colSpan={5}>
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}

      <div className="flex justify-between items-center mt-6">
        <p className="text-gray-500">
          Showing {filtered.length} of {categories.length} categories
        </p>
      </div>
    </div>
  );
}
