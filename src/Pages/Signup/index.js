import React, { useState } from "react";
import "../LogIn/login.scss";
import logo from "../../assets/img/Logo.png";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
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

    // ==-=-=-=-=-=-=-=-=-=-=-=-=-=- onchange Validation Start -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    // -=-=-=-=-=- fullName -=-=-=-=-=-=
    if (e.target.name === "fullName") {
      if (e.target.value.length <= 0) {
        errors[e.target.name] = "Full Name is required !";
      } else if (!checkName.test(signupData[e.target.name])) {
        errors[e.target.name] = "Full Name not Valid !";
      } else {
        errors[e.target.name] = "";
      }
    }

    // -=-=-=-=-=- email -=-=-=-=-=-=
    if (e.target.name === "email") {
      if (e.target.value.length <= 0) {
        errors[e.target.name] = e.target.name + " is required !";
      } else if (
        !(
          e.target.value.includes("@gmail") ||
          e.target.value.includes("@outlook") ||
          e.target.value.includes("@mailinator") ||
          e.target.value.includes("@fuzitea")
        )
      ) {
        errors[e.target.name] = "Please Enter Valid " + e.target.name + " !";
      } else {
        errors[e.target.name] = "";
      }


    }


    // -=-=-=-=-=- phone -=-=-=-=-=-=
    if (e.target.name === "phone") {
      if (e.target.value.length <= 0) {
        errors[e.target.name] = e.target.name + " are required !";
      } else if (e.target.value.length < 10) {
        errors[e.target.name] = "Phone Number must be 10 digit !";
      }
      else {
        errors[e.target.name] = "";
      }
    }
    

    // -=-=-=-=-=-Password -=-=-=-=-=-=
    if (e.target.name === "password") {
      if (e.target.value.length <= 0) {
        errors[e.target.name] = e.target.name + " are required !";
      } else if (!passwordRegex.test(signupData.password)) {
        errors[e.target.name] = (
          <ul style={{ paddingLeft: "20px" }}>
            <li>Password must be at least 9 characters long </li>
            <li>Contain at least one special character</li>
            <li>Contain at least one number</li>
            <li>Contain at least one uppercase letter</li>
          </ul>
        );
      } else {
        errors[e.target.name] = "";
      }
    }

    // -=-=-=-=-=-certificate -=-=-=-=-=-=
    if (e.target.name === "certificate") {
      if (uplodeFile) {
        if (!e.target.files[0]) {
          errors[e.target.name] = e.target.name + " are required !";
        } else {
          errors[e.target.name] = "";
        }
      } else {
        errors[e.target.name] = "";
      }
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
    formData.append("phone",signupData.phone);

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
    if (!signupData.fullName) {
      errors.fullName = "Full Name is required !";
    }

    if (!signupData.email) {
      errors.email = "Email is required !";
    }

    if (!signupData.password) {
      errors.password = "Password is required !";
    }

    if (!signupData.phone) {
      errors.phone = "Phone is required !";
    }

    if (!signupData.certificate && uplodeFile) {
      errors.certificate = "Certificate is required !";
    } else {
      errors.certificate = "";
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
          <input
            type="phone"
            placeholder="1234567890"
            name="phone"
            maxLength={10}
            value={signupData.phone || ""}
            onKeyPress={(event) => {
              // only 10 digit number

              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }

            }}
            onChange={changeHandler}
          />
          <span className="errorMsg">{errors.phone}</span>
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
