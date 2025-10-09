import React from "react";
import { FaUser, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

interface GradeCardProps {
  subject: string;
  professor: string;
  color: string;
  grades: string[]; // renamed from activities → grades
  onClick: () => void;
}

const Grades: React.FC<GradeCardProps> = ({ subject, professor, color, grades, onClick }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/grades/${subject}`); // navigate to grade details
  };

  return (
    <div className={`grade-card ${color}`} onClick={onClick}>
      <div className="card-header">
        <FaUser className="card-icon" />
        <div className="class-info" onClick={handleNavigate} style={{ cursor: "pointer" }}>
          <h3>{subject}</h3>
          <p>{professor}</p>
        </div>
      </div>

      <div className="card-body">
        {grades.length > 0 ? (
          <ul>
            {grades.map((grade, index) => (
              <li key={index}>{grade}</li>
            ))}
          </ul>
        ) : (
          <p className="empty-msg">No Grades yet...</p>
        )}
      </div>

      <div className="card-footer">
        <FaTrash className="delete-icon" />
      </div>
    </div>
  );
};

export default Grades;
