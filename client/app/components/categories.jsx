"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGetCategoriesQuery } from "@/lib/api/api";

const Categories = () => {
  const { data: categoriesResponse } = useGetCategoriesQuery();
  const categories = categoriesResponse?.data || [];
  const [activeCategory, setActiveCategory] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const touchStart = useRef(null);
  const visibleCount = Math.min(3, categories.length);
  const canLoop = categories.length > visibleCount;
  const cloneCount = canLoop ? visibleCount : 0;
  const slides = canLoop
    ? [
        ...categories.slice(-visibleCount),
        ...categories,
        ...categories.slice(0, visibleCount),
      ]
    : categories;

  useEffect(() => {
    if (!canLoop) return undefined;
    const timer = window.setInterval(() => {
      setActiveCategory((current) => current + 1);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [canLoop]);

  useEffect(() => {
    if (!canLoop || (activeCategory >= 0 && activeCategory < categories.length))
      return undefined;

    const timer = window.setTimeout(() => {
      setTransitionEnabled(false);
      setActiveCategory((current) =>
        current < 0 ? current + categories.length : current - categories.length,
      );
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true));
      });
    }, 750);

    return () => window.clearTimeout(timer);
  }, [activeCategory, canLoop, categories.length]);

  const changeCategory = (direction) => {
    if (!canLoop) return;
    setActiveCategory((current) => current + direction);
  };

  return (
    <section className="bg-[#F8F9FC] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6C3FEA]">
              Find your mood
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Shop by category
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-bold underline decoration-[#6C3FEA] underline-offset-4 sm:block"
          >
            View all
          </Link>
        </div>

        <div
          className="overflow-hidden px-1 py-3"
          style={{ containerType: "inline-size" }}
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
            className={`flex ${transitionEnabled ? "transition-transform duration-700 ease-linear" : ""}`}
            style={{
              transform: `translateX(calc(-${activeCategory + cloneCount} * (100cqi / 3)))`,
            }}
          >
            {slides.map((item, index) => (
              <div
                key={`${item.slug}-${index}`}
                className="w-1/3 flex-none px-2"
              >
                <Link
                  href={`/shop?category=${item.slug}`}
                  className="group relative mx-auto block aspect-square w-full max-w-72 overflow-hidden rounded-full bg-[#F1EDFF] shadow-[0_12px_28px_rgba(16,24,39,0.10)] ring-4 ring-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(16,24,39,0.16)]"
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
        {canLoop && (
          <div className="mt-6 flex justify-center gap-2">
            {categories.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                aria-label={`Show ${item.name}`}
                aria-current={
                  index ===
                  ((activeCategory % categories.length) + categories.length) %
                    categories.length
                }
                onClick={() => setActiveCategory(index)}
                className={`h-1.5 transition-all ${index === activeCategory ? "w-8 bg-[#6C3FEA]" : "w-4 bg-[#E5E7EB] hover:bg-[#6C3FEA]"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default Categories;
