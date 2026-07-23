"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaSearch } from "react-icons/fa";
import { useGetCategoriesQuery } from "../../services/api";

const sampleCategories = [
  {
    id: 1,
    name: "Men",
    slug: "men",
    // image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
    products: 54,
    status: "Active",
    createdAt: "12 Jul 2026",
  },
  {
    id: 2,
    name: "Women",
    slug: "women",
    // image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500",
    products: 72,
    status: "Active",
    createdAt: "15 Jul 2026",
  },
  {
    id: 3,
    name: "Kids",
    slug: "kids",
    // image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=500",
    products: 26,
    status: "Active",
    createdAt: "17 Jul 2026",
  },
  {
    id: 4,
    name: "Accessories",
    slug: "accessories",
    // image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
    products: 18,
    status: "Inactive",
    createdAt: "18 Jul 2026",
  },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = sampleCategories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );
  const { data } = useGetCategoriesQuery();
  console.log(data?.data);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categories</h1>

          <p className="text-gray-500 mt-1">
            Manage your VibeMood product categories.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="bg-[#E17100] hover:bg-orange-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 transition"
        >
          <FaPlus />
          Add Category
        </Link>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-11 pr-4 outline-none focus:border-[#E17100]"
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600">
                <th className="px-6 py-4 ">Image</th>

                <th className="px-6 py-4 ">Category</th>

                <th className="px-6 py-4 ">Slug</th>

                <th className="px-6 py-4 ">Products</th>

                <th className="px-6 py-4 ">Status</th>

                <th className="px-6 py-4 ">Created</th>

                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.data.map((category) => (
                <tr
                  key={category._id}
                  className="border-t hover:bg-gray-200 transition"
                >
                  <td>
                    <Image
                      src={category.thumbnail}
                      alt={category.name}
                      width={70}
                      height={70}
                      className="rounded object-cover"
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-500">
                    {category.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">{category.slug}</td>

                  <td className="px-6 py-4 text-gray-500">
                    {category.products}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        category.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500 bg-amber-200">
                    {category.createdAt}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button className="flex items-center gap-2 bg-[#E17100] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                        <FaEdit />
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}

      <div className="flex justify-between items-center mt-6">
        <p className="text-gray-500">
          Showing 1 - {filtered.length} of {sampleCategories.length}
        </p>

        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-300">
            Previous
          </button>

          <button className="bg-[#E17100] text-white px-4 py-2 rounded-lg">
            1
          </button>

          <button className="border px-4 py-2 rounded-lg hover:bg-gray-300 text-gray-500">
            2
          </button>

          <button className="border px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
