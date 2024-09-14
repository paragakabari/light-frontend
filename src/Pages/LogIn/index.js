import React, { useState } from "react";
import "./login.scss";
import logo from "../../assets/img/Logo.png";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { ApiPostNoAuth } from "../../services/helpers/API/ApiData";
import Auth from "../../services/helpers/Auth";

export default function LogIn() {
  const [loginData, setLoginData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required!";
    }
    const validDomains = [
      "@gmail",
      "@outlook",
      "@mailinator",
      "@modotso.com",
      "@fuzitea",
    ];
    if (!validDomains.some((domain) => email.includes(domain))) {
      return "Please Enter Valid Email!";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required!";
    }
    if (password.length < 8) {
      return "Password must be more than 8 characters!";
    }
    return "";
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));

    let error = "";
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const submitHandler = () => {
    const emailError = validateEmail(loginData.email);
    const passwordError = validatePassword(loginData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    const data = {
      email: loginData.email,
      password: loginData.password,
    };

    ApiPostNoAuth("auth/login", data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("name", res?.data?.user?.name);
          localStorage.setItem("user_id", res?.data?.user?.id);
          localStorage.setItem("email", res?.data?.user?.email);
          localStorage.setItem("role", res?.data?.user?.role);
          Auth.setAuthToken(res.data.token.access.token);

          if (res.data.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/product");
          }
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="auth-container">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="auth-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Welcome Back!</h1>
        <p>
          We don't want to push our ideas on to customers, we simply want to
          make what they want.
        </p>
      </div>
      <div className="auth-right">
        <h2>Sign In</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <input
            type="email"
            placeholder="yourmail@email.com"
            name="email"
            onChange={changeHandler}
            value={loginData.email || ""}
          />
          <span className="errorMsg">{errors.email}</span>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={loginData.password || ""}
              onChange={changeHandler}
            />
            <span
              type="button"
              className="password-toggle"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </span>
          </div>
          <span className="errorMsg">{errors.password}</span>
          <button type="submit">Sign In</button>
        {/* <p style={{textAlign:"end", color:"#e01a33"}} className="">Forgot Password</p> */}
        </form>
        <p>
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
}
