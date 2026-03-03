export default function About() {
  const coreServices = [
    "House Cleaning",
    "Office Cleaning",
    "Water Tank Cleaning",
    "Window Cleaning",
    "Roof Washing",
    "Pest Control",
    "Furniture Washing",
    "Commercial Cleaning",
    "General Area Cleaning",
  ];

  const highlights = [
    {
      title: "Professional and Trained Staff",
      text: "Skilled cleaning professionals with hands-on experience and modern tools.",
    },
    {
      title: "Affordable and Transparent Pricing",
      text: "Competitive pricing with no hidden charges.",
    },
    {
      title: "Reliable and On-Time Service",
      text: "We respect your time and ensure timely completion of work.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-10">
        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 text-center shadow-sm">
          <p className="text-xs tracking-[0.2em] uppercase text-blue-700 font-semibold">About Us</p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            About Dr. Clean Facility Management
          </h1>

          <p className="text-slate-600 max-w-3xl mx-auto mt-4 leading-relaxed">
            Dr. Clean Facility Management Service provides professional cleaning solutions for
            homes, offices, and commercial spaces in Cherthala and Alappuzha district. We focus
            on hygiene, precision, and complete customer satisfaction.
          </p>

          <p className="text-slate-600 max-w-3xl mx-auto mt-3 leading-relaxed">
            Our trained team uses modern equipment and safe cleaning methods to deliver
            high-quality results at affordable prices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-5">Our Core Services</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreServices.map((service) => (
              <div
                key={service}
                className="bg-white border border-slate-200 shadow-sm rounded-xl p-5"
              >
                <h3 className="font-semibold text-blue-900">{service}</h3>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-5">Why Choose Dr. Clean</h2>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {highlights.map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 shadow-sm rounded-xl p-6">
                <h3 className="font-semibold text-blue-900">{item.title}</h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-8 md:p-10 text-center space-y-4 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold">Get Professional Cleaning Today</h2>

          <p className="text-blue-100">Serving Cherthala, Alappuzha and nearby areas.</p>

          <div className="space-y-1 text-lg font-semibold">
            <p>9645659427</p>
            <p>9847093666</p>
          </div>

          <a
            href="tel:9645659427"
            className="inline-block mt-2 bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Call Now
          </a>
        </section>
      </div>
    </div>
  );
}
