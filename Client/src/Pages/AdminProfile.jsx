import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";
import { useAuth } from "../Context/AuthContext";

function AdminProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    services: 0,
    bookings: 0,
    totalUsers: 0,
    workers: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data || {});
      } catch (error) {
        console.error("Failed to load admin stats");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={user?.profilePic}
                alt="admin profile"
                className="w-24 h-24 rounded-full object-cover border border-slate-200"
              />

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-blue-700 font-semibold">
                  Admin Account
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                  {user?.name || "Admin"}
                </h1>
                <p className="text-slate-600 mt-1">{user?.email || "-"}</p>
                <p className="text-sm text-slate-500 mt-1">
                  Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/profile/edit"
                className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                Edit Profile
              </Link>
              <Link
                to="/admin"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          <StatCard title="Services" value={stats.services} loading={loading} />
          <StatCard title="Bookings" value={stats.bookings} loading={loading} />
          <StatCard title="Customers" value={stats.totalUsers} loading={loading} />
          <StatCard title="Workers" value={stats.workers} loading={loading} />
          <StatCard title="Pending" value={stats.pending} loading={loading} />
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <QuickLink to="/admin/services" title="Manage Services" subtitle="Create and update service list" />
          <QuickLink to="/admin/bookings" title="Manage Bookings" subtitle="Assign workers and update statuses" />
          <QuickLink to="/admin/workers" title="Manage Workers" subtitle="Add, edit and remove workers" />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Contact Details</h2>
          <div className="grid md:grid-cols-2 gap-5 mt-4">
            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="font-medium text-slate-800 mt-1">{user?.phone || "Not added"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Address</p>
              <p className="font-medium text-slate-800 mt-1">{user?.address || "Not added"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, loading }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <p className="text-slate-500 text-sm">{title}</p>
      <p className="text-3xl font-bold text-blue-900 mt-2">{loading ? "--" : value ?? 0}</p>
    </div>
  );
}

function QuickLink({ to, title, subtitle }) {
  return (
    <Link
      to={to}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </Link>
  );
}

export default AdminProfile;
