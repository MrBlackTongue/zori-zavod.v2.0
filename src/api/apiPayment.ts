import {PAYMENT} from './apiEndpoints';
import {handleErrorResponseMessage} from '../utils';
import {api} from './api';
import {TypePayment} from '../types';

// Пополнить баланс пользователя
export async function replenishBalance(data: number): Promise<string> {
  try {
    const response = await api.post(PAYMENT, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить историю пополнений
export async function getPaymentHistory(): Promise<TypePayment[]> {
  try {
    const response = await api.get(PAYMENT);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
