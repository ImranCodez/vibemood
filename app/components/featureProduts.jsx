"use client";

import { useEffect, useState } from "react";

const FeaturedProducts=()=> {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=8");
        
        const data = await res.json();
        console.log(data.products);

        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Loading Products...</h2>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-[#e17000]/10 px-4 py-1 text-sm font-semibold text-[#e17000]">
            Featured Collection
          </span>

          <h2 className="mt-4 text-4xl font-bold text-black">
            Trending Products
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Discover our handpicked products crafted with premium quality and
            modern style.
          </p>
        </div>

        {/* Products */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border shadow-lg border-gray-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-[#e17000] hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-[#e17000] px-3 py-1 text-xs font-semibold text-white">
                  New
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-black">
                  {product.title}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#e17000]">
                    ${product.price}
                  </span>

                  <button className="rounded-full border border-black px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-14 text-center">
          <button className="rounded-lg bg-[#e17000] px-8 py-3 font-semibold text-white transition hover:bg-black">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
export default FeaturedProducts