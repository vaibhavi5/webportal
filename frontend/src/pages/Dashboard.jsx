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
  const [additionalData, setAdditionalData] = useState('');
  const [dashboardData, setDashboardData] = useState({
    recordDate: '',
    bleeding: false,
    OnPeriod: false,
    temperature: ''
  });
  const [notificationFrequency, setNotificationFrequency] = useState('daily'); // 默认提醒频率
  const [message, setMessage] = useState('');
  const [currentFrequency, setCurrentFrequency] = useState(''); // 当前提醒频率
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (loading || !token) return;
    const fetchCheckins = async () => {
      try {
        const response = await axiosInstance.get('/dashboards/checkins', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fetched check-ins:', response.data.checkins);
        setCheckins(response.data.checkins); // 假设返回的结构是 { checkins: [...] }
      } catch (error) {
        console.error('Failed to fetch check-ins:', error);
      }
    };
    fetchCheckins();

    // 获取当前提醒频率
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
    fetchNotificationFrequency();
  }, [user, loading, navigate, token]);

  const handleDateChange = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    console.log('Selected Date:', formattedDate);
    setSelectedDate(date);
    setDashboardData((prevData) => ({
      ...prevData,
      recordDate: formattedDate,
    }));
  };

  const handleCheckin = async () => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    if (checkins.includes(dateKey)) {
      alert('This date has already been checked in. You cannot submit again.');
      return;
    }
    setCheckins([...checkins, dateKey]);
    try {
      await axiosInstance.post('/dashboards/submit', { 
        recordDate: dateKey, 
        ...dashboardData 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('DashboardData submitted successfully');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setMessage('DashboardData submission failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleInputChange = (e) => {
    setAdditionalData(e.target.value);
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setDashboardData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
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
        <div className="additional-input">
          <textarea
            value={additionalData}
            onChange={handleInputChange}
            placeholder="Enter additional insights or recommendations"
          />
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
        <button onClick={() => navigate('/sms')} className="sms-btn">Turn on SMS</button> {/* 添加按钮 */}
      </div>

      <div className="right-section">
        <div className="visualizations">
          <div className="visualization">
            Bleeding or Not:
            <input type="checkbox" name="bleeding" checked={dashboardData.bleeding} onChange={handleChange} />
          </div>
          <div className="visualization">
            On Period or Not:
            <input type="checkbox" name="OnPeriod" checked={dashboardData.OnPeriod} onChange={handleChange} />
          </div>
          <div className="visualization">
            Temperature
            <input type="number" name="temperature" value={dashboardData.temperature} onChange={handleChange} />
          </div>
        </div>
        <div className="details">
          <div className="details-header">Select visualization above for more information</div>
          <div className="details-graphs">
            <div className="doughnut-graph">
              <Doughnut data={cycleData} />
            </div>
            <div className="details-panel">
              <h4>Chosen Visualization: Additional Relevant Insights/Recommendations</h4>
              <textarea
                value={additionalData}
                onChange={handleInputChange}
                placeholder="Enter additional insights or recommendations"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
