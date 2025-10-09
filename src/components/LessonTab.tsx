import React from "react";
import { FaBook } from "react-icons/fa";
import "./LessonTab.css";

interface Props {
  selectedClass: {
    lessons?: string[];
  } | null;
}

const LessonsTab: React.FC<Props> = ({ selectedClass }) => {
  if (!selectedClass) return <div className="lt-empty">No class selected.</div>;

  const lessons = selectedClass.lessons || [];

  return (
    <div className="lessons-tab">
      {lessons.length > 0 ? (
        <div className="lesson-list">
          {lessons.map((lesson, i) => (
            <div className="lesson-item" key={i}>
              <FaBook className="lesson-icon" />
              <span>{lesson}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="lt-empty">No lessons available yet.</div>
      )}
    </div>
  );
};

export default LessonsTab;
