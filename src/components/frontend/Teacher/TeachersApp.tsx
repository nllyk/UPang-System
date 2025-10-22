// src/components/frontend/Teachers/TeachersApp.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import TeachersDashboard from "./TeachersDashboard";
import AssignGrade from "./AssignGrade";


const TeachersApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/teacher/dashboard" element={<TeachersDashboard />} />
      <Route path="/teacher/grade/:classId/:activityId" element={<AssignGrade />} />

      
    </Routes>
  );
};

export default TeachersApp;
