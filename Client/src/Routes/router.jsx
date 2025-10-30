import{
    createBrowserRouter,
}from "react-router-dom"
import Login from "../Components/Login"
import Signup from "../Components/Signup"
import HomePage from "../Components/HomePage"
import MainLayout from "../Layouts/MainLayout"

export const router = createBrowserRouter([
    {
    path: "/",
    element: <MainLayout />, // layout with Navbar + Footer
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

]) 