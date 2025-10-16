import React, { useState } from "react";
import "./StudentSettings.css"; // new CSS file
import AccountSettings from "./accSetting";
import NotificationSettings from "./notifSetting";

const StudentSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="student-settings-main">
      <div className="student-settings-tabs">
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

      <div className="student-settings-content">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
      </div>
    </div>
  );
};

export default StudentSettings;
