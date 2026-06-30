"use client";
// components/Categories.jsx
// import { FaTshirt } from "react-icons/fa";
// import { GiLargeDress } from "react-icons/gi";
// import { MdWatch } from "react-icons/md";
// import { PiSneakerFill } from "react-icons/pi";
// import { FaBaby } from "react-icons/fa";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    const categoriesfetch = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        setcategorydata(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    categoriesfetch();
  }, []);
console.log(catgorydata);
const settings = {
  dots: true ,
  infinite: true,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow:1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
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

        <Slider {...settings}>
          {catgorydata.slice(0, 4).map((item) => (
            <div key={item.slug} className="px-2">
              <div className="group cursor-pointer bg-white border border-gray-300 rounded-2xl p-6 hover:bg-black transition-all duration-300">
                <h3 className="text-xl text-gray-600 font-semibold text-center group-hover:text-white">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
export default Categories;
