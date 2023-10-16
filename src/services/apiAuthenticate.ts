import {api} from './api';
import {AUTHENTICATE, CHECK_AUTHORIZATION, LOGOUT, REGISTRATION,} from './apiEndpoints';
import {TypeApiResponse, TypeUserProfile} from '../types';
import {handleErrorResponseMessage, handleRegistrationUserMessage, handleResponseLogoutMessage,} from '../utils';

// Зарегистрировать нового пользователя
export async function registrationUser(
  data: TypeUserProfile,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(REGISTRATION, data);
    return handleRegistrationUserMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

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

// Выход текущего пользователя из системы
export async function logoutUser(): Promise<TypeApiResponse> {
  try {
    const response = await api.post(`${LOGOUT}`);
    return handleResponseLogoutMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
