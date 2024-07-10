const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controller/userController');
const bcrypt = require('bcryptjs');

// Route to register a new user in MongoDB
router.post('/register', async (req, res) => {
  const { uid, name, email, password, authProvider } = req.body;

  console.log('Request received to register user:', req.body);

  try {
    let user = await User.findOne({ email });

    if (user) {
      console.log('User already exists:', user);
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      uid,
      name,
      email,
      password:hashedPassword,
      authProvider,
    });

    await user.save();
    console.log('User saved to MongoDB:', user);
    res.status(201).json({ msg: 'User added successfully', user });
  } catch (error) {
    console.error('Error saving user to MongoDB:', error.message);
    res.status(500).send('Server error');
  }
});

// Route to get the current user's profile
router.get('/me', authMiddleware, getUserProfile);

module.exports = router;
