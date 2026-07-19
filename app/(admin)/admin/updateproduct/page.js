// "use client";

// import { useState } from "react";
// import {
//   FaArrowLeft,
//   FaCloudUploadAlt,
//   FaSave,
// } from "react-icons/fa";

// export default function UpdateProductPage() {
//   const [product, setProduct] = useState({
//     title: "Oversized Graphic T-Shirt",
//     category: "Men",
//     price: 1499,
//     discount: 15,
//     stock: 52,
//     sku: "VM-TS-001",
//     description:
//       "Premium oversized cotton t-shirt with high quality graphic print. Comfortable fit for everyday wear.",
//     thumbnail:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
//     // images: [
//     //   "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
//     //   "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800",
//     //   "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
//     // ],
//   });

//   const handleChange = (e) => {
//     setProduct({
//       ...product,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log(product);

//     alert("Product Updated Successfully!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto">

//         {/* Header */}

//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <button className="flex items-center gap-2 text-gray-600 hover:text-[#E17100]">
//               <FaArrowLeft />
//               Back
//             </button>

//             <h1 className="text-3xl font-bold mt-2">
//               Update Product
//             </h1>

//             <p className="text-gray-500">
//               Edit product information and save changes.
//             </p>
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="bg-[#E17100] hover:bg-[#ca6500] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
//           >
//             <FaSave />
//             Update Product
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">

//           {/* Left */}

//           <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">

//             <h2 className="text-xl font-semibold mb-6">
//               Product Information
//             </h2>

//             <form className="space-y-5">

//               <div>
//                 <label className="font-medium block mb-2">
//                   Product Title
//                 </label>

//                 <input
//                   type="text"
//                   name="title"
//                   value={product.title}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#E17100]"
//                 />
//               </div>

//               <div className="grid md:grid-cols-2 gap-5">

//                 <div>
//                   <label className="font-medium block mb-2">
//                     Category
//                   </label>

//                   <select
//                     name="category"
//                     value={product.category}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg px-4 py-3"
//                   >
//                     <option>Men</option>
//                     <option>Women</option>
//                     <option>Accessories</option>
//                     <option>Shoes</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="font-medium block mb-2">
//                     SKU
//                   </label>

//                   <input
//                     type="text"
//                     name="sku"
//                     value={product.sku}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg px-4 py-3"
//                   />
//                 </div>

//               </div>

//               <div className="grid md:grid-cols-3 gap-5">

//                 <div>
//                   <label className="font-medium block mb-2">
//                     Price
//                   </label>

//                   <input
//                     type="number"
//                     name="price"
//                     value={product.price}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg px-4 py-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="font-medium block mb-2">
//                     Discount %
//                   </label>

//                   <input
//                     type="number"
//                     name="discount"
//                     value={product.discount}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg px-4 py-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="font-medium block mb-2">
//                     Stock
//                   </label>

//                   <input
//                     type="number"
//                     name="stock"
//                     value={product.stock}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg px-4 py-3"
//                   />
//                 </div>

//               </div>

//               <div>
//                 <label className="font-medium block mb-2">
//                   Description
//                 </label>

//                 <textarea
//                   rows={6}
//                   name="description"
//                   value={product.description}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg px-4 py-3 resize-none"
//                 />
//               </div>

//             </form>
//           </div>

//           {/* Right */}

//           <div className="space-y-6">

//             {/* Thumbnail */}

//             <div className="bg-white rounded-xl shadow p-6">

//               <h2 className="font-semibold mb-4">
//                 Thumbnail
//               </h2>

//               <img
//                 src={product.thumbnail}
//                 alt=""
//                 className="rounded-lg h-72 object-cover w-full"
//               />

//               <button className="mt-5 border border-dashed border-[#E17100] text-[#E17100] rounded-lg w-full py-3 flex justify-center items-center gap-2 hover:bg-orange-50">
//                 <FaCloudUploadAlt />
//                 Change Thumbnail
//               </button>

//             </div>

//             {/* Gallery */}

//             <div className="bg-white rounded-xl shadow p-6">

//               <h2 className="font-semibold mb-4">
//                 Product Images
//               </h2>

//               {/* <div className="grid grid-cols-3 gap-3">

//                 {product.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt=""
//                     className="h-24 rounded-lg object-cover"
//                   />
//                 ))}

//               </div> */}

//               <button className="mt-5 border border-dashed border-[#E17100] text-[#E17100] rounded-lg w-full py-3 flex justify-center items-center gap-2 hover:bg-orange-50">
//                 <FaCloudUploadAlt />
//                 Upload More Images
//               </button>

//             </div>

//           </div>

//         </div>

//         {/* Footer */}

//         <div className="mt-8 flex justify-end gap-4">

//           <button className="border px-6 py-3 rounded-lg hover:bg-gray-100">
//             Cancel
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="bg-[#E17100] hover:bg-[#ca6500] text-white px-8 py-3 rounded-lg flex items-center gap-2"
//           >
//             <FaSave />
//             Update Product
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// }