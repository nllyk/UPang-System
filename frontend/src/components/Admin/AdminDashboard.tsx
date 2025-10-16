import React, { useState } from "react";
import {
  FaUserCircle,
  FaBars,
  FaHome,
  FaClipboardList,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AdminDashboard.css";
import CreateClassForm from "./CreateClassForm";
import ClassName from "./ClassName";

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [currentClass, setCurrentClass] = useState<any>(null);

  const handleMenuToggle = () => setIsSidebarOpen((prev) => !prev);

  const handleTabClick = (tab: string) => {
    setActivePage(tab);
    setCurrentClass(null);
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-dashboard-header">
        <button
          className={`menu-btn ${isSidebarOpen ? "active" : ""}`}
          onClick={handleMenuToggle}
        >
          <FaBars />
        </button>
        <img src="/src/assets/phinmalogo.png" alt="Logo" className="logo" />
        <h1>UPang Learning Management System</h1>

        {/* Profile Icon */}
        <div className="header-right">
          <FaUserCircle className="profile-icon" />
        </div>
      </header>

      {/* Main Body */}
      <div className="admin-dashboard-body">
        {/* Sidebar */}
        <aside
          className={`admin-sidebar ${isSidebarOpen ? "open" : "collapsed"}`}
        >
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
            className={activePage === "reports" ? "active" : ""}
            onClick={() => handleTabClick("reports")}
          >
            <FaChartBar /> {isSidebarOpen && <span>Reports</span>}
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
        <main className="admin-main-content">
          {/* Home */}
          {activePage === "home" && !currentClass && (
            <div className="admin-empty-state">
              <img
                src="/src/assets/books.png"
                alt="Add Class"
                className="illustration"
              />
              <p className="text-lg font-medium">Add class to get started</p>
              <button
                className="create-btn"
                onClick={() => setActivePage("create")}
              >
                Create Class +
              </button>
            </div>
          )}

          {/* Create Class Form */}
          {activePage === "create" && !currentClass && (
            <CreateClassForm
              onCreateClass={(classData) => {
                setCurrentClass(classData);
                setActivePage("classname");
              }}
            />
          )}

          {/* ClassName Page (Once Created) */}
          {currentClass && (
            <ClassName
              classInfo={currentClass}
              onBack={() => {
                setCurrentClass(null);
                setActivePage("home");
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
