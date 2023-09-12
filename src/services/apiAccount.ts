import { PAYMENT, SUBSCRIPTION} from "./apiEndpoints";
import {TypeApiResponse, TypeAccount} from "../types";
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

// Пополнить баланс пользователя
export function replenishBalance(amount: number): Promise<any> { // Замените "any" на реальный тип ответа
  return api.post('/path/to/replenish', { amount })  // Замените на реальный путь к API
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}