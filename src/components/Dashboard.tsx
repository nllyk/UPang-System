import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaBars,
  FaHome,
  FaClipboardList,
  FaChartBar,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Dashboard.css";
import ClassCard from "./ClassCard";
import ClassDetails from "./ClassDetails";
import ClassesPage from "./ClassesPage";
import ActivityView from "./ActivityView";
import Grades from "./Grades";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [activePage, setActivePage] = useState("home");
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const classes = [
    {
      id: 1,
      subject: "ITE 391",
      professor: "Grace Carpizo",
      color: "green",
      activities: ["Activity 1", "Activity 2"],
    },
    {
      id: 2,
      subject: "ITE 314",
      professor: "Angelica Vidal",
      color: "blue",
      activities: ["Project Proposal"],
    },
    {
      id: 3,
      subject: "ITE 353",
      professor: "Veronica Canlas",
      color: "orange",
      activities: [],
    },
    {
      id: 4,
      subject: "ITE 359",
      professor: "Josephine Cruz",
      color: "red",
      activities: ["Milestone 1"],
    },
  ];

  const handleMenuToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleTabClick = (tabName: string) => {
    setActivePage(tabName);
    setSelectedClass(null);
    setSelectedActivity(null);
  };

  useEffect(() => {
    setActivePage("home");
  }, []);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <button
          className={`menu-btn ${isSidebarOpen ? "active" : ""}`}
          onClick={handleMenuToggle}
        >
          <FaBars />
        </button>
        <img src="/src/assets/phinmalogo.png" alt="Logo" className="logo" />
        <h1>UPang Learning Management System</h1>
      </header>

      {/* Body */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
          <button
            className={activePage === "home" ? "active" : ""}
            onClick={() => handleTabClick("home")}
          >
            <FaHome /> {isSidebarOpen && <span>Home</span>}
          </button>

          <button
            className={activePage === "classes" ? "active" : ""}
            onClick={() => handleTabClick("classes")}
          >
            <FaClipboardList /> {isSidebarOpen && <span>Classes</span>}
          </button>

          <button
            className={activePage === "grades" ? "active" : ""}
            onClick={() => handleTabClick("grades")}
          >
            <FaChartBar /> {isSidebarOpen && <span>Grades</span>}
          </button>

          <button
            className={activePage === "notifications" ? "active" : ""}
            onClick={() => handleTabClick("notifications")}
          >
            <FaBell /> {isSidebarOpen && <span>Notifications</span>}
          </button>

          <button
            className={activePage === "settings" ? "active" : ""}
            onClick={() => handleTabClick("settings")}
          >
            <FaCog /> {isSidebarOpen && <span>Settings</span>}
          </button>

          <button
            className={activePage === "logout" ? "active" : ""}
            onClick={() => handleTabClick("logout")}
          >
            <FaSignOutAlt /> {isSidebarOpen && <span>Logout</span>}
          </button>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Home Page */}
          {activePage === "home" && !selectedClass && (
            <>
              <div className="join-class">
                <button className="join-btn">Join Class +</button>
              </div>
              <div className="class-grid">
                {classes.map((cls) => (
                  <ClassCard
                    key={cls.id}
                    subject={cls.subject}
                    professor={cls.professor}
                    color={cls.color}
                    activities={cls.activities}
                    onClick={() => setSelectedClass(cls)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Class Details */}
          {selectedClass && (
            <ClassDetails
              selectedClass={selectedClass}
              onBack={() => setSelectedClass(null)}
              onSelectClass={(c) => setSelectedClass(c)}
            />
          )}

          {/* Classes Page */}
          {activePage === "classes" && !selectedActivity && (
            <ClassesPage
              onSelectActivity={(activity) => setSelectedActivity(activity)}
            />
          )}

          {/* Activity View */}
          {activePage === "classes" && selectedActivity && (
            <ActivityView
              activityTitle={selectedActivity.title}
              onMarkDone={() => setSelectedActivity(null)}
            />
          )}

           {/* 📊 Grades Page */}
          {activePage === "grades" && (
            <div className="class-grid">
              {classes.map((cls) => (
                <Grades
                  key={cls.id}
                  subject={cls.subject}
                  professor={cls.professor}
                  color={cls.color}
                  grades={cls.grades}
                  onClick={() => console.log("Clicked grade:", cls.subject)}
                />
              ))}
            </div>
          )}
          {/* Other Tabs */}
          {activePage === "notifications" && <div>Notifications</div>}
          {activePage === "settings" && <div>Settings</div>}
          {activePage === "logout" && <div>Logging out...</div>}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
