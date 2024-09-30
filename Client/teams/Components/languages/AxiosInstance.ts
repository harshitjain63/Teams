// src/api/axiosInstance.ts
import axios from 'axios';

// Replace this with your MockAPI base URL
const axiosInstances = axios.create({
  baseURL: 'https://cjxiaojia.com/api/translation',
});

export default axiosInstances;
