import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaBars,
  FaHome,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaArchive,
} from "react-icons/fa";
import "./AdminDashboard.css";
import CreateClassForm from "./CreateClassForm";
import ClassName from "./ClassName";
import Settings from "./AdminSettings";
import Logout from "./Logout";
import AdminClassCard from "./AdminClassCard";
import Archived from "./Archived";

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [currentClass, setCurrentClass] = useState<any | null>(null);
  const [classes, setClasses] = useState<any[]>(() => {
  const saved = localStorage.getItem("classes");
    return saved ? JSON.parse(saved) : [];
  });

  // persist classes to localStorage
  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const handleTabClick = (tab: string) => {
    setActivePage(tab);
    setCurrentClass(null);
  };

  const handleCreateClass = (classData: any) => {
    const newClass = {
      _id: Date.now().toString(),
      name: classData.subject || "Untitled Class",
      instructor: classData.professor || "Unknown Instructor",
      section: classData.section || "No Section",
      color: classData.color || "green",
      activities: [],
    };

    const updated = [...classes, newClass];
    setClasses(updated);
    setCurrentClass(newClass);
    setActivePage("classname");
  };

  const handleDeleteClass = (index: number) => {
    if (window.confirm("Delete this class?")) {
      const updated = [...classes];
      updated.splice(index, 1);
      setClasses(updated);
    }
  };

  const handleClassUpdate = (identifier: any, snippet: string) => {
    setClasses((prev) =>
      prev.map((c) => {
        if (c._id === identifier._id) {
          return {
            ...c,
            activities: [snippet, ...(c.activities || [])],
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-dashboard-header">
        <button
          className={`menu-btn ${isSidebarOpen ? "active" : ""}`}
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <FaBars />
        </button>
        <img src="/src/assets/phinmalogo.png" alt="Logo" className="logo" />
        <h1>UPang Learning Management System</h1>
        <div className="header-right">
          <FaUserCircle className="profile-icon" />
        </div>
      </header>

      <div className="admin-dashboard-body">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
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
            className={activePage === "settings" ? "active" : ""}
            onClick={() => handleTabClick("settings")}
          >
            <FaCog /> {isSidebarOpen && <span>Settings</span>}
          </button>

          <button
            className={activePage === "archived" ? "active" : ""}
            onClick={() => handleTabClick("archived")}
          >
            <FaArchive /> {isSidebarOpen && <span>Archived</span>}
          </button>

          <button
            className={activePage === "logout" ? "active" : ""}
            onClick={() => handleTabClick("logout")}
          >
            <FaSignOutAlt /> {isSidebarOpen && <span>Logout</span>}
          </button>
        </aside>

        {/* Main content */}
        <main className="admin-main-content">
          {activePage === "home" && !currentClass && (
            <div className="admin-empty-state">
              <img src="/src/assets/books.png" alt="books" className="illustration" />
              <p className="text-lg font-medium">Add a class to get started</p>
              <button
                className="create-btn"
                onClick={() => setActivePage("create")}
              >
                Create Class +
              </button>
            </div>
          )}

          {activePage === "create" && (
            <CreateClassForm onCreateClass={handleCreateClass} />
          )}

          {activePage === "classes" && !currentClass && (
            <div className="classes-page">
              <h2>Your Classes</h2>
              <div className="classes-grid">
                {classes.length === 0 && <p>No classes yet.</p>}
                {classes.map((cls, idx) => (
                  <AdminClassCard
                    key={cls._id}
                    subject={cls.name}
                    professor={cls.instructor}
                    color={cls.color}
                    activities={cls.activities}
                    onClick={() => {
                      setCurrentClass(cls);
                      setActivePage("classname");
                    }}
                    onDelete={() => handleDeleteClass(idx)}
                  />
                ))}
              </div>
            </div>
          )}

          {activePage === "classname" && currentClass && (
            <ClassName
              classInfo={currentClass}
              onNavigateColor={() => {}}
              onClassUpdate={handleClassUpdate}
            />
          )}

          {activePage === "settings" && <Settings />}
          {activePage === "archived" && <Archived />}
          {activePage === "logout" && <Logout />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
