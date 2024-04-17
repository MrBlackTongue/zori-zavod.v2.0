import { TypeStock } from '../types';
import { CATEGORY, MATERIALS, PRODUCTS, STOCK, TITLE } from './apiEndpoints';
import { api } from './api';

// Получить список всех остатков со склада
export async function getAllStock(): Promise<TypeStock[]> {
  const response = await api.get(STOCK);
  return response.data;
}

// Получить список всех остатков товаров
export async function getAllStockProducts(): Promise<TypeStock[]> {
  const response = await api.get(`${STOCK}${PRODUCTS}`);
  return response.data;
}

// Получить список всех остатков материалов
export async function getAllStockMaterials(): Promise<TypeStock[]> {
  const response = await api.get(`${STOCK}${MATERIALS}`);
  return response.data;
}

// Получить список всех отфильтрованных остатков на складе по название
export async function getAllStockByTitle(title: string): Promise<TypeStock[]> {
  const response = await api.get(`${STOCK}${TITLE}/${title}`);
  return response.data;
}

// Получить список всех отфильтрованных остатков на складе
export async function getAllStockByFilter(id: number): Promise<TypeStock[]> {
  const response = await api.get(`${STOCK}${CATEGORY}/${id}`);
  return response.data ?? [];
}
