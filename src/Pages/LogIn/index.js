import React, { useState } from "react";
import "./login.scss";
import logo from "../../assets/img/Logo.png";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiPostNoAuth } from "../../services/helpers/API/ApiData";
import { useCookies } from "react-cookie";

export default function LogIn() {
  const [loginData, setLoginData] = useState({});
  const [blanck, setBlanck] = useState({});
  const [errors, setErrors] = useState({});
  const [cookies, setCookies] = useCookies(["auth"]);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const changeHandler = (e) => {
    loginData[e.target.name] = e.target.value;
    blanck[e.target.name] = "";
    setLoginData({ ...loginData });
    setBlanck({ ...blanck });

    // ==-=-=-=-=-=-=-=-=-=-=-=-=-=- onchange Validation Start -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    // -=-=-=-=-=- email -=-=-=-=-=-=

    if (e.target.name === "email") {
      if (e.target.value.length <= 0) {
        errors[e.target.name] = "Email is required !";
      } else if (
        !(
          e.target.value.includes("@gmail") ||
          e.target.value.includes("@outlook") ||
          e.target.value.includes("@mailinator") ||
          e.target.value.includes("@modotso.com")
        )
      ) {
        errors[e.target.name] = "Please Enter Valid Email !";
      } else {
        errors[e.target.name] = "";
      }
    }

    // -=-=-=-=-=-Password -=-=-=-=-=-=

    if (e.target.name === "password") {
      if (e.target.value.length <= 0) {
        errors[e.target.name] = "Password is required !";
      } else if (e.target.value.length < 8) {
        errors[e.target.name] = "Password must be more then 8 character !";
      } else {
        errors[e.target.name] = "";
      }
    }
    setErrors({ ...errors });

    // ==-=-=-=-=-=-=-=-=-=-=-=-=-=- onchange Validation Over -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  };

  // ==-=-=-=-=-=-=-=-=-=-=-=-=-=- Submit start -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  const submitHandler = () => {
    if (!loginData.email) {
      errors.email = "Email is required !";
    }

    if (!loginData.password) {
      errors.password = "Password is required !";
    }
    setErrors({ ...errors });

    if (Object.values(errors).every((x) => x === "")) {
      // toast.success("Login Successfully !");
      // localStorage.setItem("isLogin", "true");
      setLoginData({ ...blanck });
    }
    const data = {
      email: loginData.email,
      password: loginData.password,
    };
    console.log("DATA", data);

    ApiPostNoAuth("auth/login", data)
      .then((res) => {
        console.log("RES", res);
        if (res.status === 200) {
          setCookies("user_id", res?.data?.user?.user?.id);
          setCookies("email", res?.data?.user?.email);
          setCookies("role", res?.data?.user?.role);
          if (path === "/admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/home");
          }
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log("ERR", err);
        toast.error(err);
      });
  };

  // ==-=-=-=-=-=-=-=-=-=-=-=-=-=- Submit End -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

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
        <form>
          <input
            type="email"
            placeholder="yourmail@email.com"
            name="email"
            onChange={changeHandler}
            value={loginData.email}
          />
          <span className="errorMsg">{errors.email}</span>

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={changeHandler}
          />
          <span className="errorMsg">{errors.password}</span>
          <button type="button" onClick={submitHandler}>
            Sign In
          </button>
        </form>

        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
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
