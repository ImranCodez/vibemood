export const demoProducts = [
  {
    _id: "demo-urban-overshirt",
    title: "Urban Canvas Overshirt",
    slug: "urban-canvas-overshirt",
    category: { name: "Men", slug: "men" },
    price: 1890,
    discountpercentage: 20,
    thumbnail:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    description:
      "A structured cotton layer made for slow weekends and busy days.",
    tags: ["men", "overshirt", "new"],
  },
  {
    _id: "demo-studio-knit",
    title: "Studio Knit Set",
    slug: "studio-knit-set",
    category: { name: "Women", slug: "women" },
    price: 2290,
    discountpercentage: 15,
    thumbnail:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
    description:
      "Soft texture and an easy silhouette for polished everyday dressing.",
    tags: ["women", "knit", "bestseller"],
  },
  {
    _id: "demo-mini-day-dress",
    title: "Mini Day Dress",
    slug: "mini-day-dress",
    category: { name: "Women", slug: "women" },
    price: 1650,
    discountpercentage: 10,
    thumbnail:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    description:
      "A bright, breezy favorite with a relaxed fit and clean lines.",
    tags: ["women", "dress", "summer"],
  },
  {
    _id: "demo-little-camp-shirt",
    title: "Little Camp Shirt",
    slug: "little-camp-shirt",
    category: { name: "Kids", slug: "kids" },
    price: 990,
    discountpercentage: 25,
    thumbnail:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=85",
    description:
      "Play-ready comfort in a cheerful cotton shirt for little explorers.",
    tags: ["kids", "shirt", "cotton"],
  },
  {
    _id: "demo-weekend-tee",
    title: "Weekend Essential Tee",
    slug: "weekend-essential-tee",
    category: { name: "Men", slug: "men" },
    price: 790,
    discountpercentage: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description:
      "The dependable heavyweight tee your wardrobe will keep reaching for.",
    tags: ["men", "basics"],
  },
  {
    _id: "demo-sunshine-hoodie",
    title: "Sunshine Hoodie",
    slug: "sunshine-hoodie",
    category: { name: "Kids", slug: "kids" },
    price: 1190,
    discountpercentage: 12,
    thumbnail:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=85",
    description:
      "A cozy layer in a sunny shade, made for after-school adventures.",
    tags: ["kids", "hoodie", "new"],
  },
];

export function withProductDefaults(product) {
  return {
    ...product,
    variants: product.variants?.length
      ? product.variants
      : [
          {
            sku: `demo-${product._id}`,
            color: "Default",
            sizes: "m",
            stock: 20,
          },
        ],
  };
}
