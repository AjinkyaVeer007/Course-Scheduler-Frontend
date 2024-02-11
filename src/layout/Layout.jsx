import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CustomNavbar from "../components/Navbar";

function Layout() {
  return (
    <>
      <CustomNavbar />
      <div className="pt-4">
        <Toaster />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
