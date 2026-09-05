"use client";
// components/Categories.jsx
// import { FaTshirt } from "react-icons/fa";
// import { GiLargeDress } from "react-icons/gi";
// import { MdWatch } from "react-icons/md";
// import { PiSneakerFill } from "react-icons/pi";
// import { FaBaby } from "react-icons/fa";
import { useEffect, useState } from "react";

// const categories = [
//   {
//     id: 1,
//     title: "Men",
//     icon: FaTshirt,
//   },
//   {
//     id: 2,
//     title: "Women",
//     icon: GiLargeDress,
//   },
//    {
//     id: 3,
//     title: "kids",
//     icon: FaBaby,
//   },
//   {
//     id:4,
//     title: "Accessories",
//     icon: MdWatch,
//   },
// ];
const Categories = () => {
  const [catgorydata, setcategorydata] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const categoriesfetch = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories", {
          signal: controller.signal,
        });
        const data = await res.json();
        setcategorydata(data);
      } catch (error) {
        if (error.name !== "AbortError") setcategorydata([]);
      }
    };
    categoriesfetch();
    return () => controller.abort();
  }, []);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#E17100] font-semibold uppercase tracking-widest">
            Categories
          </p>

          <h2 className="text-4xl text-gray-600 font-bold mt-3">
            Shop By Category
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Discover premium fashion collections designed for every style and
            occasion.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {catgorydata.slice(0, 4).map((item) => (
            <div
              key={item.slug}
              className="group cursor-pointer rounded-2xl border border-gray-300 bg-white p-6 transition-all duration-300 hover:bg-black"
            >
              <h3 className="text-center text-xl font-semibold text-gray-600 group-hover:text-white">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Categories;
