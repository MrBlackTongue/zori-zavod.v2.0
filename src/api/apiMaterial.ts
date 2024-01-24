import { TypeApiResponse, TypeMaterial } from '../types';
import { MATERIALS } from './apiEndpoints';
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
    const response = await api.get(MATERIALS);
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
    const response = await api.get(`${MATERIALS}/${id}`);
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
    const response = await api.post(MATERIALS, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить материал по id
export async function deleteMaterialById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${MATERIALS}/${id}`);
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
    const response = await api.put(`${MATERIALS}/${data.id}`, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Пример функции для получения материалов по категории или другому критерию
export async function getMaterialsByCategory(
  categoryId: number,
): Promise<TypeMaterial[]> {
  try {
    const response = await api.get(`${MATERIALS}/category/${categoryId}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Пример функции для получения материалов по коду
export async function getMaterialsByCode(
  code: string,
): Promise<TypeMaterial[]> {
  try {
    const response = await api.get(`${MATERIALS}/code/${code}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
