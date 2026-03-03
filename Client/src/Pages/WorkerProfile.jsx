import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../Axios/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

function WorkerProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/job/my-jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const jobs = res.data.jobs || [];

        setStats({
          total: jobs.length,
          completed: jobs.filter(j => j.status === "completed").length,
          inProgress: jobs.filter(j => j.status === "in-progress").length,
        });
      } catch (error) {
        console.error("Failed to load worker stats");
      }
    };

    fetchJobs();
  }, [token]);

  const completionRate =
    stats.total > 0
      ? Math.round((stats.completed / stats.total) * 100)
      : 0;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 space-y-12">

      {/* Header */}
      <div className="bg-white shadow rounded-xl p-8 flex justify-between items-center">

        <div className="flex items-center gap-6">
          <img
            src={user?.profilePic}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover"
          />

          <div>
            <h1 className="text-2xl font-bold text-blue-900">
              {user?.name}
            </h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            to="/worker/profile/edit"
            className="bg-blue-900 text-white px-6 py-2 rounded-lg"
          >
            Edit Profile
          </Link>

          <Link
            to="/worker/profile/security"
            className="border px-6 py-2 rounded-lg"
          >
            Security
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Work Stats */}
      <div className="bg-white shadow rounded-xl p-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-6">
          Work Performance
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div>
            <p className="text-2xl font-bold text-blue-900">
              {stats.total}
            </p>
            <p className="text-gray-600 text-sm">
              Total Jobs
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-green-600">
              {stats.completed}
            </p>
            <p className="text-gray-600 text-sm">
              Completed
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.inProgress}
            </p>
            <p className="text-gray-600 text-sm">
              In Progress
            </p>
          </div>

        </div>

        {/* Completion Rate */}
        <div className="mt-8">
          <p className="text-sm text-gray-600 mb-2">
            Completion Rate
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-900 h-3 rounded-full"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {completionRate}% Completed
          </p>
        </div>

      </div>

      {/* Skills & Availability */}
      <div className="bg-white shadow rounded-xl p-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-6">
          Professional Details
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div>
            <p className="text-sm text-gray-500">Skills</p>
            <p className="text-gray-800">
              {user?.skills || "General Cleaning, Deep Cleaning"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Availability</p>
            <p className="text-green-600 font-medium">
              {user?.availability || "Available"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-800">
              {user?.phone || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-gray-800">
              {user?.address || "Not added"}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default WorkerProfile;
