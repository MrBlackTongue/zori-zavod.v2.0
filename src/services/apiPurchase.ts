import { TypeApiResponse, TypePurchase } from '../types';
import { PRODUCT, PURCHASE } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех закупок
export function getAllPurchase(): Promise<TypePurchase[]> {
  return api
    .get(PURCHASE)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные закупки по id
export function getPurchaseById(id: number): Promise<TypePurchase | undefined> {
  return api
    .get(`${PURCHASE}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новую закупку
export function createPurchase(data: TypePurchase): Promise<TypeApiResponse> {
  return api
    .post(PURCHASE, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить закупку по id
export function deletePurchaseById(id: number): Promise<TypeApiResponse> {
  return api
    .delete(`${PURCHASE}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать закупку
export function updatePurchase(data: TypePurchase): Promise<TypeApiResponse> {
  return api
    .put(PURCHASE, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}

// Получить список всех отфильтрованных закупок по названию
export function getAllPurchaseByTitle(title: string): Promise<TypePurchase[]> {
  return api
    .get(`${PURCHASE + PRODUCT}/${title}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}
