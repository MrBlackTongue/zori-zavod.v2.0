import { TypeApiResponse, TypePurchase } from '../types';
import { PRODUCT, PURCHASE } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех закупок
export async function getAllPurchase(): Promise<TypePurchase[]> {
  try {
    const response = await api.get(PURCHASE);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные закупки по id
export async function getPurchaseById(
  id: number,
): Promise<TypePurchase | undefined> {
  try {
    const response = await api.get(`${PURCHASE}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новую закупку
export async function createPurchase(
  data: TypePurchase,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(PURCHASE, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить закупку по id
export async function deletePurchaseById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${PURCHASE}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать закупку
export async function updatePurchase(
  data: TypePurchase,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(PURCHASE, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить список всех отфильтрованных закупок по названию
export async function getAllPurchaseByTitle(
  title: string,
): Promise<TypePurchase[]> {
  try {
    const response = await api.get(`${PURCHASE + PRODUCT}/${title}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
