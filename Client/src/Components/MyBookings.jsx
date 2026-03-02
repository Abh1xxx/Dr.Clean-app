import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { useAuth } from "../context/AuthContext";

function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get("/bookings/getUserBookings");
        setBookings(res.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading bookings...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-600">No bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-blue-900">
                {booking.serviceId?.name}
              </h2>

              <p className="text-sm text-gray-600">
                📅 {booking.date} | ⏰ {booking.time}
              </p>

              <p className="text-sm text-gray-600">
                📍 {booking.address}
              </p>

              <p
                className={`mt-2 font-semibold ${
                  booking.status === "pending"
                    ? "text-yellow-600"
                    : booking.status === "confirmed"
                    ? "text-blue-600"
                    : booking.status === "completed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Status: {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;