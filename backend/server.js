const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('./firebase');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const smsRoutes = require('./routes/smsRoutes'); // 确保路径是 routes
const { startCronJobs } = require('./utils/cronJobs');
const phaseRoutes = require('./routes/phaseRoutes'); // Ensure correct path

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/dashboards', dashboardRoutes);
app.use('/api/sms', smsRoutes); // 确保使用了 /api/sms 路由
app.use('/api/phases', phaseRoutes); // Ensure phaseRoutes is used correctly

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
    startCronJobs();
});
