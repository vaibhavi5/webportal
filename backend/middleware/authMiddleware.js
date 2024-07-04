/* const admin = require('../firebase');

const authMiddleware = async (req, res, next) => {

  const idToken = req.header('Authorization').replace('Bearer ', '');

  if (!idToken) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = {
      uid: decodedToken.uid, 
    };
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
 */

const admin = require('../firebase');

const authMiddleware = async (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.header('Authorization');

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token by removing the 'Bearer ' prefix
  const idToken = authHeader.replace('Bearer ', '');

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = {
      uid: decodedToken.uid, 
    };
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
