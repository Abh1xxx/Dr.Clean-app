import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../Axios/axiosInstance";

function HomePage() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
  });

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get("/bookings/getUserBookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bookings = res.data.bookings || [];

        setStats({
          total: bookings.length,
          active: bookings.filter((b) => b.status === "confirmed").length,
          completed: bookings.filter((b) => b.status === "completed").length,
        });
      } catch (error) {
        console.error("Failed to load dashboard data");
      }
    };

    fetchBookings();
  }, [user, token]);

  if (user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
          <section className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-6 md:p-8 text-white shadow-lg">
            <p className="text-xs tracking-[0.2em] uppercase text-blue-100">Welcome</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">Good to see you, {user.name}</h1>
            <p className="text-blue-100 mt-2 text-sm md:text-base">
              Track your bookings and quickly schedule your next cleaning service.
            </p>
          </section>

          <section className="grid md:grid-cols-3 gap-4 md:gap-6">
            <StatCard title="Total Bookings" value={stats.total} className="text-blue-900" />
            <StatCard title="Active Services" value={stats.active} className="text-amber-600" />
            <StatCard title="Completed" value={stats.completed} className="text-emerald-600" />
          </section>

          <section className="grid md:grid-cols-3 gap-4 md:gap-6">
            <ActionCard
              to="/services"
              title="Book a Service"
              subtitle="Browse services and schedule instantly"
              className="bg-blue-900 text-white border-blue-900 hover:bg-blue-800"
            />
            <ActionCard
              to="/my-bookings"
              title="My Bookings"
              subtitle="Check your booking status and history"
              className="bg-white text-slate-900 border-slate-200 hover:shadow-md"
            />
            <ActionCard
              to="/profile"
              title="My Profile"
              subtitle="Update account and contact details"
              className="bg-white text-slate-900 border-slate-200 hover:shadow-md"
            />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-blue-900 text-white py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Professional Cleaning
          <br />
          You Can Trust
        </h1>

        <p className="text-lg max-w-2xl mx-auto mb-8 text-blue-100">
          Reliable home and office cleaning services with trained staff, modern
          equipment, and guaranteed satisfaction.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/services"
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
          >
            View Services
          </Link>

          <Link
            to="/about"
            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
          <SimpleInfo title="100+ Happy Clients" text="Trusted by families and businesses." />
          <SimpleInfo title="Professional Team" text="Skilled and trained cleaning experts." />
          <SimpleInfo title="Affordable Pricing" text="High-quality service at competitive rates." />
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, className }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <p className="text-slate-500 text-sm">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${className}`}>{value}</p>
    </div>
  );
}

function ActionCard({ to, title, subtitle, className }) {
  return (
    <Link to={to} className={`block p-5 rounded-xl border shadow-sm transition ${className}`}>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm opacity-90 mt-1">{subtitle}</p>
    </Link>
  );
}

function SimpleInfo({ title, text }) {
  return (
    <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-xl">
      <h3 className="text-lg font-semibold mb-2 text-blue-900">{title}</h3>
      <p className="text-slate-600 text-sm">{text}</p>
    </div>
  );
}

export default HomePage;
