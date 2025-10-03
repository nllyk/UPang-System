import React, { useState } from "react";
import { IoClose } from "react-icons/io5"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import "./ResetPass.css";

const ResetPass: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="page-bg">
      <div className="card-container">
        {/* X Close button */}
        <button className="close-btn" onClick={() => navigate("/")}>
          <IoClose size={20} />
        </button>

        <img src="/src/assets/phinmalogo.png" alt="Logo" className="logo" />
        <h2>Reset Password</h2>
        <p>Enter your new password below to update your account.</p>

        {/* New Password */}
        <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
          />
          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="input-wrapper">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
          />
          <span
            className="toggle-eye"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="reset-btn"onClick={() => navigate("/")}>Confirm</button>
      </div>
    </div>
  );
};

export default ResetPass;
