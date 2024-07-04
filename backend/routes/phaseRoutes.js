const express = require('express');
const { setLastPeriod, getPeriodPhases, redirect, getAuthUrl, getCalendar, addEvent } = require('../controller/PeriodPhaseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submitLastperiod', authMiddleware, setLastPeriod);
router.get('/getperiodPhases', authMiddleware, getPeriodPhases);


router.get('/auth', getAuthUrl);
router.get('/redirect', redirect);
router.get('/getCalendar', getCalendar);
router.get('/addPhasesEvent',addEvent);


// Add a simple test route
router.get('/test', (req, res) => {
    res.send('Test route works');
});


module.exports = router;


