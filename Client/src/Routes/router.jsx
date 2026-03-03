import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";

// Public Pages
import HomePage from "../Components/HomePage";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

// Protected Pages
import Dashboard from "../Pages/Dashboard";

import Services from "../Pages/Services";

// Route Protection
import ProtectedRoute from "../Components/ProtectedRoute";
import ServiceDetails from "../Pages/ServiceDetails";
import Blog from "../Pages/Blog";
import About from "../Pages/About";
import SingleBlog from "../Pages/SingleBlog";
import MyBookings from "../Components/MyBookings";
import BookService from "../Pages/BookService";
import Profile from "../Pages/Profile";
import EditProfile from "../Pages/EditProfile";
import ProfileSecurity from "../Pages/ProfileSecurity";
import WorkerDashboard from "../Pages/WorkerDashboard";
import AssignedJobs from "../Pages/AssignedJobs";
import WorkerProfile from "../Pages/WorkerProfile";
import WorkerSecurity from "../Pages/WorkerSecurity";
import WorkerEditProfile from "../Pages/WorkerEditProfile";
import AdminWorkers from "../Pages/AdminWorkers";
import AdminBookings from "../Pages/AdminBookings";
import AdminServices from "../Pages/AdminServices";
import AdminDashboard from "../Pages/AdminDashboard";
import AdminBlogs from "../Pages/AdminBlogs";
import AdminProfile from "../Pages/AdminProfile";
import AdminEditProfile from "../Pages/AdminEditProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedRoute role="customer">
            <MyBookings />
          </ProtectedRoute>
        ),
      },
      {
        path: "book/:id",
        element: (
          <ProtectedRoute role="customer">
            <BookService />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/edit",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/security",
        element: (
          <ProtectedRoute>
            <ProfileSecurity />
          </ProtectedRoute>
        ),
      },
      {
        path: "worker",
        element: (
          <ProtectedRoute role="worker">
            <WorkerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "assigned-jobs",
        element: (
          <ProtectedRoute role="worker">
            <AssignedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "worker/profile",
        element: (
          <ProtectedRoute role="worker">
            <WorkerProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "worker/profile/edit",
        element: (
          <ProtectedRoute role="worker">
            <WorkerEditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "worker/profile/security",
        element: (
          <ProtectedRoute role="worker">
            <WorkerSecurity />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/services",
        element: (
          <ProtectedRoute role="admin">
            <AdminServices />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/bookings",
        element: (
          <ProtectedRoute role="admin">
            <AdminBookings />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/workers",
        element: (
          <ProtectedRoute role="admin">
            <AdminWorkers />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/profile",
        element: (
          <ProtectedRoute role="admin">
            <AdminProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/profile/edit",
        element: (
          <ProtectedRoute role="admin">
            <AdminEditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/blogs",
        element: (
          <ProtectedRoute role="admin">
            <AdminBlogs />
          </ProtectedRoute>
        ),
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "services/:id",
        element: <ServiceDetails />,
      },
    ],
  },
]);
