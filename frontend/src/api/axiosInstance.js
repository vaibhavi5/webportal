import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://two8ish.onrender.com/api',
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
