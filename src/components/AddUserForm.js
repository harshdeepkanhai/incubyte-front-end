import React from "react";
import "./AddUserForm.css";

const AddUserForm = ({ formData, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Add User</h2>
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
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
