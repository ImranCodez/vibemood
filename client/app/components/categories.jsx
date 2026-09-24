"use client";
import Link from "next/link";

const categories = [
  {
    name: "Women",
    slug: "women",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Men",
    slug: "men",
    image:
      "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Kids",
    slug: "kids",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "New in",
    slug: "new",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85",
  },
];

const Categories = () => {
  return (
    <section className="bg-[#f7f8fb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7042df]">
              Find your mood
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Shop by category
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-bold underline decoration-[#7042df] underline-offset-4 sm:block"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-6 lg:gap-10">
          {categories.map((item) => (
            <Link
              key={item.slug}
              href={`/shop?category=${item.slug}`}
              className="group relative aspect-square w-full max-w-44 overflow-hidden rounded-full bg-[#e8ebf2] shadow-[0_8px_22px_rgba(23,32,51,0.08)] ring-4 ring-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(23,32,51,0.14)] sm:max-w-52"
            >
              <img
                src={item.image}
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
          ))}
        </div>
      </div>
    </section>
  );
};
export default Categories;
