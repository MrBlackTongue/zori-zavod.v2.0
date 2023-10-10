import {TypeApiResponse, TypeEstimatedPrice} from '../types';
import {ESTIMATED_PRICE} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех расчетных цен
export async function getAllEstimatedPrice(): Promise<TypeEstimatedPrice[]> {
  try {
    const response = await api.get(ESTIMATED_PRICE);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные расчетной цены по id
export async function getEstimatedPriceById(
  id: number,
): Promise<TypeEstimatedPrice | undefined> {
  try {
    const response = await api.get(`${ESTIMATED_PRICE}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новую расчетную цену
export async function createEstimatedPrice(
  data: TypeEstimatedPrice,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(ESTIMATED_PRICE, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить расчетную цену по id
export async function deleteEstimatedPriceById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${ESTIMATED_PRICE}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать расчетную цену
export async function updateEstimatedPrice(
  data: TypeEstimatedPrice,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(ESTIMATED_PRICE, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
