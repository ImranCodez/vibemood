"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Banner = () => {
  const banners = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
      title: "New Summer Collection",
      subtitle: "Premium Fashion For Modern Style",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
      title: "Up To 50% Off",
      subtitle: "Exclusive Deals On Trending Outfits",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
      title: "Luxury Streetwear",
      subtitle: "Designed For Confidence",
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStart = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % banners.length);
  };

  return (
    <section
      className="bg-[#171717]"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 45) {
          if (distance < 0) nextSlide();
          else
            setActiveSlide(
              (current) => (current - 1 + banners.length) % banners.length,
            );
        }
        touchStart.current = null;
      }}
    >
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full">
              <div
                className="relative min-h-132.5 bg-cover bg-center sm:min-h-150"
                style={{
                  backgroundImage: `url(${banner.image})`,
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/35 to-black/10" />

                {/* Content */}
                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
                  <div className="max-w-xl text-white">
                    <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff8a51]">
                      The VibeMood edit · 2026
                    </span>

                    <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
                      Everyday pieces,{" "}
                      <span className="text-[#ff8a51]">better.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-7 text-white/80 sm:text-lg">
                      {banner.subtitle}. Easy silhouettes, thoughtful details,
                      and a little more joy in your everyday rotation.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-[#e17000] px-6 py-3.5 font-bold text-white transition hover:bg-white hover:text-black sm:px-8"
                      >
                        Shop Now
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center sm:bottom-8">
          <div className="flex items-center gap-2">
            {banners.map((item, dotIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show banner ${dotIndex + 1}`}
                aria-current={dotIndex === activeSlide}
                onClick={() => setActiveSlide(dotIndex)}
                className={`h-1.5 transition-all ${dotIndex === activeSlide ? "w-8 bg-[#e17000]" : "w-4 bg-white/50 hover:bg-white"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
