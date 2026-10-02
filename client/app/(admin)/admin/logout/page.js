"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "@/lib/api/api";

export default function LogoutPage() {
  const router = useRouter();
  const [logout, { isLoading }] = useLogoutMutation();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setError("");
    try {
      await logout().unwrap();
      router.replace("/signin");
    } catch (requestError) {
      setError(requestError.data?.message || "Could not sign out. Try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F9FC] p-4">
      <section className="w-full max-w-md border border-[#E5E7EB] bg-white p-8 text-center shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-soft text-slate">
          <LogOut size={24} />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate">Ready to leave?</h1>
        <p className="mt-2 text-sm leading-6 text-gray">
          Sign out of your VibeMood admin session.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
          className="mt-6 inline-flex items-center gap-2 bg-[#6C3FEA] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5930D4] disabled:opacity-60"
        >
          <LogOut size={17} /> {isLoading ? "Signing out..." : "Sign out"}
        </button>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}
