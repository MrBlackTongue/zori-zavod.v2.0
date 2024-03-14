import { TypeApiResponse, TypeCategory } from '../types';
import { GROUP, PRODUCT_GROUP, TREE } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api'; // Получить список категорий

// Получить список категорий
export async function getAllCategory(): Promise<TypeCategory[]> {
  try {
    const response = await api.get(`${PRODUCT_GROUP}${GROUP}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить категорию по id
export async function getCategoryById(
  id: number,
): Promise<TypeCategory | undefined> {
  try {
    const response = await api.get(`${PRODUCT_GROUP}${GROUP}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новую категорию
export async function createCategory(
  data: TypeCategory,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(`${PRODUCT_GROUP}${GROUP}`, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить категорию по id
export async function deleteCategoryById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${PRODUCT_GROUP}${GROUP}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать категорию
export async function updateCategory(
  data: TypeCategory,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(`${PRODUCT_GROUP}${GROUP}`, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить дерево категорий
export async function getCategoryTree(): Promise<TypeCategory[]> {
  try {
    const response = await api.get(`${PRODUCT_GROUP}${GROUP}${TREE}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
