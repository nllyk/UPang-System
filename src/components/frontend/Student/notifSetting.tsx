import React, { useState } from "react";
import "./notifSetting.css";

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, category: "Comments", title: "Comments on your post", enabled: true },
    { id: 2, category: "Comments", title: "Private comment on classwork", enabled: true },
    { id: 3, category: "Comments", title: "Mentions you in comment", enabled: true },
    { id: 4, category: "Enrolled classes", title: "Due date to deadline and activities", enabled: true },
    { id: 5, category: "Enrolled classes", title: "Returned grades and scores from teachers", enabled: true },
    { id: 6, category: "Enrolled classes", title: "Posted work from teachers", enabled: true },
    { id: 7, category: "Enrolled classes", title: "Invitation to classes", enabled: true },
  ]);

  const toggleNotification = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, enabled: !n.enabled } : n
      )
    );
    // TODO: Update DB value
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    // TODO: Delete from DB
  };

  const grouped = notifications.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof notifications>);

  return (
    <div className="notifications-container">
      <h2>Notification Settings</h2>
      {Object.keys(grouped).map((category, idx) => (
        <div key={idx} className="notification-category">
          <h3>{category}</h3>
          {grouped[category].map((notif) => (
            <div key={notif.id} className="notification-item">
              <span>{notif.title}</span>
              <div className="notification-controls">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notif.enabled}
                    onChange={() => toggleNotification(notif.id)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default NotificationSettings;
