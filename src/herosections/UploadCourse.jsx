import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import Select from "react-select";
import { BASE_URL, courseLevel, themeColor } from "../utils/constant";
import Button from "../components/Button";
import { useApiHandler } from "../utils/useApiHandler";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UploadCourse() {
  const apihandler = useApiHandler();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    level: "",
    createdBy: "",
    courseImg: "",
  });
  const [isInValid, setIsInValid] = useState({
    name: false,
    level: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    const validations = {
      level: !form.level,
      name: !form.name.length,
    };
    setIsInValid((prev) => ({
      ...prev,
      ...validations,
    }));

    return Object.values(validations).every((isValid) => !isValid);
  };

  const handleCreateCourse = async () => {
    setIsLoading(true);
    const frontendValidation = handleValidation();

    if (!frontendValidation) return setIsLoading(false);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("level", form.level?.value);
    formData.append("courseImg", form.courseImg?.files[0]);
    formData.append("userId", localStorage.getItem("userId"));

    const apiData = {
      method: "post",
      url: BASE_URL + "api/v1/course/create",
      data: formData,
    };

    const response = await apihandler(apiData);

    if (response?.success) {
      toast.success(response?.message);
      setForm({
        courseImg: "",
        createdBy: "",
        description: "",
        level: "",
        name: "",
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="row justify-content-center g-0 animeBottomToTop">
      <div className="col-10 col-lg-5 col-md-6">
        <div style={{ fontSize: "20px" }} className="fw-medium mb-2">
          Upload New Course
        </div>
        <div className="row g-3">
          <div className="col-12">
            <Form.Group>
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group>
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                as={"textarea"}
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group>
              <Form.Label>Course image</Form.Label>
              <Form.Control
                type="file"
                value={form.courseImg ? form.courseImg?.files[0]?.pathname : ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, courseImg: e.target }))
                }
              />
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group>
              <Form.Label>Course level</Form.Label>
              <Select
                options={courseLevel}
                value={form.level}
                onChange={(selectedValue) => {
                  console.log(selectedValue);
                  setForm((prev) => ({ ...prev, level: selectedValue }));
                }}
              />
            </Form.Group>
          </div>
          <div className="col-12 mt-4">
            <Button
              handleClick={handleCreateCourse}
              name={"Save"}
              bgColor={themeColor.primary}
              preIcon={isLoading && <Spinner size="sm" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadCourse;
