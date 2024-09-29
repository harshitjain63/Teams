import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cjxiaojia.com/api/languages',
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
