import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="pt-4">
        <Toaster />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
