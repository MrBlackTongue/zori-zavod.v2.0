import {TypeProductMovementHistory} from "../types";
import {API_URL, HISTORY, PRODUCT_MOVEMENT} from "./apiEndpoints";
import {
  handleResponseGet,
  handleError,
  handleCatchError,
} from '../utils';

// Получить всю историю движения товаров
export function getAllProductMovementHistory(): Promise<TypeProductMovementHistory[]> {
  try {
    return fetch(API_URL + PRODUCT_MOVEMENT + HISTORY, {
      credentials: 'include',
    })
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить всю историю движения товаров по id ячейки товара на складе
export function getProductMovementHistoryById(id: number): Promise<TypeProductMovementHistory[] | undefined> {
  try {
    return fetch(API_URL + PRODUCT_MOVEMENT + HISTORY + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}