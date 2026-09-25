require("dotenv").config();

const mongoose = require("mongoose");
const Category = require("../models/categorySchema");
const Product = require("../models/productSchema");

const categories = [
  {
    name: "Women",
    slug: "women",
    thumbnail:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",
    description: "Everyday womenswear with an easy, modern feel.",
  },
  {
    name: "Men",
    slug: "men",
    thumbnail:
      "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=900&q=85",
    description: "Relaxed menswear made for daily rotation.",
  },
  {
    name: "Kids",
    slug: "kids",
    thumbnail:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=85",
    description: "Comfortable, cheerful pieces for little explorers.",
  },
  {
    name: "New In",
    slug: "new-in",
    thumbnail:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    description: "The latest VibeMood arrivals.",
  },
];

const products = [
  {
    title: "Urban Canvas Overshirt",
    slug: "urban-canvas-overshirt",
    category: "men",
    price: 1890,
    discountpercentage: 20,
    thumbnail:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    description:
      "A structured cotton layer made for slow weekends and busy days.",
    tags: ["men", "overshirt", "new"],
    sku: "VM-MEN-001",
    color: "Olive",
    sizes: "l",
  },
  {
    title: "Studio Knit Set",
    slug: "studio-knit-set",
    category: "women",
    price: 2290,
    discountpercentage: 15,
    thumbnail:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
    description:
      "Soft texture and an easy silhouette for polished everyday dressing.",
    tags: ["women", "knit", "bestseller"],
    sku: "VM-WOM-001",
    color: "Cream",
    sizes: "m",
  },
  {
    title: "Mini Day Dress",
    slug: "mini-day-dress",
    category: "women",
    price: 1650,
    discountpercentage: 10,
    thumbnail:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    description:
      "A bright, breezy favorite with a relaxed fit and clean lines.",
    tags: ["women", "dress", "summer"],
    sku: "VM-WOM-002",
    color: "Blue",
    sizes: "s",
  },
  {
    title: "Little Camp Shirt",
    slug: "little-camp-shirt",
    category: "kids",
    price: 990,
    discountpercentage: 25,
    thumbnail:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=85",
    description:
      "Play-ready comfort in a cheerful cotton shirt for little explorers.",
    tags: ["kids", "shirt", "cotton"],
    sku: "VM-KID-001",
    color: "Yellow",
    sizes: "m",
  },
  {
    title: "Weekend Essential Tee",
    slug: "weekend-essential-tee",
    category: "men",
    price: 790,
    discountpercentage: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description:
      "The dependable heavyweight tee your wardrobe will keep reaching for.",
    tags: ["men", "basics"],
    sku: "VM-MEN-002",
    color: "White",
    sizes: "m",
  },
  {
    title: "Sunshine Hoodie",
    slug: "sunshine-hoodie",
    category: "kids",
    price: 1190,
    discountpercentage: 12,
    thumbnail:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=85",
    description:
      "A cozy layer in a sunny shade, made for after-school adventures.",
    tags: ["kids", "hoodie", "new"],
    sku: "VM-KID-002",
    color: "Orange",
    sizes: "l",
  },
];

async function seedCatalog() {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL is missing from server/.env");
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.DB_URL, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log("MongoDB connected. Writing catalog...");

  const categoryIds = new Map();
  for (const category of categories) {
    const saved = await Category.findOneAndUpdate(
      { slug: category.slug },
      { $set: { ...category, isActive: true } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    categoryIds.set(category.slug, saved._id);
  }

  for (const product of products) {
    await Product.findOneAndUpdate(
      { slug: product.slug },
      {
        $set: {
          title: product.title,
          description: product.description,
          category: categoryIds.get(product.category),
          price: product.price,
          discountpercentage: product.discountpercentage,
          thumbnail: product.thumbnail,
          images: [product.thumbnail],
          variants: [
            {
              sku: product.sku,
              color: product.color,
              sizes: product.sizes,
              stock: 25,
            },
          ],
          tags: product.tags,
          isActive: true,
        },
        $setOnInsert: { slug: product.slug },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }

  console.log(
    `Seeded ${categories.length} categories and ${products.length} products.`,
  );
  await mongoose.disconnect();
}

seedCatalog().catch(async (error) => {
  console.error("Catalog seed failed:", error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});
