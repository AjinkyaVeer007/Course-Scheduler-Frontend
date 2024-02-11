import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import {
  BASE_URL,
  regexPatternForEmail,
  regexPatternForPassword,
  themeColor,
} from "../utils/constant";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useApiHandler } from "../utils/useApiHandler";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const apihandler = useApiHandler();
  const navigate = useNavigate();

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
      password: !regexPatternForPassword.test(form.password),
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
      userType: "admin",
    };

    const apiData = {
      method: "post",
      url: BASE_URL + "api/v1/user/register",
      data: data,
    };

    const response = await apihandler(apiData);

    if (response?.success) {
      toast.success(response?.message);
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="fullscreen">
      <Toaster />
      <div className="row justify-content-center mt-5">
        <div className="col-4">
          <div className="border rounded p-4 shadow-sm">
            <div className="fs-3 fw-bold text-center">Register</div>
            <div className="border-bottom my-3"></div>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Name</Form.Label>
              <Form.Control
                isInvalid={isInValid.name}
                type="text"
                placeholder="Enter name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Name is mandatory
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Email</Form.Label>
              <Form.Control
                isInvalid={isInValid.email}
                type="email"
                placeholder="Enter email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter valid email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Form.Control
                isInvalid={isInValid.password}
                type="password"
                placeholder="Enter password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter valid password
              </Form.Control.Feedback>
            </Form.Group>
            <div className="fw-medium mb-3">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                style={{ color: themeColor.primary }}
                className="pointer text-decoration-underline"
              >
                Login then
              </span>{" "}
            </div>
            <Button
              handleClick={handleRegister}
              name={"Register"}
              bgColor={themeColor.primary}
              preIcon={isLoading && <Spinner />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
