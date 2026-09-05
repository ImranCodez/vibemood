"use client";

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

  return (
    <section>
      {banners.slice(0, 1).map((banner) => (
        <div key={banner.id}>
          <div
            className="relative h-[460px] bg-cover bg-center sm:h-[560px] md:h-[650px]"
            style={{
              backgroundImage: `url(${banner.image})`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
              <div className="max-w-2xl text-white">
                <span className="text-[#E17100] uppercase tracking-[4px] font-semibold">
                  Premium Clothing
                </span>

                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                  {banner.title}
                </h1>

                <p className="mt-5 max-w-xl text-base text-gray-200 sm:text-lg">
                  {banner.subtitle}
                </p>

                <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
                  <button className="rounded-lg bg-[#E17100] px-6 py-3 font-semibold transition hover:bg-orange-600 sm:px-8 sm:py-4">
                    Shop Now
                  </button>

                  <button className="rounded-lg border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-black sm:px-8 sm:py-4">
                    Explore
                  </button>
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
