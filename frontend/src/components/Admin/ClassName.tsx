import React, { useState } from "react";
import "./ClassName.css";

interface ClassNameProps {
  classInfo: any;
  onBack: () => void;
}

const ClassName: React.FC<ClassNameProps> = ({ classInfo, onBack }) => {
  const [activeTab, setActiveTab] = useState("lessons");

  return (
    <div className="classname-container">
      {/* Header */}
      <div className="classname-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h2>{classInfo.name || "Untitled Class"}</h2>
        <p>
          Section: {classInfo.section} | Subject Code: {classInfo.subjectCode}
        </p>
        <p>Instructor: {classInfo.instructor}</p>
      </div>

      {/* Tabs */}
      <div className="classname-tabs">
        {["lessons", "activities", "grades", "people"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active-tab" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="classname-content">
        {activeTab === "lessons" && <p>📚 Lessons content here...</p>}
        {activeTab === "activities" && <p>📝 Activities content here...</p>}
        {activeTab === "grades" && <p>📊 Grades content here...</p>}
        {activeTab === "people" && <p>👥 People list here...</p>}
      </div>
    </div>
  );
};

export default ClassName;
