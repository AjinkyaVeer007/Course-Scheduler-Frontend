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

function ForgetPassword() {
  const apihandler = useApiHandler();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isInValid, setIsInValid] = useState({
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
    };
    setIsInValid((prev) => ({
      ...prev,
      ...validations,
    }));

    return Object.values(validations).every((isValid) => !isValid);
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    const frontendValidation = handleValidation();

    if (!frontendValidation) return setIsLoading(false);

    const data = {
      email: form.email,
      password: form.password,
    };

    const apiData = {
      method: "post",
      url: BASE_URL + "api/v1/user/changepassword",
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
      <div className="row justify-content-center mt-5 g-0">
        <div className="col-10 col-lg-4 col-md-5">
          <div className="border rounded p-4 shadow-sm">
            <div className="fs-3 fw-bold text-center">Change Password</div>
            <div className="border-bottom my-3"></div>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Registered Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={isInValid.email}
              />
              <Form.Control.Feedback type="invalid">
                Please enter valid email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={form.password}
                onChange={handleChange}
                isInvalid={isInValid.password}
              />
              <Form.Control.Feedback type="invalid">
                Please enter valid password
              </Form.Control.Feedback>
            </Form.Group>
            <div
              onClick={() => navigate("/")}
              style={{ color: themeColor.primary }}
              className="pointer text-decoration-underline mb-3 mt-2"
            >
              Back to login
            </div>
            <Button
              name={"Save"}
              bgColor={themeColor.primary}
              handleClick={handleChangePassword}
              preIcon={isLoading && <Spinner size="sm" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
