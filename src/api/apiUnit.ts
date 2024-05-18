import {TypeApiResponse, TypeUnit} from '../types';
import {UNIT} from './apiEndpoints';
import {api} from './api';

// Получить список всех единиц измерения
export async function getAllUnit(): Promise<TypeUnit[]> {
  const response = await api.get(UNIT);
  return response.data;
}

// Получить данные единицы измерения по id
export async function getUnitById(id: number): Promise<TypeUnit | undefined> {
  const response = await api.get(`${UNIT}/${id}`);
  return response.data;
}

// Добавить новую единицу измерения
export async function createUnit(data: TypeUnit): Promise<TypeApiResponse> {
  return api.post(UNIT, data);
}

// Удалить единицу измерения по id
export async function deleteUnitById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${UNIT}/${id}`);
}

// Редактировать единицу измерения
export async function updateUnit(data: TypeUnit): Promise<TypeApiResponse> {
  return api.put(UNIT, data);
}
