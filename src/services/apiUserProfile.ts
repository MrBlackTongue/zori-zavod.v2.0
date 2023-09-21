import {PAYMENT, SUBSCRIPTION} from "./apiEndpoints";
import {handleErrorResponseMessage,} from '../utils';
import {api} from "./api";
import {TypePayment, TypeSubscription} from "../types";

// Получить текущую информацию о пользователе
export function getUserInfo(): Promise<TypeSubscription> {
  return api.get(SUBSCRIPTION)
    .then(response => {
      return response.data;
    })
    .catch(handleErrorResponseMessage);
}

// Пополнить баланс пользователя
export function replenishBalance(data: number): Promise<string> {
  return api.post(PAYMENT, data, { headers: { 'Content-Type': 'application/json' }})
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

export function getPaymentHistory(): Promise<TypePayment[]> {
  return api.get(PAYMENT)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}