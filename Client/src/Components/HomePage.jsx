import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-blue-900 text-white py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Professional Cleaning <br /> You Can Trust
        </h1>

        <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-200">
          Reliable home and office cleaning services with trained staff,
          modern equipment, and guaranteed satisfaction.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/services"
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            View Services
          </Link>

          <Link
            to="/about"
            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-900">
              100+ Happy Clients
            </h3>
            <p className="text-gray-600 text-sm">
              Trusted by families and businesses.
            </p>
          </div>

          <div className="bg-white p-8 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-900">
              Professional Team
            </h3>
            <p className="text-gray-600 text-sm">
              Skilled and trained cleaning experts.
            </p>
          </div>

          <div className="bg-white p-8 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-900">
              Affordable Pricing
            </h3>
            <p className="text-gray-600 text-sm">
              High-quality service at competitive rates.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-blue-900 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Book a Cleaning Service?
        </h2>

        <Link
          to="/services"
          className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </section>
    </>
  );
}

export default HomePage;