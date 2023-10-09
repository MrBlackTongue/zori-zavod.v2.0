import { TypeApiResponse, TypeUnit } from '../types';
import { UNIT } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех единиц измерения
export function getAllUnit(): Promise<TypeUnit[]> {
  return api
    .get(UNIT)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные единицы измерения по id
export function getUnitById(id: number): Promise<TypeUnit | undefined> {
  return api
    .get(`${UNIT}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новую единицу измерения
export function createUnit(data: TypeUnit): Promise<TypeApiResponse> {
  return api
    .post(UNIT, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить единицу измерения по id
export function deleteUnitById(id: number): Promise<TypeApiResponse> {
  return api
    .delete(`${UNIT}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать единицу измерения
export function updateUnit(data: TypeUnit): Promise<TypeApiResponse> {
  return api
    .put(UNIT, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}
