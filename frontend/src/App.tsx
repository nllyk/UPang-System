// src/App.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import StudentApp from "./components/Student/StudentApp";
import AdminApp from "./components/Admin/AdminApp";

const App: React.FC = () => {
  const location = useLocation();

  // If URL starts with "/admin", load the admin side
  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? <AdminApp /> : <StudentApp />;
};

export default App;
