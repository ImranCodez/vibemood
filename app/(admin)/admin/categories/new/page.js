"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function CreateCategoryPage() {
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
    status: "Active",
    featured: false,
  });

  const thumbnail =
    "https://placehold.co/500x500/F3F4F6/9CA3AF?text=Category";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCategory({
      ...category,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-600">
              Create Category
            </h1>

            <p className="text-gray-500 mt-2 ">
              Add a new category to your VibeMood store.
            </p>
          </div>

          <button className="bg-[#E17100] hover:bg-orange-600 text-gray-500 px-6 py-3 rounded-lg font-medium transition">
            Save Category
          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-xl shadow p-6">

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

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-xl font-semibold mb-5 text-gray-500">
                Category Image
              </h2>

              {/* <Image
                src={thumbnail}
                width={500}
                height={500}
                alt="Category"
                className="rounded-lg w-full"
              /> */}

              <button className="w-full mt-5 border-2 border-dashed border-[#E17100] rounded-lg py-4 text-[#E17100] flex items-center justify-center gap-2 hover:bg-orange-50 transition">

                <FaCloudUploadAlt />

                Upload Image

              </button>

            </div>

            {/* Settings */}

            <div className="bg-white rounded-xl shadow p-6">

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

                  <span className="text-gray-600">
                    Featured Category
                  </span>

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