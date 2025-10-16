import React, { useState } from "react";
import "./accSetting.css";

const AccountSettings: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
      // TODO: Upload to DB (e.g., Firebase Storage or backend API)
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated!");
    // TODO: API call to update password
  };

  const handleUsernameChange = () => {
    alert("Username changed!");
    // TODO: API call to update username
  };

  return (
    <div className="account-settings-container">
      <h2>Profile Settings</h2>
      <div className="profile-section">
        <div className="profile-pic">
          {profilePic ? (
            <img src={profilePic} alt="Profile" />
          ) : (
            <div className="placeholder"></div>
          )}
        </div>
        <label className="upload-btn">
          Change profile
          <input type="file" accept="image/*" onChange={handleProfileChange} />
        </label>
      </div>

      <h2>Account Settings</h2>
      <div className="account-section">
        <label>
          Old password
          <input
            type="password"
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </label>

        <label>
          Change password
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>

        <label>
          Confirm password
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <button onClick={handlePasswordChange}>Save</button>

        <label>
          Change Username
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <button onClick={handleUsernameChange}>Save</button>
      </div>
    </div>
  );
};

export default AccountSettings;
