import React, { useState } from "react";
import "./Settings.css";
import AccountSettings from "./accSetting";
import NotificationSettings from "./notifSetting";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="settings-main">
      <div className="settings-tabs">
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

      <div className="settings-content">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
      </div>
    </div>
  );
};

export default Settings;
