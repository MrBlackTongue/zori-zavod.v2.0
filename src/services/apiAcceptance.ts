import {API_URL, MOVEMENT, ACCEPTANCE, PRODUCT} from "./apiEndpoints";
import {TypeAcceptance} from "../types";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
} from '../utils';

// Получить список всех приемок товаров
export function getAllAcceptance(): Promise<TypeAcceptance[]> {
  try {
    return fetch(API_URL + MOVEMENT + ACCEPTANCE)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новую приемку товаров
export function createAcceptance(data: TypeAcceptance): void {
  try {
    fetch(API_URL + MOVEMENT + ACCEPTANCE, {
      method: 'POST',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseCreate)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Удалить приемку товаров по id
export function deleteAcceptanceById(id: number): void {
  try {
    fetch(API_URL + MOVEMENT + ACCEPTANCE + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Получить список всех отфильтрованных приемок товара по названию
export function getAllAcceptanceByTitle(title: string): Promise<TypeAcceptance[]> {
  try {
    return fetch(API_URL + MOVEMENT + ACCEPTANCE + PRODUCT + `/${title}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}