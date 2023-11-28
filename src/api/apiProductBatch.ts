import {TypeApiResponse, TypeProductBatch} from '../types';
import {BATCH, PRODUCT} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить все партии товаров
export async function getAllProductBatch(): Promise<TypeProductBatch[]> {
  try {
    const response = await api.get(`${PRODUCT}${BATCH}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные партии товаров по id
export async function getProductBatchById(
  id: number,
): Promise<TypeProductBatch | undefined> {
  try {
    const response = await api.get(`${PRODUCT}${BATCH}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новую партию товаров
export async function createProductBatch(
  data: TypeProductBatch,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(`${PRODUCT}${BATCH}`, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить партию товаров по id
export async function deleteProductBatchById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${PRODUCT}${BATCH}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать партию товаров
export async function updateProductBatch(
  data: TypeProductBatch,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(`${PRODUCT}${BATCH}`, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
