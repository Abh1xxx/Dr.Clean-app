import React, { useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfileSecurity() {
  const token = localStorage.getItem("token");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(
        "/users/change-password",
        passwords,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Password changed successfully");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (error) {
      alert("Password change failed");
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm(
      "This action is permanent. Are you sure?"
    );
    if (!confirm) return;

    try {
      await axiosInstance.delete("/users/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });

      logout();
      navigate("/");
    } catch (error) {
      alert("Failed to delete account");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 space-y-12">

      <h1 className="text-2xl font-bold text-blue-900">
        Account Security
      </h1>

      {/* CHANGE PASSWORD */}
      <div className="bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-lg font-semibold mb-6">
          Change Password
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-4">

          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            placeholder="Current Password"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-400"
          >
            Update Password
          </button>

        </form>
      </div>

      {/* DANGER ZONE */}
      <div className="bg-red-50 border border-red-200 p-8 rounded-xl">
        <h2 className="text-red-700 font-semibold mb-4">
          Danger Zone
        </h2>

        <button
          onClick={handleDeleteAccount}
          className="text-red-600 hover:underline"
        >
          Delete My Account
        </button>
      </div>

    </div>
  );
}

export default ProfileSecurity;