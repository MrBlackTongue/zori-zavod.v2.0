import { TypeAcceptance, TypeApiResponse } from '../types';
import { ACCEPTANCE, MOVEMENT, PRODUCT } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
} from '../utils';
import { api } from './api';

// Получить список всех приемок товаров
export async function getAllAcceptance(): Promise<TypeAcceptance[]> {
  try {
    const response = await api.get(`${MOVEMENT}${ACCEPTANCE}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новую приемку товаров
export async function createAcceptance(
  data: TypeAcceptance,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(`${MOVEMENT}${ACCEPTANCE}`, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить приемку товаров по id
export async function deleteAcceptanceById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${MOVEMENT}${ACCEPTANCE}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить список всех отфильтрованных приемок товара по названию
export async function getAllAcceptanceByTitle(
  title: string,
): Promise<TypeAcceptance[]> {
  try {
    const response = await api.get(
      `${MOVEMENT}${ACCEPTANCE}${PRODUCT}/${title}`,
    );
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
