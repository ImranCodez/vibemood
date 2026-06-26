import Link from "next/link";

const SignInPage=()=>{
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

          <h2 className="text-4xl font-bold mt-2">
            Sign In
          </h2>

          <form className="mt-8 space-y-5">
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

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="w-full border rounded-lg p-4 outline-none focus:border-[#E17100]"
              />
            </div>

            <button
              className="w-full bg-[#E17100] text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#E17100] font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
export default SignInPage