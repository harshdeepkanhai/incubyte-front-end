import React from "react";

const UserList = ({ users, onEditUser, onDeleteUser }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
          <button onClick={() => onEditUser(user)}>Edit</button>
          <button onClick={() => onDeleteUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
