import axios from 'axios';
import {API_URL} from "./apiEndpoints";

// Создаем функцию для создания экземпляра axios
export function createApi(onUnauthorized: any) {
  const api = axios.create({
    baseURL: API_URL
  });

  api.interceptors.request.use(request => {
    return request;
  }, error => {
    return Promise.reject(error);
  });

  api.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response && error.response.status === 401) {
      onUnauthorized();
    }
    return Promise.reject(error);
  });

  return api;
}