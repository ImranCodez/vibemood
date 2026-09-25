"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000";

function getCart(result) {
  return result?.data?.cart || result?.data || result?.cart || null;
}

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  const loadCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/getall`, {
        credentials: "include",
      });
      const result = await response.json();
      if (response.status === 401) {
        setStatus("signin");
        return;
      }
      if (!response.ok || result.success === false)
        throw new Error(result.message || "Could not load cart");
      setCart(getCart(result));
      setStatus("ready");
    } catch (error) {
      setMessage(error.message || "The server is unavailable.");
      setStatus("error");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return;
    const response = await fetch(`${API_URL}/cart/update`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: item._id,
        productId: item.product?._id || item.product,
        quantity,
      }),
    });
    if (response.ok) loadCart();
  };

  const items = cart?.items || [];
  const total = items.reduce(
    (sum, item) => sum + Number(item.subtotal || 0),
    0,
  );

  return (
    <main className="min-h-[60vh] bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <ShoppingBag className="text-[#ef6c2f]" />
          <h1 className="text-3xl font-extrabold tracking-tight text-slate">
            Your cart
          </h1>
        </div>

        {status === "loading" && (
          <p className="mt-8 text-gray">Loading your cart...</p>
        )}
        {status === "signin" && (
          <section className="mt-8 border border-border bg-surface p-8 text-center sm:p-14">
            <h2 className="text-xl font-extrabold text-slate">
              Sign in to see your cart
            </h2>
            <p className="mx-auto mt-2 max-w-md text-gray">
              Your saved products are connected to your account.
            </p>
            <Link
              className="mt-6 inline-flex bg-[#ef6c2f] px-5 py-3 text-sm font-bold text-white"
              href="/signin"
            >
              Sign in
            </Link>
          </section>
        )}
        {status === "error" && (
          <section className="mt-8 border border-border bg-surface p-8 text-center sm:p-14">
            <h2 className="text-xl font-extrabold text-slate">
              Cart unavailable
            </h2>
            <p className="mt-2 text-gray">{message}</p>
            <Link
              className="mt-6 inline-flex items-center gap-2 font-bold text-[#ef6c2f]"
              href="/shop"
            >
              <ArrowLeft size={16} /> Continue shopping
            </Link>
          </section>
        )}
        {status === "ready" && items.length === 0 && (
          <section className="mt-8 border border-border bg-surface p-8 text-center sm:p-14">
            <h2 className="text-xl font-extrabold text-slate">
              Your cart is waiting
            </h2>
            <p className="mx-auto mt-2 max-w-md text-gray">
              Browse the collection and add pieces you love.
            </p>
            <Link
              className="mt-6 inline-flex items-center gap-2 bg-[#ef6c2f] px-5 py-3 text-sm font-bold text-white"
              href="/shop"
            >
              <ArrowLeft size={16} /> Continue shopping
            </Link>
          </section>
        )}
        {status === "ready" && items.length > 0 && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
            <section className="divide-y divide-border border border-border bg-surface">
              {items.map((item) => (
                <div key={item._id} className="flex gap-4 p-4 sm:p-6">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-gray-soft text-xs font-bold text-gray sm:h-28 sm:w-28">
                    {item.sku}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-extrabold text-slate">
                      Product{" "}
                      {String(item.product?._id || item.product).slice(-6)}
                    </p>
                    <p className="mt-1 text-sm text-gray">SKU: {item.sku}</p>
                    <p className="mt-2 font-bold text-[#ef6c2f]">
                      ৳ {Number(item.subtotal || 0).toLocaleString()}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        aria-label="Decrease quantity"
                        className="border border-border p-1.5"
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        className="border border-border p-1.5"
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
            <aside className="h-fit border border-border bg-surface p-5 sm:p-6">
              <h2 className="text-lg font-extrabold">Order summary</h2>
              <div className="mt-5 flex justify-between border-b border-border pb-4 text-sm text-gray">
                <span>Items</span>
                <span>{cart.totalItems || items.length}</span>
              </div>
              <div className="mt-4 flex justify-between text-lg font-extrabold">
                <span>Total</span>
                <span>৳ {total.toLocaleString()}</span>
              </div>
              <button className="mt-6 w-full bg-[#ef6c2f] px-5 py-3 font-extrabold text-white hover:bg-[#151515]">
                Ready to checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
