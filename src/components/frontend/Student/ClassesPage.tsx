// ✅ Updated ClassesPage.tsx

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
import MissingView from "./MissingView"; 
import DoneView from "./DoneView";

interface Activity {
  id: number;
  title: string;
  dueDate: string;
  isAcceptingWork: boolean;
  isMissing: boolean;
  submittedDate?: string;
}

interface Subject {
  id: number;
  code: string;
  activities: Activity[];
}

const ClassesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"assigned" | "missed" | "done">(
    "assigned"
  );
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedMissing, setSelectedMissing] = useState<Activity | null>(null);
  const [selectedDone, setSelectedDone] = useState<Activity | null>(null);

  const subjects: Subject[] = [
    {
      id: 1,
      code: "ITE391",
      activities: [
        {
          id: 1,
          title: "Activity 1",
          dueDate: "Aug 24",
          isAcceptingWork: true,
          isMissing: false,
          submittedDate: "Aug 23",
        },
        {
          id: 2,
          title: "Activity 2",
          dueDate: "Aug 22",
          isAcceptingWork: false,
          isMissing: true,
          submittedDate: undefined,
        },
      ],
    },
  ];

  const handleOpenView = (activity: Activity) => setSelectedActivity(activity);
  const handleOpenMissing = (activity: Activity) => setSelectedMissing(activity);
  const handleOpenDone = (activity: Activity) => setSelectedDone(activity);

  const handleCloseViews = () => {
    setSelectedActivity(null);
    setSelectedMissing(null);
    setSelectedDone(null); // ✅ Now closes DoneView too!
  };

  return (
    <div className="classes-container">
      <div className="classes-header">
        <h2>Freehand Drawing</h2>
        <p>Ma. Grace Carpizo</p>
      </div>

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

      <div className="classes-list">
        {subjects.map((subject) => (
          <div className="subject-section" key={subject.id}>
            <h3 className="subject-title">
              <FaBook className="subject-icon" /> {subject.code}
            </h3>

            <div className="activity-list">
              {subject.activities.map((activity) => {
                if (activeTab === "assigned" && activity.isMissing) return null;
                if (activeTab === "missed" && !activity.isMissing) return null;
                if (activeTab === "done" && !activity.submittedDate) return null;

                return (
                  <div
                    className="activity-card"
                    key={activity.id}
                    onClick={() => {
                      if (activeTab === "done") handleOpenDone(activity);
                      else if (activeTab === "missed") handleOpenMissing(activity);
                      else handleOpenView(activity);
                    }}
                  >
                    <div className="activity-info">
                      <FaClipboard className="activity-icon" />
                      <span className="activity-title">{activity.title}</span>
                    </div>

                    <p className="activity-subtext">
                      Due: {activity.dueDate}
                    </p>

                    {activeTab === "missed" && (
                      <span className="status-small"
                        style={{
                          color: activity.isAcceptingWork ? "#009432" : "#EA2027",
                        }}
                      >
                        {activity.isAcceptingWork
                          ? "Accepting Work"
                          : "Not Accepting Work"}
                      </span>
                    )}

                    {activeTab === "done" && (
                      <span className="status-small" style={{ color: "#009432" }}>
                        ✅ Submitted: {activity.submittedDate}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Popup View Windows */}
      {selectedActivity && (
        <ActivityView activity={selectedActivity} onClose={handleCloseViews} />
      )}

      {selectedMissing && (
        <MissingView activity={selectedMissing} onClose={handleCloseViews} />
      )}

      {selectedDone && (
        <DoneView activity={selectedDone} onClose={handleCloseViews} />
      )}
    </div>
  );
};

export default ClassesPage;
