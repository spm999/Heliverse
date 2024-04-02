import React, { useState } from 'react';
import './css/EditForm.css'

function EditUserForm({ userData, onSave, onCancel }) {
  const [editedUser, setEditedUser] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUser);
  };

  return (
<form className="EditUserForm" onSubmit={handleSubmit}>
  <label>
    First Name:
    <input type="text" name="first_name" value={editedUser.first_name} onChange={handleChange} />
  </label>
  <label>
    Last Name:
    <input type="text" name="last_name" value={editedUser.last_name} onChange={handleChange} />
  </label>
  <label>
    Email:
    <input type="email" name="email" value={editedUser.email} onChange={handleChange} />
  </label>
  <label>
    Gender:
    <input type="text" name="gender" value={editedUser.gender} onChange={handleChange} />
  </label>
  <label>
    Domain:
    <input type="text" name="domain" value={editedUser.domain} onChange={handleChange} />
  </label>
  <label>
    Available:
    <input type="checkbox" name="available" checked={editedUser.available} onChange={() => setEditedUser(prevUser => ({ ...prevUser, available: !prevUser.available }))} />
  </label>
  <button type="submit">Save</button>
  <button type="button" onClick={onCancel}>Cancel</button>
</form>

  );
}

export default EditUserForm;
