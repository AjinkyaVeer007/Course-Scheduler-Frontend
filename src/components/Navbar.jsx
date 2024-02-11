import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { activeNavTab, navTabs, notactiveNavTab } from "../utils/constant";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="px-4 py-2 bg-white d-flex align-items-center justify-content-between sticky-top">
      <div
        onClick={() => navigate("/main/dashboard")}
        className="fw-bold fs-4 pointer"
      >
        CourseTracker
      </div>
      {localStorage.getItem("userType") === "admin" && (
        <div className="d-flex align-items-center gap-4">
          {navTabs &&
            navTabs.map((nav) => (
              <div
                onClick={() => navigate(nav?.navigate)}
                key={nav.id}
                style={
                  location.pathname === nav?.navigate
                    ? activeNavTab
                    : notactiveNavTab
                }
                className="pointer fw-medium"
              >
                {nav?.name}
              </div>
            ))}
        </div>
      )}
      <div>
        <RiLogoutCircleRLine size={"20px"} onClick={handleLogout} />
      </div>
    </div>
  );
}

export default Navbar;
