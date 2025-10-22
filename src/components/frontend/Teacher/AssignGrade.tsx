import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./AssignGrade.css";

interface Student {
  id: string;
  name: string;
  score: number | null;
  attachments?: number;
  turnedIn: boolean;
}

interface AssignGradeProps {
  classInfo?: any;
  onBack?: () => void;
}

const AssignGrade: React.FC<AssignGradeProps> = ({ classInfo, onBack }) => {
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "John Cena", score: 80, attachments: 2, turnedIn: true },
    { id: "2", name: "AJ Styles", score: null, attachments: 0, turnedIn: false },
    { id: "3", name: "Randy Orton", score: 90, attachments: 1, turnedIn: true },
    { id: "4", name: "Seth Rollins", score: null, attachments: 0, turnedIn: false },
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(students[0]);
  const [showTurnedInOnly, setShowTurnedInOnly] = useState(false); // ✅ filter state

  const turnedInCount = students.filter((s) => s.turnedIn).length;

  const handleGradeChange = (value: string) => {
    if (!selectedStudent) return;
    const updated = students.map((s) =>
      s.id === selectedStudent.id ? { ...s, score: value ? Number(value) : null } : s
    );
    setStudents(updated);
    setSelectedStudent({ ...selectedStudent, score: value ? Number(value) : null });
  };

  const filteredStudents = students.filter((s) =>
    showTurnedInOnly ? s.turnedIn : true
  );

  return (
    <div className="assigngrade-wrapper">
      <div className="assigngrade-container">
        {/* Header */}
        <div className="assigngrade-header">
          <div className="assigngrade-header-left">
            {onBack && (
              <button className="assigngrade-back-btn" onClick={onBack}>
                ← 
              </button>
            )}
            <h2>
              {classInfo?.name ? `${classInfo.name} - Student Work and Grade` : "Student Work and Grade"}
            </h2>
          </div>
          <div className="assigngrade-stats">
            <div>
              <strong>{turnedInCount}</strong> Turned in
            </div>
            <div>
              <strong>{students.length - turnedInCount}</strong> Assigned
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="assigngrade-body">
          <div className="assigngrade-sidebar">
            {/* ✅ Filter checkboxes now work */}
            <div className="assigngrade-filter">
              <label>
                <input
                  type="checkbox"
                  checked={!showTurnedInOnly}
                  onChange={() => setShowTurnedInOnly(false)}
                />{" "}
                All students
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={showTurnedInOnly}
                  onChange={() => setShowTurnedInOnly(true)}
                />{" "}
                Turned in
              </label>
            </div>

            <div className="assigngrade-studentlist">
              {filteredStudents.map((s) => (
                <div
                  key={s.id}
                  className={`assigngrade-student ${
                    selectedStudent?.id === s.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedStudent(s)}
                >
                  <div className="assigngrade-student-info">
                    <FaUserCircle size={20} />
                    <span>{s.name}</span>
                  </div>
                  <div className="assigngrade-score">
                    {s.score !== null ? (
                      <span className="graded">{s.score}/100</span>
                    ) : (
                      <span className="ungraded">../100</span>
                    )}
                  </div>
                </div>
              ))}

              {filteredStudents.length === 0 && (
                <p className="assigngrade-placeholder">
                  No students found for this filter.
                </p>
              )}
            </div>
          </div>

          <div className="assigngrade-main">
            {selectedStudent ? (
              <div className="assigngrade-studentwork">
                <h3>{selectedStudent.name}</h3>
                <div className="assigngrade-card">
                  <div className="assigngrade-filebox"></div>
                  <p>{selectedStudent.attachments} attachments</p>
                  {selectedStudent.turnedIn ? (
                    <p className="turnedin-text">Turned in</p>
                  ) : (
                    <p className="missing-text">Missing</p>
                  )}
                </div>
                <div className="assigngrade-input">
                  <label>Grade:</label>
                  <input
                    type="number"
                    placeholder="/100"
                    value={selectedStudent.score ?? ""}
                    onChange={(e) => handleGradeChange(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <p className="assigngrade-placeholder">
                Select a student to view work
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignGrade;
