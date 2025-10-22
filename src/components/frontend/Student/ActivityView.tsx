import React, { useState } from "react";
import { FaUpload, FaTimes, FaUser, FaClipboard } from "react-icons/fa";
import "./ActivityView.css";

interface Activity {
  id: number;
  title: string;
  description?: string;
  subject?: string;
}

interface Props {
  activity: Activity;
  onClose: () => void;
  onSubmit: (activityId: number) => void;
}

const ActivityView: React.FC<Props> = ({ activity, onClose, onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onSubmit(activity.id);
      onClose();
    } else {
      alert("Please attach a file before submitting.");
    }
  };

  return (
    <div className="activity-modal-overlay">
      <div className="activity-modal">
        {/* Header */}
        <div className="activity-header">
          <div className="header-left">
            <FaClipboard className="header-icon" />
            <h2>{activity.subject || "ITE 391 Freehand Drawing"}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Content with Upload on Right */}
        <div className="activity-body">
          <div className="activity-left">
            <h3 className="activity-title">{activity.title}</h3>
            <p className="activity-desc">
              {activity.description || "P1 Modules 1 - 7"}
            </p>
          </div>

          <div className="activity-right">
            <h4>Upload</h4>
            <div className="upload-box">
              <label htmlFor="file-upload" className="upload-placeholder">
                <FaUpload size={20} />
                <span>{file ? file.name : "Click to attach file"}</span>
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="upload-actions">
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Teacher's Feedback */}
        <div className="feedback-section">
          <h4>
            <FaUser className="feedback-icon" /> Teacher's Feedback
          </h4>
          <div className="feedback-card">
            <p className="teacher-name">Grace Carpizo</p>
            <div className="feedback-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityView;
