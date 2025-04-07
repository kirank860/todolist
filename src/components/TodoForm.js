import React, { useState, useEffect } from "react";

const TodoForm = ({ initialData = {}, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    ...initialData
  });

  const [error, setError] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">{isEditing ? "Update" : "Create"} Todo</button>
    </form>
  );
};

export default TodoForm;
