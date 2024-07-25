import React from "react";
import '../LogIn/login.scss';
import logo from '../../assets/img/Logo.png';
const ForgotPassword = () => {
 
  return (
    <div className="auth-container">
    <div className="auth-left">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Forgot Password?</h1>
      <p>Enter your email to reset your password.</p>
    </div>
    <div className="auth-right">
      <h2>Reset Password</h2>
      <form>
        <input type="email" placeholder="yourmail@email.com" />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>Remember your password? <a href="/login">Sign In</a></p>
    </div>
  </div>
  );
};

export default ForgotPassword;
