import { TypeApiResponse, TypeStockAdjustment } from '../types';
import { STOCK_ADJUSTMENT } from './apiEndpoints';
import { handleErrorResponseMessage } from '../utils';
import { api } from './api';

// Получить список всех корректировок
export async function getAllStockAdjustment(): Promise<TypeStockAdjustment[]> {
  try {
    const response = await api.get(STOCK_ADJUSTMENT);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные корректировки по id
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

// Добавить новую корректировку
export async function createStockAdjustment(
  data: TypeStockAdjustment,
): Promise<TypeStockAdjustment> {
  return api.post(STOCK_ADJUSTMENT, data);
}

// Удалить корректировку по id
export async function deleteStockAdjustmentById(
  id: number,
): Promise<TypeApiResponse> {
  return api.delete(`${STOCK_ADJUSTMENT}/${id}`);
}

// Редактировать корректировки
export function updateStockAdjustment(
  data: TypeStockAdjustment,
): Promise<TypeApiResponse> {
  return api.put(STOCK_ADJUSTMENT, data);
}
