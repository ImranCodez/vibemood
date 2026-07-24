"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaPlus, FaTimes } from "react-icons/fa";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/Button";
export default function CreateProductPage() {
  const categories = ["Men", "Women", "Kids", "Accessories"];

  const [newproduct, setProduct] = useState({
    title: "",
    description: "",
    slug: "",
    category: "",
    price: "",
    discountpercentage: "",
    tags: "",
    variants: "",
    isActive: "",
  });
  console.log(newproduct);

  //   const [thumbnail] = useState(
  //     "https://placehold.co/400x400/png"
  //   );

  //   const [gallery] = useState([
  //     "https://placehold.co/300x300/png",
  //     "https://placehold.co/300x300/png",
  //     "https://placehold.co/300x300/png",
  //   ]);

  const [variants, setVariants] = useState([
    {
      id: Date.now(),
      color: "",
      sizes: "",
      sku: `NM-${Math.floor(Math.random() * 100000)}`,
      stock: "",
    },
  ]);
  console.log(variants);

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
  const handelInputVariant=(id,field,value)=>(console.log(id,field,value))

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };
  // const handelCancleVariant = (id) => {
  //     if (variants.length > 1) {
  //       const updatedVariantList = variants.filter((vitem) => vitem.id !== id);
  //       setVariants(updatedVariantList);
  //       setNewProduct((prev) => ({ ...prev, variants: updatedVariantList }));
  //     }
  //   };
  return (
    <section className="bg-gray-100 min-h-screen p-8 pb-24">
      <form>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl text-gray-700 font-bold">
                Create Product
              </h1>

              <p className="text-gray-500 mt-1">
                Add a new product to VibeMood
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                className="bg-[#E17100] text-white px-6 py-3  rounded-lg hover:bg-orange-600"
              >
                {" "}
                Save Product
              </Button>
            </div>
          </div>

          <div className="flex lg:flex-cols-3 justify-between gap-8">
            {/* LEFT */}

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow">
                <h2 className="font-bold text-gray-700 text-xl mb-5">
                  Product Information
                </h2>

                <div className="space-y-5">
                  <Input
                    value={newproduct.title}
                    onChange={(e) =>
                      setProduct((prev) => ({ ...prev, title: e.target.value }))
                    }
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

                      <select className="w-full border text-gray-500 rounded-lg p-3 mt-2">
                        <option className="text-gray-500">
                          Select Category
                        </option>

                        {categories.map((item) => (
                          <option className="text-gray-500" key={item}>
                            {item}
                          </option>
                        ))}
                      </select>
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
                    <Input type="file" label={"Upload thumbnail"} />
                    <Input type="file" multiple label={"Upload images"} />
                  </div>
                </div>
              </div>

              {/* Variants */}

              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="font-bold text-xl text-gray-700">
                    Product Variants
                  </h2>
                  <Button onClick={addVariant}>
                    {" "}
                    <FaPlus /> Add Variant
                  </Button>
                </div>
                <div className="overflow-auto">
                  <table className="w-full">
                    {variants.map((item, index) => (
                      <div key={item.id} className="flex">
                        <div className="flex gap-4">
                          {/* <Input
                            className="p-2 bg-amber-300"
                            value={variants.sizes}
                            onChange={(e) =>
                              setVariants((prev) => ({
                                ...prev,
                                sizes: e.target.value,
                              }))
                            }  
                            label={"sizes"}
                          /> */}
                          <select
                            value={variants.sizes}
                            onChange={(e) =>
                              handelInputVariant(variants.id,"sizes",e.target.value,)
                            }
                            className="rounded-lg border text-black px-2 py-2 text-sm col-span-3"
                          >
                            {["s", "m", "l", "xl", "2xl", "3xl"].map((size) => (
                              <option key={size} value={size}>
                                {size.toUpperCase()}
                              </option>
                            ))}
                          </select>

                          <Input value={variants.color}
                            onChange={(e) =>
                              handelInputVariant(variants.id,"color",e.target.value,)
                            } label={"color"} />
                          <Input label={"sku"} />
                          <Input label={"Stock"} />
                        </div>
                        {variants.length > 1 && (
                          <button
                            onClick={() => removeVariant(index)}
                            className=" w-7 border rounded-[7px] text-red-700 hover:bg-red-500 hover:text-amber-50"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    ))}
                  </table>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_auto_1fr] gap-6 relative items-start">
              {/* LEFT CARD: Inputs and others */}
              <div className="space-y-6">
                {/* আপনার Product Information কার্ডের ভেতরের সব কোড */}
              </div>

              {/* MIDDLE: Sticky/Fixed Reset button */}
              <div className="fixed top-1/2 -translate-y-1/2 mr-2.5 z-50 flex flex-col items-center self-center py-5">
                <Button
                  variant="danger"
                  className="w-20 text-[17px] shadow-xl"
                  type="reset"
                >
                  Reset
                </Button>
              </div>

              {/* RIGHT CARD: Thumbnail */}
              <div className="space-y-6">
                {/* আপনার Thumbnail কার্ডের ভেতরের সব কোড */}
              </div>
            </div>
            {/* RIGHT */}

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold text-xl mb-5 text-gray-800">
                  Thumbnail
                </h2>

                <Image
                  src={""}
                  width={400}
                  height={400}
                  alt="thumbnail"
                  className="rounded-lg"
                />
                <Button className=" rounded-lg w-full py-4 flex justify-center items-center gap-2">
                  <FaCloudUploadAlt />
                  Upload Thumbnail
                </Button>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold text-xl mb-5 text-gray-800">
                  Gallery Images
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  {/* {gallery?.map((img, index) => (

                    <Image
                      key={index}
                      src={img}
                      width={200}
                      height={200}
                      alt=""
                      className="rounded-lg"
                    />

                  ))} */}
                </div>
                <Button className=" mt-5 rounded-lg w-full py-4 flex justify-center items-center gap-2">
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
        </div>
      </form>
    </section>
  );
}
