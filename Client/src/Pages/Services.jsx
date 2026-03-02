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
        setServices(res.data.services);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading services...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-10 text-center">
        Our Services
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {service.image && (
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-5">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">
                {service.name}
              </h2>

              <p className="text-gray-600 text-sm mb-3">
                {service.description}
              </p>

              <p className="font-bold text-lg text-green-600 mb-4">
                ₹ {service.price}
              </p>

              <Link
                to={`/services/${service._id}`}
                className="block text-center bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;