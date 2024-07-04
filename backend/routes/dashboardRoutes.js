// const express = require('express');
// const { submitDashboard, getDashboard } = require('../controller/dashboardController');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// router.post('/submit', authMiddleware, submitDashboard);
// router.get('/checkins', authMiddleware, getDashboard);

// module.exports = router;

const express = require('express');
const { submitDashboard, getDashboard, setNotificationFrequency, getNotificationFrequency } = require('../controller/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submit', authMiddleware, submitDashboard);
router.get('/checkins', authMiddleware, getDashboard);
router.post('/setNotificationFrequency', authMiddleware, setNotificationFrequency);
router.get('/notificationFrequency', authMiddleware, getNotificationFrequency);

module.exports = router;
