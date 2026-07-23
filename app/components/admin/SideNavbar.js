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
  return (
    <aside className="w-75 bg-[#1d1717] text-white min-h-screen p-6">
      <Link   href={"/"} className="text-3xl font-bold mb-10">
        Vibe<span className="text-[#E17000]">Mood</span>
      </Link>

      <div className="space-y-2">
        {menus.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-[#E17000] transition"
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </div>

      <button className="mt-20 flex items-center gap-3 text-red-400 hover:text-red-300">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}