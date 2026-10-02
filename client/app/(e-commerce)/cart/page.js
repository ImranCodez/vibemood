"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import {
  useCheckoutMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "@/lib/api/api";

function getCart(result) {
  return result?.data?.cart || result?.data || result?.cart || null;
}

export default function CartPage() {
  const { data: cartResponse, isLoading, isError, error } = useGetCartQuery();
  const [updateCartRequest] = useUpdateCartMutation();
  const [checkout, { isLoading: isCheckingOut }] = useCheckoutMutation();
  const [message, setMessage] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [insideDhaka, setInsideDhaka] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const cart = getCart(cartResponse);
  const status = isLoading
    ? "loading"
    : isError && error?.status === 401
      ? "signin"
      : isError
        ? "error"
        : "ready";

  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartRequest({
        itemId: item._id,
        productId: item.product?._id || item.product,
        quantity,
      }).unwrap();
      setMessage("");
    } catch (updateError) {
      setMessage(updateError.data?.message || "Could not update your cart.");
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const result = await checkout({
        paymentyp: "cash",
        CartId: cart._id,
        deliveryCharge: insideDhaka ? 70 : 120,
        insideDhaka: String(insideDhaka),
        shippingAddress,
      }).unwrap();
      setOrderNumber(result.data?.orderNumber || "");
      setCheckoutOpen(false);
    } catch (checkoutError) {
      setMessage(checkoutError.data?.message || "Could not place the order.");
    }
  };

  const items = cart?.items || [];
  const total = items.reduce(
    (sum, item) => sum + Number(item.subtotal || 0),
    0,
  );
  const deliveryCharge = insideDhaka ? 70 : 120;

  return (
    <main className="min-h-[60vh] bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <ShoppingBag className="text-[#6C3FEA]" />
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
              className="mt-6 inline-flex bg-[#6C3FEA] px-5 py-3 text-sm font-bold text-white"
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
            <p className="mt-2 text-gray">
              {message || error?.data?.message || "The server is unavailable."}
            </p>
            <Link
              className="mt-6 inline-flex items-center gap-2 font-bold text-[#6C3FEA]"
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
              className="mt-6 inline-flex items-center gap-2 bg-[#6C3FEA] px-5 py-3 text-sm font-bold text-white"
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
                    <p className="mt-2 font-bold text-[#6C3FEA]">
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
                <span>৳ {(total + deliveryCharge).toLocaleString()}</span>
              </div>
              <p className="mt-2 text-xs text-gray">
                Includes ৳{deliveryCharge} delivery
              </p>
              {!checkoutOpen && !orderNumber && (
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(true)}
                  className="mt-6 w-full bg-[#6C3FEA] px-5 py-3 font-extrabold text-white hover:bg-[#101827]"
                >
                  Checkout
                </button>
              )}
              {checkoutOpen && (
                <form
                  onSubmit={placeOrder}
                  className="mt-6 space-y-4 border-t border-border pt-5"
                >
                  <label className="block text-sm font-semibold text-slate">
                    Shipping address
                    <textarea
                      required
                      value={shippingAddress}
                      onChange={(event) =>
                        setShippingAddress(event.target.value)
                      }
                      className="mt-2 min-h-24 w-full border border-border p-3 font-normal outline-none focus:border-[#6C3FEA]"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-slate">
                    Delivery area
                    <select
                      value={String(insideDhaka)}
                      onChange={(event) =>
                        setInsideDhaka(event.target.value === "true")
                      }
                      className="mt-2 w-full border border-border bg-white p-3 font-normal"
                    >
                      <option value="true">Inside Dhaka (৳70)</option>
                      <option value="false">Outside Dhaka (৳120)</option>
                    </select>
                  </label>
                  <p className="text-sm text-gray">Payment: Cash on delivery</p>
                  <button
                    disabled={isCheckingOut}
                    className="w-full bg-[#6C3FEA] px-5 py-3 font-extrabold text-white hover:bg-[#101827] disabled:opacity-60"
                  >
                    {isCheckingOut ? "Placing order..." : "Place order"}
                  </button>
                </form>
              )}
              {orderNumber && (
                <p
                  role="status"
                  className="mt-5 text-sm font-semibold text-green-700"
                >
                  Order {orderNumber} placed successfully.
                </p>
              )}
            </aside>
          </div>
        )}
        {message && status === "ready" && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
