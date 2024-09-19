import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-base-url.com',
  headers: {
    Accept: 'application/json',
  },
});

export const setAuthToken = (tkn: string | null) => {
  if (tkn) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${tkn}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export default axiosInstance;
