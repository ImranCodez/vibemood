"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignInMutation } from "@/app/(admin)/services/api";

const SignInPage = () => {
  const router = useRouter();
  const [signIn, { isLoading, error }] = useSignInMutation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await signIn(credentials);
    if (!result.error) router.push("/admin");
  };

  return (
    <section className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-black items-center justify-center p-12">
        <div>
          <h1 className="text-6xl font-bold text-white">
            Vibe<span className="text-[#E17100]">Mood</span>
          </h1>

          <p className="text-gray-300 mt-6 text-lg max-w-md">
            Discover premium fashion collections designed for modern lifestyle.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <p className="text-[#E17100] font-semibold uppercase tracking-widest">
            Welcome Back
          </p>

          <h2 className="text-4xl font-bold mt-2">Sign In</h2>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-medium">Email</label>

              <input
                type="email"
                value={credentials.email}
                onChange={(event) =>
                  setCredentials((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder="Enter your email"
                className="w-full border rounded-lg p-4 outline-none focus:border-[#E17100]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Password</label>

              <input
                type="password"
                value={credentials.password}
                onChange={(event) =>
                  setCredentials((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                placeholder="Enter password"
                className="w-full border rounded-lg p-4 outline-none focus:border-[#E17100]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E17100] text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error.data?.message || "Sign in failed. Check your credentials."}
            </p>
          )}

          <p className="text-center mt-6 text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#E17100] font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
export default SignInPage;
