import { TypeApiResponse, TypeUnit } from '../types';
import { UNIT } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех единиц измерения
export async function getAllUnit(): Promise<TypeUnit[]> {
  try {
    const response = await api.get(UNIT);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные единицы измерения по id
export async function getUnitById(id: number): Promise<TypeUnit | undefined> {
  try {
    const response = await api.get(`${UNIT}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новую единицу измерения
export async function createUnit(data: TypeUnit): Promise<TypeApiResponse> {
  try {
    const response = await api.post(UNIT, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить единицу измерения по id
export async function deleteUnitById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${UNIT}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать единицу измерения
export async function updateUnit(data: TypeUnit): Promise<TypeApiResponse> {
  try {
    const response = await api.put(UNIT, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
