import React, { useState } from "react";
import "../LogIn/login.scss";
import logo from "../../assets/img/Logo.png";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ApiPost } from "../../services/helpers/API/ApiData";

export default function Signup() {
  const [signupData, setSignupData] = useState({});
  const [blanck, setBlanck] = useState({});
  const [uplodeFile, setUplodeFile] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false); // Added state for password visibility
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z\s]*$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?.])[A-Za-z\d!@#$%^&*()_+{}:"<>?.]{9,}$/;
  const phoneRegex = /^\d{10}$/; // Ensure phone number is exactly 10 digits

  const changeHandler = (e) => {
    const { name, value, files } = e.target;

    if (name === "role") {
      setUplodeFile(value === "dealer");
    }

    if (name === "certificate") {
      signupData[name] = files[0];
      setFileName(files[0].name);
    } else {
      signupData[name] = value;
      blanck[name] = "";
    }

    setSignupData({ ...signupData });
    setBlanck({ ...blanck });

    // Validate fields on change
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "fullName":
        if (!value) {
          errorMsg = "Full Name is required!";
        } else if (!nameRegex.test(value)) {
          errorMsg = "Full Name is not valid!";
        }
        break;

      case "email":
        if (!value) {
          errorMsg = "Email is required!";
        } else if (
          !/@(gmail|outlook|mailinator|fuzitea)\.com$/.test(value)
        ) {
          errorMsg = "Please enter a valid Email!";
        }
        break;

      case "phone":
        if (!value) {
          errorMsg = "Phone Number is required!";
        } else if (!phoneRegex.test(value)) {
          errorMsg = (
            <ul style={{ listStyleType: "none" }}>
              <li>Example: 90xxxxxx21</li>
              <li>Please enter a valid Phone Number</li>
            </ul>
          );
        }
        break;

      case "password":
        if (!value) {
          errorMsg = "Password is required!";
        } else if (!passwordRegex.test(value)) {
          errorMsg = (
            <ul style={{ paddingLeft: "20px" }}>
              <li>Password must be at least 9 characters long</li>
              <li>Contain at least one special character</li>
              <li>Contain at least one number</li>
              <li>Contain at least one uppercase letter</li>
            </ul>
          );
        }
        break;

      case "certificate":
        if (uplodeFile && !signupData[name]) {
          errorMsg = "Certificate is required!";
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const addUser = () => {
    const formData = new FormData();
    formData.append("name", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("role", signupData.role ? signupData.role : "user");
    formData.append("images", signupData.certificate);

    ApiPost("auth/register", formData)
      .then((res) => {
        toast.success("Account Created Successfully!");
        setSignupData({ ...blanck });
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const submitHandler = () => {
    const requiredFields = ["fullName", "phone", "email", "password"];
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!signupData[field]) {
        isValid = false;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required!`,
        }));
      }
    });

    if (uplodeFile && !signupData.certificate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        certificate: "Certificate is required!",
      }));
      isValid = false;
    }

    if (isValid && Object.values(errors).every((x) => x === "")) {
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
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
}
