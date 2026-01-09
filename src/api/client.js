import axios from 'axios';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4001/api' 
});
let pending = 0;
const notify = () => {
  try {
    window.dispatchEvent(new CustomEvent('global-loading', { detail: { count: pending } }));
  } catch (e) {
    // noop in non-browser environments
  }
};

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  pending += 1;
  notify();
  return cfg;
});

// Handle 401 responses by clearing localStorage and redirecting to login
API.interceptors.response.use(
  response => {
    pending = Math.max(0, pending - 1);
    notify();
    return response;
  },
  error => {
    pending = Math.max(0, pending - 1);
    notify();
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export the base URL for use in components
export const getBaseUrl = () => {
  const apiUrl = getApiUrl();
  // Remove /api suffix if present to get base URL
  return apiUrl.replace(/\/api$/, '');
};

export default API;
