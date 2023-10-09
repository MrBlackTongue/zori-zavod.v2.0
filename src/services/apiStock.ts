import { TypeApiResponse, TypeStock } from '../types';
import { GROUP, STOCK, TITLE } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех остатков со склада
export function getAllStock(): Promise<TypeStock[]> {
  return api
    .get(STOCK)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные остатка со склада по id
export function getStockById(id: number): Promise<TypeStock | undefined> {
  return api
    .get(`${STOCK}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новый остаток на складе
export function createStock(data: TypeStock): Promise<TypeApiResponse> {
  return api
    .post(STOCK, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить остаток на складе по id
export function deleteStockById(id: number): Promise<TypeApiResponse> {
  return api
    .delete(`${STOCK}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать остаток на складе
export function updateStock(data: TypeStock): Promise<TypeApiResponse> {
  return api
    .put(STOCK, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}

// Получить список всех отфильтрованных остатков на складе по название
export function getAllStockByTitle(title: string): Promise<TypeStock[]> {
  return api
    .get(`${STOCK}${TITLE}/${title}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить список всех отфильтрованных остаков на складе
export function getAllStockByFilter(
  id: number,
): Promise<TypeStock[] | undefined> {
  return api
    .get(`${STOCK}${GROUP}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}
