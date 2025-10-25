import React, { useState } from "react";
import {
  FaBars,
  FaUser,
  FaUsers,
  FaBook,
  FaChartBar,
  FaSignOutAlt,
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const isDashboardActive = 
    location.pathname === "/admin" || 
    location.pathname === "/admin/dashboard";

  return (
    <div className={`admin-shell ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
      
      {/* HEADER */}
      <header className="admin-header">
        <div className="header-left">
          <button
            className="burger-btn"
            onClick={() => setIsSidebarOpen(prev => !prev)}
          >
            <FaBars />
          </button>
              <img 
          src="/src/assets/phinmalogo.png"
          alt="PHINMA Logo"
          className="phinma-logo"
        />

          <h1 className="header-title">UpangLearn Admin</h1>
        </div>

      </header>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <nav className="sidebar-nav">
          
          <button
            className={`nav-btn ${isDashboardActive ? "active" : ""}`}
            onClick={() => handleNavClick("/admin/dashboard")}
          >
            <FaTachometerAlt className="nav-icon" />
            {isSidebarOpen && <span className="nav-label">Dashboard</span>}
          </button>

          <button
            className={`nav-btn ${location.pathname === "/admin/users" ? "active" : ""}`}
            onClick={() => handleNavClick("/admin/users")}
          >
            <FaUsers className="nav-icon" />
            {isSidebarOpen && <span className="nav-label">Users</span>}
          </button>

          <button
            className={`nav-btn ${location.pathname === "/admin/subjects" ? "active" : ""}`}
            onClick={() => handleNavClick("/admin/subjects")}
          >
            <FaBook className="nav-icon" />
            {isSidebarOpen && <span className="nav-label">Subject Content</span>}
          </button>

          <button
            className={`nav-btn ${location.pathname === "/admin/reports" ? "active" : ""}`}
            onClick={() => handleNavClick("/admin/reports")}
          >
            <FaChartBar className="nav-icon" />
            {isSidebarOpen && <span className="nav-label">Reports</span>}
          </button>

          <button
            className="nav-btn logout"
            onClick={() => handleNavClick("/admin/logout")}
          >
            <FaSignOutAlt className="nav-icon" />
            {isSidebarOpen && <span className="nav-label">Logout</span>}
          </button>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        {isDashboardActive ? (
          <div className="dashboard-content">
            <h2 className="page-title">Dashboard</h2>

            <div className="dashboard-grid">
              <div className="card stat-card">
                <FaChalkboardTeacher className="stat-icon" />
                <div>
                  <h3>15</h3>
                  <p>Total Teachers</p>
                </div>
              </div>

              <div className="card stat-card">
                <FaGraduationCap className="stat-icon" />
                <div>
                  <h3>257</h3>
                  <p>Total Students</p>
                </div>
              </div>

              <div className="card chart-card">
                <h3>Total Breakdown</h3>
                <img
                  src="/src/assets/chart.png"
                  alt="Chart"
                  className="chart-placeholder"
                />
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>

    </div>
  );
};

export default AdminDashboard;
