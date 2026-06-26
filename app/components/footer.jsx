export default function Footer() {
  const quickLinks = [
    "Home",
    "Shop",
    "Categories",
    "About",
    "Contact",
  ];

  const customerService = [
    "My Account",
    "Orders",
    "Wishlist",
    "Shipping",
    "Returns",
  ];

  return (
    <footer className="bg-black text-gray-300">
      {/* Top */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              <span className="text-[#e17000]">Vibe</span>Mood
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Discover premium fashion with modern style, quality craftsmanship,
              and affordable prices. Elevate your everyday look.
            </p>

            <button className="mt-6 rounded-lg bg-[#e17000] px-6 py-3 font-medium text-white transition hover:bg-white hover:text-black">
              Shop Now
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition hover:text-[#e17000]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Customer Service
            </h3>

            <ul className="space-y-3">
              {customerService.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition hover:text-[#e17000]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Stay Updated
            </h3>

            <p className="mb-5 text-gray-400">
              Subscribe to receive new arrivals, offers, and exclusive updates.
            </p>

            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-[#e17000]"
              />

              <button
                className="w-full rounded-lg bg-[#e17000] py-3 font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-500 md:flex-row">
        <p>© 2026 VibeMood. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-[#e17000] transition">
            Privacy Policy
          </a>

          <a href="#" className="hover:text-[#e17000] transition">
            Terms & Conditions
          </a>

          <a href="#" className="hover:text-[#e17000] transition">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}