import React, { useState, useEffect } from "react";
import {
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

  const [gradeContext, setGradeContext] = useState<{
    classInfo: any;
    activity: any;
  } | null>(null);

  const [classes, setClasses] = useState<any[]>(() => {
    const saved = localStorage.getItem("classes");
    return saved
      ? JSON.parse(saved)
      : [
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

  const handleTabClick = (tab: string) => {
    setActivePage(tab);
    setGradeContext(null);
    setCurrentClass(tab === "classes" && classes.length > 0 ? classes[0] : null);
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

  const handleOpenAssignGrade = (activity: any) => {
    if (currentClass) {
      setGradeContext({ classInfo: currentClass, activity });
    }
  };

  return (
    <div className="td-root">
      {/* Full width header */}
      <header className="td-header">
        <div className="td-header-left">
          <button
            className={`td-menu-btn ${isSidebarOpen ? "active" : ""}`}
            onClick={() => setIsSidebarOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
          <img src="/src/assets/phinmalogo.png" alt="Logo" className="td-logo" />
          <h1 className="td-title">UPang Learning Management System</h1>
        </div>
      </header>

      {/* Below header: sidebar + main */}
      <div className="td-body">
        <aside className={`td-sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
          <nav className="td-nav">
            <button
              className={`td-nav-btn ${activePage === "home" ? "active" : ""}`}
              onClick={() => handleTabClick("home")}
            >
              <FaHome />
              {isSidebarOpen && <span>Home</span>}
            </button>

            <button
              className={`td-nav-btn ${activePage === "classes" ? "active" : ""}`}
              onClick={() => handleTabClick("classes")}
            >
              <FaClipboardList />
              {isSidebarOpen && <span>Classes</span>}
            </button>

            <button
              className={`td-nav-btn ${activePage === "settings" ? "active" : ""}`}
              onClick={() => handleTabClick("settings")}
            >
              <FaCog />
              {isSidebarOpen && <span>Settings</span>}
            </button>

            <button
              className={`td-nav-btn ${activePage === "logout" ? "active" : ""}`}
              onClick={() => handleTabClick("logout")}
            >
              <FaSignOutAlt />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </nav>
        </aside>

        <main className="td-main">
          {gradeContext ? (
            <AssignGrade
              classInfo={gradeContext.classInfo}
              activity={gradeContext.activity}
              onBack={() => setGradeContext(null)}
            />
          ) : (
            <>
              {activePage === "home" && (
                <div className="td-empty-state">
                  <img src="/src/assets/books.png" alt="books" className="td-illustration" />
                  <p className="td-text-lg">View your class to get started</p>
                  <button className="td-create-btn" onClick={() => handleTabClick("classes")}>
                    Open Class
                  </button>
                </div>
              )}

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
