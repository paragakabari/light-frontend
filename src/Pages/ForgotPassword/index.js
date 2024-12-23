import React, { useState } from "react";
import "../LogIn/login.scss";
import logo from "../../assets/img/Logo.png";
import { ApiPostNoAuth } from "../../services/helpers/API/ApiData";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Please enter a valid email address.";
  };

  // Form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    try {
      // API call to request password reset
      const response = await ApiPostNoAuth("users/forgot-password", { email });

      if (response.status === 200) {
        toast.success("Reset link sent to your email.");
        setEmail(""); // Clear input field after success
      } else {
        toast.error(response.message || "An error occurred.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Forgot Password?</h1>
        <p>Enter your email to reset your password.</p>
      </div>
      <div className="auth-right">
        <h2>Reset Password</h2>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="yourmail@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit">Send Reset Link</button>
        </form>
        <p>
          Remember your password? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
