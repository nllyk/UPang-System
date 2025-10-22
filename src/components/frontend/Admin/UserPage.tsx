import React, { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Cena", email: "john.cena.up@phinmaed.com", role: "Student" },
    { id: 2, name: "Maria Santos", email: "maria.santos@phinmaed.com", role: "Teacher" },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === "All" || user.role === filter;
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleDeactivate = (id: number) => {
    alert(`Deactivated user ID: ${id}`);
  };

  const handleEdit = (id: number) => {
    alert(`Edit user ID: ${id}`);
  };

  return (
    <div className="user-page">
      <h2 className="user-title">User Management</h2>

      {/* CARD CONTAINER */}
      <div className="user-card">
        <div className="user-controls">
          {/* Search Bar */}
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <select
            className="filter-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>

          {/* Trash Icon */}
          <button className="trash-btn" onClick={() => setUsers([])}>
            <FaTrash />
          </button>
        </div>

        {/* TABLE */}
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
                      <div className="dropdown-container">
                        <FaEllipsisV
                          className="dots-icon"
                          onClick={() =>
                            setMenuOpen(menuOpen === user.id ? null : user.id)
                          }
                        />
                        {menuOpen === user.id && (
                          <div className="action-menu">
                            <button onClick={() => handleEdit(user.id)}>Edit</button>
                            <button onClick={() => handleDeactivate(user.id)}>Deactivate</button>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="no-data">
                    No users found.
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

export default UserPage;
