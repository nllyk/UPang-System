import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FaSearch, FaTrash, FaEllipsisV } from "react-icons/fa";
import "./SubjectContent.css";

interface ContentItem {
  id: number;
  title: string;
  type: string;
  uploadedBy: string;
  dateUploaded: string;
}

const ActionMenuPortal: React.FC<{
  anchorRect: DOMRect | null;
  onClose: () => void;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
}> = ({ anchorRect, onClose, onEdit, onView, onDelete }) => {
  const el = useRef(document.createElement("div"));
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = el.current;
    node.className = "action-menu-portal-container";
    document.body.appendChild(node);
    return () => {
      document.body.removeChild(node);
    };
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleScrollOrResize = () => onClose();

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("resize", handleScrollOrResize);
    window.addEventListener("scroll", handleScrollOrResize, true);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("scroll", handleScrollOrResize, true);
    };
  }, [onClose]);

  if (!anchorRect) return null;

  // compute menu position (avoid going off screen)
  const gap = 6;
  const menuWidth = 140;
  const menuHeight = 120; // approximate; it will expand if more buttons
  let left = anchorRect.right - menuWidth; // align right by default
  let top = anchorRect.bottom + gap;

  // keep within viewport horizontally
  const docWidth = document.documentElement.clientWidth;
  if (left + menuWidth + 8 > docWidth) left = docWidth - menuWidth - 8;
  if (left < 8) left = 8;

  // vertical: if it would overflow bottom, show above the anchor
  const docHeight = document.documentElement.clientHeight;
  if (top + menuHeight + 8 > docHeight) {
    top = anchorRect.top - menuHeight - gap;
  }
  if (top < 8) top = 8;

  const portalContent = (
    <div
      ref={menuRef}
      className="action-menu action-menu-portal"
      style={{ position: "fixed", left: `${left}px`, top: `${top}px` }}
    >
      <button
        type="button"
        className="action-menu-btn"
        onClick={() => {
          onEdit();
          onClose();
        }}
      >
        Edit
      </button>
      <button
        type="button"
        className="action-menu-btn"
        onClick={() => {
          onView();
          onClose();
        }}
      >
        View
      </button>
      <button
        type="button"
        className="action-menu-btn delete"
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        Delete
      </button>
    </div>
  );

  return ReactDOM.createPortal(portalContent, el.current);
};

const SubjectContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Lessons");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  // menuOpenId is the content id which has menu open
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  // anchor rect for portal positioning
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

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
    setMenuOpenId(null);
  };

  const filteredContent = content.filter((item) => {
    const matchesFilter = filter === "All" || item.uploadedBy.includes(filter);
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id: number) => {
    setContent((prev) => prev.filter((item) => item.id !== id));
  };

  // handlers for menu actions (could be replaced with real logic)
  const handleEdit = (item: ContentItem) => alert(`Edit ${item.title}`);
  const handleView = (item: ContentItem) => alert(`View ${item.title}`);
  const handleDeleteClick = (item: ContentItem) => {
    if (confirm(`Delete "${item.title}"?`)) {
      handleDelete(item.id);
    }
  };

  // Called when clicking the ellipsis icon
  const onDotsClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setAnchorRect(rect);

    // toggle
    setMenuOpenId((prev) => (prev === id ? null : id));
  };

  // close when content area clicked
  useEffect(() => {
    const closeMenu = () => setMenuOpenId(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

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
          <div className="search-container" style={{ position: "relative" }}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

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
                          onClick={(e) => {
                            // stop click from bubbling to outer document click handler
                            e.stopPropagation();
                            onDotsClick(e, item.id);
                          }}
                        />
                        {/* Portal menu */}
                        {menuOpenId === item.id && anchorRect && ReactDOM.createPortal(
                          <div
                            className="action-menu action-menu-portal"
                            style={{
                              position: "fixed",
                              left: (() => {
                                const gap = 6;
                                const menuWidth = 150;
                                let left = anchorRect.right - menuWidth;
                                const docWidth = document.documentElement.clientWidth;
                                if (left + menuWidth + 8 > docWidth) left = docWidth - menuWidth - 8;
                                if (left < 8) left = 8;
                                return `${left}px`;
                              })(),
                              top: (() => {
                                const gap = 6;
                                const menuHeight = 120;
                                let top = anchorRect.bottom + gap;
                                const docHeight = document.documentElement.clientHeight;
                                if (top + menuHeight + 8 > docHeight) {
                                  top = anchorRect.top - menuHeight - gap;
                                }
                                if (top < 8) top = 8;
                                return `${top}px`;
                              })(),
                              zIndex: 9999,
                            }}
                          >
                            <button
                              onClick={() => {
                                handleEdit(item);
                                setMenuOpenId(null);
                              }}
                              className="action-menu-btn"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                handleView(item);
                                setMenuOpenId(null);
                              }}
                              className="action-menu-btn"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteClick(item);
                                setMenuOpenId(null);
                              }}
                              className="action-menu-btn delete"
                            >
                              Delete
                            </button>
                          </div>,
                          document.body
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
