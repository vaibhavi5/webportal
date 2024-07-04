// routes/smsRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { sendSMS } = require('../controller/smsController');

router.post('/send-sms', authMiddleware, sendSMS);

module.exports = router;

