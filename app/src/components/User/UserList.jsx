import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUser from './AddUser';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { Link } from 'react-router-dom'; // Import useHistory for navigation
import EditUserForm from './EditUserForm';
import './css/UserList.css'

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [editUserData, setEditUserData] = useState(null); // State to store data for editing
  const [showEditForm, setShowEditForm] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let url = `http://localhost:3000/api/users?page=${currentPage}`;

        const filterParams = new URLSearchParams(filterCriteria).toString();
        if (filterParams) {
          url += `&${filterParams}`;
        }

        const response = await axios.get(url);
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, filterCriteria]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (newCriteria) => {
    setCurrentPage(1);
    setFilterCriteria(newCriteria);
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users?search=${searchTerm}`);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleEdit = async (userId) => {
    setShowEditForm(true);

    // Fetch user data for the selected user
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
      const userData = response.data;
      setEditUserData(userData); // Set the data for editing
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSaveEdit = async (editedUserData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${editedUserData.userId}`, editedUserData);
      // Update the user in the list
      setUsers(users.map(user => (user.userId === editedUserData.userId ? response.data : user)));
      setEditUserData(null); // Clear editUserData state
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditUserData(null); // Clear editUserData state
  };

  const handleDelete = async (userId) => {
    // Implement logic to delete user
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      setUsers(users.filter(user => user.userId !== userId));
      console.log(`Deleted user with ID ${userId}`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/create-team" className="create-team-link">Create Team</Link>

      <AddUser />
      <h1 style={{ textAlign: "center" }}>User List</h1>
      <SearchBar onSearch={handleSearch} />
      <Filter onFilterChange={handleFilterChange} />
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Domain</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userId}>
              <td>
                <img src={user.avatar} alt="Avatar" style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.domain}</td>
              <td>{user.available ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(user.userId)}>Edit</button>
                <button onClick={() => handleDelete(user.userId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "center" }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
      </div>

      {editUserData && (
        <div className="overlay">
          <div className="modal">
            <EditUserForm
              userData={editUserData}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
