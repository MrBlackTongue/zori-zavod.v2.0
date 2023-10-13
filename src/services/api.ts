import axios from 'axios';
import { API_URL } from './apiEndpoints';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // добавляет cookies с каждым запросом
});

// Перенаправляет на страницу авторизации не авторизованного пользователя
// api.interceptors.response.use((response) => response, (error) => {
//   if (error.response?.status === 401) {
//     window.location.assign('/login');
//   }
// });

// api.interceptors.response.use(
//   response => response,
//   error => {
//     switch (error.response?.status) {
//       case 401:
//         window.location.assign('/login');
//         break;
//       case 402:
//         localStorage.setItem('redirectedDueToUnpaidSubscription', 'true');
//         window.location.assign('/user-profile');
//         break;
//       default:
//         break;
//     }
//   },
// );
