// userRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile, registerUser } = require('../controller/userController');

// Route to register a new user in MongoDB
router.post('/register', registerUser);

// Route to get the current user's profile
router.get('/me', authMiddleware, getUserProfile);

module.exports = router;
