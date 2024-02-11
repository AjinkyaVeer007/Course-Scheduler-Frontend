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

function Login() {
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
      password: !form.password.length,
    };
    setIsInValid((prev) => ({
      ...prev,
      ...validations,
    }));

    return Object.values(validations).every((isValid) => !isValid);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const frontendValidation = handleValidation();

    if (!frontendValidation) return setIsLoading(false);

    const data = {
      email: form.email,
      password: form.password,
    };

    const apiData = {
      method: "post",
      url: BASE_URL + "api/v1/user/login",
      data: data,
    };

    const response = await apihandler(apiData);

    if (response?.success) {
      localStorage.setItem("userId", response?.data?._id);
      localStorage.setItem("userType", response?.data?.userType);
      localStorage.setItem("adminId", response?.data?.adminId);
      localStorage.setItem("token", response?.token);
      navigate("/main/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <div className="fullscreen">
      <Toaster />
      <div className="row justify-content-center mt-5">
        <div className="col-10 col-lg-4 col-md-5">
          <div className="border rounded p-4 shadow-sm">
            <div className="fs-3 fw-bold text-center">Login</div>
            <div className="border-bottom my-3"></div>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Email</Form.Label>
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
              <Form.Label className="fw-medium">Password</Form.Label>
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
            <div className="fw-medium">
              Dont have account?{" "}
              <span
                onClick={() => navigate("/register")}
                style={{ color: themeColor.primary }}
                className="pointer text-decoration-underline"
              >
                Register now
              </span>{" "}
            </div>
            <div
              onClick={() => navigate("/changepassword")}
              className="pointer text-decoration-underline text-end mb-3 mt-2"
            >
              Forget password
            </div>
            <Button
              name={"Login"}
              bgColor={themeColor.primary}
              handleClick={handleLogin}
              preIcon={isLoading && <Spinner size="sm" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
