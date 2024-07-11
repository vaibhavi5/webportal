const admin = require('firebase-admin');

const authMiddleware = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error.code === 'auth/id-token-expired') {
      res.status(401).send('Firebase ID token has expired. Please refresh the token and try again.');
    } else {
      res.status(401).send('Unauthorized');
    }
  }
};

module.exports = authMiddleware;
