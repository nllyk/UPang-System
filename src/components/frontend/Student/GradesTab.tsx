import React, { useState, useEffect } from "react";
import { FaChartBar, FaArrowLeft } from "react-icons/fa";
import "./GradesTab.css";

interface Grade {
  id: string;
  module: string;
  score: string;
  remarks: string;
}

interface GradesTabProps {
  activities: string[]; // list of modules/activities
}

const GradesTab: React.FC<GradesTabProps> = ({ activities }) => {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);

  useEffect(() => {
    const mockGrades = activities.map((act, idx) => ({
      id: String(idx + 1),
      module: act,
      score: `${Math.floor(Math.random() * 10 + 1)}/10`,
      remarks:
        Math.random() > 0.7
          ? "Needs Improvement"
          : Math.random() > 0.5
          ? "Good"
          : "Excellent",
    }));
    setGrades(mockGrades);
  }, [activities]);

  if (selectedGrade) {
    return (
      <div className="grades-view">
        <button className="grades-back-btn" onClick={() => setSelectedGrade(null)}>
          <FaArrowLeft /> Back
        </button>
        <h2>{selectedGrade.module}</h2>
        <div className="grades-item-detail">
          <p><strong>Score:</strong> {selectedGrade.score}</p>
          <p><strong>Remarks:</strong> {selectedGrade.remarks}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grades-tab">
      {grades.length > 0 ? (
        <div className="grades-list">
          {grades.map((g) => (
            <div
              key={g.id}
              className="grades-item"
              onClick={() => setSelectedGrade(g)}
            >
              <FaChartBar className="grades-icon" />
              <span>{g.module}</span>
              <span className="grades-score">{g.score}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grades-empty-msg">No activities available yet.</div>
      )}
    </div>
  );
};

export default GradesTab;
