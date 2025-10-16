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

    // Save to localStorage
    const saved = localStorage.getItem(`posts_${classId}`);
    const updated = saved ? [newPost, ...JSON.parse(saved)] : [newPost];
    localStorage.setItem(`posts_${classId}`, JSON.stringify(updated));

    onPost(newPost);
  };

  return (
    <div className="form-card">
      <button className="close-btn-top" onClick={onBack}>✖</button>
      <div className="form-header"><h3>📝 Assignment</h3></div>
      <form className="form-body" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Instructions (optional):</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        <label>Due Date:</label>
        <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <div className="form-footer">
          <button type="submit" className="post-btn">Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;
