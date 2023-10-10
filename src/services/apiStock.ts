import {TypeApiResponse, TypeStock} from '../types';
import {GROUP, STOCK, TITLE} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех остатков со склада
export async function getAllStock(): Promise<TypeStock[]> {
  try {
    const response = await api.get(STOCK);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные остатка со склада по id
export async function getStockById(id: number): Promise<TypeStock | undefined> {
  try {
    const response = await api.get(`${STOCK}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новый остаток на складе
export async function createStock(data: TypeStock): Promise<TypeApiResponse> {
  try {
    const response = await api.post(STOCK, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить остаток на складе по id
export async function deleteStockById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${STOCK}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать остаток на складе
export async function updateStock(data: TypeStock): Promise<TypeApiResponse> {
  try {
    const response = await api.put(STOCK, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить список всех отфильтрованных остатков на складе по название
export async function getAllStockByTitle(title: string): Promise<TypeStock[]> {
  try {
    const response = await api.get(`${STOCK}${TITLE}/${title}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить список всех отфильтрованных остатков на складе
export async function getAllStockByFilter(
  id: number,
): Promise<TypeStock[] | undefined> {
  try {
    const response = await api.get(`${STOCK}${GROUP}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
