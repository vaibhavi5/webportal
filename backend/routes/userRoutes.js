// backend/routes/userRoutes.js
// Import the express library to create a router
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import the User model for interacting with user data
const User = require('../models/User');

// Import the authentication middleware to protect routes
const authMiddleware = require('../middleware/authMiddleware');

// Import the getUserProfile function from the user controller
const { getUserProfile } = require('../controller/userController');

// Route to register a new user in MongoDB
router.post('/register', async (req, res) => {
  // Destructure user data from the request body
  const { uid, name, email, authProvider } = req.body;

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ uid });

    if (user) {
      // If user exists, send a 400 Bad Request response
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new User document using the provided data
    user = new User({
      uid,
      name,
      email,
      authProvider,
    });

    // Save the new User document to the database
    await user.save();
    // Send a 201 Created response indicating success
    res.status(201).json({ msg: 'User added successfully' });
  } catch (error) {
    // Log any errors that occur during user registration
    console.error(error.message);
    // Send a 500 Internal Server Error response in case of any exceptions
    res.status(500).send('Server error');
  }
});

// Route to get the current user's profile
router.get('/me', authMiddleware, getUserProfile);

// Export the router to be used in other parts of the application
module.exports = router;