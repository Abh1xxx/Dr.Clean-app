import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../Axios/axiosInstance";
import { Link } from "react-router-dom";

function WorkerDashboard() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/job/my-jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const workerJobs = res.data.jobs;

        setJobs(workerJobs);

        setStats({
          total: workerJobs.length,
          inProgress: workerJobs.filter(j => j.status === "in-progress").length,
          completed: workerJobs.filter(j => j.status === "completed").length,
        });

      } catch (error) {
        console.error("Error loading worker jobs");
      }
    };

    fetchJobs();
  }, [token]);

  const todayJobs = jobs.filter(job => {
    const today = new Date().toDateString();
    return new Date(job.createdAt).toDateString() === today;
  });

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 space-y-12">

      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">
          Welcome back, {user?.name} 👷
        </h1>
        <p className="text-gray-600 mt-2">
          Stay focused. Complete your assigned jobs efficiently.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-2xl font-bold text-blue-900">
            {stats.total}
          </p>
          <p className="text-gray-600 text-sm">
            Total Assigned Jobs
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {stats.inProgress}
          </p>
          <p className="text-gray-600 text-sm">
            In Progress
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-2xl font-bold text-green-600">
            {stats.completed}
          </p>
          <p className="text-gray-600 text-sm">
            Completed
          </p>
        </div>

      </div>

      {/* Today's Jobs */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          Today’s Jobs
        </h2>

        {todayJobs.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No jobs assigned for today.
          </p>
        ) : (
          <ul className="space-y-3">
            {todayJobs.slice(0, 3).map(job => (
              <li
                key={job._id}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span>
                  {job.bookingId?.serviceId?.name}
                </span>
                <span className="text-gray-500">
                  {job.status}
                </span>
              </li>
            ))}
          </ul>
        )}

      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">

        <Link
          to="/assigned-jobs"
          className="bg-blue-900 text-white p-6 rounded-xl hover:bg-blue-800 transition"
        >
          <h2 className="text-lg font-semibold mb-2">
            View All Assigned Jobs
          </h2>
          <p className="text-sm text-white/80">
            Manage your tasks and update job status.
          </p>
        </Link>

        <div className="bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Performance Reminder
          </h2>
          <p className="text-sm text-gray-600">
            Complete jobs on time and upload clear after-work photos.
            Consistent performance improves your rating.
          </p>
        </div>

      </div>

    </div>
  );
}

export default WorkerDashboard;