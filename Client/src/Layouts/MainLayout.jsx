import React from "react";
import { Outlet } from "react-router-dom";
import Footer1 from "../Components/Footer1";
import Navbar from "../Components/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Outlet /> {/* This is where each page loads */}
      </main>
      <Footer1/>
    </>
  );
}

export default MainLayout;
