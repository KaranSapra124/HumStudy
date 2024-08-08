import axios from 'axios';
import { BASE_URL } from './apiConfig';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // timeout: 10000,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.data?.unauthorized) {
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.data?.unauthorized) {
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default axios;
