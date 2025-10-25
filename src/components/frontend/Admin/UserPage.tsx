import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaSearch, FaTrash, FaEllipsisV } from "react-icons/fa";
import "./UserPage.css";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Teacher" | "Student";
}

const UserPage: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Cena", email: "john.cena@phinmaed.com", role: "Student" },
    { id: 2, name: "Maria Santos", email: "maria.santos@phinmaed.com", role: "Teacher" },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === "All" || user.role === filter;
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // ACTIONS
  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleDeactivate = (id: number) => alert(`Deactivated user ID: ${id}`);
  const handleEdit = (id: number) => alert(`Edit user ID: ${id}`);

  // Menu toggle + dynamic positioning
  const onDotsClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setAnchorRect(rect);
    setMenuOpenId((prev) => (prev === id ? null : id));
  };

  // Global close
  useEffect(() => {
    const closeMenu = () => setMenuOpenId(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  // Compute popup position (matching SubjectContent behavior)
  const getMenuStyle = () => {
    if (!anchorRect) return {};
    const gap = 6;
    const menuWidth = 150;
    const menuHeight = 120;

    let left = anchorRect.right - menuWidth;
    let top = anchorRect.bottom + gap;

    const docWidth = document.documentElement.clientWidth;
    const docHeight = document.documentElement.clientHeight;

    if (left + menuWidth > docWidth) left = docWidth - menuWidth - 8;
    if (left < 8) left = 8;
    if (top + menuHeight > docHeight) top = anchorRect.top - menuHeight - gap;
    if (top < 8) top = 8;

    return {
      position: "fixed",
      left: `${left}px`,
      top: `${top}px`,
      zIndex: 9999,
    };
  };

  return (
    <div className="user-page">
      <h2 className="user-title">User Management</h2>

      <div className="user-card">
        <div className="user-controls">
          {/* Search */}
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter */}
          <select
            className="filter-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>

          {/* Clear */}
          <button className="trash-btn" onClick={() => setUsers([])}>
            <FaTrash />
          </button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td><input type="checkbox" /></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="action-cell">
                      <FaEllipsisV
                        className="dots-icon"
                        onClick={(e) => onDotsClick(e, user.id)}
                      />

                      {menuOpenId === user.id &&
                        anchorRect &&
                        ReactDOM.createPortal(
                          <div className="action-menu-portal" style={getMenuStyle()}>
                            <button onClick={() => { handleEdit(user.id); setMenuOpenId(null); }}>
                              Edit
                            </button>
                            <button onClick={() => { handleDeactivate(user.id); setMenuOpenId(null); }}>
                              Deactivate
                            </button>
                            <button className="delete" onClick={() => { handleDelete(user.id); setMenuOpenId(null); }}>
                              Delete
                            </button>
                          </div>,
                          document.body
                        )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="no-data">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
