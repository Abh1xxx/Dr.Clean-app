import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const role = user?.role;

  const navigation = [
    { name: "Home", to: "/" },
    { name: "Services", to: "/services" },
    { name: "Blog", to: "/blog" },
    { name: "About", to: "/about" },

    ...(role === "customer"
      ? [{ name: "My Bookings", to: "/my-bookings" }]
      : []),

    ...(role === "worker"
      ? [{ name: "Assigned Jobs", to: "/assigned-jobs" }]
      : []),

    ...(role === "admin"
      ? [{ name: "Admin Panel", to: "/admin" }]
      : []),

    ...(!user
      ? [
          { name: "Login", to: "/login" },
          { name: "Signup", to: "/signup" },
        ]
      : []),
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Dr. Clean
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/80 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Profile Button (Only if logged in) */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-white text-blue-900 px-3 py-1 rounded-lg font-semibold"
              >
                👤
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-blue-900 rounded-lg shadow-lg overflow-hidden">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
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

          {/* Mobile Profile Section */}
          {user && (
            <div className="border-t border-white/30 pt-3 space-y-2">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                👤 Profile
              </Link>

              <button
                onClick={handleLogout}
                className="block bg-white text-blue-900 px-4 py-1 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}