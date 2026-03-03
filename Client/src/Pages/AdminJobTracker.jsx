import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";

const JOB_STATUS_OPTIONS = ["assigned", "in-progress", "completed"];

function AdminJobTracker() {
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  const fetchTracker = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axiosInstance.get("/admin/jobs/tracker", { headers });
      setJobs(res.data.jobs || []);
      setSummary(
        res.data.summary || {
          total: 0,
          assigned: 0,
          inProgress: 0,
          completed: 0,
        }
      );
    } catch (err) {
      setError("Failed to load job tracker data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracker();
  }, []);

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return jobs.filter((job) => {
      const statusMatch = statusFilter === "all" || job.status === statusFilter;
      if (!statusMatch) return false;

      if (!normalizedQuery) return true;

      const booking = job.bookingId || {};
      const haystack = [
        job.workerId?.name,
        job.workerId?.email,
        booking.userId?.name,
        booking.userId?.email,
        booking.serviceId?.name,
        booking.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [jobs, query, statusFilter]);

  const updateJobStatus = async (id, status) => {
    try {
      setBusyId(id);
      setError("");

      await axiosInstance.put(
        `/admin/jobs/${id}/status`,
        { status },
        { headers }
      );

      await fetchTracker();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update job status.");
    } finally {
      setBusyId("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-blue-700 font-semibold">
              Admin Panel
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Worker Job Tracker
            </h1>
            <p className="text-slate-600 mt-2">
              Monitor assigned jobs, worker progress, and booking-level details in one place.
            </p>
          </div>

          <button
            onClick={fetchTracker}
            className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
          >
            Refresh
          </button>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Jobs" value={summary.total} color="text-blue-900" />
          <StatCard title="Assigned" value={summary.assigned} color="text-slate-700" />
          <StatCard title="In Progress" value={summary.inProgress} color="text-amber-600" />
          <StatCard title="Completed" value={summary.completed} color="text-emerald-600" />
        </section>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="grid md:grid-cols-3 gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search worker, customer, service, address"
              className="md:col-span-2 border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="all">All Job Statuses</option>
              {JOB_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </section>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
            Loading jobs...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-800">No job records found</h3>
            <p className="text-slate-500 mt-2 text-sm">
              Assigned jobs will show here when bookings are assigned to workers.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const booking = job.bookingId || {};
              const customer = booking.userId || {};
              const service = booking.serviceId || {};
              const worker = job.workerId || {};
              const disabled = busyId === job._id;

              return (
                <div
                  key={job._id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6"
                >
                  <div className="grid lg:grid-cols-12 gap-4 items-start">
                    <div className="lg:col-span-3 space-y-1">
                      <p className="text-xs uppercase text-slate-500">Worker</p>
                      <p className="font-semibold text-slate-900">{worker.name || "Unknown"}</p>
                      <p className="text-sm text-slate-500">{worker.email || "-"}</p>
                      <p className="text-sm text-slate-500">{worker.phone || "-"}</p>
                    </div>

                    <div className="lg:col-span-3 space-y-1">
                      <p className="text-xs uppercase text-slate-500">Customer</p>
                      <p className="font-semibold text-slate-900">{customer.name || "Unknown"}</p>
                      <p className="text-sm text-slate-500">{customer.email || "-"}</p>
                      <p className="text-sm text-slate-500">{customer.phone || "-"}</p>
                    </div>

                    <div className="lg:col-span-3 space-y-1">
                      <p className="text-xs uppercase text-slate-500">Booking</p>
                      <p className="font-semibold text-slate-900">{service.name || "Service"}</p>
                      <p className="text-sm text-slate-500">{booking.date || "-"} at {booking.time || "-"}</p>
                      <p className="text-sm text-slate-600 break-words">{booking.address || "-"}</p>
                    </div>

                    <div className="lg:col-span-3 space-y-2">
                      <div>
                        <p className="text-xs uppercase text-slate-500 mb-1">Job Status</p>
                        <span className={getJobStatusClass(job.status)}>{job.status}</span>
                      </div>

                      <div>
                        <p className="text-xs uppercase text-slate-500 mb-1">Booking Status</p>
                        <span className={getBookingStatusClass(booking.status)}>
                          {booking.status || "pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 grid md:grid-cols-2 gap-3 items-end">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Update Job Status</label>
                      <select
                        value={job.status}
                        disabled={disabled}
                        onChange={(e) => updateJobStatus(job._id, e.target.value)}
                        className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-slate-100"
                      >
                        {JOB_STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <p className="text-xs text-slate-500 md:text-right">
                      Updated {new Date(job.updatedAt).toLocaleString()}
                    </p>
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

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <p className="text-slate-500 text-sm">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
}

function getJobStatusClass(status) {
  if (status === "completed") {
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700";
  }

  if (status === "in-progress") {
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700";
  }

  return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700";
}

function getBookingStatusClass(status) {
  if (status === "completed") {
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700";
  }

  if (status === "confirmed") {
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700";
  }

  if (status === "cancelled") {
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700";
  }

  return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700";
}

export default AdminJobTracker;
