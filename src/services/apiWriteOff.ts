import {TypeApiResponse, TypeWriteOff} from '../types';
import {WRITE_OFF} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех списаний
export async function getAllWriteOff(): Promise<TypeWriteOff[]> {
  try {
    const response = await api.get(WRITE_OFF);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные списания по id
export async function getWriteOffById(
  id: number,
): Promise<TypeWriteOff | undefined> {
  try {
    const response = await api.get(`${WRITE_OFF}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новое списание
export async function createWriteOff(
  data: TypeWriteOff,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(WRITE_OFF, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить списание по id
export async function deleteWriteOffById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${WRITE_OFF}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать списание
export async function updateWriteOff(
  data: TypeWriteOff,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(WRITE_OFF, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
