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
  const [activeSlide, setActiveSlide] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const touchStart = useRef(null);
  const slides = [banners[banners.length - 1], ...banners, banners[0]];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => current + 1);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setActiveSlide((current) => current + 1);
  };

  const previousSlide = () => {
    setActiveSlide((current) => current - 1);
  };

  return (
    <section
      className="bg-[#182235]"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 45) {
          if (distance < 0) nextSlide();
          else previousSlide();
        }
        touchStart.current = null;
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ containerType: "inline-size" }}
      >
        <div
          className={`flex ${transitionEnabled ? "transition-transform duration-700 ease-linear" : ""}`}
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget) return;
            if (activeSlide !== 0 && activeSlide !== banners.length + 1) return;

            // Reposition from a cloned edge slide without animating the track backward.
            setTransitionEnabled(false);
            setActiveSlide(activeSlide === 0 ? banners.length : 1);
            requestAnimationFrame(() => {
              requestAnimationFrame(() => setTransitionEnabled(true));
            });
          }}
          style={{
            transform: `translateX(calc(-${activeSlide} * 100cqi))`,
          }}
        >
          {slides.map((banner, index) => (
            <div key={`${banner.id}-${index}`} className="min-w-full">
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
                    <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#6C3FEA]">
                      The VibeMood edit · 2026
                    </span>

                    <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
                      Everyday pieces,{" "}
                      <span className="text-[#6C3FEA]">better.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-7 text-white/80 sm:text-lg">
                      {banner.subtitle}. Easy silhouettes, thoughtful details,
                      and a little more joy in your everyday rotation.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-[#6C3FEA] px-6 py-3.5 font-bold text-white transition hover:bg-[#5930D4] rounded-[7px] hover:text-white sm:px-8"
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
                aria-current={
                  dotIndex ===
                  (activeSlide - 1 + banners.length) % banners.length
                }
                onClick={() => setActiveSlide(dotIndex + 1)}
                className={`h-1.5 transition-all ${dotIndex === (activeSlide - 1 + banners.length) % banners.length ? "w-8 bg-[#6C3FEA]" : "w-4 bg-white/50 hover:bg-white"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
