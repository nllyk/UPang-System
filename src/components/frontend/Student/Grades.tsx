import React, { useEffect, useState } from "react";
import { FaBook, FaTrash } from "react-icons/fa";
import "./Grades.css";

interface Subject {
  id: string;
  code: string;
  name: string;
  professor: string;
  activities: string[];
}

interface Grade {
  id: string;
  module: string;
  score: string;
  remarks: string;
}

const Grades: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);

  useEffect(() => {
    const data: Subject[] = [
      {
        id: "1",
        code: "ITE 391",
        name: "Freehand Drawing",
        professor: "Mr. Cruz",
        activities: ["Module 1", "Module 2", "Module 3"],
      },
      {
        id: "2",
        code: "ITE 392",
        name: "Web Systems",
        professor: "Ms. Garcia",
        activities: ["Module 1", "Module 2"],
      },
      {
        id: "3",
        code: "ITE 393",
        name: "Data Structures",
        professor: "Dr. Reyes",
        activities: ["Module 1"],
      },
    ];
    setSubjects(data);
  }, []);

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);

    // Mock grades data
    const mockGrades: Grade[] = subject.activities.map((mod, idx) => ({
      id: String(idx + 1),
      module: mod,
      score: `${Math.floor(Math.random() * 10 + 1)}/10`,
      remarks:
        Math.random() > 0.7
          ? "Needs Improvement"
          : Math.random() > 0.5
          ? "Good"
          : "Excellent",
    }));
    setGrades(mockGrades);
  };

  const handleBack = () => {
    setSelectedSubject(null);
  };

  // ✅ Subject Cards View (ClassCard style)
  if (!selectedSubject) {
    return (
      <div className="grades-page">
        <h2 className="grades-page-title">📘 My Grades</h2>
        <div className="grades-grid">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className={`grades-card`}
              onClick={() => handleSelectSubject(subject)}
            >
              <div className="grades-card-header">
                <FaBook className="grades-card-icon" />
                <div className="grades-class-info">
                  <h3>{subject.code}</h3>
                  <p>{subject.professor}</p>
                </div>
              </div>
              <div className="grades-card-body">
                {subject.activities.length > 0 ? (
                  <ul>
                    {subject.activities.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="grades-empty-msg">No Modules Yet...</p>
                )}
              </div>
              <div className="grades-card-footer">
                <FaTrash className="grades-delete-icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ✅ Selected Subject Grades View
  return (
    <div className="grades-details">
      <button className="grades-back-btn" onClick={handleBack}>
        ← 
      </button>
      <h2>
        {selectedSubject.code} – {selectedSubject.name}
      </h2>
      <p className="grades-professor">Professor: {selectedSubject.professor}</p>

      <div className="grades-card-body grades-grades-body">
        {grades.map((g) => (
          <div key={g.id} className="grades-item">
            <div className="grades-module">{g.module}</div>
            <div className="grades-score">{g.score}</div>
            <div className="grades-remarks">{g.remarks}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grades;
