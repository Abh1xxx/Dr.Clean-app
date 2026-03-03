import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";

function AssignedJobs() {
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get(
          "/job/my-jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(
        `/job/update-status/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setJobs(prev =>
        prev.map(job =>
          job._id === id ? { ...job, status } : job
        )
      );
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">

      <h1 className="text-3xl font-bold text-blue-900 mb-10">
        Assigned Jobs
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="bg-white shadow p-10 rounded-xl text-center">
          <p className="text-gray-500">Loading assigned jobs...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && (
        <div className="bg-white shadow p-10 rounded-xl text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            No Jobs Assigned Yet
          </h2>
          <p className="text-gray-500 text-sm">
            Once the admin assigns a job to you, it will appear here.
          </p>
        </div>
      )}

      {/* Job List */}
      {!loading && jobs.length > 0 && (
        <div className="space-y-6">

          {jobs.map(job => (
            <div
              key={job._id}
              className="bg-white shadow rounded-xl p-6 space-y-4"
            >

              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-blue-900">
                  {job.bookingId?.serviceId?.name || "Service"}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(job.status)}`}
                >
                  {job.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Date:</strong> {job.bookingId?.date}</p>
                <p><strong>Address:</strong> {job.bookingId?.address}</p>
                <p><strong>Customer:</strong> {job.bookingId?.userId?.name}</p>
              </div>

              <div className="flex gap-4 pt-2">

                {job.status !== "in-progress" && (
                  <button
                    onClick={() => updateStatus(job._id, "in-progress")}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-400 transition"
                  >
                    Start Job
                  </button>
                )}

                {job.status !== "completed" && (
                  <button
                    onClick={() => updateStatus(job._id, "completed")}
                    className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-500 transition"
                  >
                    Mark Complete
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AssignedJobs;