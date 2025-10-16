import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import CreateClassForm from "./CreateClassForm";
import ClassName from "./ClassName";

const AdminApp: React.FC = () => {
  const navigate = useNavigate();

  // Example handler for class creation
  const handleCreateClass = (newClass: any) => {
    console.log("New class created:", newClass);
    navigate("/admin/classname"); // Navigate after creation
  };

  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route
        path="/admin/createclassform"
        element={<CreateClassForm onCreateClass={handleCreateClass} />}
      />
      <Route
        path="/admin/classname"
        element={
          <ClassName
            classInfo={{ name: "Example Class" }}
            onBack={() => navigate("/admin/dashboard")}
          />
        }
      />
    </Routes>
  );
};

export default AdminApp;
