import React from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔒 Database/Backend logout logic
    // Example:
    // localStorage.removeItem("token");
    // await fetch("/api/logout", { method: "POST" });
    navigate("/"); // Redirect to login
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <FiLogOut className="logout-icon" />
        <h2>Log out of your account?</h2>
        <p>You’ll need to sign in again to access your dashboard.</p>
        <div className="logout-buttons">
          <button className="cancel-btn" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
