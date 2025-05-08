import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';

const axiosIns = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/' + process.env.NEXT_PUBLIC_API_VERSION,
});

axiosIns.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore.getState();
    if (authStore.token) {
      config.headers.set('Authorization', `Bearer ${authStore.token}`);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosIns.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized. Redirecting to login...');
    } else if (error.response?.status === 500) {
      console.error('Server error occurred');
    }
    return Promise.reject(error);
  }
);

export default axiosIns;
