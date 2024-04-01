const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ////////////////////////////////////////////////////////////////////
// GET all users with pagination, filtering, and searching support
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skipIndex = (page - 1) * limit;

  const filter = {};
  if (req.query.domain) {
    filter.domain = req.query.domain;
  }
  if (req.query.gender) {
    filter.gender = req.query.gender;
  }
  
// Handle availability filter
if (req.query.availability !== undefined && req.query.availability !== '') {
  // Convert string to boolean
  const availability = req.query.availability === 'true';
  filter.available = availability;
}


  if (req.query.search) {
    filter.$or = [
      { first_name: { $regex: req.query.search, $options: 'i' } },
      { last_name: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  try {
    const users = await User.find(filter)
      .skip(skipIndex)
      .limit(limit)
      .exec();

    const totalUsers = await User.countDocuments(filter);

    res.json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ///////////////////////////////////////////////////////////////////////

// GET a specific user by ID
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// CREATE a new user
router.post('/', async (req, res) => {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    avatar: req.body.avatar,
    domain: req.body.domain,
    available: req.body.available,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an existing user
router.put('/:id', getUser, async (req, res) => {
  if (req.body.first_name != null) {
    res.user.first_name = req.body.first_name;
  }
  if (req.body.last_name != null) {
    res.user.last_name = req.body.last_name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.gender != null) {
    res.user.gender = req.body.gender;
  }
  if (req.body.avatar != null) {
    res.user.avatar = req.body.avatar;
  }
  if (req.body.domain != null) {
    res.user.domain = req.body.domain;
  }
  if (req.body.available != null) {
    res.user.available = req.body.available;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a user
router.delete('/:id', getUser, async (req, res) => {
    try {
      await User.findOneAndDelete({ userId: req.params.id });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// Middleware function to get user by userId
async function getUser(req, res, next) {
    let user;
    try {
      user = await User.findOne({ userId: req.params.id });
      if (user == null) {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.user = user;
    next();
  }  

module.exports = router;
