import React, { useState } from "react";
import "./CreateClassForm.css";

interface CreateClassFormProps {
  onCreateClass: (classData: any) => void;
}

const CreateClassForm: React.FC<CreateClassFormProps> = ({ onCreateClass }) => {
  const [formData, setFormData] = useState({
    subject: "",
    professor: "Mr. Santos",
    section: "",
    color: "green",
    activities: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Backend-ready placeholder:
      // const response = await axios.post("http://localhost:5000/api/classes", formData);
      // onCreateClass(response.data);

      const mockClass = {
        ...formData,
        id: Date.now().toString(),
      };

      setTimeout(() => {
        alert("✅ Class created successfully!");
        onCreateClass(mockClass);
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
          name="subject"
          placeholder="Subject"
          value={formData.subject}
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
          name="professor"
          placeholder="Professor"
          value={formData.professor}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="color"
          placeholder="Color (e.g., green, blue)"
          value={formData.color}
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
