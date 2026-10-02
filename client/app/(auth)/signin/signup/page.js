"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useRegenerateOtpMutation,
  useSignUpMutation,
  useVerifyOtpMutation,
} from "@/lib/api/api";

const SignUpPage = () => {
  const router = useRouter();
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [regenerateOtp, { isLoading: isResending }] =
    useRegenerateOtpMutation();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [needsOtp, setNeedsOtp] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      if (needsOtp) {
        await verifyOtp({ email: form.email, otp: form.otp }).unwrap();
        router.push("/signin");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      await signUp({
        fullname: form.fullname,
        email: form.email,
        password: form.password,
      }).unwrap();
      setNeedsOtp(true);
      setMessage("Enter the verification code sent to your email.");
    } catch (requestError) {
      setError(requestError.data?.message || "Could not complete sign up.");
    }
  };

  const resendCode = async () => {
    setError("");
    try {
      await regenerateOtp({ email: form.email }).unwrap();
      setMessage("A new verification code was sent.");
    } catch (requestError) {
      setError(requestError.data?.message || "Could not resend the code.");
    }
  };

  return (
    <section className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-black items-center justify-center p-12">
        <div>
          <h1 className="text-6xl font-bold text-white">
            Vibe<span className="text-[#6C3FEA]">Mood</span>
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
          <p className="text-[#6C3FEA] font-semibold uppercase tracking-widest">
            Create Account
          </p>

          <h2 className="text-4xl font-bold mt-2">Sign Up</h2>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block mb-2 font-medium">Full Name</label>

              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full border rounded-lg p-4 outline-none focus:border-[#6C3FEA]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full border rounded-lg p-4 outline-none focus:border-[#6C3FEA]"
              />
            </div>

            {!needsOtp ? (
              <>
                <div>
                  <label className="block mb-2 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password"
                    className="w-full border rounded-lg p-4 outline-none focus:border-[#6C3FEA]"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    className="w-full border rounded-lg p-4 outline-none focus:border-[#6C3FEA]"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block mb-2 font-medium">
                  Email verification code
                </label>
                <input
                  type="text"
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  required
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  className="w-full border rounded-lg p-4 outline-none focus:border-[#6C3FEA]"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSigningUp || isVerifying}
              className="w-full bg-[#6C3FEA] text-white py-4 rounded-lg font-semibold hover:bg-[#101827] transition"
            >
              {isSigningUp
                ? "Creating account..."
                : isVerifying
                  ? "Verifying..."
                  : needsOtp
                    ? "Verify email"
                    : "Create Account"}
            </button>
            {needsOtp && (
              <button
                type="button"
                disabled={isResending}
                onClick={resendCode}
                className="w-full py-2 text-sm font-semibold text-[#6C3FEA] disabled:opacity-60"
              >
                {isResending ? "Sending..." : "Resend verification code"}
              </button>
            )}
          </form>

          {message && (
            <p role="status" className="mt-4 text-sm text-green-700">
              {message}
            </p>
          )}
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {error}
            </p>
          )}

          <p className="text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-[#6C3FEA] font-semibold hover:underline"
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
