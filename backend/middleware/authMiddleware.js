// Import the Firebase admin module
const admin = require('../firebase');

// Middleware function for authenticating users using Firebase ID tokens
const authMiddleware = async (req, res, next) => {
  // Get the Authorization header from the incoming request
  const authHeader = req.header('Authorization');

  // Check if the Authorization header exists
  if (!authHeader) {
    // If no Authorization header is present, send a 401 Unauthorized response
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token by removing the 'Bearer ' prefix
  const idToken = authHeader.replace('Bearer ', '');

  try {
    // Verify the ID token using Firebase admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Attach the decoded token's UID to the request object
    req.user = {
      uid: decodedToken.uid, 
    };

    // Call the next middleware function or route handler
    next();
  } catch (error) {
    // Log any errors that occur during token verification
    console.error('Error verifying token:', error);

    // Send a 401 Unauthorized response if the token is invalid
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Export the authMiddleware function for use in other parts of the application
module.exports = authMiddleware;
