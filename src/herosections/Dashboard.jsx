import React from "react";
import { themeColor } from "../utils/constant";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";
import CourseScheduleTable from "../components/CourseScheduleTable";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="row justify-content-center g-0 mx-5 animeBottomToTop">
      <div className="col-7">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div style={{ fontSize: "20px" }} className="fw-medium">
            Course List
          </div>
          <div
            onClick={() => navigate("/main/course/new")}
            style={{
              color: themeColor.primary,
              fontSize: "12px",
            }}
            className="pointer text-decoration-underline fw-medium"
          >
            Create New
          </div>
        </div>
        <div>
          <div className="mb-3">
            <CourseCard />
          </div>
          <div className="mb-3">
            <CourseCard />
          </div>
          <div className="mb-3">
            <CourseCard />
          </div>
          <div className="mb-3">
            <CourseCard />
          </div>
        </div>
      </div>
      <div className="col-5 px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div style={{ fontSize: "20px" }} className="fw-medium">
            Scheduled Lectures
          </div>
          <div
            onClick={() => navigate("/main/schedule")}
            style={{
              color: themeColor.primary,
              fontSize: "12px",
            }}
            className="pointer text-decoration-underline fw-medium"
          >
            Schedule New
          </div>
        </div>
        <div className="border rounded p-2 shadow-sm">
          <CourseScheduleTable />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
