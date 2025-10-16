// src/components/frontend/Student/StudentApp.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPass from "./ForgotPass";
import VerifyCode from "./VerifyCode";
import ResetPass from "./ResetPass";
import Dashboard from "./StudentDashboard";
import Grades from "./Grades";
import Settings from "./Settings";

const StudentApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpass" element={<ForgotPass />} />
      <Route path="/verifycode" element={<VerifyCode />} />
      <Route path="/resetpass" element={<ResetPass />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/grades" element={<Grades />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default StudentApp;
