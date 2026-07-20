"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaSearch, FaEdit } from "react-icons/fa";

const products = [
  {
    id: 1,
    title: "Premium Oversized Hoodie",
    // image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Men",
    price: 2990,
    stock: 120,
    status: "Active",
  },
  {
    id: 2,
    title: "Classic Black T-Shirt",
    // image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    category: "Men",
    price: 1290,
    stock: 85,
    status: "Active",
  },
  {
    id: 3,
    title: "Cargo Jogger Pant",
    // image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
    category: "Men",
    price: 2490,
    stock: 32,
    status: "Active",
  },
  {
    id: 4,
    title: "Denim Jacket",
    // image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
    category: "Men",
    price: 4490,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 5,
    title: "Women's Sweatshirt",
    // image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400",
    category: "Women",
    price: 2190,
    stock: 45,
    status: "Active",
  },
  {
    id: 6,
    title: "Summer Polo Shirt",
    // image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
    category: "Men",
    price: 1790,
    stock: 15,
    status: "Low Stock",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="mt-1 text-gray-500">
            Manage all products in your store.
          </p>
        </div>

        <Link
          href="/dashboard/products/add-product"
          className="flex items-center gap-2 rounded-lg bg-[#E17100] px-5 py-3 font-medium text-white transition hover:bg-black"
        >
          <FaPlus />
          Add Product
        </Link>
      </div>

      {/* Stats */}

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <h4 className="text-gray-500">Total Products</h4>
          <p className="mt-2 text-3xl text-gray-700 font-bold">150</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h4 className="text-gray-500">Active</h4>
          <p className="mt-2 text-3xl font-bold text-green-600">128</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h4 className="text-gray-500">Out of Stock</h4>
          <p className="mt-2 text-3xl font-bold text-red-600">12</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h4 className="text-gray-500">Categories</h4>
          <p className="mt-2 text-3xl font-bold text-gray-500 ">8</p>
        </div>
      </div>

      {/* Search & Filters */}

      <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-5 shadow lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-96">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-lg border py-3 pl-11 pr-4 outline-none text-gray-500   focus:border-[#E17100]"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <select className="rounded-lg border px-4 text-gray-500  py-3 outline-none">
            <option>All Categories</option>
            <option>Men</option>
            <option>Women</option>
          </select>

          <select className="rounded-lg border px-4 py-3 text-gray-500  outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Out of Stock</option>
            <option>Low Stock</option>
          </select>
          <select className="rounded-lg border px-4 py-3 text-gray-500  outline-none">
            <option>Newest</option>
            <option>Oldest</option>
            <option>Price Low</option>
            <option>Price High</option>
          </select>
        </div>
      </div>
      {/* Table */}

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
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
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t transition hover:bg-gray-50"
                >
                  <td className="px-6 py-5">
                    {/* <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div> */}
                  </td>

                  <td className="px-6 py-5 font-semibold text-gray-500 ">
                    {product.title}
                  </td>

                  <td className="px-6 py-5 text-gray-500 ">{product.category}</td>

                  <td className="px-6 py-5 font-semibold text-gray-500 ">
                    ৳ {product.price}
                  </td>

                  <td className="px-6 py-5 text-gray-500 ">{product.stock}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <Link
                      href={`/admin/product/${product.id}/update`}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#E17100] px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                    >
                      <FaEdit />
                      Update Product
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}

        <div className="flex flex-col items-center justify-between gap-4 border-t px-6 py-5 md:flex-row">
          <p className="text-sm text-gray-500">
            Showing 1–6 of 150 products
          </p>

          <div className="flex gap-2">
            <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
              Previous
            </button>

            <button className="rounded-lg bg-[#E17100] px-4 py-2 text-white">
              1
            </button>

            <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
              2
            </button>

            <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
              3
            </button>

            <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}