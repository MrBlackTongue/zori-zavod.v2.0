import { TypeApiResponse, TypeItemAttribute } from '../types';
import { ITEM, ITEM_ATTRIBUTE } from './apiEndpoints';
import { api } from './api';

// Получить список атрибутов по id элемента
export async function getItemAttributeByIdItem(
  id: number,
): Promise<TypeItemAttribute | undefined> {
  const response = await api.get(`${ITEM_ATTRIBUTE}/${ITEM}/${id}`);
  return response.data;
}

// Добавить новый атрибут
export async function createItemAttribute(
  data: TypeItemAttribute,
): Promise<TypeApiResponse> {
  return api.post(ITEM_ATTRIBUTE, data);
}

// Удалить атрибут по id
export async function deleteItemAttributeById(
  id: number,
): Promise<TypeApiResponse> {
  return api.delete(`${ITEM_ATTRIBUTE}/${id}`);
}

// Редактировать атрибут
export async function updateItemAttribute(
  data: TypeItemAttribute,
): Promise<TypeApiResponse> {
  return api.put(ITEM_ATTRIBUTE, data);
}
