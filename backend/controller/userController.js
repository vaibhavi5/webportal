// userController.js

// Import the User model from the models directory
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Function to get the user profile based on the authenticated user's UID
const getUserProfile = async (req, res) => {
  try {
    // Find a user document that matches the UID from the request object
    const user = await User.findOne({ uid: req.user.uid });
    
    // If no user is found, send a 404 response with a "User not found" message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // If a user is found, send the user data as a JSON response
    res.json(user);
  } catch (error) {
    // Log any errors that occur during the process
    console.error(error);
    
    // Send a 500 response with a "Server error" message in case of any exceptions
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to register a new user in MongoDB
const registerUser = async (req, res) => {
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
      password: hashedPassword,
      authProvider,
    });

    await user.save();
    console.log('User saved to MongoDB:', user);
    res.status(201).json({ msg: 'User added successfully', user });
  } catch (error) {
    console.error('Error saving user to MongoDB:', error.message);
    res.status(500).send('Server error');
  }
};

// Export the functions for use in other parts of the application
module.exports = {
  getUserProfile,
  registerUser,
};
