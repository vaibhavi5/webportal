import React, { useState, useContext, useEffect } from 'react';
import DatePicker from "react-datepicker";
import axiosInstance from '../api/axiosInstance';
import AuthContext from '../context/AuthContext';
import { format } from 'date-fns';
import { auth, db, logOut, getToken } from "../Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Insight.css";  

function Insight() {
  const { user, loading, token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [LastPeriodDate, setLastPeriodDate] = useState(new Date());
  const [phaseData, setPhaseData] = useState({
    lastPeriod: '',
    phaseDate: '',
    phase: ''
  });
  const [periodPhases, setPeriodPhases] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleChangeLastPeriodDate = (event) => {
    setLastPeriodDate(new Date(event.target.value));
  };

  const handleGeneratePhase = async () => {
    try {
      const response = await axiosInstance.post('phases/submitLastperiod', { 
        LastPeriod: LastPeriodDate 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Generate phase successfully:', LastPeriodDate);
      setPhaseData(response.data);
    } catch (error) {
      console.error('Failed to generate phase:', error);
    }
  };

  const fetchPhases = async () => {
    try {
      const response = await axiosInstance.get('phases/getperiodPhases', {
        headers: { Authorization: `Bearer ${token}` }
      });
      /* console.log('Fetched periodPhases:', response.data.phaseRecords); */
      setPeriodPhases(response.data.phaseRecords);
    } catch (error) {
      console.error('Failed to fetch periodPhases:', error);
    }
  };

  useEffect(() => {
    if (loading || !token) return;
    if (!user) navigate('/login');
    fetchPhases();
  }, [user, token, loading, navigate]);

  useEffect(() => {
    if(loading) return;
    if(!user) navigate("/");
    fetchUserName();
  }, [user, loading]);

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const CalendarDays = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDay = startOfMonth.getDay();

    const daysArray = [];

    for (let i = 0; i < startDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="phaseday empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = format(dayDate, 'yyyy-MM-dd');
      const phaseData = periodPhases.find(phase => format(new Date(phase.phaseDate), 'yyyy-MM-dd') === dateKey);
      const phaseClass = phaseData ? `phaseday ${phaseData.phase.replace(' ', '-')}` : 'phaseday';

      daysArray.push(
        <div
          key={day}
          className={phaseClass}
          onClick={() => setCurrentDate(dayDate)}
        >
          <div className="phase-name">{phaseData ? phaseData.phase : ''}</div>
          <div className="day-number">{day}</div>
        </div>
      );
    }

    return daysArray;
  };


  const fetchUserName = async() => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch(error) {
      console.log(error.message);
    }
  }

  const handleAddEvent = async (e) => {
    e.preventDefault();

    try {
      const event = {
        summary: title,
        description: description,
        start: {
          dateTime: date,
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: date,
          timeZone: 'America/Los_Angeles',
        },
      };

      const response = await axiosInstance.post('phases/addPhasesEvent', { event }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error('Failed to add event:', error.response ? error.response.data : error.message);
    }
  };


  return (
    <div className="insight">
      <div className="left-section">
        <h2>What is your last period date: </h2>
        <div className="input-button-container">
          <input 
            type="date" 
            value={format(LastPeriodDate, 'yyyy-MM-dd')} 
            onChange={handleChangeLastPeriodDate}
          />
          <button onClick={handleGeneratePhase} className="nav-button">Update last period date</button>
        </div>


        <div className="calendar-navigation">
          <button onClick={handlePreviousMonth} className="nav-button">Previous</button>
          <h2>{format(currentDate, 'MMMM yyyy')}</h2>
          <button onClick={handleNextMonth} className="nav-button" >Next</button>
        </div>

        <div className="calendar">
          {CalendarDays()}
        </div>
        <button onClick={handleGeneratePhase} className="nav-button">Sychronizing to your Google Calendar</button>
        <form onSubmit={handleAddEvent}>
          <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
          <button type="submit">Add Event</button>
        </form>
      </div>
      <div className="right-section">
        <h2>Right Side</h2>
      </div>
    </div>
  );
}
export default Insight;
