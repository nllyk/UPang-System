import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutPage.css";

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Example: clear auth tokens here
    // localStorage.removeItem("token");
    const t = setTimeout(() => navigate("/login"), 1200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="logout-wrap">
      <h2>You have been logged out.</h2>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default LogoutPage;
