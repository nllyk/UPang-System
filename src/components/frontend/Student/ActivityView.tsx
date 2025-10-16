import React from "react";
import "./ActivityView.css";
import { FaTimes, FaUpload, FaUser } from "react-icons/fa";

interface Props {
  activity: any;
  onClose: () => void;
}

const ActivityView: React.FC<Props> = ({ activity, onClose }) => {
  return (
    <div className="activity-view-overlay">
      <div className="activity-view">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>{activity?.title}</h2>

        <div className="upload-section">
          <div className="upload-box">
            <FaUpload className="upload-icon" />
            <p>Upload</p>
          </div>
          <div className="upload-buttons">
            <button className="btn-cancel">Cancel</button>
            <button className="btn-submit">Submit</button>
          </div>
        </div>

        <div className="feedback-section">
          <h3><FaUser /> Teacher’s feedback</h3>
          <div className="feedback-box">
            <span>Enoca Carpio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityView;
