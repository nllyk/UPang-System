import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaBars,
  FaHome,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./TeachersDashboard.css";
import Settings from "./TeachersSettings";
import Logout from "./Logout";
import TeachersClassPage from "./TeachersClassPage";
import AssignGrade from "./AssignGrade";

const TeachersDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [currentClass, setCurrentClass] = useState<any | null>(null);

  // When grade page is opened, this holds both class + activity
  const [gradeContext, setGradeContext] = useState<{
    classInfo: any;
    activity: any;
  } | null>(null);

  const [classes, setClasses] = useState<any[]>(() => {
    const saved = localStorage.getItem("classes");
    if (saved) return JSON.parse(saved);
    return [
      {
        _id: "1",
        name: "Sample Class",
        instructor: "Teacher Name",
        section: "A1",
        color: "green",
        activities: [],
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  // Navigation handlers
  const handleTabClick = (tab: string) => {
    setActivePage(tab);
    setGradeContext(null);

    // Open first class automatically when "classes" tab is clicked
    if (tab === "classes" && classes.length > 0) {
      setCurrentClass(classes[0]);
    } else {
      setCurrentClass(null);
    }
  };

  const handleClassUpdate = (identifier: any, snippet: string) => {
    setClasses((prev) =>
      prev.map((c) =>
        c._id === identifier._id
          ? { ...c, activities: [snippet, ...(c.activities || [])] }
          : c
      )
    );
  };

  // Called when assignment post is opened in class page
  const handleOpenAssignGrade = (activity: any) => {
    if (currentClass) {
      setGradeContext({ classInfo: currentClass, activity });
    }
  };

  // Called when back button pressed inside AssignGrade
  const handleBackToClass = () => {
    setGradeContext(null);
  };

  return (
    <div className="teachers-dashboard">
      {/* Header */}
      <header className="teachers-dashboard-header">
        <button
          className={`menu-btn ${isSidebarOpen ? "active" : ""}`}
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <FaBars />
        </button>
        <img src="/src/assets/phinmalogo.png" alt="Logo" className="logo" />
        <h1>UPang Learning Management System</h1>
        <div className="header-right">
        </div>
      </header>

      <div className="teachers-dashboard-body">
        {/* Sidebar */}
        <aside
          className={`teachers-sidebar ${isSidebarOpen ? "open" : "collapsed"}`}
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
        <main className="teachers-main-content">
          {/* If AssignGrade is open */}
          {gradeContext ? (
            <AssignGrade
              classInfo={gradeContext.classInfo}
              activity={gradeContext.activity}
              onBack={handleBackToClass}
            />
          ) : (
            <>
              {/* HOME PAGE */}
              {activePage === "home" && (
                <div className="teachers-empty-state">
                  <img
                    src="/src/assets/books.png"
                    alt="books"
                    className="illustration"
                  />
                  <p className="text-lg font-medium">
                    View your classes to get started
                  </p>
                  <button
                    className="create-btn"
                    onClick={() => handleTabClick("classes")}
                  >
                    Open Classes
                  </button>
                </div>
              )}

              {/* CLASSES PAGE (directly opens TeachersClassPage) */}
              {activePage === "classes" && currentClass && (
                <TeachersClassPage
                  classInfo={currentClass}
                  onNavigateColor={() => {}}
                  onClassUpdate={handleClassUpdate}
                  onOpenAssignGrade={handleOpenAssignGrade}
                />
              )}

              {activePage === "settings" && <Settings />}
              {activePage === "logout" && <Logout />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeachersDashboard;
