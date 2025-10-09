import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaBook, FaRegFileAlt } from "react-icons/fa";
import LessonsTab from "./LessonTab";
import ActivityTab from "./ActivityTab";
import "./ClassDetails.css";

export type SelectedClass = {
  id: number | string;
  code?: string;
  title?: string;
  professor?: string;
  lessons?: string[];
  activities?: string[];
  icon?: "book" | "file" | "note";
};

interface Props {
  onBack?: () => void;
  onSelectClass?: (c: SelectedClass) => void;
}

const iconFor = (name?: SelectedClass["icon"]) => {
  return name === "file" ? (
    <FaRegFileAlt className="cd-list-icon" />
  ) : (
    <FaBook className="cd-list-icon" />
  );
};

const ClassDetails: React.FC<Props> = ({ onBack, onSelectClass }) => {
  const [classes, setClasses] = useState<SelectedClass[]>([]);
  const [selected, setSelected] = useState<SelectedClass | null>(null);
  const [tab, setTab] = useState<"lessons" | "activities">("lessons");

  // Fetch classes (ready for database)
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("/api/classes");
        const data = await response.json();
        setClasses(data);
        setSelected(data[0]);
      } catch (error) {
        console.error("Error fetching classes:", error);

        // Sample fallback data
        const SAMPLE_CLASSES: SelectedClass[] = [
          {
            id: 1,
            code: "ITE 391",
            title: "Freehand Drawing",
            professor: "Grace Carpizo",
            lessons: [
              "Sketching Basics",
              "Line Weight & Contour",
              "Perspective Intro",
              "Shading Techniques",
            ],
            activities: ["Sketch Assignment 1", "Perspective Quiz"],
          },
          {
            id: 2,
            code: "ITE 314",
            title: "Advance Database",
            professor: "Angelica Vidal",
            lessons: ["Raster vs Vector", "Basic Tools"],
            activities: ["Project Proposal"],
          },
          {
            id: 3,
            code: "ITE 353",
            title: "Data Analytics",
            professor: "Veronica Canlas",
            lessons: ["Big Data"],
            activities: ["Tableau"],
          },
        ];
        setClasses(SAMPLE_CLASSES);
        setSelected(SAMPLE_CLASSES[0]);
      }
    };
    fetchClasses();
  }, []);

  const handleSelectClass = (c: SelectedClass) => {
    setSelected(c);
    setTab("lessons");
    if (onSelectClass) onSelectClass(c);
  };

  if (!selected && classes.length === 0) {
    return <div className="cd-loading">Loading classes...</div>;
  }

  return (
    <div className="cd-root">
      <div className="cd-body">
        {/* Sidebar */}
        <aside className="cd-left">
          <button className="back-btn" onClick={onBack}>
            <FaArrowLeft />
          </button>
          <ul className="cd-class-list">
            {classes.map((c) => (
              <li
                key={c.id}
                className={`cd-class-item ${selected?.id === c.id ? "active" : ""}`}
                onClick={() => handleSelectClass(c)}
              >
                <span className="cd-icon-wrap">{iconFor(c.icon)}</span>
                <span className="cd-code">{c.code}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Panel */}
        <main className="cd-main">
          <div className="cd-class-header">
            <div className="cd-class-left">
              <div className="cd-class-name">
                {selected?.code} {selected?.title}
              </div>
              {selected?.professor && (
                <div className="cd-class-prof">
                  Instructor: {selected.professor}
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="cd-tabs">
            <div
              className={`cd-tab ${tab === "lessons" ? "active" : ""}`}
              onClick={() => setTab("lessons")}
            >
              Lessons
            </div>
            <div
              className={`cd-tab ${tab === "activities" ? "active" : ""}`}
              onClick={() => setTab("activities")}
            >
              Activities
            </div>
          </div>

          {/* Content */}
          <div className="cd-grid">
            {tab === "lessons" && <LessonsTab selectedClass={selected} />}
            {tab === "activities" && <ActivityTab selectedClass={selected} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassDetails;
