import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApiPostNoAuth } from "../../services/helpers/API/ApiData"; // Adjust based on your actual import
import toast from "react-hot-toast";
import logo from "../../assets/img/Logo.png";
import "../LogIn/login.scss"; // Ensure the styling matches

const ResetPassword = () => {
  const { token } = useParams(); // Extracts the token from the URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Check if token is valid when the component loads
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await ApiPostNoAuth(
          `users/verify-reset-token/${token}`
        );
        if (response.status === 200) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        setError("Invalid or expired token.");
        setIsTokenValid(false);
      }
    };

    verifyToken();
  }, [token]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Basic password validation
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await ApiPostNoAuth(`users/reset-password/${token}`, {
        password: newPassword,
      });

      if (response.status === 200) {
        toast.success("Password reset successful.");
        navigate("/login"); // Redirect to login page after successful reset
      } else {
        setError("Password reset failed.");
      }
    } catch (error) {
      setError("An error occurred during password reset.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Reset Password</h1>
        <p>Enter a new password to reset your account.</p>
      </div>

      <div className="auth-right">
        {!isTokenValid ? (
          <div>{error || "Invalid reset token."}</div>
        ) : (
          <form onSubmit={handlePasswordReset}>
          <h2>Reset Password</h2>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
               className="password-toggle"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >

                {passwordVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
              </span>
            </div>

            <div className="password-container">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
               className="password-toggle"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {confirmPasswordVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
              </span>
            </div>

            {error && <p className="error-text">{error}</p>}
            <button type="submit">Reset Password</button>
          </form>
        )} 

        <p>
          Remember your password? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
