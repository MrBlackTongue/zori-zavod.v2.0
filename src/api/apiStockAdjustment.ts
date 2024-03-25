import { TypeApiResponse, TypeStockAdjustment } from '../types';
import { STOCK_ADJUSTMENT } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех списаний
export async function getAllStockAdjustment(): Promise<TypeStockAdjustment[]> {
  try {
    const response = await api.get(STOCK_ADJUSTMENT);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные списания по id
export async function getStockAdjustmentById(
  id: number,
): Promise<TypeStockAdjustment | undefined> {
  try {
    const response = await api.get(`${STOCK_ADJUSTMENT}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новое списание
export async function createStockAdjustment(
  data: TypeStockAdjustment,
): Promise<TypeStockAdjustment> {
  try {
    const response = await api.post(STOCK_ADJUSTMENT, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить списание по id
export async function deleteStockAdjustmentById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${STOCK_ADJUSTMENT}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать списание
export async function updateStockAdjustment(
  data: TypeStockAdjustment,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(STOCK_ADJUSTMENT, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
