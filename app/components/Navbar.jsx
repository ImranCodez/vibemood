"use client";
import React from "react";
import Link from "next/link";

const navLinks = [
{ label: "Home", href: "/" },
{ label: "Shop", href: "/shop" },
{ label: "Cart", href: "/cart" },
{ label: "Profile", href: "/profile" },
{ label: "Admin", href: "/admin/dashboard" },
];
const Navbar = () => {




  return (
    <div className="w-full fixed top-0 left-0 z-50 p-3 bg-[#e17000] text-[15px] flex justify-between ">
      <div>
        <Link className="text-3xl p-1.5" href={"/"}>
          Vibe
          <span className="text-[#000000c7] font-bold italic text-[40px]">
            Mood
          </span>
        </Link>
        <div>
          <div className="flex gap-3"> 
            <Link className="p-2 bg-black text-" href={"/"} >Home</Link>
            <Link href={"/"} >cart</Link>
            <Link href={"/"} >shop</Link>
            <Link href={"/"} >profile</Link>
            <Link href={"/"} >admin</Link>
          </div>
        </div>
      </div>
      <div>
        <div><input className="w-[330px] h-[40px] rounded-[7px] text-gray-600 bg-white pl-[10px] mt-[20px]" placeholder="search your product......" type="text" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex justify-center items-center gap-1 rounded-[7px] h-[50px] mt-[17px] bg-amber-100">
          <span className="hover:text-white hover:bg-black p-2 rounded-[7px] text-[15px] text-[#000000e0] transition-[.4s]">
            <Link href="/signin">signin</Link>
          </span>
          <span className="hover:text-white hover:bg-black p-2 rounded-[7px] text-[15px] text-[#000000e0] transition-[.4s]">
           <Link href="/signup">signup</Link>
          </span>
        </div>
      
      </div>
    </div>
  );
};

export default Navbar;
