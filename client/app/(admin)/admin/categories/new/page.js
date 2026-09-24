"use client";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Image from "next/image";

export default function CreateCategoryPage() {
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
    status: "Active",
    featured: false,
  });

  const thumbnail =
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCategory({
      ...category,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#ef6c2f]">
              Catalog control
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#151515]">
              Create Category
            </h1>

            <p className="text-gray-500 mt-2 ">
              Add a new category to your VibeMood store.
            </p>
          </div>

          <button className="bg-[#ef6c2f] px-6 py-3 font-extrabold text-white transition hover:bg-[#151515]">
            Save Category
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}

          <div className="lg:col-span-2">
            <div className="border border-[#e5e2dc] bg-white p-6 shadow-[0_8px_24px_rgba(21,21,21,0.04)]">
              <h2 className="text-xl font-semibold mb-6 text-gray-500">
                Category Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Category Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    placeholder="Men Fashion"
                    className="w-full border rounded-lg p-3 text-gray-600 outline-none focus:border-[#E17100]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Slug
                  </label>

                  <input
                    type="text"
                    name="slug"
                    value={category.slug}
                    onChange={handleChange}
                    placeholder="men-fashion"
                    className="w-full border rounded-lg p-3 text-gray-600 outline-none focus:border-[#E17100]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Description
                  </label>

                  <textarea
                    rows={6}
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                    placeholder="Write category description..."
                    className="w-full border rounded-lg p-3 text-gray-600 outline-none focus:border-[#E17100]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="space-y-6">
            {/* Image */}

            <div className="border border-[#e5e2dc] bg-white p-6 shadow-[0_8px_24px_rgba(21,21,21,0.04)]">
              <h2 className="text-xl font-semibold mb-5 text-gray-500">
                Category Image
              </h2>
              {/* 
              <Image
              fill={true}
                src={thumbnail}
                width={500}
                height={500}
                alt="Category"
                className="rounded-lg w-full"
              /> */}

              <button className="mt-5 flex w-full items-center justify-center gap-2 border-2 border-dashed border-[#ef6c2f] py-4 text-[#ef6c2f] transition hover:bg-[#fff0e9]">
                <FaCloudUploadAlt />
                Upload Image
              </button>
            </div>

            {/* Settings */}

            <div className="border border-[#e5e2dc] bg-white p-6 shadow-[0_8px_24px_rgba(21,21,21,0.04)]">
              <h2 className="text-xl font-semibold text-gray-500 mb-5">
                Settings
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={category.status}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 text-gray-600 outline-none focus:border-[#E17100]"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <label className="flex items-center justify-between">
                  <span className="text-gray-600">Featured Category</span>

                  <input
                    type="checkbox"
                    name="featured"
                    checked={category.featured}
                    onChange={handleChange}
                    className="h-5 w-5 accent-[#E17100]"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
