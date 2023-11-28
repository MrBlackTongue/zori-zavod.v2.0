import {TypeProductMovementHistory} from '../types';
import {HISTORY, PRODUCT_MOVEMENT} from './apiEndpoints';
import {handleErrorResponseMessage} from '../utils';
import {api} from './api';

// Получить всю историю движения товаров
export async function getAllProductMovementHistory(): Promise<
  TypeProductMovementHistory[]
> {
  try {
    const response = await api.get(PRODUCT_MOVEMENT + HISTORY);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить всю историю движения товаров по id ячейки товара на складе
export async function getProductMovementHistoryById(
  id: number,
): Promise<TypeProductMovementHistory[] | undefined> {
  try {
    const response = await api.get(`${PRODUCT_MOVEMENT + HISTORY}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
