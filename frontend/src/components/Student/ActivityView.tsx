import React, { useState } from "react";
import { FaPaperclip, FaPlus } from "react-icons/fa";
import "./ActivityView.css";

interface AcitivityViewProps {
  activityTitle: string;
  onMarkDone: () => void;

}

const ActivityView: React.FC<AcitivityViewProps> = ({ activityTitle, onMarkDone }) => {
  const [attachments, setAttachments] = useState<string[]>([]);

  // Dummy activity data (replace with database fetch later)
  const activityDetails = {
    title: activityTitle,
    description: `
      This is your assigned project. Please follow the given instructions carefully and upload your final output before the deadline.
    `,
    deadline: "October 16, 2025",
    instructor: "Ma. Grace Carpizo",
    subject: "P3-CS",
    points: "10 points",
    files: ["Team8_Storybook_Guide.pdf"],
  };

  const handleAddAttachment = () => {
    const newFile = `Attachment ${attachments.length + 1}`;
    setAttachments([...attachments, newFile]);
  };

  return (
    <div className="activity-full">
      <div className="activity-header">
        <div className="activity-info">
          <h2>{activityDetails.title}</h2>
          <div className="meta">
            <span className="instructor">{activityDetails.instructor}</span> •{" "}
            <span>{activityDetails.subject}</span> •{" "}
            <span className="points">{activityDetails.points}</span>
          </div>
          <div className="due">Due {activityDetails.deadline}</div>
        </div>
      </div>

      <div className="activity-body">
        <div className="activity-description">
          <p>{activityDetails.description}</p>

          <div className="attachments">
            <h4>
              <FaPaperclip /> Attachments
            </h4>
            <ul>
              {activityDetails.files.map((file, i) => (
                <li key={i}>
                  <a href="#">{file}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Work Panel */}
        <div className="work-panel">
          <div className="work-header">
            <h3>Your Work</h3>
            <span className="status assigned">Assigned</span>
          </div>

          <div className="work-upload">
            {attachments.length === 0 ? (
              <div className="placeholder">No work added yet</div>
            ) : (
              <ul className="file-list">
                {attachments.map((file, i) => (
                  <li key={i}>{file}</li>
                ))}
              </ul>
            )}
            <div className="add-section">
              <button className="add-btn" onClick={handleAddAttachment}>
                Add <FaPlus />
              </button>
            </div>
          </div>

          <div className="work-actions">
            <button className="done-btn" onClick={onMarkDone}>
              Mark as Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityView;
