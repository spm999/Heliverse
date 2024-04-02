import React, { useState } from 'react';
import axios from 'axios';
import './css/AddUser.css'

function AddUser() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    avatar: '',
    domain: '',
    available: true
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://heliverse-3f2v.onrender.com/api/users', formData);
      alert('User added successfully!');
      // Clear the form data after successful submission
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        avatar: '',
        domain: '',
        available: false
      });
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="add-user-container">
        <h1>Add User</h1>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Avatar:
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Domain:
            <input
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Available:
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={() =>
                setFormData({ ...formData, available: !formData.available })
              }
            />
          </label>
          <br />
          <button type="submit" disabled={loading}>
            Add User
          </button>
        </form>
      </div>

    </div>
  );
}

export default AddUser;
