"use client";

import {
  LayoutDashboard,
  ShoppingBag,
  Boxes,
  Users,
  Folder,
  Settings,
  LogOut,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const menus = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    name: "Products",
    icon: ShoppingBag,
    href: "/admin/product",
  },
  {
    name: "Categories",
    icon: Folder,
    href: "/admin/categories",
  },
  {
    name: "Orders",
    icon: Boxes,
    href: "/admin/orders",
  },
  {
    name: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        className="fixed right-4 top-4 z-50 rounded-lg bg-[#1d1717] px-3 py-2 text-sm font-semibold text-white shadow-lg lg:hidden"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label="Toggle admin navigation"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close admin navigation"
        />
      )}
      <aside
        className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 w-[min(18rem,85vw)] bg-[#1d1717] p-5 text-white shadow-xl transition-transform lg:static lg:w-64 lg:translate-x-0 lg:p-6 lg:shadow-none`}
      >
        <Link
          href="/"
          className="mb-10 block text-3xl font-bold"
          onClick={() => setOpen(false)}
        >
          Vibe<span className="text-[#E17000]">Mood</span>
        </Link>

        <nav className="space-y-2" aria-label="Admin navigation">
          {menus.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${pathname === item.href ? "bg-[#E17000] text-white" : "text-white/70 hover:bg-[#E17000] hover:text-white"}`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/admin/logout"
          className="mt-20 flex items-center gap-3 text-sm font-medium text-gray-light transition hover:text-text-light"
        >
          <LogOut size={20} />
          Logout
        </Link>
      </aside>
    </>
  );
}
