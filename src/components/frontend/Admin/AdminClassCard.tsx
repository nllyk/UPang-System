import React from "react";
import { FaUser, FaTrash } from "react-icons/fa";
import "./AdminClassCard.css";

interface AdminClassCardProps {
  subject: string;
  professor: string;
  color: string;
  activities: string[];
  onClick: () => void;
  onDelete?: () => void;
}

const AdminClassCard: React.FC<AdminClassCardProps> = ({
  subject,
  professor,
  color,
  activities,
  onClick,
  onDelete,
}) => {
  return (
    <div className={`admin-class-card ${color}`} onClick={onClick}>
      <div className="card-header">
        <FaUser className="card-icon" />
        <div className="class-info">
          <h3>{subject}</h3>
          <p>{professor}</p>
        </div>
      </div>

      <div className="card-body">
        {activities.length > 0 ? (
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        ) : (
          <p className="empty-msg">No Activities yet...</p>
        )}
      </div>

      <div className="card-footer">
        {onDelete && (
          <FaTrash
            className="delete-icon"
            onClick={(e) => {
              e.stopPropagation(); // prevent opening card
              onDelete();
            }}
            title="Delete Class"
          />
        )}
      </div>
    </div>
  );
};

export default AdminClassCard;
