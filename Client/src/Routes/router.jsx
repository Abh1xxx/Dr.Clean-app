import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";

// Public Pages
import HomePage from "../Components/HomePage";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

// Protected Pages
import Dashboard from "../Pages/Dashboard";

// Future Pages (create these empty for now)
import Services from "../Pages/Services";
// import MyBookings from "../Pages/MyBookings";
// import AdminPanel from "../Pages/AdminPanel";
// import AssignedJobs from "../Pages/AssignedJobs";
// import Blog from "../Pages/Blog";
// import About from "../Pages/About";

// Route Protection
import ProtectedRoute from "../Components/ProtectedRoute";
import ServiceDetails from "../Pages/ServiceDetails";
import Blog from "../Pages/Blog";
import About from "../Pages/About";
import SingleBlog from "../Pages/SingleBlog";
import MyBookings from "../Components/MyBookings";
import BookService from "../Pages/BookService";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // 🌍 PUBLIC ROUTES
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

      // 🔒 COMMON AUTH ROUTE
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
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      // 👤 CUSTOMER ROUTE
      // {
      //   path: "my-bookings",
      //   element: (
      //     <ProtectedRoute role="customer">
      //       <MyBookings />
      //     </ProtectedRoute>
      //   ),
      // },

      // 🛠 WORKER ROUTE
      // {
      //   path: "assigned-jobs",
      //   element: (
      //     <ProtectedRoute role="worker">
      //       <AssignedJobs />
      //     </ProtectedRoute>
      //   ),
      // },

      // 👑 ADMIN ROUTE
      // {
      //   path: "admin",
      //   element: (
      //     <ProtectedRoute role="admin">
      //       <AdminPanel />
      //     </ProtectedRoute>
      //   ),
      // },

      // 🌐 SERVICES (public view, but booking inside protected)
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
