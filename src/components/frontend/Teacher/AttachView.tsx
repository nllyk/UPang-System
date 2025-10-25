import React, { useState } from "react";
import { FaTimes, FaClipboard, FaUser, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "./AttachView.css";

interface Activity {
  id: number;
  title: string;
  submittedDate?: string;
  subject?: string;
  turnedIn: boolean;
  feedback?: string;
}

interface Props {
  activity: Activity;
  onClose: () => void;
  onSaveFeedback: (activityId: number, feedback: string) => void;
}

const AttachView: React.FC<Props> = ({ activity, onClose, onSaveFeedback }) => {
  const [feedback, setFeedback] = useState(activity.feedback || "");

  const handleSave = () => {
    onSaveFeedback(activity.id, feedback);onClose();
  };

  return (
    <div className="attach-modal-overlay">
      <div className="attach-modal">
        {/* Header */}
        <div className="attach-header">
          <div className="header-left">
            <FaClipboard className="header-icon" />
            <h2>{activity.subject || "No Subject"}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="attach-body">
          <div className="attach-info">
            <h3 className="attach-title">{activity.title}</h3>
            <div
              className={`submission-status ${
                activity.turnedIn ? "turnedin" : "missing"
              }`}
            >
              {activity.turnedIn ? (
                <>
                  <FaCheckCircle /> Submitted: {activity.submittedDate || "N/A"}
                </>
              ) : (
                <>
                  <FaExclamationCircle /> Missing
                </>
              )}
            </div>
          </div>
        </div>

        {/* Teacher Feedback */}
        <div className="feedback-section">
          <h4>
            <FaUser className="feedback-icon" /> Teacher's Feedback
          </h4>
          <div className="feedback-card">
            <textarea
              className="feedback-input"
              placeholder="Enter feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button className="feedback-save-btn" onClick={handleSave}>
              Save Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachView;
