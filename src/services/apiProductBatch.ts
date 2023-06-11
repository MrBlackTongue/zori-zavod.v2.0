import {TypeApiResponse, TypeProductBatch} from "../types";
import {PRODUCT, BATCH} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from "./api";

// Получить все партии товаров
export function getAllProductBatch(): Promise<TypeProductBatch[]> {
  return api.get(`${PRODUCT}${BATCH}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные партии товаров по id
export function getProductBatchById(id: number): Promise<TypeProductBatch | undefined> {
  return api.get(`${PRODUCT}${BATCH}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новую партию товаров
export function createProductBatch(data: TypeProductBatch): Promise<TypeApiResponse> {
  return api.post(`${PRODUCT}${BATCH}`, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить партию товаров по id
export function deleteProductBatchById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${PRODUCT}${BATCH}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать партию товаров
export function updateProductBatch(data: TypeProductBatch): Promise<TypeApiResponse> {
  return api.put(`${PRODUCT}${BATCH}`, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}