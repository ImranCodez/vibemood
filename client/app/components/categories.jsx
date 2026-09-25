"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const touchStart = useRef(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch("http://localhost:8000/category/getall", {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((result) => setCategories(result.data || []))
      .catch(() => setCategories([]));
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (categories.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveCategory((current) => (current + 1) % categories.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [categories.length]);

  const changeCategory = (direction) => {
    setActiveCategory(
      (current) =>
        (current + direction + categories.length) % categories.length,
    );
  };

  return (
    <section className="bg-[#f7f6f2] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e17000]">
              Find your mood
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Shop by category
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-bold underline decoration-[#e17000] underline-offset-4 sm:block"
          >
            View all
          </Link>
        </div>

        <div
          className="overflow-hidden px-1 py-3"
          onTouchStart={(event) => {
            touchStart.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            if (start === null) return;
            const distance = event.changedTouches[0].clientX - start;
            if (Math.abs(distance) > 35) changeCategory(distance < 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeCategory * 100}%)` }}
          >
            {categories.map((item) => (
              <div
                key={item.slug}
                className="flex min-w-full justify-center px-2"
              >
                <Link
                  href={`/shop?category=${item.slug}`}
                  className="group relative aspect-square w-[min(78vw,18rem)] overflow-hidden rounded-full bg-[#dedbd3] shadow-[0_12px_28px_rgba(21,21,21,0.10)] ring-4 ring-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(21,21,21,0.16)]"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-linear-to-t from-black/70 via-black/10 to-transparent px-2 pb-5 text-center text-white">
                    <h3 className="text-lg font-extrabold sm:text-xl">
                      {item.name}
                    </h3>
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:text-xs">
                      Explore
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {categories.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`Show ${item.name}`}
              aria-current={index === activeCategory}
              onClick={() => setActiveCategory(index)}
              className={`h-1.5 transition-all ${index === activeCategory ? "w-8 bg-[#e17000]" : "w-4 bg-[#c9c4bb] hover:bg-[#e17000]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Categories;
