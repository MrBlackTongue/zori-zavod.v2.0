import { TypeApiResponse, TypeProductionType } from '../types';
import { PRODUCTION_TYPE } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список типов производства
export async function getAllProductionType(): Promise<TypeProductionType[]> {
  try {
    const response = await api.get(PRODUCTION_TYPE);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные типа производства по id
export async function getProductionTypeById(
  id: number,
): Promise<TypeProductionType | undefined> {
  try {
    const response = await api.get(`${PRODUCTION_TYPE}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новый тип производства
export async function createProductionType(
  data: TypeProductionType,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(PRODUCTION_TYPE, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить тип производства по id
export async function deleteProductionTypeById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${PRODUCTION_TYPE}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать тип производства
export async function updateProductionType(
  data: TypeProductionType,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(PRODUCTION_TYPE, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
