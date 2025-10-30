// import React from 'react'

// function HomePage() {
//   return (
//     <div>HomePage</div>
//   )
// }

// export default HomePage

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Dr. Clean Facility Management Service
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Professional cleaning services for homes, offices, and industries.
          Experience hygiene, perfection, and care with our trusted team.
        </p>
        <Link
          to="/contact"
          className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100"
        >
          Get a Free Quote
        </Link>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            {
              title: "Water Tank Cleaning",
              img: "https://source.unsplash.com/400x300/?water,cleaning",
            },
            {
              title: "House & Office Cleaning",
              img: "https://source.unsplash.com/400x300/?office,cleaning",
            },
            {
              title: "Roof & Board Cleaning",
              img: "https://source.unsplash.com/400x300/?roof,cleaning",
            },
            {
              title: "Glass Cleaning",
              img: "https://source.unsplash.com/400x300/?glass,cleaning",
            },
            {
              title: "Staffing Solutions",
              img: "https://source.unsplash.com/400x300/?team,cleaning",
            },
            {
              title: "Disinfection Service",
              img: "https://source.unsplash.com/400x300/?disinfection,cleaning",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  We provide professional {service.title.toLowerCase()} with
                  advanced equipment and expert staff.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

     
    </>
  );
}

export default HomePage;
