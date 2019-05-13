import axios from 'axios';

const service = axios.create({
  baseURL: `${location.protocol}//${location.host}`,
  timeout: 1000,
  headers: {'Content-Type': 'application/json'},
});

service.interceptors.request.use(
  config => {
    const csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content');
    config.headers.common['X-CSRF-TOKEN'] = csrfToken
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

export default service;