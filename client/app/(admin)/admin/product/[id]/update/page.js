"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaCloudUploadAlt, FaSave } from "react-icons/fa";
import {
  useGetCategoriesQuery,
  useGetProductBySlugQuery,
  useUpdateProductMutation,
} from "@/lib/api/api";

export default function UpdateProductPage() {
  const { id: slug } = useParams();
  const {
    data: productResponse,
    isLoading,
    isError,
  } = useGetProductBySlugQuery(slug, { skip: !slug });
  const { data: categoriesResponse } = useGetCategoriesQuery();
  const loadedProduct = Array.isArray(productResponse?.data)
    ? productResponse.data[0]
    : productResponse?.data;
  const categories = categoriesResponse?.data || [];

  if (isLoading)
    return <main className="p-8 text-gray-600">Loading product...</main>;
  if (isError || !loadedProduct)
    return (
      <main className="p-8 text-red-700">Product could not be loaded.</main>
    );

  return (
    <ProductEditForm
      slug={slug}
      loadedProduct={loadedProduct}
      categories={categories}
    />
  );
}

function ProductEditForm({ slug, loadedProduct, categories }) {
  const router = useRouter();
  const galleryInput = useRef(null);
  const [updateProduct, { isLoading: isSaving, error: saveError }] =
    useUpdateProductMutation();
  const [product, setProduct] = useState(() => ({
    title: loadedProduct.title,
    category: loadedProduct.category?._id || loadedProduct.category,
    price: loadedProduct.price,
    discountpercentage: loadedProduct.discountpercentage || 0,
    description: loadedProduct.description,
    thumbnail: null,
    images: [],
    variants: loadedProduct.variants || [],
    tags: loadedProduct.tags || [],
    isActive: true,
  }));
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.name === "thumbnail"
          ? e.target.files?.[0] || null
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await updateProduct({ slug, ...product }).unwrap();
      setMessage("Product updated successfully.");
      router.push("/admin/product");
    } catch {
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-[#6C3FEA]"
            >
              <FaArrowLeft />
              Back
            </button>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
              Update Product
            </h1>

            <p className="text-gray-500">
              Edit product information and save changes.
            </p>
          </div>

          <button
            type="submit"
            form="edit-product"
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#6C3FEA] px-6 py-3 font-extrabold text-white transition hover:bg-[#101827]"
          >
            <FaSave />
            {isSaving ? "Saving..." : "Update Product"}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}

          <div className="lg:col-span-2 border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
            <h2 className="text-xl font-semibold mb-6">Product Information</h2>

            <form
              id="edit-product"
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="font-medium block mb-2">Product Title</label>

                <input
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C3FEA]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-medium block mb-2">Category</label>

                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-medium block mb-2">SKU</label>

                  <input
                    type="text"
                    name="sku"
                    value={product.variants[0]?.sku || ""}
                    onChange={(event) =>
                      setProduct((current) => ({
                        ...current,
                        variants: current.variants.map((variant, index) =>
                          index === 0
                            ? { ...variant, sku: event.target.value }
                            : variant,
                        ),
                      }))
                    }
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="font-medium block mb-2">Price</label>

                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-2">Discount %</label>

                  <input
                    type="number"
                    name="discountpercentage"
                    value={product.discountpercentage}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-2">Stock</label>

                  <input
                    type="number"
                    name="stock"
                    value={product.variants[0]?.stock || 0}
                    onChange={(event) =>
                      setProduct((current) => ({
                        ...current,
                        variants: current.variants.map((variant, index) =>
                          index === 0
                            ? { ...variant, stock: Number(event.target.value) }
                            : variant,
                        ),
                      }))
                    }
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium block mb-2">Description</label>

                <textarea
                  rows={6}
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 resize-none"
                />
              </div>
            </form>
          </div>

          {/* Right */}

          <div className="space-y-6">
            {/* Thumbnail */}

            <div className="border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
              <h2 className="font-semibold mb-4">Thumbnail</h2>

              {product.thumbnail ? (
                <p className="text-sm text-gray-600">
                  {product.thumbnail.name}
                </p>
              ) : (
                <img
                  src={loadedProduct.thumbnail}
                  alt={loadedProduct.title}
                  className="h-72 w-full rounded-lg object-cover"
                />
              )}

              <label className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 border border-dashed border-[#6C3FEA] py-3 text-[#6C3FEA] hover:bg-[#F1EDFF]">
                <FaCloudUploadAlt />
                Change Thumbnail
                <input
                  className="sr-only"
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* Gallery */}

            <div className="border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
              <h2 className="font-semibold mb-4">Product Images</h2>

              <div className="grid grid-cols-3 gap-3">
                {(loadedProduct.images || []).map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`${loadedProduct.title} view ${index + 1}`}
                    className="h-24 w-full rounded-lg object-cover"
                  />
                ))}
                {product.images.map((image, index) => (
                  <img
                    key={`${image.name}-${index}`}
                    src={URL.createObjectURL(image)}
                    alt={`New product image ${index + 1}`}
                    className="h-24 w-full rounded-lg object-cover"
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => galleryInput.current?.click()}
                className="mt-5 flex w-full items-center justify-center gap-2 border border-dashed border-[#6C3FEA] py-3 text-[#6C3FEA] hover:bg-[#F1EDFF]"
              >
                <FaCloudUploadAlt />
                Upload More Images
              </button>
              <input
                ref={galleryInput}
                className="sr-only"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.target.files || []);
                  if (
                    (loadedProduct.images?.length || 0) +
                      product.images.length +
                      files.length >
                    4
                  ) {
                    setMessage("A product can have up to four gallery images.");
                    return;
                  }
                  setProduct((current) => ({
                    ...current,
                    images: [...current.images, ...files],
                  }));
                  setMessage("");
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="border px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="edit-product"
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#6C3FEA] px-8 py-3 font-extrabold text-white hover:bg-[#101827]"
          >
            <FaSave />
            {isSaving ? "Saving..." : "Update Product"}
          </button>
        </div>
        {message && (
          <p role="status" className="mt-4 text-sm text-green-700">
            {message}
          </p>
        )}
        {saveError && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {saveError.data?.message || "Could not update product."}
          </p>
        )}
      </div>
    </div>
  );
}
