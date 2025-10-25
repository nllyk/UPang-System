import React from "react";
import { FaTimes, FaClipboard, FaUser, FaCheckCircle } from "react-icons/fa";
import "./DoneView.css";

interface Activity {
  id: number;
  title: string;
  submittedDate?: string;
  subject?: string;
}

interface Props {
  activity: Activity;
  onClose: () => void;
}

const DoneView: React.FC<Props> = ({ activity, onClose }) => {
  return (
    <div className="done-modal-overlay">
      <div className="done-modal">
        {/* Header */}
        {/* Header */}
        <div className="done-header">
        <div className="header-left">
            <FaClipboard className="header-icon" />
            <h2>{activity.subject || "ITE 391 Freehand Drawing"}</h2>
        </div>

        <button className="close-btn" onClick={onClose}>
            <FaTimes />
        </button>
        </div>


        {/* Content */}
        <div className="done-body">
          <div className="done-info">
            <h3 className="done-title">{activity.title}</h3>

            <div className="submitted-box">
              <FaCheckCircle className="submitted-icon" />
              <p className="submitted-text">
                Submitted: {activity.submittedDate || "Oct 14, 2025"}
              </p>
            </div>
          </div>
        </div>

        {/* Teacher Grade + Feedback */}
        <div className="feedback-section">
          <h4>
            <FaUser className="feedback-icon" /> Teacher's Feedback
          </h4>
          <div className="feedback-card">
            <p className="teacher-name">Your Instructor</p>
            <div className="feedback-box">
              {/* Empty state — teacher hasn’t graded yet */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoneView;
