import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];

function AdminBookings() {
  const token = localStorage.getItem("token");

  const [bookings, setBookings] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyKey, setBusyKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [bookingsRes, workersRes] = await Promise.all([
        axiosInstance.get("/admin/all-bookings", { headers }),
        axiosInstance.get("/admin/workers", { headers }),
      ]);

      setBookings(bookingsRes.data.bookings || []);
      setWorkers(workersRes.data.workers || []);
    } catch (err) {
      setError("Failed to load bookings data. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;

      if (!matchesStatus) return false;

      if (!normalizedQuery) return true;

      const haystack = [
        booking.userId?.name,
        booking.userId?.email,
        booking.serviceId?.name,
        booking.address,
        booking.assignedWorker?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [bookings, statusFilter, query]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      setBusyKey(`status-${bookingId}`);
      setError("");

      await axiosInstance.put(
        `/admin/bookings/${bookingId}/status`,
        { status },
        { headers }
      );

      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update booking status.");
    } finally {
      setBusyKey("");
    }
  };

  const handleAssignWorker = async (bookingId, workerId) => {
    if (!workerId) return;

    try {
      setBusyKey(`assign-${bookingId}`);
      setError("");

      await axiosInstance.put(
        `/admin/bookings/${bookingId}/assign`,
        { workerId },
        { headers }
      );

      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign worker.");
    } finally {
      setBusyKey("");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Delete this booking? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setBusyKey(`delete-${bookingId}`);
      setError("");

      await axiosInstance.delete(`/admin/bookings/${bookingId}`, { headers });

      setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete booking.");
    } finally {
      setBusyKey("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto py-10 md:py-14 px-4 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-blue-700 font-semibold">
              Admin Panel
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Booking Management
            </h1>
            <p className="text-slate-600 mt-2 text-sm md:text-base">
              Assign workers, update status, and manage all booking operations.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Total bookings</p>
            <p className="text-2xl font-bold text-blue-900">{bookings.length}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm">
          <div className="grid md:grid-cols-3 gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by customer, service, address, worker"
              className="md:col-span-2 border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
            Loading bookings...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-800">No bookings found</h3>
            <p className="text-slate-500 mt-2 text-sm">
              Try changing filters or search query.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const statusBusy = busyKey === `status-${booking._id}`;
              const assignBusy = busyKey === `assign-${booking._id}`;
              const deleteBusy = busyKey === `delete-${booking._id}`;

              return (
                <div
                  key={booking._id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-5"
                >
                  <div className="grid lg:grid-cols-12 gap-4 items-start">
                    <div className="lg:col-span-4 space-y-1">
                      <p className="text-xs uppercase text-slate-500">Customer</p>
                      <p className="font-semibold text-slate-900">
                        {booking.userId?.name || "Unknown user"}
                      </p>
                      <p className="text-sm text-slate-500">{booking.userId?.email || "-"}</p>
                    </div>

                    <div className="lg:col-span-3 space-y-1">
                      <p className="text-xs uppercase text-slate-500">Service</p>
                      <p className="font-semibold text-slate-900">
                        {booking.serviceId?.name || "Unknown service"}
                      </p>
                      <p className="text-sm text-slate-500">{booking.date} at {booking.time}</p>
                    </div>

                    <div className="lg:col-span-3 space-y-1">
                      <p className="text-xs uppercase text-slate-500">Address</p>
                      <p className="text-sm text-slate-700 break-words">{booking.address}</p>
                    </div>

                    <div className="lg:col-span-2">
                      <p className="text-xs uppercase text-slate-500 mb-1">Current status</p>
                      <span className={getStatusClassName(booking.status)}>
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 grid md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Assign / Reassign Worker
                      </label>
                      <select
                        defaultValue=""
                        onChange={(e) => handleAssignWorker(booking._id, e.target.value)}
                        disabled={assignBusy || booking.status === "completed" || booking.status === "cancelled"}
                        className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-slate-100"
                      >
                        <option value="">
                          {booking.assignedWorker
                            ? `Current: ${booking.assignedWorker.name}`
                            : "Select worker"}
                        </option>
                        {workers.map((worker) => (
                          <option key={worker._id} value={worker._id}>
                            {worker.name} ({worker.email})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Update Status
                      </label>
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        disabled={statusBusy}
                        className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-slate-100"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        disabled={deleteBusy}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                      >
                        {deleteBusy ? "Deleting..." : "Delete Booking"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusClassName(status) {
  const value = String(status || "").toLowerCase();

  if (value === "completed") {
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700";
  }

  if (value === "cancelled") {
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700";
  }

  if (value === "confirmed") {
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700";
  }

  return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700";
}

export default AdminBookings;
