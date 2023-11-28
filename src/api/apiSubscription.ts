import {SUBSCRIPTION} from './apiEndpoints';
import {handleErrorResponseMessage} from '../utils';
import {api} from './api';
import {TypeSubscription} from '../types';

// Получить текущую информацию о подписке пользователя
export async function getUserSubscription(): Promise<TypeSubscription> {
  try {
    const response = await api.get(SUBSCRIPTION);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
