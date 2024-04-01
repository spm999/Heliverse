import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Team.css'

const TeamCreator = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [teamedUsers, setTeamedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page

  useEffect(() => {
    const fetchUsersAndTeams = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:3000/api/users?availability=true');
        setUsers(usersResponse.data.users);

        const teamsResponse = await axios.get('http://localhost:3000/api/team');
        setTeams(teamsResponse.data.teams);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsersAndTeams();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    const isChecked = e.target.checked;

    // If the checkbox is checked, add the user to the selectedUsers array
    // If the checkbox is unchecked, remove the user from the selectedUsers array
    if (isChecked) {
      setSelectedUsers([...selectedUsers, { userId, domain: e.target.getAttribute('data-domain') }]);
    } else {
      setSelectedUsers(selectedUsers.filter(user => user.userId !== userId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/team', {
        name: name,
        users: selectedUsers.map(user => user.userId)
      });
      console.log('Team created:', response.data);
      // Reset form
      setName('');
      setSelectedUsers([]);
      setErrorMessage('');

      // Fetch updated teams from the server
      const updatedTeamsResponse = await axios.get('http://localhost:3000/api/team');
      setTeams(updatedTeamsResponse.data.teams);

      // Filter out selected users from the list of available users
      const updatedUsers = users.filter(user => !selectedUsers.map(u => u.userId).includes(user.userId));
      setUsers(updatedUsers);

      // Add selected users to the teamedUsers list
      setTeamedUsers([...teamedUsers, ...selectedUsers]);
    } catch (error) {
      console.error('Error creating team:', error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      await axios.delete(`http://localhost:3000/api/team/${teamId}`);
      console.log('Team deleted');

      // Fetch updated teams from the server
      const updatedTeamsResponse = await axios.get('http://localhost:3000/api/team');
      setTeams(updatedTeamsResponse.data.teams);

      // Find the team that is being deleted
      const deletedTeam = teams.find(team => team.teamId === teamId);
      if (deletedTeam) {
        // Move users from the deleted team back to the users list
        const updatedUsers = [...users, ...deletedTeam.users];
        setUsers(updatedUsers);

        // Remove users from the deleted team from the teamedUsers list
        const updatedTeamedUsers = teamedUsers.filter(user => !deletedTeam.users.map(u => u.userId).includes(user.userId));
        setTeamedUsers(updatedTeamedUsers);
      }
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  // Pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2 style={{textAlign:"center"}}>Create Team</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className='teamName'>
          {/* <label htmlFor="teamName">Team Name:</label> */}
          <input type="text" id="teamName" value={name} placeholder ="Team Name" onChange={handleNameChange} required />
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.userId}>
                <td>
                  <input
                    type="checkbox"
                    id={`user-${user.userId}`}
                    value={user.userId}
                    onChange={handleUserChange}
                  />
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.domain}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className='buttonContainer'>
        <button type="submit">Create Team</button>

        </div>
      </form>
      <div className='pagination'>
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span>{currentPage} / {Math.ceil(users.length / itemsPerPage)}</span>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(users.length / itemsPerPage)}>Next</button>
        </div>
      <h2>Teams</h2>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Domain</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <React.Fragment key={team.teamId}>
              {team.users.map((user, idx) => (
                <tr key={user.userId}>
                  {idx === 0 && (
                    <td rowSpan={team.users.length}>{team.name}</td>
                  )}
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.domain}</td>
                  <td>{user.gender}</td>
                  {idx === 0 && (
                    <td rowSpan={team.users.length}>
                      <button onClick={() => handleDeleteTeam(team.teamId)}>Delete Team</button>
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamCreator;

