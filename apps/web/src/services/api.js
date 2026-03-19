import axios from 'axios';

// Empty baseURL = same-origin requests; Vite proxy forwards /api to backend (avoids CORS)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
