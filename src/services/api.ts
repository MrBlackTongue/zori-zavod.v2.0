import axios from 'axios';
import {API_URL} from './apiEndpoints';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true // добавляет cookies с каждым запросом
});

// Перенаправляет на страницу авторизации не авторизованного пользователя
// api.interceptors.response.use((response) => response, (error) => {
//   if (error.response?.status === 401) {
//     window.location.assign('/login');
//   }
// });
//
// // Перенаправляет на страницу личного кабинета пользователей не оплативших подписку
// api.interceptors.response.use((response) => response, (error) => {
//   if (error.response?.status === 402) {
//     window.location.assign('/account');
//   }
// });

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const currentPath = window.location.pathname;
    if (error.response?.status === 401) {
      window.location.assign('/login');
    } else if (error.response?.status === 402 && currentPath !== '/account') {
      window.location.assign('/account');
    }
    return Promise.reject(error);
  }
);