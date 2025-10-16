import React from "react";
import { FaClipboardList, FaEye } from "react-icons/fa";
import "./ActivityTab.css";

interface Activity {
  title: string;
  status: "Upload" | "Submitted" | "Missed";
}

interface Props {
  selectedClass: {
    activities?: Activity[];
  } | null;
  onView: (activity: Activity) => void;
}

const ActivityTab: React.FC<Props> = ({ selectedClass, onView }) => {
  if (!selectedClass)
    return <div className="at-empty">No class selected.</div>;

  const activities = selectedClass.activities || [];

  return (
    <div className="activity-tab">
      {activities.length > 0 ? (
        <div className="activity-list">
          {activities.map((activity, index) => (
            <div className="activity-card" key={index}>
              <div className="activity-info">
                <FaClipboardList className="activity-icon" />
                <span className="activity-title">{activity.title}</span>
              </div>

              <div className="activity-actions">
                {activity.status === "Upload" && (
                  <button
                    className="btn-upload"
                    onClick={() => onView(activity)}
                  >
                    Upload
                  </button>
                )}

                {activity.status === "Submitted" && (
                  <span className="status submitted">✓ Submitted</span>
                )}

                {activity.status === "Missed" && (
                  <span className="status missed">Missed</span>
                )}

                <FaEye
                  className="btn-view"
                  title="View Activity"
                  onClick={() => onView(activity)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="at-empty">No activities available yet.</div>
      )}
    </div>
  );
};

export default ActivityTab;
