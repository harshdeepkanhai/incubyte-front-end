import React from "react";
import "./UserList.css";

const UserList = ({ users, onEditUser, onDeleteUser }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
          <div>
            <button onClick={() => onEditUser(user)}>Edit</button>
            <button onClick={() => onDeleteUser(user.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
