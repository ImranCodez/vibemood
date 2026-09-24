"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  // this is my banner git
  return (
    <section className="bg-[#172033]">
      {banners.slice(0, 1).map((banner) => (
        <div key={banner.id}>
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
                <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#c7b5ff]">
                  The VibeMood edit · 2026
                </span>

                <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
                  Everyday pieces,{" "}
                  <span className="text-[#c7b5ff]">better.</span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-white/80 sm:text-lg">
                  {banner.subtitle}. Easy silhouettes, thoughtful details, and a
                  little more joy in your everyday rotation.
                </p>

                <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-[#7042df] px-6 py-3.5 font-bold text-white transition hover:bg-white hover:text-[#172033] sm:px-8"
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
    </section>
  );
};
export default Banner;
