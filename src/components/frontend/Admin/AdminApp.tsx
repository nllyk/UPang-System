// src/components/frontend/Admin/AdminApp.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import CreateClassForm from "./CreateClassForm";
import ClassName from "./ClassName";


const AdminApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/createclassform" element={<CreateClassForm />} />
      <Route path="classname" element={<ClassName />}/>

    </Routes>
  );
};

export default AdminApp;
