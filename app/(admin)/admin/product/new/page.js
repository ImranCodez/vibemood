"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaPlus, FaTimes } from "react-icons/fa";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/Button";
import { useCreateNewproductMutation, useGetCategoriesQuery } from "@/app/(admin)/services/api";
export default function CreateProductPage() {
    const {data:categoryList}=useGetCategoriesQuery()
    const [createNewproduct]=useCreateNewproductMutation()
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
  console.log(newproduct.imge);
  const handleimages = (e) => {
    const files = Array.from(e.target.files);

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };
  const handlremoveimg =(index)=>{
      const img = newproduct.images.filter((item,i)=>(i!==index))
      setProduct((prev)=>({...prev,images:img}))
    
     
  }
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
  const handelInputVariant = (id, field, value) => {
    const variantsinputcahnge = variants.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );

    setVariants(variantsinputcahnge);
    setProduct((prev)=>({...prev,variants:variantsinputcahnge}))
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
    const updatevarints=variants.filter((_, i) => i !== index)
    setVariants(updatevarints);
      setProduct((prev)=>({...prev,variants:updatevarints}))
  };
  // const handelCancleVariant = (id) => {
  //     if (variants.length > 1) {
  //       const updatedVariantList = variants.filter((vitem) => vitem.id !== id);
  //       setVariants(updatedVariantList);
  //       setNewProduct((prev) => ({ ...prev, variants: updatedVariantList }));
  //     }
  //   };

  const handleuploadnewproduct=async(e)=>{
    e.preventDefualt()
    const res= await createNewproduct(newproduct)
    console.log(res);
    
  }
  return (
    <section className="bg-gray-100 min-h-screen p-8 pb-24">
      <form onSubmit={handleuploadnewproduct}>
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
              
                type="submit"
                className="bg-[#E17100] text-white px-6 py-3  rounded-lg hover:bg-orange-600"
              >
                {" "}
                Save Product
              </Button>
               <Button
                  variant="danger"
                  className="w-20 text-[17px] shadow-xl"
                  type="reset"
                >
                  Reset
                </Button>
            </div>
          </div>

          <div className="flex lg:flex-cols-3 justify-between gap-8">
            {/* LEFT */}

            <div className="lg:col-span-2 bg-white space-y-4">
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

                      <select onChange={(e)=>setProduct((prev)=>({...prev,category:e.target.value}))} className="w-full border text-gray-500 rounded-lg p-3 mt-2">
                        <option className="text-gray-500">
                          Select Category-
                        </option>

                        {categoryList?.data?.map((item) => (
                          <option className="text-gray-500 capitalize" key={item._id} value={item._id}>
                            {item.name}
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
                <div className="flex justify-between items-center mb-5">
                  <h2 className="font-bold text-xl text-gray-700">
                    Product Variants
                  </h2>
                  <Button size={"md"} onClick={addVariant}>
                    {" "}
                    <FaPlus /> Add Variant
                  </Button>
                </div>
                <div className="overflow-auto">
                  <table>
                    {variants.map((item, index) => (
                      <div key={item.id} className="flex">
                        <div className="flex gap-4">
                          {/* <Input
                            className="p-2 bg-amber-300"
                            value={item.sizes}
                            onChange={(e) =>
                              setVariants((prev) => ({
                                ...prev,
                                sizes: e.target.value,
                              }))
                            }
                            label={"sizes"}
                          /> */}
                          <select
                            value={item.sizes}
                            onChange={(e) =>
                              handelInputVariant(
                                item.id,
                                "sizes",
                                e.target.value,
                              )
                            }
                            className="  px-10  text-[#000000] focus:outline-none focus:ring-2 rounded-lg shadow-sm focus:ring-[#E17100] transition"
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
                              handelInputVariant(
                                item.id,
                                "color",
                                e.target.value,
                              )
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
                              handelInputVariant(
                                item.id,
                                "stock",
                                e.target.value,
                              )
                            }
                            label={"Stock"}
                          />
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
                        onClick={()=>handlremoveimg(index)}
                          className="absolute top-[-20px] right-[-12px]"
                          variant="danger"
                          size={"sm"}
                        >
                          X
                        </Button>
                      </div>
                    ))}
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
