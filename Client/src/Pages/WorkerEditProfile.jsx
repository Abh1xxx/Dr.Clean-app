import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../Axios/axiosInstance";
import { useNavigate } from "react-router-dom";

function WorkerEditProfile() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    skills: user?.skills || "",
    availability: user?.availability || "Available",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const res = await axiosInstance.put(
        "/users/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // update local user
      login(res.data.user, token);

      alert("Profile updated successfully");
      navigate("/worker/profile");

    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">

      <h1 className="text-2xl font-bold text-blue-900 mb-8">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-8 space-y-6"
      >

        {/* Profile Image */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Change Profile Picture
          </label>
          <input type="file" onChange={handleImageChange} />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Skills
          </label>
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Availability
          </label>
          <select
            name="availability"
            value={form.availability}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option>Available</option>
            <option>Busy</option>
            <option>On Leave</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-900 text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>

      </form>
    </div>
  );
}

export default WorkerEditProfile;