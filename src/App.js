import React, { Component } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      formData: { name: "", email: "" },
      editingUser: null,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      this.setState({ users: response.data.users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users", this.state.formData);
      this.setState((prevState) => ({
        users: [...prevState.users, response.data],
        formData: { name: "", email: "" },
      }));
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`/users/${id}`);
      if (response.data.success) {
        this.setState((prevState) => ({
          users: prevState.users.filter((user) => user.id !== id),
        }));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      editingUser: user,
      formData: { name: user.name, email: user.email },
    });
  };

  handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `/users/${this.state.editingUser.id}`,
        this.state.formData
      );
      this.setState((prevState) => ({
        users: prevState.users.map((user) =>
          user.id === prevState.editingUser.id
            ? { ...user, ...prevState.formData }
            : user
        ),
        editingUser: null,
        formData: { name: "", email: "" },
      }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  handleInputChange = (field, value) => {
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [field]: value },
    }));
  };

  render() {
    const { users, formData, editingUser } = this.state;
    return (
      <div>
        <h1>User Management</h1>
        <UserForm
          formData={formData}
          onInputChange={this.handleInputChange}
          onSubmit={editingUser ? this.handleUpdateUser : this.handleAddUser}
          editingUser={editingUser}
        />
        <UserList
          users={users}
          onEditUser={this.handleEditUser}
          onDeleteUser={this.handleDeleteUser}
        />
      </div>
    );
  }
}

export default App;
