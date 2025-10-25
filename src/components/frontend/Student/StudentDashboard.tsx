import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaHome,
  FaClipboardList,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./StudentDashboard.css";
import ClassDetails from "./ClassDetails";
import ClassesPage from "./ClassesPage";
import ActivityView from "./ActivityView";
import LessonView from "./LessonView";
import Notifications from "./Notifications";
import Settings from "./StudentSettings";
import Logout from "./Logout";

const StudentDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const classes = [
    {
      id: 1,
      subject: "ITE 391",
      professor: "Grace Carpizo",
      color: "green",
      activities: ["Activity 1", "Activity 2"],
      lessons: [
        {
          id: 1,
          title: "Lesson 1: Basic Sketching",
          desc: "Introduction to freehand drawing basics.",
          instructor: "Grace Carpizo",
          file: "https://example.com/lesson1.pdf",
        },
      ],
    },
    {
      id: 2,
      subject: "ITE 314",
      professor: "Angelica Vidal",
      color: "blue",
      activities: ["Project Proposal"],
      lessons: [],
    },
  ];

  const handleMenuToggle = () => setIsSidebarOpen(!isSidebarOpen);

  const handleTabClick = (tabName: string) => {
    setActivePage(tabName);
    setSelectedClass(null);
    setSelectedLesson(null);
    setSelectedActivity(null);
  };

  useEffect(() => {
    setActivePage("home");
  }, []);

  return (
    <div className="sd-root">
      {/* Full width header */}
      <header className="sd-header">
        <div className="sd-header-left">
          <button
            className={`sd-menu-btn ${isSidebarOpen ? "active" : ""}`}
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
          <img src="/src/assets/phinmalogo.png" alt="Logo" className="sd-logo" />
          <h1 className="sd-title">UPang Learning Management System</h1>
        </div>

        <div className="sd-header-right">
          <button
            className={`sd-notif-btn ${activePage === "notifications" ? "active" : ""}`}
            onClick={() => handleTabClick("notifications")}
            aria-label="Notifications"
          >
            <FaBell />
          </button>
        </div>
      </header>

      {/* Below header: sidebar + main */}
      <div className="sd-body">
        <aside className={`sd-sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
          <nav className="sd-nav">
            <button
              className={`sd-nav-btn ${activePage === "home" ? "active" : ""}`}
              onClick={() => handleTabClick("home")}
            >
              <FaHome />
              {isSidebarOpen && <span>Home</span>}
            </button>

            <button
              className={`sd-nav-btn ${activePage === "classes" ? "active" : ""}`}
              onClick={() => handleTabClick("classes")}
            >
              <FaClipboardList />
              {isSidebarOpen && <span>Classes</span>}
            </button>

            <button
              className={`sd-nav-btn ${activePage === "settings" ? "active" : ""}`}
              onClick={() => handleTabClick("settings")}
            >
              <FaCog />
              {isSidebarOpen && <span>Settings</span>}
            </button>

            <button
              className={`sd-nav-btn ${activePage === "logout" ? "active" : ""}`}
              onClick={() => handleTabClick("logout")}
            >
              <FaSignOutAlt />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </nav>
        </aside>

        <main className="sd-main">
          {/* Home Page: Enter Class Layout */}
          {activePage === "home" && !selectedClass && (
            <div className="sd-empty-state">
              <img src="/src/assets/books.png" alt="Books" className="sd-illustration" />
              <p className="sd-text-lg">Enter your class to get started</p>
              <button className="sd-enter-class-btn" onClick={() => setSelectedClass(classes[0])}>
                Enter Class
              </button>
            </div>
          )}

          {/* Class Details */}
          {activePage === "home" && selectedClass && (
            <ClassDetails
              selectedClass={selectedClass}
              onBack={() => setSelectedClass(null)}
              onOpenLesson={(lesson) => setSelectedLesson(lesson)}
              onOpenActivity={(activity) => setSelectedActivity(activity)}
            />
          )}

          {/* Lesson View */}
          {selectedLesson && (
            <LessonView
              lessonTitle={selectedLesson.title}
              lessonDesc={selectedLesson.desc}
              lessonFile={selectedLesson.file}
              instructor={selectedLesson.instructor}
              onClose={() => setSelectedLesson(null)}
            />
          )}

          {/* Activity View */}
          {selectedActivity && (
            <ActivityView
              activity={selectedActivity}
              onClose={() => setSelectedActivity(null)}
              onSubmit={() => alert("File submitted successfully!")}
            />
          )}

          {/* Classes Page */}
          {activePage === "classes" && (
            <ClassesPage onSelectActivity={(a) => setSelectedActivity(a)} />
          )}

          {activePage === "notifications" && <Notifications />}
          {activePage === "settings" && <Settings />}
          {activePage === "logout" && <Logout />}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
