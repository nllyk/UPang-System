import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import CreateAssignment from "./CreateAssignment";
import CreateAnnouncement from "./CreateAnnouncement";
import CreateLessons from "./CreateLessons";
import "./TeachersClassPage.css";

interface TeachersClassPageProps {
  classInfo: any;
  onNavigateColor: () => void;
  onClassUpdate: (classInfo: any, newActivity: string) => void;
  onOpenAssignGrade: (activity: any) => void;
}

interface Post {
  id: string;
  type: "assignment" | "announcement" | "lessons";
  content: string;
  title?: string;
  dueDate?: string;
  createdAt: string;
}

const TeachersClassPage: React.FC<TeachersClassPageProps> = ({
  classInfo,
  onNavigateColor,
  onClassUpdate,
  onOpenAssignGrade,
}) => {
  const [activeView, setActiveView] = useState<
    "main" | "assignment" | "announcement" | "lessons"
  >("main");
  const [activeTab, setActiveTab] = useState<
    "all" | "announcement" | "assignment" | "lessons"
  >("all");
  const [showOptions, setShowOptions] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [coverColor, setCoverColor] = useState("#4CAF50"); // Default green

  // ✅ Load posts and cover color when classInfo changes
  useEffect(() => {
    if (!classInfo || !classInfo._id) return;

    const savedClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    const foundClass = savedClasses.find((cls: any) => cls._id === classInfo._id);

    if (foundClass) {
      setPosts(foundClass.activities || []);
      setCoverColor(foundClass.coverColor || "#4CAF50");
    }
  }, [classInfo]);

  // ✅ Save cover color persistently
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCoverColor(newColor);

    // Load all classes
    const allClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    const existingClassIndex = allClasses.findIndex(
      (cls: any) => cls._id === classInfo._id
    );

    if (existingClassIndex !== -1) {
      // Update existing class color
      allClasses[existingClassIndex].coverColor = newColor;
    } else {
      // Create new if missing
      allClasses.push({
        ...classInfo,
        activities: posts,
        coverColor: newColor,
      });
    }

    // Save back
    localStorage.setItem("classes", JSON.stringify(allClasses));
  };

  // ✅ Save posts
  const handleNewPost = (post: Post) => {
    const newPost = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);

    const allClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    const existingClassIndex = allClasses.findIndex(
      (cls: any) => cls._id === classInfo._id
    );

    if (existingClassIndex !== -1) {
      allClasses[existingClassIndex].activities = updatedPosts;
      allClasses[existingClassIndex].coverColor = coverColor; // ✅ also keep color
    } else {
      allClasses.push({
        ...classInfo,
        activities: updatedPosts,
        coverColor,
      });
    }

    localStorage.setItem("classes", JSON.stringify(allClasses));
    onClassUpdate(classInfo, post.title || post.content);
    setActiveView("main");
  };

  // ✅ Delete post
  const handleDeletePost = (index: number) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);

    const allClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    const existingClassIndex = allClasses.findIndex(
      (cls: any) => cls._id === classInfo._id
    );

    if (existingClassIndex !== -1) {
      allClasses[existingClassIndex].activities = updatedPosts;
      localStorage.setItem("classes", JSON.stringify(allClasses));
    }
  };

  const handleOpenPost = (post: Post) => {
    if (post.type === "assignment") {
      onOpenAssignGrade(post);
    }
  };

  const filteredPosts =
    activeTab === "all" ? posts : posts.filter((post) => post.type === activeTab);

  return (
    <div className="teachers-class-wrapper">
      {/* Header with background color */}
      <div
        className="teachers-class-header"
        style={{ backgroundColor: coverColor, transition: "background 0.3s ease" }}
      >
        <div className="teachers-class-header-content">
          <h1 className="teachers-class-title">{classInfo.name}</h1>
          <div className="teachers-class-instructor">
            <p className="teachers-instructor-name">👤 {classInfo.instructor}</p>
            <p className="teachers-instructor-section">{classInfo.section}</p>
          </div>
        </div>

        <div className="teachers-cover-controls">

        </div>
      </div>

      {/* Tabs */}
      <div className="teachers-tabs">
        {["all", "announcement", "assignment", "lessons"].map((tab) => (
          <button
            key={tab}
            className={`teachers-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab === "all" && "📚 All"}
            {tab === "announcement" && "💬 Announcements"}
            {tab === "assignment" && "📝 Assignments"}
            {tab === "lessons" && "📘 Lessons"}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="teachers-class-body">
        {activeView === "main" && (
          <div className="teachers-class-content-center">
            {filteredPosts.length === 0 ? (
              <div className="teachers-class-welcome-card">
                <img
                  src="/src/assets/books.png"
                  alt="Books"
                  className="teachers-welcome-img"
                />
                <h3>No posts yet</h3>
                <p>
                  {activeTab === "all"
                    ? "Create your first post!"
                    : `No ${activeTab} posts yet.`}
                </p>
              </div>
            ) : (
              <div className="teachers-posts-grid">
                {filteredPosts.map((post, index) => (
                  <div
                    key={index}
                    className="teachers-post-card"
                    onClick={() => handleOpenPost(post)}
                    style={{
                      cursor:
                        post.type === "assignment" ? "pointer" : "default",
                    }}
                  >
                    <div className="teachers-post-header">
                      <h4>
                        {post.type === "assignment"
                          ? "📝 Assignment"
                          : post.type === "announcement"
                          ? "💬 Announcement"
                          : "📘 Lesson"}
                      </h4>
                      <button
                        className="teachers-trash-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePost(index);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    {post.title && <p><strong>{post.title}</strong></p>}
                    <p>{post.content}</p>
                    {post.dueDate && (
                      <p>📅 Due: {new Date(post.dueDate).toLocaleString()}</p>
                    )}
                    <span className="teachers-timestamp">
                      {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create Forms */}
        {activeView === "assignment" && (
          <CreateAssignment
            onBack={() => setActiveView("main")}
            onPost={handleNewPost}
            classId={classInfo._id}
          />
        )}
        {activeView === "announcement" && (
          <CreateAnnouncement
            onBack={() => setActiveView("main")}
            onPost={handleNewPost}
            classId={classInfo._id}
          />
        )}
        {activeView === "lessons" && (
          <CreateLessons
            onBack={() => setActiveView("main")}
            onPost={handleNewPost}
            classId={classInfo._id}
          />
        )}
      </div>

      {/* Floating Button */}
      {activeView === "main" && (
        <div className="teachers-fab-container">
          {showOptions && (
            <div className="teachers-fab-options">
              <button
                className="teachers-fab-option"
                onClick={() => {
                  setActiveView("assignment");
                  setShowOptions(false);
                }}
              >
                📝 Create Assignment
              </button>
              <button
                className="teachers-fab-option"
                onClick={() => {
                  setActiveView("announcement");
                  setShowOptions(false);
                }}
              >
                💬 Create Announcement
              </button>
              <button
                className="teachers-fab-option"
                onClick={() => {
                  setActiveView("lessons");
                  setShowOptions(false);
                }}
              >
                📘 Create Lesson
              </button>
            </div>
          )}
          <button
            className="teachers-fab-main"
            onClick={() => setShowOptions((prev) => !prev)}
          >
            {showOptions ? "×" : "+"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TeachersClassPage;
