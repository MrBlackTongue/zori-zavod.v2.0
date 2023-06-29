import {TypeApiResponse, TypeProduct} from "../types";
import {OUTPUT, PRODUCT, TITLE} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех товаров
export function getAllProduct(): Promise<TypeProduct[]> {
  return api.get(PRODUCT)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные товара по id
export function getProductById(id: number): Promise<TypeProduct | undefined> {
  return api.get(`${PRODUCT}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новый товар
export function createProduct(data: TypeProduct): Promise<TypeApiResponse> {
  return api.post(PRODUCT, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить товар по id
export function deleteProductById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${PRODUCT}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать товар
export function updateProduct(data: TypeProduct): Promise<TypeApiResponse> {
  return api.put(PRODUCT, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}

// Получить список всех отфильтрованных товаров по названию
export function getAllProductByTitle(title: string): Promise<TypeProduct[]> {
  return api.get(`${PRODUCT}${TITLE}/${title}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

export function getAllProductOutput(): Promise<TypeProduct[]> {
  return api.get(`${PRODUCT}${OUTPUT}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}