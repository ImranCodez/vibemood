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
        className="fixed right-4 top-4 z-50 border border-[#e5e2dc] bg-white px-3 py-2 text-sm font-extrabold text-[#151515] shadow-[0_8px_24px_rgba(21,21,21,0.08)] lg:hidden"
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
        className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 w-[min(18rem,85vw)] border-r border-[#e5e2dc] bg-white p-5 text-[#151515] shadow-[8px_0_30px_rgba(21,21,21,0.06)] transition-transform lg:static lg:w-64 lg:translate-x-0 lg:p-6 lg:shadow-none`}
      >
        <Link
          href="/"
          className="mb-10 block text-3xl font-extrabold tracking-tight"
          onClick={() => setOpen(false)}
        >
          Vibe<span className="text-[#ef6c2f]">Mood</span>
        </Link>

        <nav className="space-y-2" aria-label="Admin navigation">
          {menus.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-bold transition ${pathname === item.href ? "bg-[#ef6c2f] text-white" : "text-[#77746f] hover:bg-[#fff0e9] hover:text-[#151515]"}`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/admin/logout"
          className="mt-20 flex items-center gap-3 text-sm font-bold text-[#77746f] transition hover:text-[#ef6c2f]"
        >
          <LogOut size={20} />
          Logout
        </Link>
      </aside>
    </>
  );
}
