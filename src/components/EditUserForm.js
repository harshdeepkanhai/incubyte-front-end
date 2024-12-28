import React from "react";
import "./EditUserForm.css";

const EditUserForm = ({ formData, onInputChange, onSubmit, editingUser }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Edit User</h2>
      <p>Editing: {editingUser.name}</p>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => onInputChange("name", e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => onInputChange("email", e.target.value)}
        required
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUserForm;
