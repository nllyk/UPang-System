import React, { useState } from "react";
import "./FormStyles.css";

interface Props {
  onBack: () => void;
  onPost: (post: any) => void;
  classId: string;
}

const CreateAssignment: React.FC<Props> = ({ onBack, onPost, classId }) => {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      type: "assignment",
      title,
      content: instructions,
      dueDate,
      createdAt: new Date().toISOString(),
    };

    // ✅ Update classes array
    const classes = JSON.parse(localStorage.getItem("classes") || "[]");
    const updated = classes.map((cls: any) =>
      cls._id === classId
        ? { ...cls, activities: [newPost, ...(cls.activities || [])] }
        : cls
    );
    localStorage.setItem("classes", JSON.stringify(updated));

    onPost(newPost);
    onBack(); // ✅ Close form automatically
  };

  return (
    <div className="form-card">
      <div className="form-header"><h3>📝 Create Assignment</h3></div>
      <form className="form-body" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Instructions (optional):</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />

        <label>Due Date:</label>
        <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

        <div className="form-footer">
          <button type="submit" className="post-btn">Post</button>
          <button type="button" className="cancel-btn" onClick={onBack}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;
