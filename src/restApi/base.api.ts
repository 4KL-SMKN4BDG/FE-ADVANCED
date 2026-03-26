import { listed } from '@/constant/listed';
import useAuthStore from '@/store/auth.store';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
  timeout: 10000,
});
  
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['ngrok-skip-browser-warning'] = 'false';
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await useAuthStore.getState().refreshToken();
        if (newToken) {
          originalRequest.headers.authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error(refreshError, 'Refresh token failed, logging out...');
        useAuthStore.getState().logout();
        window.location.href = listed.signin;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
