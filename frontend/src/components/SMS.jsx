import React, { useState, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './SMS.css';
import AuthContext from '../context/AuthContext';

const SMS = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/sms/send-sms', {
        to: phoneNumber,
        message: message,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('SMS sent successfully:', response.data);
      alert('SMS sent successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('Failed to send SMS');
    }
  };

  return (
    <div className="sms">
      <div className="sms_box">
        <h2>Send SMS</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="sms_input"
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="sms_input sms_textarea"
            />
          </div>
          <button type="submit" className="sms_btn">Send SMS</button>
        </form>
      </div>
    </div>
  );
};

export default SMS;
