import { TypeApiResponse, TypeOutput } from '../types';
import { OUTPUT } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех единиц измерения
export function getAllOutput(): Promise<TypeOutput[]> {
  return api
    .get(OUTPUT)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные единицы измерения по id
export function getOutputById(id: number): Promise<TypeOutput | undefined> {
  return api
    .get(`${OUTPUT}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новую единицу измерения
export function createOutput(data: TypeOutput): Promise<TypeApiResponse> {
  return api
    .post(OUTPUT, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить единицу измерения по id
export function deleteOutputById(id: number): Promise<TypeApiResponse> {
  return api
    .delete(`${OUTPUT}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать единицу измерения
export function updateOutput(data: TypeOutput): Promise<TypeApiResponse> {
  return api
    .put(OUTPUT, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}
