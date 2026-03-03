import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get(
          "/bookings/getUserBookings",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const bookings = res.data.bookings;

        setStats({
          total: bookings.length,
          active: bookings.filter(b => b.status === "confirmed").length,
          completed: bookings.filter(b => b.status === "completed").length,
        });
      } catch (error) {
        console.error("Failed to fetch stats");
      }
    };

    fetchBookings();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 space-y-10">

      {/* PROFILE HEADER */}
      <div className="bg-white shadow-xl rounded-2xl p-8">

        <div className="flex items-center gap-8">

          <img
            src={user?.profilePic}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover"
          />

          <div>
            <h1 className="text-3xl font-bold text-blue-900">
              {user?.name}
            </h1>

            <p className="text-gray-600 mt-2">
              {user?.email}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Member since{" "}
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex gap-4">

          <Link
            to="/profile/edit"
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Edit Profile
          </Link>

          <Link
            to="/profile/security"
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Account Settings
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* ACTIVITY SUMMARY */}
      <div className="bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-xl font-semibold text-blue-900 mb-6">
          Activity Summary
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-2xl font-bold text-blue-900">
              {stats.total}
            </p>
            <p className="text-sm text-gray-600">
              Total Bookings
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-2xl font-bold text-yellow-600">
              {stats.active}
            </p>
            <p className="text-sm text-gray-600">
              Active Bookings
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-2xl font-bold text-green-600">
              {stats.completed}
            </p>
            <p className="text-sm text-gray-600">
              Completed Services
            </p>
          </div>

        </div>

      </div>

      {/* CONTACT INFO */}
      <div className="bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-xl font-semibold text-blue-900 mb-6">
          Contact Information
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-800 font-medium">
              {user?.phone || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-gray-800 font-medium">
              {user?.address || "Not added"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
