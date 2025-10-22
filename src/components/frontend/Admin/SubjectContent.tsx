import React, { useState } from "react";
import { FaSearch, FaTrash, FaEllipsisV } from "react-icons/fa";
import "./SubjectContent.css";

interface ContentItem {
  id: number;
  title: string;
  type: string;
  uploadedBy: string;
  dateUploaded: string;
}

const SubjectContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Lessons");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const lessonsData: ContentItem[] = [
    { id: 1, title: "Lesson 1: Introduction", type: "PDF", uploadedBy: "Ma. Grace", dateUploaded: "Oct 15, 2025" },
    { id: 2, title: "Lesson 2: Basics", type: "Video", uploadedBy: "Mr. Cruz", dateUploaded: "Oct 20, 2025" },
  ];

  const activitiesData: ContentItem[] = [
    { id: 1, title: "Activity 1: Quiz", type: "Form", uploadedBy: "Ma. Grace", dateUploaded: "Oct 10, 2025" },
  ];

  const announcementsData: ContentItem[] = [
    { id: 1, title: "Exam Reminder", type: "Text", uploadedBy: "Admin", dateUploaded: "Oct 18, 2025" },
  ];

  const getActiveData = () => {
    switch (activeTab) {
      case "Lessons":
        return lessonsData;
      case "Activities":
        return activitiesData;
      case "Announcements":
        return announcementsData;
      default:
        return [];
    }
  };

  const [content, setContent] = useState<ContentItem[]>(getActiveData());

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setContent(
      tab === "Lessons"
        ? lessonsData
        : tab === "Activities"
        ? activitiesData
        : announcementsData
    );
  };

  const filteredContent = content.filter((item) => {
    const matchesFilter = filter === "All" || item.uploadedBy.includes(filter);
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id: number) => {
    setContent(content.filter((item) => item.id !== id));
  };

  return (
    <div className="subject-content">
      <h2 className="subject-title">Subject Content</h2>

      {/* TABS */}
      <div className="tab-buttons">
        {["Lessons", "Activities", "Announcements"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CARD CONTAINER */}
      <div className="subject-card">
        <div className="subject-controls">
          {/* Search Bar */}
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}


          {/* Trash Icon */}
          <button className="trash-btn" onClick={() => setContent([])}>
            <FaTrash />
          </button>
        </div>

        {/* TABLE */}
        <div className="table-container">
          <table className="subject-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Title</th>
                <th>Type</th>
                <th>Uploaded By</th>
                <th>Date Uploaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.length > 0 ? (
                filteredContent.map((item) => (
                  <tr key={item.id}>
                    <td><input type="checkbox" /></td>
                    <td>{item.title}</td>
                    <td>{item.type}</td>
                    <td>{item.uploadedBy}</td>
                    <td>{item.dateUploaded}</td>
                    <td className="action-cell">
                      <div className="dropdown-container">
                        <FaEllipsisV
                          className="dots-icon"
                          onClick={() =>
                            setMenuOpen(menuOpen === item.id ? null : item.id)
                          }
                        />
                        {menuOpen === item.id && (
                          <div className="action-menu">
                            <button onClick={() => alert("Edit clicked")}>Edit</button>
                            <button onClick={() => alert("View clicked")}>View</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-data">
                    No content found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectContent;
