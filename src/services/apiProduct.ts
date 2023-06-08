import {TypeProduct} from "../types";
import {API_URL, PRODUCT, TITLE} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseUpdate,
} from '../utils';

// Получить список всех товаров
export function getAllProduct(): Promise<TypeProduct[]> {
  try {
    return fetch(API_URL + PRODUCT)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные товара по id
export function getProductById(id: number): Promise<TypeProduct | undefined> {
  try {
    return fetch(API_URL + PRODUCT + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новый товар
export function createProduct(data: TypeProduct): void {
  try {
    fetch(API_URL + PRODUCT, {
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

// Удалить товар по id
export function deleteProductById(id: number): void {
  try {
    fetch(API_URL + PRODUCT + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать товар
export function updateProduct(data: TypeProduct): void {
  try {
    fetch(API_URL + PRODUCT, {
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

// Получить список всех отфильтрованных товаров по названию
export function getAllProductByTitle(title: string): Promise<TypeProduct[]> {
  try {
    return fetch(API_URL + PRODUCT + TITLE + `/${title}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}