import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaTrash, FaEllipsisV } from "react-icons/fa";
import "./ReportPage.css";

interface ReportItem {
  id: number;
  student: string;
  activity: string;
  score: string;
  submittedOn: string;
}

const ReportPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([
    { id: 1, student: "Juan Dela Cruz", activity: "Activity 1: Quiz", score: "90", submittedOn: "Oct 10, 2025" },
    { id: 2, student: "Maria Santos", activity: "Activity 2: Project", score: "85", submittedOn: "Oct 12, 2025" },
    { id: 3, student: "Pedro Reyes", activity: "Activity 1: Quiz", score: "78", submittedOn: "Oct 10, 2025" },
  ]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteAll = () => {
    setReports([]);
  };

  const handleDelete = (id: number) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  const filteredReports = reports.filter((report) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Teacher" && report.activity.includes("Project")) ||
      (filter === "Student" && report.activity.includes("Quiz"));

    const matchesSearch = report.student.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="report-page">
      <h2 className="report-title">Student Submission</h2>

      <div className="report-card">
        <div className="report-controls">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="trash-btn" onClick={handleDeleteAll}>
            <FaTrash />
          </button>
        </div>

        <div className="table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Student</th>
                <th>Activity</th>
                <th>Score</th>
                <th>Submitted On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((item) => (
                  <tr key={item.id}>
                    <td><input type="checkbox" /></td>
                    <td>{item.student}</td>
                    <td>{item.activity}</td>
                    <td>{item.score}</td>
                    <td>{item.submittedOn}</td>
                    <td className="action-cell">
                      <div className="dropdown-container" ref={dropdownRef}>
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
                    No reports found.
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

export default ReportPage;
