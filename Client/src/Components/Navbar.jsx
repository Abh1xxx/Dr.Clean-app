import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
     <nav className="flex justify-between items-center bg-blue-900 text-white p-4 shadow-md">
      <h1 className="text-xl font-bold">
        <Link to="/">Dr. Clean</Link>
      </h1>
      <div className="flex gap-4 ">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/login" className="hover:text-gray-300">
          Login
        </Link>
        <Link to="/signup" className="hover:text-gray-300">
          Signup
        </Link>
      </div>
    </nav> 
  );
}

export default Navbar;
