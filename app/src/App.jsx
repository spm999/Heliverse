import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/User/UserList';
import TeamCreator from './components/Team/TeamCreator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<UserList />} />
        <Route path="/create-team" element={<TeamCreator/>} />
      </Routes>
    </Router>
  );
}

export default App;