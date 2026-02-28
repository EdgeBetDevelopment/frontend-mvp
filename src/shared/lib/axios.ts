import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
});

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
  (error) => {
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
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          errorMessage = errorMessage || 'Authentication required';
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
