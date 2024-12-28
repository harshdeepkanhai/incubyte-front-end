import React from "react";

const UserForm = ({ formData, onInputChange, onSubmit, editingUser }) => {
  return (
    <form onSubmit={onSubmit}>
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
      <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
    </form>
  );
};

export default UserForm;
