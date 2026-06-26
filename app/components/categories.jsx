'use client'
// components/Categories.jsx
import { FaTshirt } from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";
import { MdWatch } from "react-icons/md";
import { PiSneakerFill } from "react-icons/pi";
import { FaBaby } from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Men",
    icon: FaTshirt,
  },
  {
    id: 2,
    title: "Women",
    icon: GiLargeDress,
  },
   {
    id: 3,
    title: "kids",
    icon: FaBaby,
  },
  {
    id:4,
    title: "Accessories",
    icon: MdWatch,
  },
];

 const Categories=()=>{
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
            Discover premium fashion collections designed
            for every style and occasion.
          </p>
        </div>

        <div className="grid grid-cols-2  lg:grid-cols-4 gap-2">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group cursor-pointer bg-white border border-gray-300 rounded-2xl p-3 hover:bg-black transition-all duration-300"
              >
                <Icon
                  size={40}
                  className="text-[#E17100] mx-auto mb-4"
                />

                <h3 className="text-xl text-gray-600 font-semibold text-center group-hover:text-white">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Categories