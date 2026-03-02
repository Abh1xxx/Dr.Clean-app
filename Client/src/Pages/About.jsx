export default function About() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4 space-y-20">

      {/* HERO ABOUT SECTION */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-900">
          About Dr. Clean Facility Management
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Dr. Clean Facility Management Service provides professional cleaning
          solutions for homes, offices, and commercial spaces in 
          <span className="font-semibold"> Cherthala and Alappuzha district</span>.
          We focus on hygiene, precision, and complete customer satisfaction.
        </p>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Our trained team uses modern equipment and safe cleaning methods
          to deliver high-quality results at affordable prices.
        </p>
      </section>


      {/* SERVICES HIGHLIGHT */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-900 mb-8 text-center">
          Our Core Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            "House Cleaning",
            "Office Cleaning",
            "Water Tank Cleaning",
            "Window Cleaning",
            "Roof Washing",
            "Pest Control",
            "Furniture Washing",
            "Commercial Cleaning",
            "General Area Cleaning",
          ].map((service) => (
            <div
              key={service}
              className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-blue-900">{service}</h3>
            </div>
          ))}
        </div>
      </section>


      {/* WHY CHOOSE US */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-900 mb-8 text-center">
          Why Choose Dr. Clean
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="font-semibold mb-2 text-blue-900">
              ✔ Professional & Trained Staff
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Skilled cleaning professionals with hands-on experience and
              modern tools.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="font-semibold mb-2 text-blue-900">
              ✔ Affordable & Transparent Pricing
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Competitive pricing with no hidden charges.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="font-semibold mb-2 text-blue-900">
              ✔ Reliable & On-Time Service
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We respect your time and ensure timely completion of work.
            </p>
          </div>
        </div>
      </section>


      {/* CONTACT SECTION */}
      <section className="bg-blue-900 text-white rounded-2xl p-10 text-center space-y-6">
        <h2 className="text-3xl font-bold">
          Get Professional Cleaning Today
        </h2>

        <p className="text-white/90">
          Serving Cherthala, Alappuzha & nearby areas.
        </p>

        <div className="space-y-2 text-lg font-semibold">
          <p>📞 9645659427</p>
          <p>📞 9847093666</p>
        </div>

        <a
          href="tel:9645659427"
          className="inline-block mt-4 bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Call Now
        </a>
      </section>

    </div>
  );
}