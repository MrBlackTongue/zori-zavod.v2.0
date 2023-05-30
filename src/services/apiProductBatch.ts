import {URL, PRODUCT, BATCH} from "./apiEndpoints";
import {TypeProductBatch} from "../types";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить все партии товаров
export function getAllProductBatch(): Promise<TypeProductBatch[]> {
  try {
    return fetch(URL + PRODUCT + BATCH)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные партии товаров по id
export function getProductBatchById(id: number): Promise<TypeProductBatch | undefined> {
  try {
    return fetch(URL + PRODUCT + BATCH + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новую партию товаров
export function createProductBatch(data: TypeProductBatch): void {
  try {
    fetch(URL + PRODUCT + BATCH, {
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

// Удалить партию товаров по id
export function deleteProductBatchById(id: number): void {
  try {
    fetch(URL + PRODUCT + BATCH + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать партию товаров
export function editProductBatch(data: TypeProductBatch): void {
  try {
    fetch(URL + PRODUCT + BATCH, {
      method: 'PUT',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseEdit)
      .catch(handleError)
  } catch (error) {
    void handleCatchError(error);
  }
}