import React from "react";
import { Link } from "react-router-dom";

function Footer1() {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">
            Dr. Clean Facility Management
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Professional cleaning services for homes, offices and commercial
            spaces in Cherthala & Alappuzha.
          </p>

          <div className="mt-4 space-y-1 text-sm">
            <p>📞 9645659427</p>
            <p>📞 9847093666</p>
            <p>📍 Cherthala, Alappuzha, Kerala – 688526</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="space-y-2 text-sm">
            <Link to="/" className="block hover:text-yellow-400 transition">
              Home
            </Link>
            <Link to="/services" className="block hover:text-yellow-400 transition">
              Services
            </Link>
            <Link to="/about" className="block hover:text-yellow-400 transition">
              About
            </Link>
            <Link to="/contact" className="block hover:text-yellow-400 transition">
              Contact
            </Link>
          </div>
        </div>

        {/* Services List (SEO Boost) */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>House Cleaning</li>
            <li>Office Cleaning</li>
            <li>Water Tank Cleaning</li>
            <li>Window Cleaning</li>
            <li>Roof Washing</li>
            <li>Pest Control</li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 mt-10 pt-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} Dr. Clean Facility Management Service. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer1;