import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";

function AdminServices() {
  const token = localStorage.getItem("token");

  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/services/getAllServices");
      setServices(res.data.services || []);
      setError("");
    } catch (err) {
      setError("Unable to load services. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", image: null });
    setPreview(null);
    setEditingId(null);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (!file) return;
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      setSubmitting(true);
      setError("");
      if (editingId) {
        await axiosInstance.put(
          `/services/updateService/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axiosInstance.post(
          "/services/createService",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      resetForm();
      await fetchServices();
    } catch (error) {
      setError(error.response?.data?.message || "Could not save service.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (service) => {
    setForm({
      name: service.name,
      description: service.description,
      price: service.price,
      image: null,
    });
    setPreview(service.image); // existing image
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this service?");
    if (!confirmed) return;

    try {
      setError("");
      await axiosInstance.delete(`/services/deleteService/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchServices();

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      setError("Delete failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-blue-700 font-semibold">
              Admin Panel
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Manage Services
            </h1>
            <p className="text-slate-600 mt-2 text-sm md:text-base">
              Add, update, and remove offerings available to customers.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Total services</p>
            <p className="text-2xl font-bold text-blue-900">{services.length}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-7 space-y-5 sticky top-24"
            >
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {editingId ? "Edit Service" : "Create New Service"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Fill in the details below.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Service Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Deep Home Cleaning"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Briefly describe what this service includes."
                    value={form.description}
                    onChange={handleChange}
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 min-h-28 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Price (Rs.)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    name="price"
                    placeholder="e.g. 1499"
                    value={form.price}
                    onChange={handleChange}
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Service Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-600"
                  />
                </div>

                {preview && (
                  <img
                    src={preview}
                    alt="Service preview"
                    className="w-full max-h-56 object-cover rounded-xl border border-slate-200"
                  />
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update Service"
                    : "Create Service"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
                Loading services...
              </div>
            ) : services.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
                <h3 className="text-lg font-semibold text-slate-800">
                  No services yet
                </h3>
                <p className="text-slate-500 mt-2 text-sm">
                  Create your first service using the form.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="h-40 bg-slate-100">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {service.name}
                        </h3>
                        <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-blue-900 font-bold text-lg">
                          Rs. {service.price}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(service._id)}
                            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminServices;
