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
    <section className="bg-[#f7f6f2] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ef6c2f]">
              Find your mood
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Shop by category
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-bold underline decoration-[#ef6c2f] underline-offset-4 sm:block"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((item) => (
            <Link
              key={item.slug}
              href={`/shop?category=${item.slug}`}
              className="group relative aspect-[0.9] overflow-hidden bg-[#dedbd3]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-4 pb-4 pt-12 text-white">
                <h3 className="text-xl font-extrabold">{item.name}</h3>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-widest text-white/70">
                  Explore edit
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
