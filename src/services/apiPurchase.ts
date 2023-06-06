import {TypePurchase} from "../types";
import {URL, PRODUCT, PURCHASE} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseUpdate,
} from '../utils';

// Получить список всех закупок
export function getAllPurchase(): Promise<TypePurchase[]> {
  try {
    return fetch(URL + PURCHASE)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные закупки по id
export function getPurchaseById(id: number): Promise<TypePurchase | undefined> {
  try {
    return fetch(URL + PURCHASE + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новую закупку
export function createPurchase(data: TypePurchase): void {
  try {
    fetch(URL + PURCHASE, {
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

// Удалить закупку по id
export function deletePurchaseById(id: number): void {
  try {
    fetch(URL + PURCHASE + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать закупку
export function updatePurchase(data: TypePurchase): void {
  try {
    fetch(URL + PURCHASE, {
      method: 'PUT',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseUpdate)
      .catch(handleError)
  } catch (error) {
    void handleCatchError(error);
  }
}

// Получить список всех отфильтрованных закупок по названию
export function getAllPurchaseByTitle(title: string): Promise<TypePurchase[]> {
  try {
    return fetch(URL + PURCHASE + PRODUCT + `/${title}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}