import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
});

const refreshClient = axios.create({ baseURL: apiUrl });

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((p) => (token ? p.resolve(token) : p.reject(error)));
  failedQueue = [];
}

function clearAuthStorage() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  document.cookie = 'accessToken=; path=/; max-age=0';
}

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let errorMessage = 'Unknown error';
    let errorCode = 500;

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorCode = error.response.status;
        const detail = error.response.data?.detail;
        errorMessage = detail || 'Something went wrong';

        if (typeof detail === 'string') {
          const match = detail.match(/^(\d{3}):/);
          if (match) {
            const actualCode = parseInt(match[1], 10);
            errorCode = actualCode;
            errorMessage = detail;
          }
        }

        if (errorCode === 401) {
          const storedRefreshToken =
            typeof window !== 'undefined'
              ? localStorage.getItem('refreshToken')
              : null;

          if (!storedRefreshToken) {
            clearAuthStorage();
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('auth:logout'));
            }
            return Promise.reject({ message: errorMessage || 'Authentication required', code: 401 });
          }

          const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

          if (originalRequest._retry) {
            clearAuthStorage();
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('auth:logout'));
            }
            return Promise.reject({ message: errorMessage || 'Authentication required', code: 401 });
          }

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                resolve: (token) => {
                  originalRequest.headers['Authorization'] = `Bearer ${token}`;
                  resolve(axiosInstance(originalRequest));
                },
                reject,
              });
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const response = await refreshClient.post(`/auth/api/v1/auth/refresh`, {
              token: storedRefreshToken,
            });

            const newToken: string = response.data.token;

            localStorage.setItem('accessToken', newToken);
            document.cookie = `accessToken=${newToken}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;

            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('auth:tokenRefreshed', { detail: { token: newToken } }));
            }

            processQueue(null, newToken);
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            clearAuthStorage();
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('auth:logout'));
            }
            return Promise.reject({ message: 'Authentication required', code: 401 });
          } finally {
            isRefreshing = false;
          }
        } else if (errorCode === 402) {
          errorMessage = errorMessage || 'Active subscription required';
        }
      } else if (error.request) {
        errorMessage = 'Network error: No response received from server';
      } else {
        errorMessage = error?.message;
      }
    }

    return Promise.reject({ message: errorMessage, code: errorCode });
  },
);
