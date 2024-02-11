import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import Button from "./Button";
import { themeColor } from "../utils/constant";
import { useSelector } from "react-redux";
import { useInstructorList } from "../utils/useInstructorList";

function ScheduleCourseForm() {
  const instructorList = useSelector((state) => state.instructordata.data);

  const getInstructor = useInstructorList();

  const [instructors, setInstructors] = useState([]);

  const sortInstructorList = () => {
    if (!instructorList?.length) return;

    let instructorArray = [];
    for (let i = 0; i < instructorList.length; i++) {
      let newObj = {
        label: instructorList[i].name,
        value: instructorList[i]._id,
      };
      instructorArray.push(newObj);
    }

    setInstructors(instructorArray);
  };

  useEffect(() => {
    getInstructor();
  }, []);

  useEffect(() => {
    sortInstructorList();
  }, [instructorList]);
  return (
    <div>
      <div style={{ fontSize: "20px" }} className="fw-medium">
        Schedule Course
      </div>
      <div className="row g-3 mt-2 justify-content-center">
        <div className="col-4">
          <Form.Group>
            <Form.Label>Select Course</Form.Label>
            <Select />
          </Form.Group>
        </div>
        <div className="col-4">
          <Form.Group>
            <Form.Label>Select Instructor</Form.Label>
            <Select options={instructors} />
          </Form.Group>
        </div>
        <div className="col-4">
          <Form.Group>
            <Form.Label>Select Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </div>
        <div className="col-2">
          <Button name={"Save"} bgColor={themeColor.primary} />
        </div>
      </div>
    </div>
  );
}

export default ScheduleCourseForm;
