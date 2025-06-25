import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';
import { toast } from 'react-toastify';
import { ROUTES } from '@/utils/constants';

const recentRequests = new Map<string, number>();
const DEDUP_WINDOW_MS = 500;

function getRequestKey(config: any): string {
  const { method, url, data, params } = config;
  return `${method}:${url}:${JSON.stringify(data)}:${JSON.stringify(params)}`;
}

const axiosIns = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/' + process.env.NEXT_PUBLIC_API_VERSION,
});

axiosIns.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const key = getRequestKey(config);
    const now = Date.now();
    const last = recentRequests.get(key);
    if (last && now - last < DEDUP_WINDOW_MS) {
      // Cancel the request
      return Promise.reject(new axios.Cancel(`Duplicate request blocked: ${key}`));
    }

    recentRequests.set(key, now);
    const authStore = useAuthStore.getState();
    if (authStore.token) {
      config.headers.set('Authorization', `Bearer ${authStore.token}`);
    }
    return config;
  },
  error => {
    console.log('🚀 ~ error:', error);
    return Promise.reject(error as unknown as Error);
  }
);

axiosIns.interceptors.response.use(
  response => {
    return response;
  },
  (err: unknown) => {
    if (axios.isCancel(err)) {
      console.log('silent suppressed');
      return Promise.reject();
    }
    const error = err as AxiosError;
    if (error.response?.status === 401 || error?.status === 401) {
      console.warn('Unauthorized. Redirecting to login...');
      const dataResponse = error?.response?.data as { message: string };
      const errorMessage = dataResponse?.message ?? error?.message;
      useAuthStore.getState().removeToken();
      toast.error(errorMessage);
      if (location.pathname !== `/${ROUTES.LOGIN}`) {
        location.href = `/${ROUTES.LOGIN}`;
      }
    } else if (error.response?.status === 500) {
      console.error('Server error occurred');
    } else if (error.response?.status === 404) {
      console.error('Not found');
    } else if ((error?.response?.data as { message: string })?.message) {
      const dataResponse = error?.response?.data as { message: string };
      toast.error(dataResponse.message);
    }
    console.log('🚀 ~ error:', error);
    return Promise.reject(error);
  }
);

export default axiosIns;
