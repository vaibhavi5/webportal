import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // 更新为您的后端URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
