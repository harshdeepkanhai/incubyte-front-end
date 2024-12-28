import React, { Component } from "react";
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import UserList from "./components/UserList";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      formData: { name: "", email: "" },
      editingUser: null,
      showAddModal: false,
      showEditModal: false,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await fetch("/users");
      const data = await response.json();
      this.setState({ users: data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.formData),
      });
      const newUser = await response.json();
      this.setState((prevState) => ({
        users: [...prevState.users, newUser],
        formData: { name: "", email: "" },
        showAddModal: false,
      }));
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`/users/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (Object.keys(result).length === 0) {
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
      showEditModal: true,
    });
  };

  handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/users/${this.state.editingUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.formData),
      });
      this.setState((prevState) => ({
        users: prevState.users.map((user) =>
          user.id === prevState.editingUser.id
            ? { ...user, ...prevState.formData }
            : user
        ),
        editingUser: null,
        formData: { name: "", email: "" },
        showEditModal: false,
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

  toggleAddModal = () => {
    this.setState((prevState) => ({
      showAddModal: !prevState.showAddModal,
      formData: { name: "", email: "" },
    }));
  };

  toggleEditModal = () => {
    this.setState((prevState) => ({
      showEditModal: !prevState.showEditModal,
      editingUser: null,
      formData: { name: "", email: "" },
    }));
  };

  render() {
    const { users, formData, editingUser, showAddModal, showEditModal } =
      this.state;
    return (
      <div className="app-container">
        <h1 className="app-title">User Management</h1>
        <button className="add-user-button" onClick={this.toggleAddModal}>
          Add User
        </button>
        {showAddModal && (
          <div className="modal">
            <div className="modal-content">
              <AddUserForm
                formData={formData}
                onInputChange={this.handleInputChange}
                onSubmit={this.handleAddUser}
              />
              <button className="close-button" onClick={this.toggleAddModal}>
                Close
              </button>
            </div>
          </div>
        )}
        {showEditModal && (
          <div className="modal">
            <div className="modal-content">
              <EditUserForm
                formData={formData}
                onInputChange={this.handleInputChange}
                onSubmit={this.handleUpdateUser}
                editingUser={editingUser}
              />
              <button className="close-button" onClick={this.toggleEditModal}>
                Close
              </button>
            </div>
          </div>
        )}
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
