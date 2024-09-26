// src/api/axiosInstance.ts
import axios from 'axios';

// Replace this with your MockAPI base URL
const axiosInstances = axios.create({
  baseURL: 'https://66f2845171c84d805875925a.mockapi.io',
});

export default axiosInstances;
