import React, { useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminEditProfile() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("address", form.address);

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const res = await axiosInstance.put("/users/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      login(res.data.user, token);
      navigate("/admin/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto py-10 md:py-14 px-4 space-y-6">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-blue-700 font-semibold">
            Admin Account
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Edit Profile</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-7 space-y-5"
        >
          <div>
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 min-h-24 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Change Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/profile")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEditProfile;
