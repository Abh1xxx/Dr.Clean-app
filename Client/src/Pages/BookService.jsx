import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";

function BookService() {
  const { id } = useParams(); // serviceId
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [form, setForm] = useState({
    date: "",
    time: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axiosInstance.get(
          `/services/getServiceById/${id}`
        );
        setService(res.data.service);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/bookings/createBooking", {
        serviceId: id,
        ...form,
      });

      alert("Booking created successfully!");
      navigate("/my-bookings");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!service) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">
        Book: {service.name}
      </h1>

      <p className="text-gray-600 mb-8">
        ₹ {service.price}
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-8 space-y-6"
      >
        <div>
          <label className="block mb-1 text-sm text-gray-700">
            Select Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700">
            Select Time
          </label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700">
            Service Address
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white ${
            loading
              ? "bg-gray-400"
              : "bg-blue-900 hover:bg-blue-800"
          }`}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

export default BookService;