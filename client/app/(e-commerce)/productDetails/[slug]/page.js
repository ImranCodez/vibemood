"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:8000";

function getProduct(data) {
  if (Array.isArray(data)) return data[0];
  return data?.product || data?.products?.[0] || data;
}

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!slug) return;

    const loadProduct = async () => {
      try {
        setStatus("loading");
        const response = await fetch(
          `${API_URL}/product/prodcutdetails/${encodeURIComponent(slug)}`,
          { credentials: "include" },
        );
        const result = await response.json();
        if (!response.ok || result.success === false) {
          throw new Error(result.message || "Product not found");
        }
        const loadedProduct = getProduct(result.data);
        if (!loadedProduct) throw new Error("Product not found");
        setProduct(loadedProduct);
        setStatus("ready");
      } catch (error) {
        setMessage(error.message);
        setStatus("error");
      }
    };

    loadProduct();
  }, [slug]);

  const images = useMemo(
    () =>
      product
        ? [product.thumbnail, ...(product.images || [])].filter(Boolean)
        : [],
    [product],
  );
  const variants = product?.variants || [];
  const variant = variants[selectedVariant];
  const discountedPrice = product
    ? product.price * (1 - (product.discountpercentage || 0) / 100)
    : 0;

  const addToCart = async () => {
    if (!variant) return;
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          sku: variant.sku,
          quantity,
        }),
      });
      const result = await response.json();
      if (response.status === 401) {
        setMessage("Please sign in to add items to your cart.");
      } else if (!response.ok || result.success === false) {
        setMessage(result.message || "Could not add this item.");
      } else {
        setMessage("Added to your cart.");
      }
    } catch {
      setMessage("The server is unavailable. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <main className="min-h-[60vh] bg-background px-4 py-16 text-center text-gray">
        Loading product...
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-[60vh] bg-background px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate">Product unavailable</h1>
        <p className="mt-2 text-gray">{message}</p>
        <Link
          className="mt-6 inline-flex items-center gap-2 font-semibold text-[#E17100]"
          href="/shop"
        >
          <ArrowLeft size={16} /> Back to shop
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray hover:text-slate"
          href="/shop"
        >
          <ArrowLeft size={16} /> Back to shop
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <section className="grid gap-4 sm:grid-cols-[88px_1fr]">
            <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-soft ${selectedImage === index ? "border-[#E17100]" : "border-transparent"}`}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={image}
                    alt=""
                  />
                </button>
              ))}
            </div>
            <div className="order-1 aspect-[4/5] overflow-hidden rounded-xl bg-gray-soft sm:order-2">
              <img
                className="h-full w-full object-cover"
                src={images[selectedImage]}
                alt={product.title}
              />
            </div>
          </section>

          <section className="self-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#E17100]">
              {product.category?.name || "VibeMood collection"}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate sm:text-5xl">
              {product.title}
            </h1>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountpercentage > 0 && (
                <>
                  <span className="text-lg text-gray line-through">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-[#E17100]">
                    {product.discountpercentage}% off
                  </span>
                </>
              )}
            </div>
            <p className="mt-6 leading-7 text-gray">{product.description}</p>

            {variants.length > 0 && (
              <div className="mt-8 border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-slate">Choose a variant</h2>
                  <span className="text-sm text-gray">
                    {variant.stock} available
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {variants.map((item, index) => (
                    <button
                      key={item.sku}
                      type="button"
                      disabled={item.stock < 1}
                      onClick={() => {
                        setSelectedVariant(index);
                        setQuantity(1);
                      }}
                      className={`rounded-lg border p-3 text-left text-sm ${selectedVariant === index ? "border-[#E17100] bg-[#E17100]/5" : "border-border"} disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      <span className="block font-semibold text-slate">
                        {item.color} / {item.sizes}
                      </span>
                      <span className="mt-1 block text-gray">
                        {item.stock > 0 ? `${item.stock} in stock` : "Sold out"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex h-12 items-center rounded-lg border border-border bg-surface">
                <button
                  className="p-3 text-slate disabled:opacity-40"
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-semibold text-slate">
                  {quantity}
                </span>
                <button
                  className="p-3 text-slate disabled:opacity-40"
                  type="button"
                  aria-label="Increase quantity"
                  disabled={!variant || quantity >= variant.stock}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-slate px-6 font-semibold text-text-light hover:bg-slate-light disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                disabled={!variant || variant.stock < 1}
                onClick={addToCart}
              >
                <ShoppingBag size={18} /> Add to cart
              </button>
            </div>
            {message && (
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#E17100]">
                <Check size={16} /> {message}
              </p>
            )}
            {product.tags?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    className="rounded-full bg-gray-soft px-3 py-1 text-xs font-semibold text-gray"
                    key={tag}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
