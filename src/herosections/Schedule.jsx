import React from "react";
import ScheduleCourseForm from "../components/ScheduleCourseForm";
import CourseScheduleList from "../components/CourseScheduleList";

function Schedule() {
  return (
    <div className="row g-0 justify-content-center animeBottomToTop">
      <div className="col-10 col-lg-8 col-md-8">
        <ScheduleCourseForm />
        <div className="my-4 border-top"></div>
        <CourseScheduleList />
      </div>
    </div>
  );
}

export default Schedule;
