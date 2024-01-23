import { TypeApiResponse, TypeProductionProductMovement } from '../types';
import { MOVEMENT, OPERATION_ACCOUNTING, PRODUCTION } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
} from '../utils';
import { api } from './api';

// Получить список всех производственных движений товара по id учетной операции
export async function getProductionProductMovementByIdOperationAccounting(
  id: number,
): Promise<TypeProductionProductMovement[] | undefined> {
  try {
    const response = await api.get(
      `${MOVEMENT}${PRODUCTION}${OPERATION_ACCOUNTING}/${id}`,
    );
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить производственное движение товара
export async function createProductionProductMovement(
  data: TypeProductionProductMovement,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(`${MOVEMENT}${PRODUCTION}`, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить производственное движение товара по id
export async function deleteProductionProductMovementById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${MOVEMENT}${PRODUCTION}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
