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
  let checkName = /^[A-Za-z\s]*$/;
  const navigate = useNavigate();
  let passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?])[A-Za-z\d!@#$%^&*()_+{}:"<>?]{9,}$/;

  const changeHandler = (e) => {
    if (e.target.name === "role") {
      if (e.target.value === "dealer") {
        setUplodeFile(true);
      } else {
        setUplodeFile(false);
      }
    }

    if (e.target.name === "certificate") {
      signupData[e.target.name] = e.target.files[0];
      setFileName(e.target.files[0].name);
    } else {
      signupData[e.target.name] = e.target.value;
      blanck[e.target.name] = "";
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

    setErrors({ ...errors });

    // ==-=-=-=-=-=-=-=-=-=-=-=-=-=- onchange Validation Over -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
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
        toast.success("Account Created Successfully !");
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

    if (!signupData.certificate && uplodeFile) {
      errors.certificate = "Certificate is required !";
    } else {
      errors.certificate = "";
    }
    setErrors({ ...errors });

    if (Object.values(errors).every((x) => x === "")) {
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
          {uplodeFile ? (
            <>
              <label htmlFor="certificate">
                <span>Upload Visiting Card</span>
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
                <br />
                <span style={{fontSize:"12px",fontStyle:"italic"}}>{fileName}</span>
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
          ) : (
            ""
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
