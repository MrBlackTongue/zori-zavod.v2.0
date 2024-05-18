import { TypeApiResponse, TypeProduct } from '../types';
import { OUTPUT, PRODUCT, TITLE } from './apiEndpoints';
import { api } from './api';

// Получить список всех товаров
export async function getAllProduct(): Promise<TypeProduct[]> {
  const response = await api.get(PRODUCT);
  return response.data;
}

// Получить данные товара по id
export async function getProductById(
  id: number,
): Promise<TypeProduct | undefined> {
  const response = await api.get(`${PRODUCT}/${id}`);
  return response.data;
}

// Добавить новый товар
export async function createProduct(
  data: TypeProduct,
): Promise<TypeApiResponse> {
  return api.post(PRODUCT, data);
}

// Удалить товар по id
export async function deleteProductById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${PRODUCT}/${id}`);
}

// Редактировать товар
export async function updateProduct(
  data: TypeProduct,
): Promise<TypeApiResponse> {
  return api.put(PRODUCT, data);
}

// Получить список всех отфильтрованных товаров по названию
export async function getAllProductByTitle(
  title: string,
): Promise<TypeProduct[]> {
  const response = await api.get(`${PRODUCT}${TITLE}/${title}`);
  return response.data;
}

// Получить все выпущенные товары
export async function getAllProductOutput(): Promise<TypeProduct[]> {
  const response = await api.get(`${PRODUCT}${OUTPUT}`);
  return response.data;
}
