// Import the User model from the models directory
const User = require('../models/User');

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

// Export the getUserProfile function for use in other parts of the application
module.exports = {
  getUserProfile,
};
