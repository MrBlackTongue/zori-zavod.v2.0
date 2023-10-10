import {TypeApiResponse, TypeOperation} from '../types';
import {OPERATION, TITLE} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех типов операций
export async function getAllOperation(): Promise<TypeOperation[]> {
  try {
    const response = await api.get(OPERATION);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные типа операции по id
export async function getOperationById(
  id: number,
): Promise<TypeOperation | undefined> {
  try {
    const response = await api.get(`${OPERATION}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новый тип операции
export async function createOperation(
  data: TypeOperation,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(OPERATION, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить тип операции по id
export async function deleteOperationById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${OPERATION}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать тип операции
export async function updateOperation(
  data: TypeOperation,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(OPERATION, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить список всех отфильтрованных операций по названию
export async function getAllOperationByTitle(
  title: string,
): Promise<TypeOperation[]> {
  try {
    const response = await api.get(`${OPERATION}${TITLE}/${title}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
