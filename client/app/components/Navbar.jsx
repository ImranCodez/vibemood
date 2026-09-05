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
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-border bg-surface/75 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6 lg:gap-6">
          <div className="flex min-w-0 shrink-0 items-center gap-2 lg:gap-5">
            <div className="shrink-0 text-2xl font-black text-slate sm:text-3xl">
              <Link href="/">
                Vibe<span className="text-[#E17100]">Mood</span>
              </Link>
              <nav
                className="hidden items-center gap-1 lg:flex"
                aria-label="Main navigation"
              >
                {navLinks.map((link) => (
                  <Link
                    className={`rounded-lg px-3 py-2 text-sm hover:bg-gray-500 font-semibold transition ${isActive(link.href) ? "bg-slate-400 text-text-light" : "text-gray hover:bg-gray-soft hover:text-slate"}`}
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
            <Link
              className="relative rounded-lg p-2.5 text-slate bg-gray-300 transition hover:bg-gray-500"
              href="/cart"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={2.2} />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-slate px-1 text-[15px] font-bold text-[#E17100]">
                0
              </span>
            </Link>
            <Link
              className="rounded-lg bg-slate-300 p-2.5  transition hover:bg-slate-500"
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
    </>
  );
};

export default Navbar;
