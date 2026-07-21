import Link from "next/link";
import { useState } from "react";

const SignUpPage = () => {
const [userdata,setuserdata]=useState("ofifjdbdkjbdskjdkjb")
console.log(userdata);
  return (
    <section className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-black items-center justify-center p-12">
        <div>
          <h1 className="text-6xl font-bold text-white">
            Vibe<span className="text-[#E17100]">Mood</span>
          </h1>

          <p className="text-gray-300 mt-6 text-lg max-w-md">
            Join the VibeMood family and explore premium fashion collections
            crafted for your everyday style.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <p className="text-[#E17100] font-semibold uppercase tracking-widest">
            Create Account
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Sign Up
          </h2>

          <form className="mt-8 space-y-5">
            {/* Full Name */}
            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border rounded-lg p-4 outline-none focus:border-[#E17100]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg p-4 outline-none focus:border-[#E17100]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full border rounded-lg p-4 outline-none focus:border-[#E17100]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border rounded-lg p-4 outline-none focus:border-[#E17100]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E17100] text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-[#E17100] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;