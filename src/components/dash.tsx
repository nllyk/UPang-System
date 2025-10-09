import React from "react";
import { FaUser, FaTrash, FaBars, FaHome, FaClipboardList, FaChartBar, FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      {/* Header Navbar */}
      <header className="dashboard-header">
        <button className="menu-btn">
          <FaBars />
        </button>
        <img src="/src/assets/phinmalogo.png" alt="Logo" className="logo" />
        <h1>UPang Learning Management System</h1>
      </header>

      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <button><FaHome /></button>
          <button><FaClipboardList /></button>
          <button><FaChartBar /></button>
          <button><FaBell /></button>
          <button><FaCog /></button>
          <button><FaSignOutAlt /></button>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Join Class Button */}
          <div className="join-class">
            <button className="join-btn">Join Class +</button>
          </div>

          {/* Class Cards */}
         <div className="class-grid">
            <div className="class-card green">
              <div className="card-header">
                <FaUser className="card-icon" />
            </div>
                <div className="class-info">
                <h3>ITE 391</h3>
                <p>Grace Carpizo</p>
              </div>
              <div className="class-body">
                <p className="empty-msg">No Activities yet....</p>
              </div>
              <div className="card-footer">
                <FaTrash className="delete-icon" />
              </div>
            </div>

            <div className="class-card blue">
              <div className="card-header">
               <FaUser className="card-icon" /> 
            </div>  
               <div className="class-info">
                <h3>ITE 391</h3>
                <p>Grace Carpizo</p>
               </div>
              <div className="class-body">
                <p className="empty-msg">No Activities yet....</p>
              </div>
              <div className="card-footer">
                <FaTrash className="delete-icon" />
              </div>
            </div>

            <div className="class-card orange">
              <div className="card-header">
              <FaUser className="card-icon" /> 
            </div>  
              <div className="class-info">
                <h3>ITE 391</h3>
                <p>Grace Carpizo</p>
              </div>  
              <div className="class-body">
                <p className="empty-msg">No Activities yet....</p>
              </div>
              <div className="card-footer">
                <FaTrash className="delete-icon" />
              </div>
            </div>

            <div className="class-card red">
              <div className="card-header">
              <FaUser className="card-icon" />  
            </div>
              <div className="class-info">
                <h3>ITE 391</h3>
                <p>Grace Carpizo</p>
              </div>
              <div className="class-body">
                <p className="empty-msg">No Activities yet....</p>
              </div>
              <div className="card-footer">
                <FaTrash className="delete-icon" />
              </div>
            </div>
            
            <div className="class-card green">
              <div className="card-header">
                <FaUser className="card-icon" />
            </div>
                <div className="class-info">
                <h3>ITE 391</h3>
                <p>Grace Carpizo</p>
              </div>
              <div className="class-body">
                <p className="empty-msg">No Activities yet....</p>
              </div>
              <div className="card-footer">
                <FaTrash className="delete-icon" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
