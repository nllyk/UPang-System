import React, { useState, useEffect } from "react";
import CreateAssignment from "./CreateAssignment";
import CreateAnnouncement from "./CreateAnnouncement";
import "./ClassName.css";

interface ClassNameProps {
  classInfo: any;
  onNavigateColor: () => void;
  onClassUpdate: (classInfo: any, newActivity: string) => void;
}

interface Post {
  type: "assignment" | "announcement";
  content: string;
  title?: string;
  dueDate?: string;
  createdAt: string;
}

const ClassName: React.FC<ClassNameProps> = ({
  classInfo,
  onNavigateColor,
  onClassUpdate,
}) => {
  const [activeView, setActiveView] = useState<"main" | "assignment" | "announcement">("main");
  const [showOptions, setShowOptions] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  // Load saved posts for this class
  useEffect(() => {
    const savedClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    const foundClass = savedClasses.find((cls: any) => cls._id === classInfo._id);
    if (foundClass && foundClass.activities) {
      setPosts(foundClass.activities);
    }
  }, [classInfo._id]);

  // When admin creates a new post (assignment or announcement)
  const handleNewPost = (post: Post) => {
    const newPost = { ...post, createdAt: new Date().toISOString() };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);

    // Update in localStorage under this class
    const allClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    const updatedClasses = allClasses.map((cls: any) => {
      if (cls._id === classInfo._id) {
        return { ...cls, activities: updatedPosts };
      }
      return cls;
    });
    localStorage.setItem("classes", JSON.stringify(updatedClasses));

    // Inform AdminDashboard (optional for reactivity)
    onClassUpdate(classInfo, post.title || post.content);
    setActiveView("main");
  };

  return (
    <div className="classname-wrapper">
      {/* Header */}
      <div className="classname-header">
        <div className="classname-header-content">
          <h1 className="classname-title">{classInfo.name}</h1>
          <div className="classname-instructor">
            <p className="instructor-name">👤 {classInfo.instructor}</p>
            <p className="instructor-section">{classInfo.section}</p>
          </div>
        </div>

        <div className="cover-controls">
          <button className="cover-btn" onClick={onNavigateColor}>
            🎨 Select cover color
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="classname-body">
        <div className="class-content-center">
          {/* Main View */}
          {activeView === "main" && (
            <>
              {posts.length === 0 ? (
                <div className="class-welcome-card">
                  <img src="/src/assets/books.png" alt="Books" className="welcome-img" />
                  <h3>Welcome to your class stream</h3>
                  <p>Assignments and posts appear here</p>
                </div>
              ) : (
                <div className="posts-feed">
                  {posts.map((post, index) => (
                    <div key={index} className="post-card">
                      <h4>
                        {post.type === "assignment" ? "📝 Assignment" : "💬 Announcement"}
                      </h4>
                      {post.title && <p><strong>{post.title}</strong></p>}
                      <p>{post.content}</p>
                      {post.dueDate && <p>📅 Due: {new Date(post.dueDate).toLocaleString()}</p>}
                      <span className="timestamp">{new Date(post.createdAt).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Create Assignment */}
          {activeView === "assignment" && (
            <CreateAssignment onBack={() => setActiveView("main")} onPost={handleNewPost} classId={""} />
          )}

          {/* Create Announcement */}
          {activeView === "announcement" && (
            <CreateAnnouncement onBack={() => setActiveView("main")} onPost={handleNewPost} classId={""} />
          )}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fab-container">
        {showOptions && (
          <div className="fab-options">
            <button
              className="fab-option"
              onClick={() => {
                setActiveView("assignment");
                setShowOptions(false);
              }}
            >
              📝 Create Assignment
            </button>
            <button
              className="fab-option"
              onClick={() => {
                setActiveView("announcement");
                setShowOptions(false);
              }}
            >
              💬 Create Announcement
            </button>
          </div>
        )}
        <button className="fab-main" onClick={() => setShowOptions((prev) => !prev)}>
          {showOptions ? "×" : "+"}
        </button>
      </div>
    </div>
  );
};

export default ClassName;
