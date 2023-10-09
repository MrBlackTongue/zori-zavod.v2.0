import { TypeProductMovementHistory } from '../types';
import { HISTORY, PRODUCT_MOVEMENT } from './apiEndpoints';
import { handleErrorResponseMessage } from '../utils';
import { api } from './api';

// Получить всю историю движения товаров
export function getAllProductMovementHistory(): Promise<
  TypeProductMovementHistory[]
> {
  return api
    .get(PRODUCT_MOVEMENT + HISTORY)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить всю историю движения товаров по id ячейки товара на складе
export function getProductMovementHistoryById(
  id: number,
): Promise<TypeProductMovementHistory[] | undefined> {
  return api
    .get(`${PRODUCT_MOVEMENT + HISTORY}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}
