import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

let isRefreshing = false;

api.interceptors.response.use(resp => resp, async error => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== 'token/refresh/') {
    if (isRefreshing) return Promise.reject(error);
    
    isRefreshing = true;
    originalRequest._retry = true;

    try {
      await api.post('token/refresh/');
      isRefreshing = false;
      return api(originalRequest);
    } 
    catch (refreshError) {
      isRefreshing = false;
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
});

export default api;