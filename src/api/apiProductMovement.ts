import { TypeApiResponse, TypeProductMovement } from '../types';
import { PRODUCT_MOVEMENT } from './apiEndpoints';
import { api } from './api';

// Получить список всех движений товара по id сущности и типу сущности
export async function getProductMovementByIdAndEntityType(
  entityType: string,
  id: number,
): Promise<TypeProductMovement[] | undefined> {
  const response = await api.get(`${PRODUCT_MOVEMENT}/${id}`, {
    params: { entityType, id },
  });
  return response.data;
}

// Добавить движение товара
export function createProductMovement(
  entityType: string,
  entityId: number,
  data: TypeProductMovement,
): Promise<TypeApiResponse> {
  return api.post(`${PRODUCT_MOVEMENT}`, data, {
    params: {
      entityType,
      entityId,
    },
  });
}

// Удалить движение товара по id и типу сущности
export function deleteProductMovementByIdAndEntityType(
  entityType: string,
  id: number,
): Promise<TypeApiResponse> {
  return api.delete(`${PRODUCT_MOVEMENT}/${id}`, {
    params: { entityType, id },
  });
}

// Редактировать движение товара
export function updateProductMovement(
  data: TypeProductMovement,
): Promise<TypeApiResponse> {
  return api.put(`${PRODUCT_MOVEMENT}`, data);
}
