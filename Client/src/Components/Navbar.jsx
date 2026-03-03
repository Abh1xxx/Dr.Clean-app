import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const role = user?.role;

  let navigation = [];

  if (!user) {
    navigation = [
      { name: "Home", to: "/" },
      { name: "Services", to: "/services" },
      { name: "Blog", to: "/blog" },
      { name: "About", to: "/about" },
      { name: "Login", to: "/login" },
      { name: "Signup", to: "/signup" },
    ];
  } else if (role === "customer") {
    navigation = [
      { name: "Home", to: "/" },
      { name: "Services", to: "/services" },
      { name: "My Bookings", to: "/my-bookings" },
      { name: "Blog", to: "/blog" },
      { name: "About", to: "/about" },
    ];
  } else if (role === "worker") {
    navigation = [
      { name: "Dashboard", to: "/worker" },
      { name: "Assigned Jobs", to: "/assigned-jobs" },
      { name: "Blog", to: "/blog" },
      { name: "About", to: "/about" },
    ];
  } else if (role === "admin") {
    navigation = [
      { name: "Dashboard", to: "/admin" },
      { name: "Services", to: "/admin/services" },
      { name: "Bookings", to: "/admin/bookings" },
      { name: "Job Tracker", to: "/admin/job-tracker" },
      { name: "Workers", to: "/admin/workers" },
      { name: "Manage Blogs", to: "/admin/blogs" },
      { name: "Blog", to: "/blog" },
      { name: "About", to: "/about" },
    ];
  }

  const getProfilePath = () => {
    if (role === "admin") return "/admin/profile";
    if (role === "worker") return "/worker/profile";
    return "/profile";
  };

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Dr. Clean
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-white"
                  : "text-white/80 hover:text-white"
              }
            >
              {item.name}
            </NavLink>
          ))}

          {user && (
            <Link
              to={getProfilePath()}
              className="block"
              aria-label="Open profile"
            >
              <img
                src={user?.profilePic}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/70"
              />
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl"
        >
          =
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-800 px-4 pb-4 space-y-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="block"
            >
              {item.name}
            </NavLink>
          ))}

          {user && (
            <div className="border-t border-white/30 pt-3">
              <Link
                to={getProfilePath()}
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2"
              >
                <img
                  src={user?.profilePic}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover border border-white/40"
                />
                <span>Profile</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
