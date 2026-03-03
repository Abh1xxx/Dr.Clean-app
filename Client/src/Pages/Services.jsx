import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { Link } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosInstance.get("/services/getAllServices");
        setServices(res.data.services || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        <section className="text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-blue-700 font-semibold">
            Service Catalog
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Our Services</h1>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Choose from professional cleaning services designed for homes, offices, and commercial spaces.
          </p>
        </section>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-800">No services available</h3>
            <p className="text-slate-500 mt-2 text-sm">Please check back later.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="h-48 bg-slate-100">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">{service.name}</h2>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{service.description}</p>

                  <div className="flex items-center justify-between">
                    <p className="font-bold text-lg text-emerald-600">Rs. {service.price}</p>

                    <Link
                      to={`/services/${service._id}`}
                      className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
