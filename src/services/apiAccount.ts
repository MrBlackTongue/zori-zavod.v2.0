import { PAYMENT, SUBSCRIPTION} from "./apiEndpoints";
import {PaymentResponse} from "../types";
import {
  handleErrorResponseMessage,
} from '../utils';
import {api} from "./api";

// Получить текущий баланс пользователя
export function getBalance(): Promise<number> {
  return api.get(SUBSCRIPTION)
    .then(response => {
      return response.data.customer.balance;
    })
    .catch(handleErrorResponseMessage);
}

// Получить логин пользователя
export function getLogin(): Promise<string> {
  return api.get(SUBSCRIPTION)
    .then(response => {
      return response.data.customer.title;
    })
    .catch(handleErrorResponseMessage);
}

// Пополнить баланс пользователя
export function replenishBalance(data: number): Promise<PaymentResponse> {
  return api.post(PAYMENT, data, { headers: { 'Content-Type': 'application/json' }})
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}