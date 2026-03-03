import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axiosInstance.get(
          `/services/getServiceById/${id}`
        );
        setService(res.data.service);
      } catch (error) {
        console.error("Error fetching service", error);
      }
    };

    fetchService();
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/book/${id}`);
    }
  };

  if (!service) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      {service.image && (
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold text-blue-900 mb-4">
        {service.name}
      </h1>

      <p className="text-gray-700 mb-6">{service.description}</p>

      <p className="text-2xl font-bold text-green-600 mb-6">
        ₹ {service.price}
      </p>

      <button
        onClick={handleBookNow}
        className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
      >
        Book Now
      </button>
    </div>
  );
}

export default ServiceDetails;