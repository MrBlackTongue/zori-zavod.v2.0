import { api } from './api';
import { AUTHENTICATE, CHECK_AUTHORIZATION } from './apiEndpoints';
import { TypeUserProfile } from '../types';
import { handleErrorResponseMessage } from '../utils';

// Запрос для авторизации пользователя
export function loginUser(data: TypeUserProfile): Promise<any> {
  return api
    .post(AUTHENTICATE, data)
    .then(response => {
      if (response.status === 200) {
        return { jwt: 'Authenticated' };
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(handleErrorResponseMessage);
}

// Запрос для проверки авторизации пользователя
export function checkAuthorization(): Promise<boolean> {
  return api
    .get(CHECK_AUTHORIZATION)
    .then(response => {
      if (response.status === 200) {
        return response.data === true;
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(handleErrorResponseMessage);
}
