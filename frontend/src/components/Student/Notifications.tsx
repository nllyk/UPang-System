import React, { useEffect, useState } from "react";
import "./Notifications.css";
import { FaTrash } from "react-icons/fa";

/*
  DATABASE-READY NOTES:
  ----------------------
  - Firebase Firestore:
      import { collection, getDocs } from "firebase/firestore";
      import { db } from "../firebase";

  - MySQL + Express API:
      Replace the fetch() URLs with your API endpoints (e.g. /api/notifications)
*/

interface Notification {
  id: string;
  message: string;
  sender: string;
  status: "unread" | "read" | "archived";
  date: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch notifications from your database
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      // 🔹 For Firebase
      /*
      const querySnapshot = await getDocs(collection(db, "notifications"));
      const notifData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Notification[];
      setNotifications(notifData);
      */

      // 🔹 For MySQL + API
      // const res = await fetch("http://localhost:5000/api/notifications");
      // const data = await res.json();
      // setNotifications(data);

      // Mock Data for testing
      const mockData: Notification[] = [
        {
          id: "1",
          message: "Ms. Grace Carpizo returned your work (Module 2). You scored 9/10.",
          sender: "Ms. Grace Carpizo",
          status: "unread",
          date: "2025-10-09",
        },
        {
          id: "2",
          message: "Ms. Grace Carpizo has posted new materials. You need to finish by today!",
          sender: "Ms. Grace Carpizo",
          status: "read",
          date: "2025-10-08",
        },
      ];

      setNotifications(mockData);
    } catch (err) {
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };
   // ✅ Delete a notification
  const handleDelete = async (id: string) => {
    try {
      // 🔹 Firebase Example
      /*
      await deleteDoc(doc(db, "notifications", id));
      */

      // 🔹 MySQL + API Example
      /*
      await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: "DELETE",
      });
      */
      // Local delete
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.status === filter);

  if (loading) return <div className="notif-loading">Loading notifications...</div>;
  if (error) return <div className="notif-error">{error}</div>;

  return (
    <div className="notifications-page">
      <div className="notif-header-tabs">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "unread" ? "active" : ""}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
       
      </div>

       {/* Notification List */}
      <div className="notif-center-card">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div key={notif.id} className={`notif-item ${notif.status}`}>
              <div className="notif-content">
                <div className="notif-message">{notif.message}</div>
                <div className="notif-date">{notif.date}</div>
              </div>
              <FaTrash
                className="notif-delete-icon"
                title="Delete Notification"
                onClick={() => handleDelete(notif.id)}
              />
            </div>
          ))
        ) : (
          <p className="notif-empty">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
/* 
===========================================
🗄️ Example MySQL Table
-------------------------------------------
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255) NOT NULL,
  sender VARCHAR(100),
  status ENUM('unread', 'read', 'archived') DEFAULT 'unread',
  date DATE NOT NULL
);

===========================================
🧩 Example Express.js API Routes
-------------------------------------------

// GET all notifications
app.get("/api/notifications", (req, res) => {
  db.query("SELECT * FROM notifications", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// DELETE a notification
app.delete("/api/notifications/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM notifications WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});
===========================================
*/
