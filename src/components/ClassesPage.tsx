import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./ClassesPage.css";

interface Props {
  onSelectActivity: (activity: any) => void;
}

const ClassesPage: React.FC<Props> = ({ onSelectActivity }) => {
  const [activities, setActivities] = useState<any[]>([]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("Assigned");

  useEffect(() => {
    // Sample data (replace with real data later)
    const data = [
      { id: 1, title: "Activity 1", className: "ITE 391" },
      { id: 2, title: "Project Proposal", className: "ITE 391", dueDate: "2025-10-10" },
      { id: 3, title: "Quiz 1", className: "ITE 301", dueDate: "2025-10-13" },
    ];
    setActivities(data);
  }, []);

  const categorizeActivities = (activities: any[]) => {
    const now = new Date();
    const oneWeekLater = new Date(now);
    oneWeekLater.setDate(now.getDate() + 7);
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 14);

    return {
      "No Due Date": activities.filter((a) => !a.dueDate),
      "This Week": activities.filter((a) => a.dueDate && new Date(a.dueDate) <= oneWeekLater),
      "Next Week": activities.filter(
        (a) => a.dueDate && new Date(a.dueDate) > oneWeekLater && new Date(a.dueDate) <= nextWeek
      ),
      Later: activities.filter((a) => a.dueDate && new Date(a.dueDate) > nextWeek),
    };
  };

  const getLabelsForTab = () => {
    if (activeTab === "Missed") {
      return ["This Week", "Last Week", "Earlier", "Later"];
    } else if (activeTab === "Done") {
      return ["No Due Date", "Done Early", "This Week", "Last Week", "Earlier"];
    } else {
      return ["No Due Date", "This Week", "Next Week", "Later"];
    }
  };

  const categorized = categorizeActivities(activities);
  const labels = getLabelsForTab();

  const toggleSection = (section: string) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const handleActivityClick = (activity: any) => {
    onSelectActivity(activity);
  };

  return (
    <div className="classes-page">
      {/* Tabs */}
      <div className="tabs">
        {["Assigned", "Missed", "Done"].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tasks Container */}
      <div className="tasks-container">
        <h1>Tasks</h1>

        {labels.map((label) => (
          <div key={label} className="classes-section">
            <div className="section-header" onClick={() => toggleSection(label)}>
              <span>{label}</span>
              {openSections[label] ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {openSections[label] && (
              <div className="section-content">
                {categorized[label]?.length ? (
                  categorized[label].map((activity) => (
                    <div
                      key={activity.id}
                      className="activity-card"
                      onClick={() => handleActivityClick(activity)}
                    >
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-meta">{activity.className}</div>
                      {activity.dueDate && (
                        <div className="due-date">
                          Due: {new Date(activity.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="empty-text">No activities</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
