import { TypeApiResponse, TypeOutput } from '../types';
import { OUTPUT } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех единиц измерения
export async function getAllOutput(): Promise<TypeOutput[]> {
  try {
    const response = await api.get(OUTPUT);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные единицы измерения по id
export async function getOutputById(
  id: number,
): Promise<TypeOutput | undefined> {
  try {
    const response = await api.get(`${OUTPUT}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новую единицу измерения
export async function createOutput(data: TypeOutput): Promise<TypeApiResponse> {
  try {
    const response = await api.post(OUTPUT, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить единицу измерения по id
export async function deleteOutputById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${OUTPUT}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать единицу измерения
export async function updateOutput(data: TypeOutput): Promise<TypeApiResponse> {
  try {
    const response = await api.put(OUTPUT, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
