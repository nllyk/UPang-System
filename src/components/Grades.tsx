import React, { useEffect, useState } from "react";
import "./Grades.css";

/*
  DATABASE-READY NOTES:
  ---------------------------------
  - If using Firebase Firestore:
      import { collection, getDocs } from "firebase/firestore";
      import { db } from "../firebase"; // your Firebase config

  - If using MySQL + API:
      Replace the fetch() URLs below with your API endpoints (e.g. /api/subjects, /api/grades)
*/

interface Subject {
  id: string;
  code: string;
  name: string;
}

interface Grade {
  id: string;
  module: string;
  score: string;
  remarks?: string;
}

const Grades: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch subjects from your database
  const fetchSubjects = async () => {
    try {
      setLoading(true);

      // EXAMPLE: Replace this with real DB call
      // For Firebase:
      /*
      const querySnapshot = await getDocs(collection(db, "subjects"));
      const subjectData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Subject[];
      setSubjects(subjectData);
      */

      // For MySQL via API (example)
      // const res = await fetch("http://localhost:5000/api/subjects");
      // const data = await res.json();
      // setSubjects(data);

      // Mock Data for now:
      const data: Subject[] = [
        { id: "1", code: "ITE 391", name: "Freehand Drawing" },
        { id: "2", code: "ITE 392", name: "Web Systems" },
        { id: "3", code: "ITE 393", name: "Data Structures" },
      ];
      setSubjects(data);
      setSelectedSubject(data[0]?.id || null);
    } catch (err) {
      setError("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch grades for selected subject
  const fetchGrades = async (subjectId: string) => {
    try {
      setLoading(true);

      // For Firebase:
      /*
      const querySnapshot = await getDocs(collection(db, `subjects/${subjectId}/grades`));
      const gradeData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Grade[];
      setGrades(gradeData);
      */

      // For MySQL via API (example)
      // const res = await fetch(`http://localhost:5000/api/grades/${subjectId}`);
      // const data = await res.json();
      // setGrades(data);

      // Mock data for now:
      const data: Grade[] = [
        { id: "1", module: "Module 1", score: "10/10", remarks: "Excellent" },
        { id: "2", module: "Module 2", score: "8/10", remarks: "Good" },
        { id: "3", module: "Module 3", score: "7/10", remarks: "Needs Improvement" },
      ];
      setGrades(data);
    } catch (err) {
      setError("Failed to load grades");
    } finally {
      setLoading(false);
    }
  };

  // Load subjects on mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  // Load grades whenever selected subject changes
  useEffect(() => {
    if (selectedSubject) fetchGrades(selectedSubject);
  }, [selectedSubject]);

  if (loading) {
    return <div className="grades-loading">Loading grades...</div>;
  }

  if (error) {
    return <div className="grades-error">{error}</div>;
  }

  return (
    <div className="grades-page">
      {/* LEFT SIDEBAR (Subjects) */}
      <div className="subjects-sidebar">
        <h3>📚 Subjects</h3>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            className={`subject-btn ${
              selectedSubject === subject.id ? "active" : ""
            }`}
            onClick={() => setSelectedSubject(subject.id)}
          >
            <span>{subject.code}</span>
            <small>{subject.name}</small>
          </button>
        ))}
      </div>

      {/* RIGHT CONTENT (Grades List) */}
      <div className="grades-content">
        {selectedSubject ? (
          <>
            <h2>
              {
                subjects.find((s) => s.id === selectedSubject)?.code
              }{" "}
              - {
                subjects.find((s) => s.id === selectedSubject)?.name
              }
            </h2>
            <p>BSIT Block 3 - DIGIARTS</p>

            <div className="grades-card">
              {grades.map((grade) => (
                <div className="grade-item" key={grade.id}>
                  <div className="grade-module">{grade.module}</div>
                  <div className="grade-score">{grade.score}</div>
                  <div className="grade-remarks">{grade.remarks}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-subject">Select a subject to view grades.</div>
        )}
      </div>
    </div>
  );
};

export default Grades;
