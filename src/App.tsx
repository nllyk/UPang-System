import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPass from "./components/ForgotPass";
import VerifyCode from "./components/VerifyCode";
import ResetPass from "./components/ResetPass";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/verifycode" element={<VerifyCode />} />
        <Route path="/resetpass" element={<ResetPass />} />
      </Routes>
    </Router>
  );
};

export default App;
