// ✅ MissingView.tsx

import React, { useState } from "react";
import { FaUpload, FaTimes, FaClipboard, FaExclamationTriangle } from "react-icons/fa";
import "./ActivityView.css";

interface Activity {
  id: number;
  title: string;
  dueDate: string;
  isAcceptingWork: boolean;
}

interface Props {
  activity: Activity;
  onClose: () => void;
}

const MissingView: React.FC<Props> = ({ activity, onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!activity.isAcceptingWork) return;
    if (!file) return alert("Please attach a file.");

    alert("Submitted! ✅");
    onClose();
  };

  return (
    <div className="activity-modal-overlay">
      <div className="activity-modal">
        <div className="activity-header">
          <div className="header-left">
            <FaClipboard className="header-icon" />
            <h2>{activity.title}</h2>
          </div>

 
        </div>

        {/* ✅ Missing Tag */}
        <div className="missing-tag">
          <FaExclamationTriangle /> Missing — Due: {activity.dueDate}
        </div>

        <div className="activity-body">
          <div className="activity-left">
            <p>Your activity was not submitted on time.</p>

            {!activity.isAcceptingWork && (
              <p className="not-accepting">
                Teacher is not accepting late submissions ❌
              </p>
            )}
          </div>

          <div className="activity-right">
            <h4>Upload</h4>

            <div className="upload-box">
              <label htmlFor="missing-upload" className="upload-placeholder">
                <FaUpload size={20} />
                <span>{file ? file.name : "Click to attach file"}</span>
              </label>

              <input
                id="missing-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                disabled={!activity.isAcceptingWork}
              />
            </div>

            <div className="upload-actions">
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button
                className="submit-btn"
                disabled={!activity.isAcceptingWork}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissingView;
