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
        className="fixed right-4 top-4 z-50 border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-extrabold text-[#101827] shadow-[0_8px_24px_rgba(16,24,39,0.08)] lg:hidden"
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
        className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 w-[min(18rem,85vw)] border-r border-[#E5E7EB] bg-white p-5 text-[#101827] shadow-[8px_0_30px_rgba(16,24,39,0.06)] transition-transform lg:static lg:w-64 lg:translate-x-0 lg:p-6 lg:shadow-none`}
      >
        <Link
          href="/"
          className="mb-10 block text-3xl font-extrabold tracking-tight"
          onClick={() => setOpen(false)}
        >
          Vibe<span className="text-[#6C3FEA]">Mood</span>
        </Link>

        <nav className="space-y-2" aria-label="Admin navigation">
          {menus.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center rounded-lg gap-3 px-4 py-3 text-sm font-bold transition ${pathname === item.href || pathname.startsWith(`${item.href}/`) ? "bg-[#6C3FEA] text-white" : "text-[#667085] hover:bg-[#cfc7ee] hover:text-[#101827]"}`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/admin/logout"
          className="mt-20 flex items-center gap-3 text-sm font-bold text-[#af1717f3] transition hover:text-[#6C3FEA]"
        >
          <LogOut className="text-[#fa1212]" size={20} />
          Logout
        </Link>
      </aside>
    </>
  );
}
