import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import "./LessonTab.css";
import LessonView from "./LessonView";

interface Props {
  selectedClass: {
    lessons?: string[];
  } | null;
}

const LessonsTab: React.FC<Props> = ({ selectedClass }) => {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  if (!selectedClass) return <div className="lt-empty">No class selected.</div>;

  const lessons = selectedClass.lessons || [];

  const lessonDetails = {
    title: selectedLesson || "",
    description: "P1 Modules 1 - 7",
    file: "#",
    instructor: "Ma’am Grace Carpizo",
  };

  if (selectedLesson) {
    return (
      <LessonView
        lessonTitle={lessonDetails.title}
        lessonDesc={lessonDetails.description}
        lessonFile={lessonDetails.file}
        instructor={lessonDetails.instructor}
        onClose={() => setSelectedLesson(null)}
      />
    );
  }

  return (
    <div className="lessons-tab">
      {lessons.length > 0 ? (
        <div className="lesson-list">
          {lessons.map((lesson, i) => (
            <div
              className="lesson-item"
              key={i}
              onClick={() => setSelectedLesson(lesson)}
            >
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
