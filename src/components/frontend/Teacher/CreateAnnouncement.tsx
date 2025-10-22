import React, { useState } from "react";
import "./FormStyles.css";

interface Props {
  onBack: () => void;
  onPost: (post: any) => void;
  classId: string;
}

const CreateAnnouncement: React.FC<Props> = ({ onBack, onPost, classId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      type: "announcement",
      content,
      createdAt: new Date().toISOString(),
    };

    // ✅ Update classes array in localStorage
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
      <div className="form-header"><h3>💬 Create Announcement</h3></div>
      <form className="form-body" onSubmit={handleSubmit}>
        <textarea
          placeholder="Share an update or announcement..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="form-footer">
          <button type="submit" className="post-btn">Post</button>
          <button type="button" className="cancel-btn" onClick={onBack}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnouncement;
