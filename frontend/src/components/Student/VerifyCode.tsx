import React from "react";
import "./VerifyCode.css";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VerifyCode: React.FC = () => {
    const navigate = useNavigate();

     const handleNext = () => {
    // later you can validate code before navigating
    navigate("/resetpass");
  };

  return (
    <div className="page-bg">
      <div className="card-container">
        <img src="/src/assets/phinmalogo.png" alt="Logo" className="logo" />
        <h2>You’ve received a code</h2>
        <p>
          Check your email to get your confirmation code. If you need to request
          a new one, go back and try again.
        </p>
        <input type="text" placeholder="Enter your code" />
        <button className="next-btn" onClick={handleNext}>
            Next</button>
      </div>
    </div>
  );
};

export default VerifyCode;
