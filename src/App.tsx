import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPass from "./components/ForgotPass";
import VerifyCode from "./components/VerifyCode";
import ResetPass from "./components/ResetPass";
import Dashboard from "./components/Dashboard";
import Grades from "./components/Grades";
import Settings from "./components/Settings";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
         {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/verifycode" element={<VerifyCode />} />
        <Route path="/resetpass" element={<ResetPass />} />
        
         {/* Protected Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/grades" element={<Grades />} />
         <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
