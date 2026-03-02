import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">
        Welcome{user?.name ? `, ${user.name}` : ""} 👋
      </h1>

      <p className="text-gray-700 mb-8">
        Manage your profile, book services, and track your requests from here.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <Link
          to="/profile"
          className="p-6 bg-white shadow rounded hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-blue-900 mb-2">
            My Profile
          </h2>
          <p className="text-gray-600 text-sm">
            Update phone number and address
          </p>
        </Link>

        <Link
          to="/services"
          className="p-6 bg-white shadow rounded hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-blue-900 mb-2">
            Book a Service
          </h2>
          <p className="text-gray-600 text-sm">
            Choose from available cleaning services
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
