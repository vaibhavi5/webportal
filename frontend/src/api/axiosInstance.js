import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // update backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
