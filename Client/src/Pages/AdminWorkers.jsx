import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";

function AdminWorkers() {
  const token = localStorage.getItem("token");

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingWorkerId, setEditingWorkerId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axiosInstance.get("/admin/workers", { headers });
      setWorkers(res.data.workers || []);
    } catch (err) {
      setError("Failed to load workers. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    });
    setEditingWorkerId(null);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (worker) => {
    setEditingWorkerId(worker._id);
    setForm({
      name: worker.name || "",
      email: worker.email || "",
      phone: worker.phone || "",
      address: worker.address || "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      setError("Name, email and phone are required.");
      return;
    }

    if (!editingWorkerId && !form.password) {
      setError("Password is required for new worker.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
      };

      if (form.password) {
        payload.password = form.password;
      }

      if (editingWorkerId) {
        await axiosInstance.put(`/admin/workers/${editingWorkerId}`, payload, {
          headers,
        });
      } else {
        await axiosInstance.post("/admin/workers", payload, { headers });
      }

      resetForm();
      await fetchWorkers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save worker.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (workerId) => {
    const confirmed = window.confirm(
      "Delete this worker? Active assigned jobs must be cleared first."
    );
    if (!confirmed) return;

    try {
      setError("");
      await axiosInstance.delete(`/admin/workers/${workerId}`, { headers });

      setWorkers((prev) => prev.filter((worker) => worker._id !== workerId));

      if (editingWorkerId === workerId) {
        resetForm();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete worker.");
    }
  };

  const filteredWorkers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return workers;

    return workers.filter((worker) => {
      const haystack = [
        worker.name,
        worker.email,
        worker.phone,
        worker.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [workers, search]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-blue-700 font-semibold">
              Admin Panel
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Manage Workers
            </h1>
            <p className="text-slate-600 mt-2 text-sm md:text-base">
              Create, update, and remove worker accounts.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Total workers</p>
            <p className="text-2xl font-bold text-blue-900">{workers.length}</p>
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
                  {editingWorkerId ? "Edit Worker" : "Add New Worker"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {editingWorkerId
                    ? "Update worker account details."
                    : "Create a new worker login account."}
                </p>
              </div>

              <div className="space-y-4">
                <Field label="Full Name">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Ravi Kumar"
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </Field>

                <Field label="Email">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="worker@drclean.com"
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </Field>

                <Field label="Phone">
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </Field>

                <Field label="Address">
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Worker address"
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 min-h-20 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </Field>

                <Field
                  label={editingWorkerId ? "New Password (optional)" : "Password"}
                >
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder={editingWorkerId ? "Leave blank to keep old" : "Set password"}
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required={!editingWorkerId}
                  />
                </Field>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                  {submitting
                    ? "Saving..."
                    : editingWorkerId
                    ? "Update Worker"
                    : "Create Worker"}
                </button>

                {editingWorkerId && (
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

          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, phone, address"
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {loading ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
                Loading workers...
              </div>
            ) : filteredWorkers.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
                <h3 className="text-lg font-semibold text-slate-800">No workers found</h3>
                <p className="text-slate-500 mt-2 text-sm">
                  Add a worker or adjust your search.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredWorkers.map((worker) => (
                  <div
                    key={worker._id}
                    className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-5 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      {worker.profilePic ? (
                        <img
                          src={worker.profilePic}
                          alt={worker.name}
                          className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-200" />
                      )}

                      <div>
                        <h3 className="font-semibold text-slate-900">{worker.name}</h3>
                        <p className="text-sm text-slate-500">{worker.email}</p>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm text-slate-600">
                      <p>
                        <span className="font-medium text-slate-700">Phone:</span> {worker.phone || "-"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium text-slate-700">Address:</span> {worker.address || "-"}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleEdit(worker)}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-sm px-3 py-2 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(worker._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
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

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

export default AdminWorkers;
