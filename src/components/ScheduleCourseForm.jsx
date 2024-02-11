import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import Select from "react-select";
import Button from "./Button";
import { BASE_URL, themeColor } from "../utils/constant";
import { useSelector } from "react-redux";
import { useInstructorList } from "../utils/useInstructorList";
import { useCourseList } from "../utils/useCourseList";
import { useApiHandler } from "../utils/useApiHandler";
import toast from "react-hot-toast";
import { useScheduleList } from "../utils/useScheduleList";

function ScheduleCourseForm() {
  const instructorList = useSelector((state) => state.instructordata.data);
  const courseList = useSelector((state) => state.courseData.data);

  const getInstructor = useInstructorList();
  const getCourse = useCourseList();
  const apiHandle = useApiHandler();
  const getScheduleList = useScheduleList();

  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    course: "",
    instructor: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const sortCourseList = () => {
    if (!courseList?.length) return;

    let courseArray = [];
    for (let i = 0; i < courseList.length; i++) {
      let newObj = {
        label: courseList[i].name,
        value: courseList[i]._id,
      };
      courseArray.push(newObj);
    }

    setCourses(courseArray);
  };

  const createSchedule = async () => {
    setIsLoading(true);
    const data = {
      assignBy: localStorage.getItem("userId"),
      assignTo: form.instructor?.value,
      assignDate: new Date(form.date),
      courseId: form.course?.value,
    };

    const apiData = {
      method: "post",
      url:
        BASE_URL +
        `api/v1/schedule/new/${localStorage.getItem(
          "userTyep"
        )}/${localStorage.getItem("userId")}`,
      data: data,
    };

    const response = await apiHandle(apiData);

    if (response?.success) {
      getScheduleList();
      toast.success(response?.message);
      setForm({
        course: "",
        date: "",
        instructor: "",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getInstructor();
    getCourse();
  }, []);

  useEffect(() => {
    sortCourseList();
  }, [courseList]);

  useEffect(() => {
    sortInstructorList();
  }, [instructorList]);
  return (
    <div>
      <div style={{ fontSize: "20px" }} className="fw-medium">
        Schedule Course
      </div>
      <div className="row g-3 mt-2 justify-content-center">
        <div className="col-12 col-lg-4">
          <Form.Group>
            <Form.Label>Select Course</Form.Label>
            <Select
              options={courses}
              value={form.course}
              onChange={(data) =>
                setForm((prev) => ({ ...prev, course: data }))
              }
            />
          </Form.Group>
        </div>
        <div className="col-12 col-lg-4">
          <Form.Group>
            <Form.Label>Select Instructor</Form.Label>
            <Select
              value={form.instructor}
              onChange={(data) =>
                setForm((prev) => ({ ...prev, instructor: data }))
              }
              options={instructors}
            />
          </Form.Group>
        </div>
        <div className="col-12 col-lg-4">
          <Form.Group>
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              value={form.date}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, date: e.target.value }))
              }
              type="date"
            />
          </Form.Group>
        </div>
        <div className="col-4 col-lg-2">
          <Button
            preIcon={isLoading && <Spinner size="sm" />}
            name={"Save"}
            bgColor={themeColor.primary}
            handleClick={createSchedule}
          />
        </div>
      </div>
    </div>
  );
}

export default ScheduleCourseForm;
