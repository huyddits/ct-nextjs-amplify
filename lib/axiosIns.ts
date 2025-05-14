import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';
import { toast } from 'react-toastify';

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
    console.log('🚀 ~ error:', error);
    return Promise.reject(error as Error as Error);
  }
);

axiosIns.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized. Redirecting to login...');
      const dataResponse = error?.response?.data as { message: string };
      const errorMessage = dataResponse?.message ?? error?.message;
      toast.error(errorMessage);
    } else if (error.response?.status === 500) {
      console.error('Server error occurred');
    } else if ((error?.response?.data as { message: string })?.message) {
      const dataResponse = error?.response?.data as { message: string };
      toast.error(dataResponse.message);
    }
    console.log('🚀 ~ error:', error);
    return Promise.reject(error);
  }
);

export default axiosIns;
