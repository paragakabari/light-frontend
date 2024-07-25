import React, { useState } from "react";
import "../LogIn/login.scss";
import logo from "../../assets/img/Logo.png";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [signupData, setSignupData] = useState({});
  const [blanck, setBlanck] = useState({});
  const [uplodeFile, setUplodeFile] = useState(false);
  const [errors, setErrors] = useState({});
  let checkName = /^[A-Za-z\s]*$/;
  const navigate = useNavigate();

  const changeHandler = (e) => {
    if (e.target.name === "role") {
      if (e.target.value === "Seller") {
        setUplodeFile(true);
      } else {
        setUplodeFile(false);
      }
    }

    if (e.target.name === "certificate") {
      signupData[e.target.name] = e.target.files[0];
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
          e.target.value.includes("@mailinator")
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
      } else if (e.target.value.length < 8) {
        errors[e.target.name] =
          e.target.name + " must be more then 8 character !";
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

  // ==-=-=-=-=-=-=-=-=-=-=-=-=-=- Submit start -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

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
      toast.success("Account Created Successfully !");
      setSignupData({ ...blanck });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  // ==-=-=-=-=-=-=-=-=-=-=-=-=-=- Submit End -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

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
          <span className="errorMsg">
            {errors.fullName}
          </span>
          <input
            type="email"
            placeholder="yourmail@email.com"
            name="email"
            value={signupData.email || ""}
            onChange={changeHandler}
          />
          <span className="errorMsg">
            {errors.email}
          </span>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={signupData.password  || ""}
            onChange={changeHandler}
          />
          <span className="errorMsg">
            {errors.password}
          </span>

          <select
            id="role"
            class="dropdown-select"
            name="role"
            onChange={changeHandler}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="User" selected>
              User
            </option>
            <option value="Seller">Seller</option>
          </select>
          {uplodeFile ? (
            <>
              <label htmlFor="certificate">
                <span>Upload Certificate</span>
                <i class="fa-solid fa-arrow-up-from-bracket"></i>
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
      <div class="custom-shape-divider-bottom-1721300872">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}
