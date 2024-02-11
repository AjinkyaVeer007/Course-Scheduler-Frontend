import React, { useEffect } from "react";
import { themeColor } from "../utils/constant";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";
import CourseScheduleTable from "../components/CourseScheduleTable";
import { useSelector } from "react-redux";
import { useCourseList } from "../utils/useCourseList";

function Dashboard() {
  const courseList = useSelector((state) => state.courseData.data);

  const userType = localStorage.getItem("userType");

  const navigate = useNavigate();
  const getCourseList = useCourseList();

  useEffect(() => {
    userType === "admin" && getCourseList();
  }, []);
  return (
    <div className="row justify-content-center g-0 mx-5 animeBottomToTop">
      {userType === "admin" && (
        <div className="col-12 col-lg-7 col-md-12">
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
            {courseList.length ? (
              courseList.map((course) => (
                <div key={course?._id} className="mb-3">
                  <CourseCard data={course} />
                </div>
              ))
            ) : (
              <div className="border rounded text-center text-danger p-5">
                No course uploaded
              </div>
            )}
          </div>
        </div>
      )}
      <div
        className={`${
          userType === "admin"
            ? "col-12 col-lg-5 col-md-12"
            : "col-12 col-md-10 col-lg-10"
        } px-4`}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div style={{ fontSize: "20px" }} className="fw-medium">
            Scheduled Lectures
          </div>
          {userType === "admin" && (
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
          )}
        </div>
        <div className="border rounded p-2 shadow-sm">
          <CourseScheduleTable />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
