import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 


const Login: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ role, email, password, remember });
  };  
  const handleLogin = () => {
    navigate("/dashboard"); // redirect after login
  };

  return (
    <div className="auth-container">
      {/* Left Side */}
      <div className="auth-left">
        
        <div className="mt-12 auth-left-content">
          <h2>Welcome, Student!</h2>
          <p>
            View your courses, submit work, take quizzes, and track your
            progress easily.
          </p>
        </div>
      </div>
 
      {/* Right Side */}
      <div className="auth-right">
  <img src="/src/assets/phinmalogo.png" alt="Logo" style={{ width: "150px", height: "150px"}} />
  <h1>UPang Learning Management System</h1>
  {/* Sign In Text */}
  <h2 className="auth-title">Sign in</h2>

  <div className="auth-card">
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
       <FaUser className="input-icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          required
        />
      </div>

      <div className="input-wrapper">
       <div className="input-icon" /> 
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
        />
      </div>

      <div className="flex items-center justify-between text-sm mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <span>Remember me</span>
        </label>
      </div>

      <button onClick={handleLogin} className="auth-button"> Sign In</button>

     <p className="forgot-link">
  <Link to="/forgotpass" className="text-green-600 hover:underline">
    Forgot password?
  </Link>
    </p>
  </form>

    <p className="auth-footer">
      Don’t have an account?{" "}
      <Link to="/signup" className="text-green-600 hover:underline">
        Sign up
      </Link>
    </p>
  </div>
</div>

    </div>
  );
};

export default Login;
