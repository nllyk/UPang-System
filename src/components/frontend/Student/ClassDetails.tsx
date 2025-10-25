import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaBook,
  FaTasks,
  FaBullhorn,
  FaChartBar,
  FaArrowLeft,
} from "react-icons/fa";
import LessonView from "./LessonView";
import ActivityView from "./ActivityView";
import "./ClassDetails.css";

interface Lesson {
  id: number;
  title: string;
  description: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
}

interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface Grade {
  id: string;
  module: string;
  score: string;
  remarks: string;
}

const ClassDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("lessons");
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);

  // Sample data
  const lessons: Lesson[] = [
    { id: 1, title: "Lesson 1", description: "Introduction to Freehand Drawing" },
    { id: 2, title: "Lesson 2", description: "Shading Techniques" },
    { id: 3, title: "Lesson 3", description: "Perspective Drawing" },
  ];

  const activities: Activity[] = [
    { id: 1, title: "Activity 1", description: "Submit your sketch drawing",  },
    { id: 2, title: "Activity 2", description: "Color rendering practice", },
  ];

  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Midterm Exam Reminder",
      date: "October 20, 2025",
      content:
        "Please review chapters 1–5 for the upcoming midterm exam. The exam will be held in Room 301 at 9 AM.",
    },
    {
      id: 2,
      title: "Project Submission Deadline",
      date: "October 25, 2025",
      content:
        "Submit your final project in PDF format through the portal before 11:59 PM. Late submissions will not be accepted.",
    },
  ];

  const modules = ["Module 1", "Module 2", "Module 3"]; // Grades modules

  useEffect(() => {
    if (activeTab === "grades") {
      const mockGrades: Grade[] = modules.map((mod, idx) => ({
        id: String(idx + 1),
        module: mod,
        score: `${Math.floor(Math.random() * 10 + 1)}/10`,
        remarks:
          Math.random() > 0.7
            ? "Needs Improvement"
            : Math.random() > 0.5
            ? "Good"
            : "Excellent",
      }));
      setGrades(mockGrades);
      setSelectedGrade(null);
    }
  }, [activeTab]);

  return (
    <div className="class-details-container">
      {/* Header */}
      <header className="class-details-header">
        <h1>ITE 391 Freehand Drawing</h1>
      </header>

      {/* Main Content */}
      <main className="class-details-main">
        {/* LESSONS */}
          {activeTab === "lessons" && !selectedLesson && (
          <>
            <h3 className="tab-label">📚 Lessons</h3>
            <div className="lesson-list">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="lesson-card"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <FaBook className="lesson-icon" />
                  <span>{lesson.title}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {selectedLesson && (
          <LessonView
            lessonTitle={selectedLesson.title}
            lessonDesc={selectedLesson.description}
            instructor="Grace Carpizo"
            onClose={() => setSelectedLesson(null)}
          />
        )}

        {/* ACTIVITIES */}
        {activeTab === "activities" && !selectedActivity && (
           <>
            <h3 className="tab-label">📘 Activities</h3>
          <div className="activity-list">
            {activities.map((act) => (
              <div
                key={act.id}
                className="activity-card"
                onClick={() => setSelectedActivity(act)}
              >
                <FaTasks className="activity-icon" />
                <span>{act.title}</span>
              </div>
            ))}
          </div>
           </>
        )}
        {selectedActivity && (
          <ActivityView
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
            onSubmit={() => console.log("Submitted!")}
          />
        )}

        {/* ANNOUNCEMENTS */}
        {activeTab === "announcements" && !selectedAnnouncement && (
           <>
            <h3 className="tab-label">📢 Announcements</h3>
          <div className="announcement-list">
            {announcements.map((a) => (
              <div
                key={a.id}
                className="announcement-card"
                onClick={() => setSelectedAnnouncement(a)}
              >
                <FaBullhorn className="announcement-icon" />
                <div className="announcement-info">
                  <span className="announcement-title">{a.title}</span>
                  <span className="announcement-date">{a.date}</span>
                </div>
              </div>
            ))}
          </div>
           </>
        )}
        {selectedAnnouncement && (
          <div className="announcement-details">
            <button
              className="announcement-back-btn"
              onClick={() => setSelectedAnnouncement(null)}
            >
              <FaArrowLeft /> Back
            </button>
            <h2>{selectedAnnouncement.title}</h2>
            <p className="announcement-date">{selectedAnnouncement.date}</p>
            <p className="announcement-content">{selectedAnnouncement.content}</p>
          </div>
        )}

        {/* GRADES */}
        {activeTab === "grades" && !selectedGrade && (
          <>
            <h3 className="tab-label">📊 Grades</h3>
          <div className="grades-list">
            {grades.map((g) => (
              <div
                key={g.id}
                className="lesson-card"
                onClick={() => setSelectedGrade(g)}
              >
                <FaChartBar className="lesson-icon" />
                <span>{g.module}</span>
                <span>{g.score}</span>
              </div>
            ))}
          </div>
          </>
        )}
        {activeTab === "grades" && selectedGrade && (
          <div className="grades-view">
            <button
              className="grades-back-btn"
              onClick={() => setSelectedGrade(null)}
            >
              <FaArrowLeft /> Back
            </button>
            <h2>{selectedGrade.module}</h2>
            <p><strong>Score:</strong> {selectedGrade.score}</p>
            <p><strong>Remarks:</strong> {selectedGrade.remarks}</p>
          </div>
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fab-container">
        {menuOpen && (
          <div className="fab-options">
            <button
              className={`fab-option ${activeTab === "lessons" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("lessons");
                setSelectedLesson(null);
                setSelectedActivity(null);
                setSelectedAnnouncement(null);
                setMenuOpen(false);
              }}
            >
              <FaBook />
              <span className="fab-label">Lessons</span>
            </button>

            <button
              className={`fab-option ${activeTab === "activities" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("activities");
                setSelectedLesson(null);
                setSelectedActivity(null);
                setSelectedAnnouncement(null);
                setMenuOpen(false);
              }}
            >
              <FaTasks />
              <span className="fab-label">Activities</span>
            </button>

            <button
              className={`fab-option ${activeTab === "announcements" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("announcements");
                setSelectedLesson(null);
                setSelectedActivity(null);
                setSelectedAnnouncement(null);
                setMenuOpen(false);
              }}
            >
              <FaBullhorn />
              <span className="fab-label">Announcements</span>
            </button>

            <button
              className={`fab-option ${activeTab === "grades" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("grades");
                setSelectedLesson(null);
                setSelectedActivity(null);
                setSelectedAnnouncement(null);
                setMenuOpen(false);
              }}
            >
              <FaChartBar />
              <span className="fab-label">Grades</span>
            </button>
          </div>
        )}

        <button className="fab-main" onClick={() => setMenuOpen(!menuOpen)}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ClassDetails;
