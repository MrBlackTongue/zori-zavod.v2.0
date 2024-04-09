import { TypeApiResponse, TypeStockAdjustment } from '../types';
import { STOCK_ADJUSTMENT } from './apiEndpoints';
import { api } from './api';

// Получить список всех корректировок
export async function getAllStockAdjustment(): Promise<TypeStockAdjustment[]> {
  const response = await api.get(STOCK_ADJUSTMENT);
  return response.data;
}

// Получить данные корректировки по id
export async function getStockAdjustmentById(
  id: number,
): Promise<TypeStockAdjustment | undefined> {
  const response = await api.get(`${STOCK_ADJUSTMENT}/${id}`);
  return response.data;
}

// Добавить новую корректировку
export function createStockAdjustment(
  data: TypeStockAdjustment,
): Promise<TypeApiResponse> {
  return api.post(STOCK_ADJUSTMENT, data);
}

// Удалить корректировку по id
export function deleteStockAdjustmentById(
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
