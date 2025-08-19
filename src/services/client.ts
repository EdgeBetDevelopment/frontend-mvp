import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL_NEXT;

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
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error);

    let errorMessage = 'Unknown error';
    let errorCode = 500;

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorCode = error.response.status;
        errorMessage = error.response.data?.detail || 'Something went wrong';

        if (errorCode === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      } else if (error.request) {
        errorMessage = 'Network error: No response received from server';
      } else {
        errorMessage = error?.message;
      }
    }

    console.error(`Error: ${errorMessage}, Status Code: ${errorCode}`);
    return Promise.reject({ message: errorMessage, code: errorCode });
  },
);
