import React from "react";
import AdminClassCard from "./AdminClassCard";
import "./Archived.css";

const Archived: React.FC = () => {
  const archivedClasses = [
    {
      subject: "ITE 391",
      professor: "Grace Carpizo",
      section: "DIGIARTS-01",
      color: "green",
      activities: [],
    },
    {
      subject: "ITE 392",
      professor: "Grace Carpizo",
      section: "DIGIARTS-01",
      color: "blue",
      activities: [],
    },
  ];

  return (
    <div className="archived-page">
      <h2>Archived Classes</h2>
      <div className="archived-grid">
        {archivedClasses.map((cls, index) => (
          <AdminClassCard
            key={index}
            subject={cls.subject}
            professor={cls.professor}
            color={cls.color}
            activities={cls.activities}
            onClick={() => console.log("Open archived class:", cls.subject)}
          />
          
        ))}
        
      </div>
    </div>
  );
};

export default Archived;
