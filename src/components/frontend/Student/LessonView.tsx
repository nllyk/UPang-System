import React from "react";
import { FaUser, FaBook } from "react-icons/fa";
import "./LessonView.css";

interface LessonViewProps {
  lessonTitle: string;
  lessonDesc: string;
  lessonFile?: string;
  instructor: string;
  onClose: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({
  lessonTitle,
  lessonDesc,
  lessonFile,
  instructor,
  onClose,
}) => {
  return (
    <div className="lessonview-full">
      <div className="lessonview-header">
        <FaBook className="lessonview-icon" />
        <h2>{lessonTitle}</h2>
        <button className="lessonview-close" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="lessonview-body">
        <div className="lessonview-content">
          <h3>{lessonTitle.toUpperCase()}</h3>
          <p>{lessonDesc}</p>

          <div className="lessonview-file">
            <a href={lessonFile || "#"} target="_blank" rel="noopener noreferrer">
              link or pdf file
            </a>
          </div>
        </div>

        <div className="lessonview-instructor">
          <FaUser className="instructor-icon" />
          <span>{instructor}</span>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
