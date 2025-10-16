import React, { useState } from "react";
import "./AdminSettings.css"; // new isolated CSS file
import AccountSettings from "./accSetting";
import NotificationSettings from "./notifSetting";

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="admin-settings-main">
      <div className="admin-settings-tabs">
        <button
          className={activeTab === "account" ? "active" : ""}
          onClick={() => setActiveTab("account")}
        >
          Account Settings
        </button>
        <button
          className={activeTab === "notifications" ? "active" : ""}
          onClick={() => setActiveTab("notifications")}
        >
          Notification Settings
        </button>
      </div>

      <div className="admin-settings-content">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
      </div>
    </div>
  );
};

export default AdminSettings;
