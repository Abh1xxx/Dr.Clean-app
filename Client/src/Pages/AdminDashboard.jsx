import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    services: 0,
    bookings: 0,
    totalUsers: 0,
    workers: 0,
    pending: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsRes, bookingsRes] = await Promise.all([
          axiosInstance.get("/admin/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get("/admin/all-bookings", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats(statsRes.data || {});
        setRecentBookings((bookingsRes.data?.bookings || []).slice(0, 5));
      } catch (err) {
        setError("Could not load dashboard data. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-6 md:p-8 text-white shadow-lg">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-100">
            Admin Dashboard
          </p>
          <h1 className="text-2xl md:text-4xl font-bold mt-2">
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="text-blue-100 mt-2 text-sm md:text-base max-w-2xl">
            Monitor system activity, review recent bookings, and jump to key
            admin actions.
          </p>
        </section>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <section className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} loading={loading} />
          <StatCard title="Workers" value={stats.workers} loading={loading} />
          <StatCard title="Services" value={stats.services} loading={loading} />
          <StatCard title="Bookings" value={stats.bookings} loading={loading} />
          <StatCard title="Pending" value={stats.pending} loading={loading} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <ActionCard
              to="/admin/services"
              title="Manage Services"
              subtitle="Create and update service catalog"
              className="bg-blue-900 text-white border-blue-900 hover:bg-blue-800"
            />
            <ActionCard
              to="/admin/bookings"
              title="Manage Bookings"
              subtitle="View all booking requests and status"
              className="bg-white text-slate-900 border-slate-200 hover:shadow-md"
            />
            <ActionCard
              to="/admin/workers"
              title="Manage Workers"
              subtitle="Review worker list and availability"
              className="bg-white text-slate-900 border-slate-200 hover:shadow-md"
            />
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 md:px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Recent Bookings</h2>
            <Link
              to="/admin/bookings"
              className="text-sm text-blue-700 hover:text-blue-800 font-medium"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="p-6 text-slate-500">Loading bookings...</div>
          ) : recentBookings.length === 0 ? (
            <div className="p-6 text-slate-500">No recent bookings available.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {booking.serviceId?.name || "Unknown Service"}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Customer: {booking.userId?.name || "Unknown User"}
                    </p>
                  </div>

                  <span className={getStatusClassName(booking.status)}>
                    {booking.status || "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <h3 className="font-semibold text-emerald-800">System Status</h3>
          <p className="text-sm text-emerald-700 mt-1">
            All systems operational. No critical alerts.
          </p>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, loading }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-slate-500 text-sm">{title}</p>
      <p className="text-3xl font-bold text-blue-900 mt-2">
        {loading ? "--" : value ?? 0}
      </p>
    </div>
  );
}

function ActionCard({ to, title, subtitle, className }) {
  return (
    <Link
      to={to}
      className={`block p-5 rounded-xl border shadow-sm transition ${className}`}
    >
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm opacity-90 mt-1">{subtitle}</p>
    </Link>
  );
}

function getStatusClassName(status) {
  const safeStatus = String(status || "").toLowerCase();

  if (safeStatus === "completed") {
    return "px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700";
  }

  if (safeStatus === "cancelled") {
    return "px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700";
  }

  return "px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700";
}

export default AdminDashboard;
