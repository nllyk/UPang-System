// src/components/frontend/Admin/AdminApp.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UsersPage from "./UserPage";
import SubjectContent from "./SubjectContent";
import ReportsPage from "./ReportPage";
import LogoutPage from "./LogoutPage";

const AdminApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<div />} /> {/* Dashboard handled inside AdminDashboard */}
        <Route path="users" element={<UsersPage />} />
        <Route path="subjects" element={<SubjectContent />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="logout" element={<LogoutPage />} />
      </Route>
    </Routes>
  );
};

export default AdminApp;
