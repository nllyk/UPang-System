import React, { useState } from "react";
import {
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaClipboard,
  FaBook,
} from "react-icons/fa";
import "./ClassesPage.css";
import ActivityView from "./ActivityView";

interface Activity {
  id: number;
  title: string;
}

interface Subject {
  id: number;
  code: string;
  activities: Activity[];
}

const ClassesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"assigned" | "missed" | "done">("assigned");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const subjects: Subject[] = [
    {
      id: 1,
      code: "ITE391",
      activities: [
        { id: 1, title: "Activity 1" },
        { id: 2, title: "Activity 2" },
      ],
    },

  ];

  const handleUploadClick = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleCloseView = () => {
    setSelectedActivity(null);
  };

  return (
    <div className="classes-container">
      {/* Header */}
      <div className="classes-header">
        <h2>Computer Programming</h2>
        <p>Professor: Engr. Maria Santos</p>
      </div>

      {/* Subject + Activities */}
      <div className="classes-list">
        {subjects.map((subject) => (
          <div className="subject-section" key={subject.id}>
            <h3 className="subject-title">
              <FaBook className="subject-icon" /> {subject.code}
            </h3>

            <div className="activity-list">
              {subject.activities.map((activity) => (
                <div className="activity-card" key={activity.id}>
                  <div className="activity-info">
                    <FaClipboard className="activity-icon" />
                    <span className="activity-title">{activity.title}</span>
                  </div>

                  {activeTab === "assigned" && (
                    <button
                      className="btn upload-btn"
                      onClick={() => handleUploadClick(activity)}
                    >
                      Upload
                    </button>
                  )}

                  {activeTab === "missed" && (
                    <span className="status-badge missed">
                      <FaExclamationTriangle /> Missing
                    </span>
                  )}

                  {activeTab === "done" && (
                    <span className="status-badge done">
                      <FaCheck /> Submitted
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Buttons */}
      <div className="floating-buttons">
        <button
          className={`fab done ${activeTab === "done" ? "active" : ""}`}
          onClick={() => setActiveTab("done")}
        >
          <FaCheck /> <span>Done</span>
        </button>

        <button
          className={`fab missed ${activeTab === "missed" ? "active" : ""}`}
          onClick={() => setActiveTab("missed")}
        >
          <FaExclamationTriangle /> <span>Missed</span>
        </button>

        <button
          className={`fab assigned ${activeTab === "assigned" ? "active" : ""}`}
          onClick={() => setActiveTab("assigned")}
        >
          <FaClipboard /> <span>Assigned</span>
        </button>
      </div>

      {/* Activity Modal */}
      {selectedActivity && (
        <ActivityView activity={selectedActivity} onClose={handleCloseView} />
      )}
    </div>
  );
};

export default ClassesPage;
