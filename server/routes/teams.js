const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const User = require('../models/User');

// CREATE a new team
router.post('/', async (req, res) => {
  try {
    // Filter users with availability as true
    const users = await User.find({ available: true, userId: { $in: req.body.users } });
    
    // Check if all selected users have availability as true
    if (users.length !== req.body.users.length) {
      return res.status(400).json({ message: 'All selected users must have availability as true' });
    }

    const domains = new Set();
    for (const user of users) {
      if (domains.has(user.domain)) {
        return res.status(400).json({ message: 'Users should have unique domains' });
      }
      domains.add(user.domain);
    }

    // Create team
    const team = new Team({
      name: req.body.name,
      users: users.map(user => user.userId),
    });

    // Set availability of selected users to false
    for (const user of users) {
      user.available = false;
      await user.save();
    }

    // Save team
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// module.exports = router;



// DELETE a team
router.delete('/:id', async (req, res) => {
  try {
    // Find the team by its ID and remove it from the database
    const team = await Team.findOneAndDelete({ teamId: req.params.id });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Set availability of users in the team to true
    for (const userId of team.users) {
      const user = await User.findOne({ userId });
      if (user) {
        user.available = true;
        await user.save();
      }
    }

    res.json({ message: 'Team deleted and users availability updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// GET a specific team by ID
router.get('/:id', getTeam, (req, res) => {
  res.json(res.team);
});

// Middleware function to get team by ID
async function getTeam(req, res, next) {
  try {
    const team = await Team.findOne({ teamId: req.params.id });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    // Manually populate the users array
    const populatedUsers = await Promise.all(team.users.map(async (userId) => {
      const user = await User.findOne({ userId });
      return user;
    }));

    // Replace the users array with the populated users
    team.users = populatedUsers;
    
    res.team = team;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


// GET all teams
router.get('/', async (req, res) => {
  try {
    // Fetch all teams from the database
    const teams = await Team.find();

    // Populate users' details for each team
    const populatedTeams = await Promise.all(teams.map(async (team) => {
      // Manually populate the users array for each team
      const populatedUsers = await Promise.all(team.users.map(async (userId) => {
        const user = await User.findOne({ userId });
        return user;
      }));
      // Replace the users array with the populated users
      team.users = populatedUsers;
      
      return team;
    }));

    res.json({ teams: populatedTeams });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
