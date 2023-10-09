import { TypeApiResponse, TypeEstimatedPrice } from '../types';
import { ESTIMATED_PRICE } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех расчетных цен
export function getAllEstimatedPrice(): Promise<TypeEstimatedPrice[]> {
  return api
    .get(ESTIMATED_PRICE)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные расчетной цены по id
export function getEstimatedPriceById(
  id: number,
): Promise<TypeEstimatedPrice | undefined> {
  return api
    .get(`${ESTIMATED_PRICE}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новую расчетную цену
export function createEstimatedPrice(
  data: TypeEstimatedPrice,
): Promise<TypeApiResponse> {
  return api
    .post(ESTIMATED_PRICE, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить расчетную цену по id
export function deleteEstimatedPriceById(id: number): Promise<TypeApiResponse> {
  return api
    .delete(`${ESTIMATED_PRICE}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать расчетную цену
export function updateEstimatedPrice(
  data: TypeEstimatedPrice,
): Promise<TypeApiResponse> {
  return api
    .put(ESTIMATED_PRICE, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}
