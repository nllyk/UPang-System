import React, { useState } from "react";
import "./TeachersSettings.css"; // new isolated CSS file
import AccountSettings from "./accSetting";
import NotificationSettings from "./notifSetting";

const TeachersSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="teachers-settings-main">
      <div className="teachers-settings-tabs">
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

      <div className="teachers-settings-content">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
      </div>
    </div>
  );
};

export default TeachersSettings;
