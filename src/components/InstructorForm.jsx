import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import Button from "./Button";
import { BASE_URL, regexPatternForEmail, themeColor } from "../utils/constant";
import { useApiHandler } from "../utils/useApiHandler";
import toast from "react-hot-toast";
import { useInstructorList } from "../utils/useInstructorList";

function InstructorForm() {
  const apihandler = useApiHandler();
  const getInstructor = useInstructorList();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isInValid, setIsInValid] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    const validations = {
      email: !regexPatternForEmail.test(form.email),
      password: !form.password.length,
      name: !form.name.length,
    };
    setIsInValid((prev) => ({
      ...prev,
      ...validations,
    }));

    return Object.values(validations).every((isValid) => !isValid);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const frontendValidation = handleValidation();

    if (!frontendValidation) return setIsLoading(false);

    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
      oneTimePassword: form.password,
      userType: "instructor",
      adminId: localStorage.getItem("userId"),
    };

    const apiData = {
      method: "post",
      url: BASE_URL + "api/v1/user/register",
      data: data,
    };

    const response = await apihandler(apiData);

    if (response?.success) {
      toast.success(response?.message);
      setForm({
        email: "",
        name: "",
        password: "",
      });
      getInstructor();
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div style={{ fontSize: "20px" }} className="fw-medium mb-2">
        Create New Instructor
      </div>
      <div className="row g-4 justify-content-center">
        <div className="col-4">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>
        </div>
        <div className="col-4">
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
        </div>
        <div className="col-4">
          <Form.Group>
            <Form.Label>One time password</Form.Label>
            <Form.Control
              name="password"
              value={form.password}
              onChange={handleChange}
              type="text"
              placeholder="Enter one time password"
            />
          </Form.Group>
        </div>
        <div className="col-2">
          <Button
            name={"Save"}
            handleClick={handleRegister}
            bgColor={themeColor.primary}
            preIcon={isLoading && <Spinner size="sm" />}
          />
        </div>
      </div>
    </div>
  );
}

export default InstructorForm;
