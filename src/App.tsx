// src/App.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import StudentApp from "./components/frontend/Student/StudentApp";
import AdminApp from "./components/frontend/Admin/AdminApp";
import TeachersApp from "./components/frontend/Teacher/TeachersApp";
const App: React.FC = () => {
  const location = useLocation();

  // Check which route we are in
  const path = location.pathname;

  if (path.startsWith("/admin")) {
    return <AdminApp />;
  } else if (path.startsWith("/teacher")) {
    return <TeachersApp />;
  } else {
    return <StudentApp />;
  }
};

export default App;
