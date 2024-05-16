import {TypeApiResponse, TypeCategory} from '../types';
import {CATEGORY, TREE} from './apiEndpoints';
import {api} from './api';

// Получить список категорий
export async function getAllCategory(): Promise<TypeCategory[]> {
  const response = await api.get(`${CATEGORY}`);
  return response.data;
}

// Получить категорию по id
export async function getCategoryById(
  id: number,
): Promise<TypeCategory | undefined> {
  const response = await api.get(`${CATEGORY}/${id}`);
  return response.data;
}

// Добавить новую категорию
export async function createCategory(
  data: TypeCategory,
): Promise<TypeApiResponse> {
  return api.post(`${CATEGORY}`, data);
}

// Удалить категорию по id
export async function deleteCategoryById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${CATEGORY}/${id}`);
}

// Редактировать категорию
export async function updateCategory(
  data: TypeCategory,
): Promise<TypeApiResponse> {
  return api.put(`${CATEGORY}`, data);
}

// Получить дерево категорий
export async function getCategoryTree(): Promise<TypeCategory[]> {
  const response = await api.get(`${CATEGORY}${TREE}`);
  return response.data;
}
