import { SUBSCRIPTION } from './apiEndpoints';
import { handleErrorResponseMessage } from '../utils';
import { api } from './api';
import { TypeSubscription } from '../types';

// Получить текущую информацию о подписке пользователя
export function getUserSubscription(): Promise<TypeSubscription> {
  return api
    .get(SUBSCRIPTION)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}
