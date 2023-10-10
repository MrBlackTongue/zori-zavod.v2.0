import {TypeApiResponse, TypeProduct} from '../types';
import {OUTPUT, PRODUCT, TITLE} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех товаров
export async function getAllProduct(): Promise<TypeProduct[]> {
  try {
    const response = await api.get(PRODUCT);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные товара по id
export async function getProductById(
  id: number,
): Promise<TypeProduct | undefined> {
  try {
    const response = await api.get(`${PRODUCT}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новый товар
export async function createProduct(
  data: TypeProduct,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(PRODUCT, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить товар по id
export async function deleteProductById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${PRODUCT}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать товар
export async function updateProduct(
  data: TypeProduct,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(PRODUCT, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить список всех отфильтрованных товаров по названию
export async function getAllProductByTitle(
  title: string,
): Promise<TypeProduct[]> {
  try {
    const response = await api.get(`${PRODUCT}${TITLE}/${title}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить все выпущенные товары
export async function getAllProductOutput(): Promise<TypeProduct[]> {
  try {
    const response = await api.get(`${PRODUCT}${OUTPUT}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
