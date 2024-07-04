const dotenv = require('dotenv');

const PeriodPhase = require('../models/PeriodPhase');
const User = require('../models/User');
const Survey = require('../models/Survey');
const PHASES = ['Inner-Winter', 'Inner-Spring', 'Inner-Summer', 'Inner-Fall'];
const { google } = require('googleapis');
const { calendar } = require('googleapis/build/src/apis/calendar');


dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );
  
  
  const getAuthUrl = (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      /* scope: 'https://www.googleapis.com/auth/calendar.readonly', */
      scope: 'https://www.googleapis.com/auth/calendar'
    });
    res.redirect(authUrl);
  };
  
const redirect = async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Tokens:', tokens);
    res.send('Successfully logged in');
  } catch (err) {
    console.error('Could not get token', err);
    res.send('Error retrieving access token');
  }
};

  const getCalendar = async (req, res) => {
    const calendars = google.calendar({ version: 'v3', auth: oauth2Client });
    calendars.calendarList.list({}, (err, response)=>{
        if(err){
            console.error('error fetching caldendars', err);
            res.send('Error');
            return;
        }
        const caldendarItem = response.data.items;
        res.json(caldendarItem);

    })
  };

  const addEvent = async (req, res) => {
    var event = {
      'summary': 'Google I/O 2015',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2024-06-28T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': '2024-06-28T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      'attendees': [
        {'email': 'lpage@example.com'},
        {'email': 'sbrin@example.com'},
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10},
        ],
      },
    };

    const calendars = google.calendar({ version: 'v3', auth: oauth2Client });
    calendars.events.insert({
      calendarId: 'primary',
      resource: event,
    }, function(err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', event.htmlLink);
      res.send(`Event created: ${event.htmlLink}`);
    });
};
//generate phases
const generatePhases = (startDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    let phases = [];

    for (let i = 0; i < 28; i++) {
        const currentDate = new Date(startDate.getTime() + i * oneDay);
        const phaseIndex = Math.floor(i / 7); // Calculate which of the four phases
        phases.push({
            lastPeriod: startDate,
            phaseDate: currentDate,
            phase: PHASES[phaseIndex]
        });
    }
    return phases;
}
//update the periods phase to MongoDB
const setLastPeriod = async (req, res) => {
    const { LastPeriod } = req.body;
    const uid = req.user ? req.user.uid : 'test-uid'; // Ensure uid is available

    try {
        // Update the survey with the last period date
        const survey = await Survey.findOneAndUpdate({ uid }, { lastMenstrualPeriod: LastPeriod }, { new: true });

        // Generate phases for the next 28 days
        const phases = generatePhases(new Date(LastPeriod));

        // Delete previous phase records for the user
        await PeriodPhase.deleteMany({ uid });

        // Create and save new phase records to the database
        const phaseRecords = phases.map(phase => ({
            uid,
            lastPeriod: LastPeriod,
            phaseDate: phase.phaseDate,
            phase: phase.phase
        }));
        // console.log(phaseRecords)

        await PeriodPhase.insertMany(phaseRecords);

        res.status(200).json({ message: 'Phases generated successfully' });
    } catch (error) {
        console.error('Phases generation error:', error);
        res.status(500).json({ message: 'Phases generation error' });
    }
};

// Function to get period phases in MongoDB
const getPeriodPhases = async (req, res) => {
    const uid = req.user.uid;
    try {
        const phaseRecords = await PeriodPhase.find({ uid });
        res.json({ phaseRecords });
    } catch (error) {
        console.error('Error fetching phase records:', error);
        res.status(500).json({ message: 'Check-in error' });
    }
};
  

module.exports = {
    setLastPeriod,
    getPeriodPhases,
    getAuthUrl,
    getCalendar,
    redirect,
    addEvent
};
