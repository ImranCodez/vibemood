"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Cart", href: "/cart" },
  { label: "Profile", href: "/profile" },
  { label: "Admin", href: "/admin" },
];
const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const openCart = async () => {
    setCartOpen(true);
    try {
      const response = await fetch("http://localhost:8000/cart/getall", {
        credentials: "include",
      });
      const result = await response.json();
      setCartItems(result.data?.items || result.data?.cart?.items || []);
    } catch {
      setCartItems([]);
    }
  };

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-border bg-[#f7f6f2]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6 lg:gap-6">
          <div className="flex min-w-0 shrink-0 items-center gap-2 lg:gap-5">
            <div className="shrink-0 text-2xl font-extrabold tracking-tight text-slate sm:text-3xl">
              <Link href="/">
                Vibe<span className="text-[#e17000]">Mood</span>
              </Link>
              <nav
                className="hidden items-center gap-1 lg:flex"
                aria-label="Main navigation"
              >
                {navLinks.map((link) => (
                  <Link
                    className={`px-3 py-2 text-sm font-bold transition ${isActive(link.href) ? "text-[#e17000]" : "text-gray hover:text-slate"}`}
                    href={link.href}
                    key={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <label className="relative hidden min-w-0 flex-1 md:block lg:mx-auto lg:max-w-md">
            <span className="sr-only">Search products</span>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
            <input
              className="h-10 w-full rounded-lg border bg-background/80 pl-9 pr-3 text-sm outline-none focus:border-slate"
              placeholder="Search products..."
              type="search"
            />
          </label>
          <div className="ml-auto flex shrink-0 items-center justify-end gap-2">
            <button
              type="button"
              className="relative p-2.5 text-slate transition hover:text-[#e17000]"
              aria-label="Shopping cart"
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={2.2} />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e17000] px-1 text-[10px] font-bold text-white">
                0
              </span>
            </button>
            <Link
              className="p-2.5 text-slate transition hover:text-[#e17000]"
              href="/profile"
              aria-label="Your profile"
            >
              <UserRound className="h-5 w-5" />
            </Link>
          </div>
          <button
            className="rounded-lg p-2 text-slate lg:hidden"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {menuOpen && (
          <nav
            className="border-t border-border bg-surface/90 px-4 py-3 backdrop-blur-xl lg:hidden"
            aria-label="Mobile navigation"
          >
            <label className="relative mb-2 block md:hidden">
              <span className="sr-only">Search products</span>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
              <input
                className="h-11 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none focus:border-slate"
                placeholder="Search products"
                type="search"
              />
            </label>
            {navLinks.map((link) => (
              <Link
                className={`block border-b border-border py-3 text-sm font-semibold ${isActive(link.href) ? "bg-gray-soft text-slate" : "text-gray"}`}
                href={link.href}
                key={link.label}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2">
              <Link
                className="flex-1 rounded-lg border border-slate py-2 text-center text-sm font-semibold text-slate"
                href="/signin"
              >
                Sign in
              </Link>
              <Link
                className="flex-1 rounded-lg bg-slate py-2 text-center text-sm font-semibold text-text-light"
                href="/signup"
              >
                Sign up
              </Link>
            </div>
          </nav>
        )}
      </header>
      <div className="h-16" aria-hidden="true" />
      {cartOpen && (
        <>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[55] bg-black/30"
          />
          <aside className="fixed right-0 top-0 z-[60] flex h-full w-[min(24rem,92vw)] flex-col bg-white p-5 shadow-[-12px_0_40px_rgba(21,21,21,0.16)] animate-[slide-in-right_260ms_ease-out]">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e17000]">
                  Your selection
                </p>
                <h2 className="mt-1 text-2xl font-extrabold">Cart</h2>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setCartOpen(false)}
                className="p-2 text-gray hover:text-[#e17000]"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-5">
              {cartItems.length === 0 ? (
                <p className="py-12 text-center text-sm text-gray">
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between border-b border-border pb-4 text-sm"
                    >
                      <div>
                        <p className="font-bold">SKU {item.sku}</p>
                        <p className="mt-1 text-gray">
                          Quantity {item.quantity}
                        </p>
                      </div>
                      <span className="font-extrabold text-[#e17000]">
                        ৳ {Number(item.subtotal || 0).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/cart"
              onClick={() => setCartOpen(false)}
              className="w-full bg-[#e17000] px-5 py-3 text-center font-extrabold text-white hover:bg-[#151515]"
            >
              View full cart
            </Link>
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;
