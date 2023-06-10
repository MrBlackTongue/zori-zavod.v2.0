import axios from 'axios';
import {API_URL} from './apiEndpoints';

export const api = axios.create({
  baseURL: API_URL
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    window.location.assign('/login');
  }
});