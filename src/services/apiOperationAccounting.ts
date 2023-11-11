import {
  TypeApiResponse,
  TypeGetAllOperationAccountingResponse,
  TypeOperationAccounting,
  TypeOperationAccountingFilter,
} from '../types';
import { FILTER, OPERATION_ACCOUNTING } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить данные учетной операции по id
export async function getOperationAccountingById(
  id: number,
): Promise<TypeOperationAccounting | undefined> {
  try {
    const response = await api.get(`${OPERATION_ACCOUNTING}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новую учетную операцию
export async function createOperationAccounting(
  data: TypeOperationAccounting,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(OPERATION_ACCOUNTING, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить учетную операцию по id
export async function deleteOperationAccountingById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${OPERATION_ACCOUNTING}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать учетную операцию
export async function updateOperationAccounting(
  data: TypeOperationAccounting,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(OPERATION_ACCOUNTING, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить список всех отфильтрованных учетных операций
export async function getAllOperationAccountingByFilter(
  data: TypeOperationAccountingFilter,
): Promise<TypeGetAllOperationAccountingResponse> {
  try {
    const response = await api.post(`${OPERATION_ACCOUNTING}${FILTER}`, data);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
