"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaPlus, FaTimes } from "react-icons/fa";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/Button";
import {
  useCreateNewproductMutation,
  useGetCategoriesQuery,
} from "@/app/(admin)/services/api";
import { generateSlug } from "@/app/components/utils/sluggenerater";
export default function CreateProductPage() {
  const {
    data: categoryList,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategoriesQuery();
  const [createNewproduct, { isLoading: isCreating, error: createError }] =
    useCreateNewproductMutation();
  const categories = categoryList?.data ?? [];
  const [formError, setFormError] = useState("");
  const [newproduct, setProduct] = useState({
    title: "",
    description: "",
    slug: "",
    category: "",
    price: "",
    discountpercentage: "",
    tags: "",
    variants: "",
    thumbnail: null,
    images: [],
    isActive: "",
  });

  const handleimages = (e) => {
    const files = Array.from(e.target.files);

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };
  const handlremoveimg = (index) => {
    const img = newproduct.images.filter((item, i) => i !== index);
    setProduct((prev) => ({ ...prev, images: img }));
  };

  const [variants, setVariants] = useState([
    {
      id: 1,
      color: "",
      sizes: "s",
      sku: "NM-00001",
      stock: "",
    },
  ]);

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now(),
        color: "",
        sizes: "",
        sku: `NM-${Math.floor(Math.random() * 100000)}`,
        stock: "",
      },
    ]);
  };
  const handelInputVariant = (id, field, value) => {
    const variantsinputcahnge = variants.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );

    setVariants(variantsinputcahnge);
    setProduct((prev) => ({ ...prev, variants: variantsinputcahnge }));
  };
  // variants.map((item) => {
  //   if (item.id === id) {
  //     return {
  //       ...item,
  //       [field]: value,
  //     };
  //   }

  //   return item;
  // });
  const removeVariant = (index) => {
    const updatevarints = variants.filter((_, i) => i !== index);
    setVariants(updatevarints);
    setProduct((prev) => ({ ...prev, variants: updatevarints }));
  };
  // const handelCancleVariant = (id) => {
  //     if (variants.length > 1) {
  //       const updatedVariantList = variants.filter((vitem) => vitem.id !== id);
  //       setVariants(updatedVariantList);
  //       setNewProduct((prev) => ({ ...prev, variants: updatedVariantList }));
  //     }
  //   };

  const handleuploadnewproduct = async (e) => {
    e.preventDefault();

    const firstVariant = variants[0];
    if (
      !newproduct.title.trim() ||
      !newproduct.description.trim() ||
      !newproduct.category ||
      !newproduct.price ||
      !newproduct.thumbnail ||
      !firstVariant?.color.trim() ||
      !firstVariant?.sku.trim() ||
      !firstVariant?.stock
    ) {
      setFormError(
        "Complete the product title, description, category, price, thumbnail, and variant fields before saving.",
      );
      return;
    }

    setFormError("");
    await createNewproduct(newproduct);
  };
  return (
    <section className="min-h-screen bg-background p-4 pb-24 sm:p-6 lg:p-8">
      <form onSubmit={handleuploadnewproduct}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl text-gray-700 font-bold">
                Create Product
              </h1>

              <p className="text-gray-500 mt-1">
                Add a new product to VibeMood
              </p>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <Button
                type="submit"
                loading={isCreating}
                className="flex-1 rounded-lg bg-[#E17100] px-4 py-3 text-white hover:bg-orange-600 sm:flex-none sm:px-6"
              >
                {" "}
                Save Product
              </Button>
              <Button
                variant="danger"
                className="w-20 shrink-0 text-[17px] shadow-xl"
                type="reset"
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:flex-row">
            {/* LEFT */}

            <div className="min-w-0 flex-1 space-y-4 bg-white">
              <div className="bg-white rounded-xl p-6 shadow">
                <h2 className="font-bold text-gray-700 text-xl mb-5">
                  Product Information
                </h2>

                <div className="space-y-5">
                  <Input
                    value={newproduct.title}
                    onChange={(e) => {
                      setProduct((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }));
                      setProduct((prev) => ({
                        ...prev,
                        slug: generateSlug(e.target.value),
                      }));
                    }}
                    className="text-black"
                    placeholder={"Enter your product title"}
                    label={"Product Title"}
                  />
                  <Input
                    value={newproduct.slug}
                    onChange={(e) =>
                      setProduct((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    className="text-black"
                    placeholder={"Enter your product slug"}
                    label={"slug"}
                  />
                  <Input
                    value={newproduct.tags}
                    onChange={(e) =>
                      setProduct((prev) => ({ ...prev, tags: e.target.value }))
                    }
                    className="text-black"
                    placeholder={"Enter your product tags"}
                    label={"tags (comma seperated)"}
                  />
                  <div>
                    <label className="font-medium text-gray-700">
                      Description
                    </label>

                    <textarea
                      value={newproduct.description}
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={6}
                      className="w-full border rounded-lg p-3 text-gray-500 mt-2 focus:border-[#E17100] outline-none"
                      placeholder="Write product description..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-gray-700">Category</label>

                      <select
                        value={newproduct.category}
                        onChange={(e) =>
                          setProduct((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 outline-none focus:border-accent"
                      >
                        <option
                          value=""
                          disabled
                          className="bg-black text-white "
                        >
                          Select Category
                        </option>

                        {categories.map((item) => (
                          <option
                            key={item._id}
                            value={item._id}
                            className="text-gray-800"
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>

                      {categoriesLoading && (
                        <p className="mt-1 text-sm text-gray-500">
                          Loading categories...
                        </p>
                      )}
                      {!categoriesLoading &&
                        !categoriesError &&
                        categories.length === 0 && (
                          <p className="mt-1 text-sm text-red-600">
                            No categories exist yet. Create a category first.
                          </p>
                        )}
                    </div>

                    <div>
                      <label className="text-gray-700">Status</label>

                      <select className="w-full text-gray-500 border rounded-lg p-3 mt-2">
                        <option className="text-gray-500">Active</option>

                        <option className="text-gray-500">Draft</option>
                      </select>
                    </div>

                    <Input
                      value={newproduct.price}
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                      mini={1}
                      label={"price"}
                      type="number"
                      placeholder={0}
                    />

                    <Input
                      value={newproduct.discountpercentage}
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          discountpercentage: e.target.value,
                        }))
                      }
                      type="number"
                      label={"discountpercentage"}
                      max={100}
                      mini={0}
                      placeholder={0}
                    />
                    <Input
                      onChange={(e) => {
                        setProduct((prev) => ({
                          ...prev,
                          thumbnail: e.target.files[0],
                        }));
                      }}
                      type="file"
                      label={"Upload thumbnail"}
                    />
                    <div>
                      <Input
                        onChange={handleimages}
                        type="file"
                        multiple
                        label={"Upload images"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Variants */}

              <div className="bg-white rounded-xl shadow p-6">
                <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <h2 className="font-bold text-xl text-gray-700">
                    Product Variants
                  </h2>
                  <Button type="button" size={"md"} onClick={addVariant}>
                    {" "}
                    <FaPlus /> Add Variant
                  </Button>
                </div>
                <div className="overflow-auto">
                  {variants.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-end gap-2 border-b border-gray-100 pb-4 last:border-0 sm:items-center"
                    >
                      <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-4">
                        <select
                          value={item.sizes}
                          onChange={(e) =>
                            handelInputVariant(item.id, "sizes", e.target.value)
                          }
                          className="w-full rounded-lg px-3 py-3 text-[#000000] shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#E17100]"
                        >
                          {["s", "m", "l", "xl", "2xl", "3xl"].map((size) => (
                            <option key={size} value={size}>
                              {size.toUpperCase()}
                            </option>
                          ))}
                        </select>

                        <Input
                          value={item.color}
                          onChange={(e) =>
                            handelInputVariant(item.id, "color", e.target.value)
                          }
                          label={"color"}
                        />
                        <Input
                          value={item.sku}
                          onChange={(e) =>
                            handelInputVariant(item.id, "sku", e.target.value)
                          }
                          label={"sku"}
                        />
                        <Input
                          value={item.stock}
                          onChange={(e) =>
                            handelInputVariant(item.id, "stock", e.target.value)
                          }
                          label={"Stock"}
                        />
                      </div>
                      {variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="w-8 shrink-0 rounded-[7px] border py-2 text-red-700 hover:bg-red-500 hover:text-amber-50"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold text-xl mb-5 text-gray-800">
                  Thumbnail
                </h2>
                {newproduct.thumbnail && (
                  <Image
                    src={URL.createObjectURL(newproduct.thumbnail)}
                    width={400}
                    height={400}
                    alt="thumbnail"
                    className="rounded-lg"
                  />
                )}
                <Button
                  type="button"
                  className=" rounded-lg w-full py-4 flex justify-center items-center gap-2"
                >
                  <FaCloudUploadAlt />
                  Upload Thumbnail
                </Button>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold text-xl mb-5 text-gray-800">
                  Gallery Images
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  {newproduct.images.length > 0 &&
                    newproduct.images.map((img, index) => (
                      <div key={index} className="relative w-fit">
                        <Image
                          src={URL.createObjectURL(img)}
                          width={100}
                          height={100}
                          alt="image"
                          className="rounded-lg"
                        />

                        <Button
                          type="button"
                          onClick={() => handlremoveimg(index)}
                          className="absolute top-[-20px] right-[-12px]"
                          variant="danger"
                          size={"sm"}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                </div>
                <Button
                  type="button"
                  className=" mt-5 rounded-lg w-full py-4 flex justify-center items-center gap-2"
                >
                  <FaCloudUploadAlt />
                  Upload Thumbnail
                </Button>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold text-xl mb-4 text-gray-800">
                  Product Settings
                </h2>
                <label className="flex items-center justify-between">
                  <span className="text-gray-500"> Featured Product</span>
                  <input type="checkbox" />
                </label>
              </div>
            </div>
          </div>
          {createError && (
            <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {createError.data?.message ||
                "Product could not be created. Check the required fields and try again."}
            </p>
          )}
          {formError && (
            <p className="mt-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
              {formError}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
