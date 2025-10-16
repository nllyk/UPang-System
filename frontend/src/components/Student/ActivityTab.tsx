import React, { useState, useEffect } from "react";
import ActivityView from "./ActivityView";
import "./ActivityTab.css"; 


 interface Activity {
  id: string;
  title: string;
  description: string;
  deadline: string;
  instructions?: string;
  attachments?: string[];
}
 interface ActivityTabProps {
  selectedClass?: any;
}
const ActivitiesTab: React.FC<ActivityTabProps> = ({selectedClass}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Simulate database fetch (replace this with Firestore or API)
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // --- Replace this block with Firestore fetch later ---
        const data: Activity[] = [
          {
            id: "1",
            title: "Activity 1: Research Paper",
            description: "Write a research paper about cybersecurity threats.",
            deadline: "Oct 15, 2025",
            instructions:
              "Follow the APA format. Submit your paper in PDF format through the upload section.",
            attachments: ["Guidelines.pdf", "Sample_Paper.pdf"],
          },
          {
            id: "2",
            title: "Activity 2: Quiz on Data Privacy",
            description: "Complete the quiz based on the provided lesson.",
            deadline: "Oct 20, 2025",
          },
        ];
        

        setActivities(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div className="activities-loading">Loading activities...</div>;
  }

  return (
    <div className="activities-tab full-width">
  {!selectedActivity ? (
    <>
    
      <div className="activities-header">
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="activity-item"
            onClick={() => setSelectedActivity(activity)}
          >
            <div className="activity-content">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              <span className="deadline">Due: {activity.deadline}</span>
            </div>
          </div>
        ))}
      </div>
      
    </>
  ) : (
     <ActivityView
          activityTitle={selectedActivity.title}
          onMarkDone={() => {
            alert(`You marked "${selectedActivity.title}" as done!`);
            setSelectedActivity(null);
          }}
        />
  )}
</div>

  );
};

export default ActivitiesTab;
