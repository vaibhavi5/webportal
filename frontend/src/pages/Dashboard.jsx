import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import AuthContext from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { Doughnut } from 'react-chartjs-2';
import './Dashboard.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user, loading, token } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checkins, setCheckins] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [message, setMessage] = useState('');
  const [currentFrequency, setCurrentFrequency] = useState('');
  const [notificationFrequency, setNotificationFrequency] = useState('daily');
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (loading || !token) return;
    
    fetchQuestions();
    fetchCheckins();
    fetchNotificationFrequency();
  }, [user, loading, navigate, token]);

  const fetchQuestions = async () => {
    try {
      const response = await axiosInstance.get('/dashboards/question', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Fetched questions:', response.data); // Debugging log
      setQuestions(response.data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };

  const fetchCheckins = async () => {
    try {
      const response = await axiosInstance.get('/dashboards/checkins', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Fetched check-ins:', response.data.checkins);
      setCheckins(response.data.checkins); 
    } catch (error) {
      console.error('Failed to fetch check-ins:', error);
    }
  };

  const fetchNotificationFrequency = async () => {
    try {
      const response = await axiosInstance.get('/dashboards/notificationFrequency', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Current notification frequency:', response.data.frequency);
      setCurrentFrequency(response.data.frequency);
    } catch (error) {
      console.error('Failed to fetch notification frequency:', error);
    }
  };

  const handleDateChange = async (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    console.log('Selected Date:', formattedDate);
    setSelectedDate(date);
    await fetchQuestions(); // Fetch new random questions
  };

  const handleCheckin = async () => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    if (checkins.includes(dateKey)) {
      alert('This date has already been checked in. You cannot submit again.');
      return;
    }

    const checkinData = {
      recordDate: dateKey,
      responses: Object.fromEntries(Object.entries(responses).map(([key, value]) => [key, value.response])),
      checkinCompleted: true,
    };

    try {
      const response = await axiosInstance.post('dashboards/checkinResponse', checkinData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCheckins([...checkins, dateKey]);
      setMessage('Dashboard data submitted successfully');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error submitting check-in:', error.response?.data || error.message);
      setMessage('Dashboard data submission failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleQuestionChange = (key, question, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [key]: { question, response: Array.isArray(value) ? value : [value] }
    }));
  };

  const handleSingleSelectionChange = (key, question, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [key]: { question, response: value }
    }));
  };

  const handleNotificationFrequencyChange = (e) => {
    setNotificationFrequency(e.target.value);
  };

  const handleConfirmFrequency = async () => {
    try {
      await axiosInstance.post('/dashboards/setNotificationFrequency', { 
        frequency: notificationFrequency 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Notification frequency set to:', notificationFrequency);
      setCurrentFrequency(notificationFrequency);
      alert(`Your notification frequency has been set to ${notificationFrequency}.`);
    } catch (error) {
      console.error('Failed to set notification frequency:', error);
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const startDay = startOfMonth.getDay();
    const daysArray = [];

    for (let i = 0; i < startDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const dateKey = format(dayDate, 'yyyy-MM-dd');
      const isCheckedIn = checkins.includes(dateKey);
      daysArray.push(
        <div 
          key={day} 
          className={`day ${isCheckedIn ? 'checked-in' : ''}`} 
          onClick={() => handleDateChange(dayDate)}
        >
          {day}
        </div>
      );
    }

    return daysArray;
  };

  const cycleData = {
    datasets: [{
      data: [30, 70],
      backgroundColor: ['#4caf50', '#d3d3d3']
    }]
  };

  const isDateCheckedIn = checkins.includes(format(selectedDate, 'yyyy-MM-dd'));
  return (
    <div className="dashboard-page">
      <div className="left-section">
        <h2>{format(selectedDate, 'EEEE, MMMM do')}</h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(selectedDate.getDate() / new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()) * 100}%` }}></div>
        </div>
        Select date: 
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
        />
        {!isDateCheckedIn && (
          <button onClick={handleCheckin} className="checkin-btn">Complete Daily Check-in</button>
        )}
        <div className="calendar">
          {renderCalendarDays()}
        </div>
        <div className="visualizations">
        {questions.map((question) => (
            <div key={question.key} className="visualization">
              <label>{question.question}</label>
              {question.enumValues && question.enumValues.length > 0 ? (
                question.enumValues.length > 1 ? (
                  <select
                    multiple
                    value={responses[question.key]?.response || []}
                    onChange={(e) => handleQuestionChange(question.key, question.question, Array.from(e.target.selectedOptions, option => option.value))}
                  >
                    {question.enumValues.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={responses[question.key]?.response || ''}
                    onChange={(e) => handleSingleSelectionChange(question.key, question.question, e.target.value)}
                  >
                    <option value="" disabled>Select an option</option>
                    {question.enumValues.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )
              ) : (
                <input
                  type={question.intRange ? "number" : "text"}
                  min={question.intRange ? question.intRange[0] : undefined}
                  max={question.intRange ? question.intRange[1] : undefined}
                  value={responses[question.key]?.response || ''}
                  onChange={(e) => handleSingleSelectionChange(question.key, question.question, question.intRange ? parseInt(e.target.value, 10) : e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
        <div className="notification-frequency">
          <label>Reminder Frequency:</label>
          <select value={notificationFrequency} onChange={handleNotificationFrequencyChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button onClick={handleConfirmFrequency}>Confirm</button>
        </div>
        <div className="current-frequency">
          <label>Current reminder frequency: {currentFrequency}</label>
        </div>
        <button onClick={() => navigate('/sms')} className="sms-btn">Turn on SMS</button> 
      </div>
      <div className="right-section">
        This is right Side
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Dashboard;

//Testing new branch
