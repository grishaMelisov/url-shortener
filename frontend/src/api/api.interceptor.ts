import axios from 'axios';
import { ContentTypes, getContentType } from './api.helper';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: getContentType(ContentTypes.JSON),
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized request — 401');
    }

    return Promise.reject(error);
  }
);
