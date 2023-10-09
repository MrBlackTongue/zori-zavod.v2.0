import { TypeApiResponse, TypeMeter } from '../types';
import { METER } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех счетчиков
export function getAllMeter(): Promise<TypeMeter[]> {
  return api
    .get(METER)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные счетчика по id
export function getMeterById(id: number): Promise<TypeMeter | undefined> {
  return api
    .get(`${METER}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Создать новый счетчик
export function createMeter(data: TypeMeter): Promise<TypeApiResponse> {
  return api
    .post(METER, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить счетчик по id
export function deleteMeterById(id: number): Promise<TypeApiResponse> {
  return api
    .delete(`${METER}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать счетчик
export function updateMeter(data: TypeMeter): Promise<TypeApiResponse> {
  return api
    .put(METER, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}
