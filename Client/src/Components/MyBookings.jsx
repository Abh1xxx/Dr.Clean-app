import React, { useEffect, useMemo, useState } from "react";
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
        setBookings(res.data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const summary = useMemo(() => {
    return {
      total: bookings.length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      completed: bookings.filter((b) => b.status === "completed").length,
    };
  }, [bookings]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-blue-700 font-semibold">My Account</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">My Bookings</h1>
            <p className="text-slate-600 mt-2">Track all your scheduled and completed services.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Customer</p>
            <p className="text-base font-semibold text-slate-900">{user?.name || "User"}</p>
          </div>
        </section>

        <section className="grid sm:grid-cols-3 gap-4">
          <SummaryCard title="Total" value={summary.total} color="text-blue-900" />
          <SummaryCard title="Confirmed" value={summary.confirmed} color="text-amber-600" />
          <SummaryCard title="Completed" value={summary.completed} color="text-emerald-600" />
        </section>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-800">No bookings yet</h3>
            <p className="text-slate-500 mt-2 text-sm">Your booked services will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{booking.serviceId?.name || "Service"}</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {booking.date} at {booking.time}
                    </p>
                    <p className="text-sm text-slate-600 mt-2 break-words">{booking.address}</p>
                  </div>

                  <span className={getStatusClassName(booking.status)}>{booking.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <p className="text-slate-500 text-sm">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
}

function getStatusClassName(status) {
  const value = String(status || "").toLowerCase();

  if (value === "completed") {
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700";
  }

  if (value === "confirmed") {
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700";
  }

  if (value === "cancelled") {
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700";
  }

  return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700";
}

export default MyBookings;
