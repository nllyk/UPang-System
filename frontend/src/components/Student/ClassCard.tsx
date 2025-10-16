import React from "react";
import { FaUser, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import "./ClassDetails"

interface ClassCardProps {
  subject: string;
  professor: string;
  color: string;
  activities: string[];
  onClick: () => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ subject, professor, color, activities, onClick }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/class/${subject}`); // go to class details
  };

  return (
    <div className={`class-card ${color}`} onClick={onClick} >
      <div className="card-header">
        <FaUser className="card-icon" />
        <div className="class-info" onClick={handleNavigate} style={{ cursor: "pointer" }}>
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
        <FaTrash className="delete-icon" />
      </div>
    </div>
  );
};

export default ClassCard;
