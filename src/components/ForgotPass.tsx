import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import "./ForgotPass.css";
import { useNavigate } from "react-router-dom";


function ForgotPass () {
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/verifycode");
  };

  return (
    <div className="forgot-container">
      {/* Modal Card */}
      <div className="forgot-card">
        <img src="/src/assets/phinmalogo.png" alt="Logo" className="forgot-logo" />

        <h2 className="forgot-title">Reset account password</h2>
        <p className="forgot-subtitle">
          Enter an email associated with your account to <br />
          change your password
        </p>

        <form onSubmit={handleNext} >
          <div className="input-wrapper">
            <input type="email" placeholder="Email" required />
           
            <FaUser className="input-icon" />
          </div>

          <button type="submit" className="next-btn">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
