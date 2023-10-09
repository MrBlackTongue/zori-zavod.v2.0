import { PAYMENT } from './apiEndpoints';
import { handleErrorResponseMessage } from '../utils';
import { api } from './api';
import { TypePayment } from '../types';

// Пополнить баланс пользователя
export function replenishBalance(data: number): Promise<string> {
  return api
    .post(PAYMENT, data, { headers: { 'Content-Type': 'application/json' } })
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить историю пополнений
export function getPaymentHistory(): Promise<TypePayment[]> {
  return api
    .get(PAYMENT)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}
