import axios from 'axios';
import { API_URL, SUBSCRIPTION } from './apiEndpoints';
import { message } from 'antd';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // добавляет cookies с каждым запросом
});

api.interceptors.response.use(
  response => response,
  error => {
    switch (error.response?.status) {
      case 401:
        // window.location.assign(`${LOGIN}`);
        break;
      case 402:
        localStorage.setItem('redirectedDueToUnpaidSubscription', 'true');
        window.location.assign(`${SUBSCRIPTION}`);
        break;
      default:
        void message.error(
          error.response?.data?.message ?? 'Произошла неизвестная ошибка',
        );
        break;
    }
  },
);
