import React from "react";
import InstructorForm from "../components/InstructorForm";
import InstructorList from "../components/InstructorList";

function Instructor() {
  return (
    <div className="row g-0 justify-content-center animeBottomToTop">
      <div className="col-10 col-lg-8 col-md-8">
        <InstructorForm />
        <div className="border-top my-4"></div>
        <InstructorList />
      </div>
    </div>
  );
}

export default Instructor;
