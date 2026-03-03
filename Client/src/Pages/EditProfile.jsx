import React, { useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("address", form.address);

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const res = await axiosInstance.put(
        "/users/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      login(res.data.user, token);
      navigate("/profile");
    } catch (error) {
      alert("Profile update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">

      <h1 className="text-2xl font-bold text-blue-900 mb-8">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 space-y-6"
      >

        <div>
          <label className="block text-sm mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Change Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="border px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>

      </form>

    </div>
  );
}

export default EditProfile;