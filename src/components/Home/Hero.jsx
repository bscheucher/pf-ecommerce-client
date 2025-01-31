import React from "react";

function Hero() {
  return (
    <div className="relative bg-gray-900">
      <div className="relative h-96 md:h-[500px]">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero Banner"
          className="hero-banner"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>
      </div>
      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Discover Your Next Favorite Product
        </h1>
        <p className="text-lg md:text-xl font-medium mb-6 max-w-2xl">
          Browse through our exclusive collection of top-rated products and get
          amazing deals today.
        </p>
        <div>
          <a
            href="/products"
            className="px-2 py-1 text-lg font-medium bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
