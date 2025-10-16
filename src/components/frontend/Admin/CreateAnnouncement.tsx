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

    const saved = localStorage.getItem(`posts_${classId}`);
    const updated = saved ? [newPost, ...JSON.parse(saved)] : [newPost];
    localStorage.setItem(`posts_${classId}`, JSON.stringify(updated));

    onPost(newPost);
  };

  return (
    <div className="form-card">
      <button className="close-btn-top" onClick={onBack}>✖</button>
      <div className="form-header"><h3>💬 Announcement</h3></div>
      <form className="form-body" onSubmit={handleSubmit}>
        <textarea placeholder="Share your thoughts..." value={content} onChange={(e) => setContent(e.target.value)} required />
        <div className="form-footer">
          <button type="submit" className="post-btn">Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnouncement;
