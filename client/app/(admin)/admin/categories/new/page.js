"use client";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCreateCategoryMutation } from "@/lib/api/api";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [createCategory, { isLoading, error }] = useCreateCategoryMutation();
  const [success, setSuccess] = useState("");
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCategory((current) => ({
      ...current,
      [name]: name === "thumbnail" ? files?.[0] || null : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");
    try {
      await createCategory(category).unwrap();
      setSuccess("Category created.");
      router.push("/admin/categories");
    } catch {
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}

          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#6C3FEA]">
                Catalog control
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101827]">
                Create Category
              </h1>

              <p className="text-gray-500 mt-2 ">
                Add a new category to your VibeMood store.
              </p>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-[#6C3FEA] px-6 py-3 font-extrabold text-white transition hover:bg-[#101827] disabled:opacity-60"
            >
              {isLoading ? "Saving..." : "Save Category"}
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left */}

            <div className="lg:col-span-2">
              <div className="border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
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
                      className="w-full border rounded-lg p-3 text-gray-600 outline-none focus:border-[#6C3FEA]"
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
                      className="w-full border rounded-lg p-3 text-gray-600 outline-none focus:border-[#6C3FEA]"
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
                      className="w-full border rounded-lg p-3 text-gray-600 outline-none focus:border-[#6C3FEA]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="space-y-6">
              {/* Image */}

              <div className="border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
                <h2 className="text-xl font-semibold mb-5 text-gray-500">
                  Category Image
                </h2>
                <label className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-[#6C3FEA] py-4 text-[#6C3FEA] transition hover:bg-[#F1EDFF]">
                  <FaCloudUploadAlt />
                  {category.thumbnail?.name || "Upload Image"}
                  <input
                    className="sr-only"
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* Settings */}

              <div className="border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
                <h2 className="text-xl font-semibold text-gray-500 mb-5">
                  Settings
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Status
                    </label>

                    <p className="rounded-lg border bg-gray-50 p-3 text-sm text-gray-600">
                      New categories are active when created.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {error.data?.message || "Could not create category."}
          </p>
        )}
        {success && (
          <p role="status" className="mt-4 text-sm text-green-700">
            {success}
          </p>
        )}
      </form>
    </div>
  );
}
