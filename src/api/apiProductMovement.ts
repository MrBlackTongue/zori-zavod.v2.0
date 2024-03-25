import { TypeApiResponse, TypeProductMovement } from '../types';
import { PRODUCT_MOVEMENT } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
} from '../utils';
import { api } from './api'; // Получить список всех движений товара по id сущности и типу сущности

// Получить список всех движений товара по id сущности и типу сущности
export async function getProductMovementByIdAndEntityType(
  entityType: string,
  id: number,
): Promise<TypeProductMovement[] | undefined> {
  try {
    const response = await api.get(`${PRODUCT_MOVEMENT}/${id}`, {
      params: { entityType, id },
    });
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить движение товара
export async function createProductionProductMovement(
  entityType: string,
  entityId: number,
  data: TypeProductMovement,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(`${PRODUCT_MOVEMENT}`, data, {
      params: {
        entityType,
        entityId,
      },
    });
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить движение товара по id и типу сущности
export async function deleteProductMovementByIdAndEntityType(
  entityType: string,
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${PRODUCT_MOVEMENT}/${id}`, {
      params: { entityType, id },
    });
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
