"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaCloudUploadAlt,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

export default function CreateProductPage() {
  const categories = [
    "Men",
    "Women",
    "Kids",
    "Accessories",
  ];

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discount: "",
    status: "Active",
    featured: false,
  });

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
      color: "Black",
      size: "M",
      sku: "BLK-M",
      stock: 25,
    },
  ]);

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        color: "",
        size: "",
        sku: "",
        stock: "",
      },
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">

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

          <button className="bg-[#E17100] text-white px-6 py-3  rounded-lg hover:bg-orange-600">
            Save Product
          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white rounded-xl p-6 shadow">

              <h2 className="font-bold text-gray-700 text-xl mb-5">
                Product Information
              </h2>

              <div className="space-y-5">

                <div>

                  <label className="font-medium text-gray-700">
                    Product Title
                  </label>

                  <input
                    className="w-full border text-gray-500 rounded-lg p-3 mt-2 focus:border-[#E17100] outline-none"
                    placeholder="Premium Hoodie"
                  />

                </div>

                <div>

                  <label className="font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    rows={6}
                    className="w-full border rounded-lg p-3 text-gray-500 mt-2 focus:border-[#E17100] outline-none"
                    placeholder="Write product description..."
                  />

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>

                    <label className="text-gray-700">Category</label>

                    <select className="w-full border text-gray-500 rounded-lg p-3 mt-2">

                      <option className="text-gray-500">Select Category</option>

                      {categories.map((item) => (
                        <option className="text-gray-500" key={item}>{item}</option>
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

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>

                    <label className="text-gray-700">Price</label>

                    <input
                      type="number"
                      placeholder="1500"
                      className="w-full border text-gray-500 rounded-lg p-3 mt-2"
                    />

                  </div>

                  <div>

                    <label className="text-gray-700">Discount (%)</label>

                    <input
                      type="number"
                      placeholder="15"
                      className="w-full text-gray-500 border rounded-lg p-3 mt-2"
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

                <button
                  onClick={addVariant}
                  className="bg-[#E17100] text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaPlus />
                  Add Variant
                </button>

              </div>

              <div className="overflow-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-gray-100">

                      <th className="p-3 text-gray-600">Color</th>

                      <th className="p-3 text-gray-600">Size</th>

                      <th className="p-3 text-gray-600">SKU</th>

                      <th className="p-3 text-gray-600">Stock</th>

                      <th className="p-3 text-gray-600">Action</th>

                    </tr>

                  </thead>

                  <tbody>

                    {variants.map((item, index) => (

                      <tr key={index} className="border-b text-gray-500">

                        <td className="p-3">
                          <input
                            defaultValue={item.color}
                            className="border rounded text-gray-500 p-2 w-full"
                          />
                        </td>

                        <td className="p-3">
                          <input
                            defaultValue={item.size}
                            className="border rounded text-gray-500 p-2 w-full"
                          />
                        </td>

                        <td className="p-3">
                          <input
                            defaultValue={item.sku}
                            className="border rounded text-gray-500 p-2 w-full"
                          />
                        </td>

                        <td className="p-3">
                          <input
                            defaultValue={item.stock}
                            className="border rounded text-gray-500 p-2 w-full"
                          />
                        </td>

                        <td className="p-3 text-center">

                          <button
                            onClick={() => removeVariant(index)}
                            className="text-red-500"
                          >
                            <FaTimes />
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

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

              <Image
                src={''}
                width={400}
                height={400}
                alt="thumbnail"
                className="rounded-lg"
              />

              <button className="mt-5 border-2 border-dashed border-[#E17100] text-[#E17100] rounded-lg w-full py-4 flex justify-center items-center gap-2">

                <FaCloudUploadAlt />

                Upload Thumbnail

              </button>

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

              <button className="mt-5 border-2 border-dashed border-[#E17100] text-[#E17100] rounded-lg w-full py-4 flex justify-center items-center gap-2">

                <FaCloudUploadAlt />

                Upload Images

              </button>

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

    </div>
  );
}