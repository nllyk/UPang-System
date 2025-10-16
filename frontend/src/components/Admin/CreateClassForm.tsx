import React, { useState } from "react";
import "./CreateClassForm.css";

interface CreateClassFormProps {
  onCreateClass: (classData: any) => void;
}

const CreateClassForm: React.FC<CreateClassFormProps> = ({ onCreateClass }) => {
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    subjectCode: "",
    room: "",
    instructor: "Mr. Santos",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ✅ Database-ready version (commented for now)
      /*
      const response = await axios.post("http://localhost:5000/api/classes", formData);
      onCreateClass(response.data);
      */

      // ✅ Mock Test Mode (no backend yet)
      const mockData = {
        _id: Date.now().toString(),
        name: formData.className,
        section: formData.section,
        subjectCode: formData.subjectCode,
        instructor: formData.instructor,
        room: formData.room,
        createdAt: new Date().toISOString(),
      };

      setTimeout(() => {
        alert("✅ Class created successfully!");
        console.log("Created class:", mockData);
        onCreateClass(mockData);
        setIsSubmitting(false);
      }, 700);
    } catch (err) {
      console.error(err);
      alert("❌ Error creating class");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-class-container">
      <h2 className="title">Create Class</h2>
      <form onSubmit={handleSubmit} className="create-class-form">
        <input
          type="text"
          name="className"
          placeholder="Class Name"
          value={formData.className}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subjectCode"
          placeholder="Subject Code"
          value={formData.subjectCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="room"
          placeholder="Room"
          value={formData.room}
          onChange={handleChange}
          required
        />

        <div className="buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button type="submit" className="create-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClassForm;
