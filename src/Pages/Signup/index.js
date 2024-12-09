import React, { useState } from "react";
import "../LogIn/login.scss";
import logo from "../../assets/img/Logo.png";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { ApiPost } from "../../services/helpers/API/ApiData";

export default function Signup() {
  const [signupData, setSignupData] = useState({});
  const [uplodeFile, setUplodeFile] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z\s]*$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?.])[A-Za-z\d!@#$%^&*()_+{}:"<>?.]{9,}$/;
  const phoneRegex = /^\d{10}$/; 

  const changeHandler = (e) => {
    const { name, value, files } = e.target;

    if (name === "role") {
      setUplodeFile(value === "dealer");
    }

    if (name === "certificate") {
      setSignupData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
      setFileName(files[0].name);
    } else {
      setSignupData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    let newErrors = { ...errors };

    // Validation
    if (name === "fullName") {
      if (value.length <= 0) {
        newErrors[name] = "Full Name is required !";
      } else if (!nameRegex.test(value)) {
        newErrors[name] = "Full Name not Valid !";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "email") {
      if (value.length <= 0) {
        newErrors[name] = "Email is required !";
      } else if (
        !(
          value.includes("@gmail") ||
          value.includes("@outlook") ||
          value.includes("@mailinator") ||
          value.includes("@fuzitea")
        )
      ) {
        newErrors[name] = "Please Enter Valid Email !";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "phone") {
      if (value.length <= 0) {
        newErrors[name] = "Phone Number is required !";
      } else if (!phoneRegex.test(value)) {
        newErrors[name] = "Phone Number must be 10 digits!";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "password") {
      if (value.length <= 0) {
        newErrors[name] = "Password is required !";
      } else if (!passwordRegex.test(value)) {
        newErrors[name] = (
          <ul style={{ paddingLeft: "20px" }}>
            <li>Password must be at least 9 characters long </li>
            <li>Contain at least one special character</li>
            <li>Contain at least one number</li>
            <li>Contain at least one uppercase letter</li>
          </ul>
        );
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "certificate" && uplodeFile) {
      if (!files[0]) {
        newErrors[name] = "Certificate is required !";
      } else {
        newErrors[name] = "";
      }
    } else if (name === "certificate") {
      newErrors[name] = "";
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!signupData.fullName) {
      newErrors.fullName = "Full Name is required !";
      valid = false;
    }

    if (!signupData.email) {
      newErrors.email = "Email is required !";
      valid = false;
    }

    if (!signupData.password) {
      newErrors.password = "Password is required !";
      valid = false;
    }

    if (!signupData.phone) {
      newErrors.phone = "Phone is required !";
      valid = false;
    }

    if (uplodeFile && !signupData.certificate) {
      newErrors.certificate = "Certificate is required !";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const addUser = () => {
    const formData = new FormData();
    formData.append("name", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("role", signupData.role || "user");
    formData.append("images", signupData.certificate);
    formData.append("phone", signupData.phone);

    ApiPost("auth/register", formData)
      .then((res) => {
        toast.success("Account Created Successfully!");
        setSignupData({});
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message || "An error occurred.");
      });
  };

  const submitHandler = () => {
    if (validateForm()) {
      addUser();
    }
  };

  return (
    <div className="auth-container">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="auth-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Welcome!</h1>
        <p>Create an account to join our amazing light show community.</p>
      </div>
      <div className="auth-right">
        <h2>Sign Up</h2>
        <form>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={signupData.fullName || ""}
            onChange={changeHandler}
          />
          <span className="errorMsg">{errors.fullName}</span>

          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={signupData.phone || ""}
            maxLength="10"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={changeHandler}
          />
          <span className="errorMsg">{errors.phone}</span>

          <input
            type="email"
            placeholder="yourmail@email.com"
            name="email"
            value={signupData.email || ""}
            onChange={changeHandler}
          />
          <span className="errorMsg">{errors.email}</span>

          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={signupData.password || ""}
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

          <select
            id="role"
            className="dropdown-select"
            name="role"
            onChange={changeHandler}
            value={signupData.role || ""}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="dealer">Dealer</option>
          </select>
          {uplodeFile && (
            <>
              <label htmlFor="certificate">
                <span>Upload Visiting Card</span>
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
                <br />
                <span style={{ fontSize: "12px", fontStyle: "italic" }}>
                  {fileName}
                </span>
              </label>
              <input
                type="file"
                name="certificate"
                id="certificate"
                accept="image/png, image/gif, image/jpeg"
                style={{ display: "none" }}
                onChange={changeHandler}
              />
              <span className="errorMsg">{errors.certificate}</span>
            </>
          )}
          <button type="button" onClick={submitHandler}>
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <NavLink to="/login">Sign In</NavLink>
        </p>
      </div>
    </div>
  );
}
