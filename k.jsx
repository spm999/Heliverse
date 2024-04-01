// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TeamCreator = () => {
//   const [name, setName] = useState('');
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [teams, setTeams] = useState([]);

//   useEffect(() => {
//     const fetchUsersAndTeams = async () => {
//       try {
//         const usersResponse = await axios.get('http://localhost:3000/api/users?availability=true');
//         setUsers(usersResponse.data.users);

//         const teamsResponse = await axios.get('http://localhost:3000/api/team');
//         setTeams(teamsResponse.data.teams);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUsersAndTeams();
//   }, []);

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleUserChange = (e) => {
//     const selectedUserIds = Array.from(e.target.selectedOptions, option => option.value);
//     setSelectedUsers(selectedUserIds);
//   };

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/team', {
//         name: name,
//         users: selectedUsers
//       });
//       console.log('Team created:', response.data);
//       // Reset form
//       setName('');
//       setSelectedUsers([]);
//       setErrorMessage('');
  
//       // Fetch updated teams from the server
//       const updatedTeamsResponse = await axios.get('http://localhost:3000/api/team');
//       setTeams(updatedTeamsResponse.data.teams);
  
//       // Filter out selected users from the list of available users
//       const updatedUsers = users.filter(user => !selectedUsers.includes(user.userId));
//       setUsers(updatedUsers);
//     } catch (error) {
//       console.error('Error creating team:', error.response.data.message);
//       setErrorMessage(error.response.data.message);
//     }
//   };
  
//   const handleDeleteTeam = async (teamId) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/team/${teamId}`);
//       console.log('Team deleted');
  
//       // Fetch updated teams from the server
//       const updatedTeamsResponse = await axios.get('http://localhost:3000/api/team');
//       setTeams(updatedTeamsResponse.data.teams);
  
//       // Add users from the deleted team back to the list of available users
//       const deletedTeam = teams.find(team => team.teamId === teamId);
//       if (deletedTeam) {
//         const updatedUsers = [...users, ...deletedTeam.users];
//         setUsers(updatedUsers);
//       }
//     } catch (error) {
//       console.error('Error deleting team:', error);
//     }
//   };
  

//   return (
//     <div>
//       <h2>Create Team</h2>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="teamName">Team Name:</label>
//           <input type="text" id="teamName" value={name} onChange={handleNameChange} required />
//         </div>
//         <div>
//           <label htmlFor="userSelect">Select Users:</label>
//           <select id="userSelect" multiple value={selectedUsers} onChange={handleUserChange}>
//             {users.map(user => (
//               <option key={user.userId} value={user.userId}>
//                 {user.first_name} {user.last_name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type="submit">Create Team</button>
//       </form>
//       <h2>Teams</h2>
//       <ul>
//         {teams.map(team => (
//           <li key={team.teamId}>
//             <div>
//               <strong>{team.name}</strong>
//               <button onClick={() => handleDeleteTeam(team.teamId)}>Delete Team</button>
//             </div>
//             <ul>
//               {team.users.map(user => (
//                 <li key={user.userId}>{user.first_name} {user.last_name}</li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TeamCreator;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamCreator = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [teams, setTeams] = useState([]);

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
    const selectedUserIds = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedUsers(selectedUserIds);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/team', {
        name: name,
        users: selectedUsers
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
      const updatedUsers = users.filter(user => !selectedUsers.includes(user.userId));
      setUsers(updatedUsers);
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
  
      // Add users from the deleted team back to the list of available users
      const deletedTeam = teams.find(team => team.teamId === teamId);
      if (deletedTeam) {
        const updatedUsers = [...users, ...deletedTeam.users];
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };
  

  return (
    <div>
      <h2>Create Team</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teamName">Team Name:</label>
          <input type="text" id="teamName" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label htmlFor="userSelect">Select Users:</label>
          <select id="userSelect" multiple value={selectedUsers} onChange={handleUserChange}>
            {users.map(user => (
              <option key={user.userId} value={user.userId}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Team</button>
      </form>
      <h2>Teams</h2>
      <ul>
        {teams.map(team => (
          <li key={team.teamId}>
            <div>
              <strong>{team.name}</strong>
              <button onClick={() => handleDeleteTeam(team.teamId)}>Delete Team</button>
            </div>
            <ul>
              {team.users.map(user => (
                <li key={user.userId}>{user.first_name} {user.last_name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamCreator;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamCreator = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchUsersAndTeams = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:3000/api/users?availability=true');
        setUsers(usersResponse.data.users);
        // console.log(users.length)
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
    const selectedUserIds = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedUsers(selectedUserIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/team', {
        name: name,
        users: selectedUsers
      });
      console.log('Team created:', response.data);
      setName('');
      setSelectedUsers([]);
      setErrorMessage('');

      // Filter out selected users from the list of available users
      const updatedUsers = users.filter(user => !selectedUsers.includes(user.userId));
      setUsers(updatedUsers);

      // Fetch updated teams from the server
      fetchUpdatedTeams();
    } catch (error) {
      console.error('Error creating team:', error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  const fetchUpdatedTeams = async () => {
    try {
      const teamsResponse = await axios.get('http://localhost:3000/api/team');
      setTeams(teamsResponse.data.teams);
    } catch (error) {
      console.error('Error fetching updated teams:', error);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      await axios.delete(`http://localhost:3000/api/team/${teamId}`);
      console.log('Team deleted');
  
      // Fetch updated teams from the server
      const updatedTeamsResponse = await axios.get('http://localhost:3000/api/team');
      setTeams(updatedTeamsResponse.data.teams);
  
      // Add users from the deleted team back to the list of available users
      const deletedTeam = teams.find(team => team.teamId === teamId);
      if (deletedTeam) {
        const updatedUsers = [...users, ...deletedTeam.users];
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  return (
    <div>
      <h2>Create Team</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teamName">Team Name:</label>
          <input type="text" id="teamName" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label htmlFor="userSelect">Select Users:</label>
          <select id="userSelect" multiple value={selectedUsers} onChange={handleUserChange}>
            {users.map(user => (
              <option key={user.userId} value={user.userId}>
                {user.first_name} {user.last_name} {user.domain}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Team</button>
      </form> */}
      <form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="teamName">Team Name:</label>
    <input type="text" id="teamName" value={name} onChange={handleNameChange} required />
  </div>
  <div>
    <label htmlFor="userSelect">Select Users:</label>
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Domain</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.userId}>
            <td>
              <input type="checkbox" id={`user${user.userId}`} value={user.userId} onChange={handleUserChange} checked={selectedUsers.includes(user.userId)} />
            </td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.domain}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <button type="submit">Create Team</button>
</form>

      <h2>Teams</h2>
      <ul>
        {teams.map(team => (
          <li key={team.teamId}>
            <div>
              <strong>{team.name}</strong>
              <button onClick={() => handleDeleteTeam(team.teamId)}>Delete Team</button>

            </div>
            <ul>
              {team.users.map(user => (
                <li key={user.userId}>{user.first_name} {user.last_name} {user.email} {user.gender} {user.domain}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamCreator;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TeamCreator = () => {
//   const [name, setName] = useState('');
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [teams, setTeams] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [usersPerPage] = useState(5);

//   useEffect(() => {
//     const fetchUsersAndTeams = async () => {
//       try {
//         const usersResponse = await axios.get('http://localhost:3000/api/users?availability=true');
//         setUsers(usersResponse.data.users);

//         const teamsResponse = await axios.get('http://localhost:3000/api/team');
//         setTeams(teamsResponse.data.teams);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUsersAndTeams();
//   }, []);

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleUserChange = (userId) => {
//     const index = selectedUsers.indexOf(userId);
//     if (index === -1) {
//       setSelectedUsers([...selectedUsers, userId]);
//     } else {
//       const newSelectedUsers = [...selectedUsers];
//       newSelectedUsers.splice(index, 1);
//       setSelectedUsers(newSelectedUsers);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/team', {
//         name: name,
//         users: selectedUsers
//       });
//       console.log('Team created:', response.data);
//       setName('');
//       setSelectedUsers([]);
//       setErrorMessage('');

//       const updatedUsers = users.filter(user => !selectedUsers.includes(user.userId));
//       setUsers(updatedUsers);

//       fetchUpdatedTeams();
//     } catch (error) {
//       console.error('Error creating team:', error.response.data.message);
//       setErrorMessage(error.response.data.message);
//     }
//   };

  
//   const handleDeleteTeam = async (teamId) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/team/${teamId}`);
//       console.log('Team deleted');
  
//       // Fetch updated teams from the server
//       const updatedTeamsResponse = await axios.get('http://localhost:3000/api/team');
//       setTeams(updatedTeamsResponse.data.teams);
  
//       // Add users from the deleted team back to the list of available users
//       const deletedTeam = teams.find(team => team.teamId === teamId);
//       if (deletedTeam) {
//         const updatedUsers = [...users, ...deletedTeam.users];
//         setUsers(updatedUsers);
//       }
//     } catch (error) {
//       console.error('Error deleting team:', error);
//     }
//   };

//   const fetchUpdatedTeams = async () => {
//     try {
//       const teamsResponse = await axios.get('http://localhost:3000/api/team');
//       setTeams(teamsResponse.data.teams);
//     } catch (error) {
//       console.error('Error fetching updated teams:', error);
//     }
//   };

//   const indexOfLastUser = (currentPage + 1) * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const renderUsers = currentUsers.map(user => (
//     <tr key={user.userId}>
//       <td>
//         <input
//           type="checkbox"
//           onChange={() => handleUserChange(user.userId)}
//           checked={selectedUsers.includes(user.userId)}
//         />
//       </td>
//       <td>{user.first_name}</td>
//       <td>{user.last_name}</td>
//       <td>{user.domain}</td>
//     </tr>
//   ));

//   const pageNumbers = [];
//   for (let i = 0; i < Math.ceil(users.length / usersPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const renderPageNumbers = pageNumbers.map(number => (
//     <li
//       key={number}
//       id={number}
//       onClick={() => setCurrentPage(number)}
//       style={{ cursor: 'pointer' }}
//     >
//       {number + 1}
//     </li>
//   ));

//   return (
//     <div>
//       <h2>Create Team</h2>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="teamName">Team Name:</label>
//           <input type="text" id="teamName" value={name} onChange={handleNameChange} required />
//         </div>
//         <div>
//           <label>Select Users:</label>
//           <table>
//             <thead>
//               <tr>
//                 <th>Select</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Domain</th>
//               </tr>
//             </thead>
//             <tbody>
//               {renderUsers}
//             </tbody>
//           </table>
//           <div style={{ marginTop: '20px' }}>
//         <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center' }}>
//           {renderPageNumbers}
//         </ul>
//       </div>
//           <button type="submit">Create Team</button>
//         </div>
//       </form>

//       <h2>Teams</h2>
//       <ul>
//         {teams.map(team => (
//           <li key={team.teamId}>
//             <div>
//               <strong>{team.name}</strong>
//          <button onClick={() => handleDeleteTeam(team.teamId)}>Delete Team</button>

//             </div>
//             <ul>
//               {team.users.map(user => (
//                 <li key={user.userId}>{user.first_name} {user.last_name} {user.email} {user.gender} {user.domain}</li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>


//     </div>
//   );
// };

// export default TeamCreator;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TeamCreator = () => {
//   const [name, setName] = useState('');
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [teams, setTeams] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [usersPerPage] = useState(5);

//   useEffect(() => {
//     const fetchUsersAndTeams = async () => {
//       try {
//         const usersResponse = await axios.get('http://localhost:3000/api/users?availability=true');
//         setUsers(usersResponse.data.users);

//         const teamsResponse = await axios.get('http://localhost:3000/api/team');
//         setTeams(teamsResponse.data.teams);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUsersAndTeams();
//   }, []);

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleUserChange = (userId) => {
//     const index = selectedUsers.indexOf(userId);
//     if (index === -1) {
//       setSelectedUsers([...selectedUsers, userId]);
//     } else {
//       const newSelectedUsers = [...selectedUsers];
//       newSelectedUsers.splice(index, 1);
//       setSelectedUsers(newSelectedUsers);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/team', {
//         name: name,
//         users: selectedUsers
//       });
//       console.log('Team created:', response.data);
//       setName('');
//       setSelectedUsers([]);
//       setErrorMessage('');

//       const updatedUsers = users.filter(user => !selectedUsers.includes(user.userId));
//       setUsers(updatedUsers);

//       fetchUpdatedTeams();
//     } catch (error) {
//       console.error('Error creating team:', error.response.data.message);
//       setErrorMessage(error.response.data.message);
//     }
//   };

  
//   const handleDeleteTeam = async (teamId) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/team/${teamId}`);
//       console.log('Team deleted');
  
//       // Fetch updated teams from the server
//       const updatedTeamsResponse = await axios.get('http://localhost:3000/api/team');
//       setTeams(updatedTeamsResponse.data.teams);
  
//       // Add users from the deleted team back to the list of available users
//       const deletedTeam = teams.find(team => team.teamId === teamId);
//       if (deletedTeam) {
//         const updatedUsers = [...users, ...deletedTeam.users];
//         setUsers(updatedUsers);
//       }
//     } catch (error) {
//       console.error('Error deleting team:', error);
//     }
//   };

//   const fetchUpdatedTeams = async () => {
//     try {
//       const teamsResponse = await axios.get('http://localhost:3000/api/team');
//       setTeams(teamsResponse.data.teams);
//     } catch (error) {
//       console.error('Error fetching updated teams:', error);
//     }
//   };

//   const indexOfLastUser = (currentPage + 1) * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const renderUsers = currentUsers.map(user => (
//     <tr key={user.userId}>
//       <td>
//         <input
//           type="checkbox"
//           onChange={() => handleUserChange(user.userId)}
//           checked={selectedUsers.includes(user.userId)}
//         />
//       </td>
//       <td>{user.first_name}</td>
//       <td>{user.last_name}</td>
//       <td>{user.domain}</td>
//     </tr>
//   ));

//   const pageNumbers = [];
//   for (let i = 0; i < Math.ceil(users.length / usersPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const renderPageNumbers = pageNumbers.map(number => (
//     <li
//       key={number}
//       id={number}
//       onClick={() => setCurrentPage(number)}
//       style={{ cursor: 'pointer' }}
//     >
//       {number + 1}
//     </li>
//   ));

//   const handlePreviousPage = () => {
//     setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   return (
//     <div>
//       <h2>Create Team</h2>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="teamName">Team Name:</label>
//           <input type="text" id="teamName" value={name} onChange={handleNameChange} required />
//         </div>
//         <div>
//           <label>Select Users:</label>
//           <table>
//             <thead>
//               <tr>
//                 <th>Select</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Domain</th>
//               </tr>
//             </thead>
//             <tbody>
//               {renderUsers}
//             </tbody>
//           </table>
//           <div style={{ marginTop: '20px' }}>
//             <button type="button" onClick={handlePreviousPage} disabled={currentPage === 0}>
//               Previous
//             </button>
//             <button type="button" onClick={handleNextPage} disabled={currentPage === Math.ceil(users.length / usersPerPage) - 1}>
//               Next
//             </button>
//           </div>
//           <button type="submit">Create Team</button>
//         </div>
//       </form>

//       <h2>Teams</h2>
//       {/* <ul>
//         {teams.map(team => (
//           <li key={team.teamId}>
//             <div>
//               <strong>{team.name}</strong>
//          <button onClick={() => handleDeleteTeam(team.teamId)}>Delete Team</button>

//             </div>
//             <ul>
//               {team.users.map(user => (
//                 <li key={user.userId}>{user.first_name} {user.last_name} {user.email} {user.gender} {user.domain}</li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul> */}
//      <table>
//   <thead>
//     <tr>
//       <th>Team Name</th>
//       <th>Name</th>
//       <th>Email</th>
//       <th>Gender</th>
//       <th>Domain</th>
//       <th>Action</th>
//     </tr>
//   </thead>
//   <tbody>
//     {teams.map(team => (
//       <tr key={team.teamId}>
//         <td>{team.name}</td>
//         {team.users.map(user => (
//           <React.Fragment key={user.userId}>
//             <td>{user.first_name} {user.last_name}</td>
//             <td>{user.email}</td>
//             <td>{user.gender}</td>
//             <td>{user.domain}</td>
//           </React.Fragment>
//         ))}
//         <td>
//           <button onClick={() => handleDeleteTeam(team.teamId)}>Delete Team</button>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>




//     </div>
//   );
// };

// export default TeamCreator;
