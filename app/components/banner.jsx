
"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const Banner=()=>{
 const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 600,          // Slide animation duration (0.6s)
  autoplaySpeed: 2000, // Change slide every 2 seconds
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  pauseOnHover: true,
};

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
      <Slider {...settings}>
        {banners.map((banner) => (
          <div className="" key={banner.id}>
            <div
            className="relative h-[400px] md:h-[650px] bg-cover bg-center"
              style={{
                backgroundImage: `url(${banner.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60" />

              {/* Content */}
              <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
                <div className="max-w-2xl text-white">
                  <span className="text-[#E17100] uppercase tracking-[4px] font-semibold">
                    Premium Clothing
                  </span>

                  <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
                    {banner.title}
                  </h1>

                  <p className="mt-6 text-lg text-gray-200">
                    {banner.subtitle}
                  </p>

                  <div className="mt-8 flex gap-4">
                    <button className="bg-[#E17100] hover:bg-orange-600 transition px-8 py-4 rounded-lg font-semibold">
                      Shop Now
                    </button>

                    <button className="border border-white hover:bg-white hover:text-black transition px-8 py-4 rounded-lg font-semibold">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
export default Banner