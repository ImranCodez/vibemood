import React from "react";

const ContactPage = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#E17100] uppercase tracking-widest font-semibold">
            Contact Us
          </span>

          <h1 className="text-5xl font-bold mt-4">
            We'd Love To Hear From You
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-gray-300">
            Questions about orders, products, or partnerships? Our team is ready
            to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-bold text-[#000000c7] mb-8">Get In Touch</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-[#E17100] pl-4">
                <h3 className="font-semibold text-[#000000c7] text-lg">Email</h3>
                <p className="text-gray-600">imranhossaianratul@gmail.com</p>
              </div>

              <div className="border-l-4 border-[#E17100] pl-4">
                <h3 className="font-semibold text-[#000000c7] text-lg">Phone</h3>
                <p className="text-gray-600">+8801 60813 1058</p>
              </div>

              <div className="border-l-4 border-[#E17100] pl-4">
                <h3 className="font-semibold text-lg text-[#000000c7]">Address</h3>
                <p className="text-gray-600">Dhaka, Bangladesh</p>
              </div>

              <div className="border-l-4 border-[#E17100] pl-4">
                <h3 className="font-semibold text-lg text-[#000000c7]">Business Hours</h3>
                <p className="text-gray-600">Mon - Sat : 9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-[#000000c7]">Send A Message</h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none text-gray-600 focus:border-[#E17100]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border text-gray-600 border-gray-300 rounded-lg p-4 focus:outline-none focus:border-[#E17100]"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 text-gray-600 rounded-lg p-4 focus:outline-none focus:border-[#E17100]"
              />

              <textarea
                rows="6"
                placeholder="Your Message"
                className="w-full border text-gray-600 border-gray-300 rounded-lg p-4 focus:outline-none focus:border-[#E17100]"
              />

              <button
                type="submit"
                className="bg-[#E17100]  hover:bg-orange-600 transition text-white font-semibold px-8 py-4 rounded-lg w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
