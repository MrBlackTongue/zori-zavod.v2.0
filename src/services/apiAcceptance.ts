import { TypeAcceptance, TypeApiResponse } from '../types';
import { ACCEPTANCE, MOVEMENT, PRODUCT } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
} from '../utils';
import { api } from './api';

// Получить список всех приемок товаров
export function getAllAcceptance(): Promise<TypeAcceptance[]> {
  return api
    .get(`${MOVEMENT}${ACCEPTANCE}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новую приемку товаров
export function createAcceptance(
  data: TypeAcceptance,
): Promise<TypeApiResponse> {
  return api
    .post(`${MOVEMENT}${ACCEPTANCE}`, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить приемку товаров по id
export function deleteAcceptanceById(id: number): Promise<TypeApiResponse> {
  return api
    .delete(`${MOVEMENT}${ACCEPTANCE}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Получить список всех отфильтрованных приемок товара по названию
export function getAllAcceptanceByTitle(
  title: string,
): Promise<TypeAcceptance[]> {
  return api
    .get(`${MOVEMENT}${ACCEPTANCE}${PRODUCT}/${title}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}
