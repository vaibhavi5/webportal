// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controller/userController');

// 添加用户数据到MongoDB
router.post('/register', async (req, res) => {
  const { uid, name, email, authProvider } = req.body;

  try {
    let user = await User.findOne({ uid });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      uid,
      name,
      email,
      authProvider,
    });

    await user.save();
    res.status(201).json({ msg: 'User added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/me', authMiddleware, getUserProfile);

module.exports = router;
