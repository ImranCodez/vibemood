import React from 'react'

const AboutPage=()=> {
  return (
    <main className="bg-white text-black">
      {/* Hero Section */}
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#E17100] uppercase tracking-widest font-semibold">
            Our Story
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-4">
            Fashion That Speaks Confidence
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-gray-300 text-lg">
            We create premium clothing designed for people who value style,
            comfort, and individuality. Every piece is crafted to help you
            express yourself with confidence.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Built For Modern Fashion
            </h2>

            <p className="text-gray-600 mb-6">
              Our brand started with a simple mission: create high-quality
              clothing that combines timeless design with modern trends.
            </p>

            <p className="text-gray-600 mb-6">
              From casual essentials to statement pieces, every product is
              carefully selected to deliver exceptional comfort, durability,
              and style.
            </p>

            <p className="text-gray-600">
              We believe fashion isn't just about clothing—it's about
              confidence, identity, and making a lasting impression.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
              alt="Fashion Store"
              className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#E17100] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center text-white">
          <div>
            <h3 className="text-4xl font-bold">10K+</h3>
            <p>Happy Customers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p>Premium Products</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">50+</h3>
            <p>Fashion Collections</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">24/7</h3>
            <p>Customer Support</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Our Mission
          </h2>

          <p className="text-gray-600 text-lg">
            To make premium fashion accessible, empowering people to look and
            feel their best every day.
          </p>
        </div>
      </section>
    </main>
  );
}

export default AboutPage