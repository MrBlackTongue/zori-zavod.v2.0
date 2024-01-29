import { TypeApiResponse, TypeMaterial } from '../types';
import { MATERIAL } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех материалов
export async function getAllMaterials(): Promise<TypeMaterial[]> {
  try {
    const response = await api.get(MATERIAL);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные материала по id
export async function getMaterialById(
  id: number,
): Promise<TypeMaterial | undefined> {
  try {
    const response = await api.get(`${MATERIAL}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новый материал
export async function createMaterial(
  data: TypeMaterial,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(MATERIAL, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить материал по id
export async function deleteMaterialById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${MATERIAL}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать материал
export async function updateMaterial(
  data: TypeMaterial,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(`${MATERIAL}/${data.id}`, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
