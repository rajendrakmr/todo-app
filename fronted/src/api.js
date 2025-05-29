import axios from 'axios';
const api = 'http://localhost:5000/api' 
const API = axios.create({ baseURL: api});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = token;
  return config;
});

export default API;
