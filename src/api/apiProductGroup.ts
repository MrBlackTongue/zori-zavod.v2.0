import {TypeApiResponse, TypeProductGroup} from '../types';
import {GROUP, PRODUCT_GROUP, TREE} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех товарных групп
export async function getAllProductGroup(): Promise<TypeProductGroup[]> {
  try {
    const response = await api.get(`${PRODUCT_GROUP}${GROUP}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить товарную группу по id
export async function getProductGroupById(
  id: number,
): Promise<TypeProductGroup | undefined> {
  try {
    const response = await api.get(`${PRODUCT_GROUP}${GROUP}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новую товарную группу
export async function createProductGroup(
  data: TypeProductGroup,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(`${PRODUCT_GROUP}${GROUP}`, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить товарную группу по id
export async function deleteProductGroupById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${PRODUCT_GROUP}${GROUP}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать товарную группу
export async function updateProductGroup(
  data: TypeProductGroup,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(`${PRODUCT_GROUP}${GROUP}`, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить дерево группы товаров
export async function getProductGroupTree(): Promise<TypeProductGroup[]> {
  try {
    const response = await api.get(`${PRODUCT_GROUP}${GROUP}${TREE}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
