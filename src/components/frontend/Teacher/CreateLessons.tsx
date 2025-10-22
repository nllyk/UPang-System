import React, { useState } from "react";
import "./FormStyles.css";

interface Props {
  onBack: () => void;
  onPost: (post: any) => void;
  classId: string;
}

const CreateLesson: React.FC<Props> = ({ onBack, onPost, classId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fileData = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));

    const newPost = {
      type: "lesson",
      title,
      content,
      resources: fileData,
      createdAt: new Date().toISOString(),
    };

    // ✅ Update localStorage under `classes`
const saved = localStorage.getItem(`posts_${classId}`);
const updated = saved ? [newPost, ...JSON.parse(saved)] : [newPost];
localStorage.setItem(`posts_${classId}`, JSON.stringify(updated));


    onPost(newPost);
    onBack(); // ✅ Return to main page
  };

  return (
    <div className="form-card">
      <div className="form-header"><h3>📘 Create Lesson</h3></div>
      <form className="form-body" onSubmit={handleSubmit}>
        <label>Lesson Title:</label>
        <input type="text" placeholder="Enter lesson title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description:</label>
        <textarea placeholder="Lesson details..." value={content} onChange={(e) => setContent(e.target.value)} required />

        <label>Upload Files:</label>
        <input type="file" multiple onChange={handleFileChange} />

        {files.length > 0 && (
          <div className="uploaded-files">
            <p><strong>📂 Attached Files:</strong></p>
            <ul>{files.map((f, i) => <li key={i}>{f.name}</li>)}</ul>
          </div>
        )}

        <div className="form-footer">
          <button type="submit" className="post-btn">Post</button>
          <button type="button" className="cancel-btn" onClick={onBack}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateLesson;
