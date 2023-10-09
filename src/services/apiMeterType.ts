import { TypeApiResponse, TypeMeterType } from '../types';
import { METER_TYPE } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех типов счетчика
export function getAllMeterType(): Promise<TypeMeterType[]> {
  return api
    .get(METER_TYPE)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные типа счетчика по id
export function getMeterTypeById(
  id: number,
): Promise<TypeMeterType | undefined> {
  return api
    .get(`${METER_TYPE}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новый тип счетчика
export function createMeterType(data: TypeMeterType): Promise<TypeApiResponse> {
  return api
    .post(METER_TYPE, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить тип счетчика по id
export function deleteMeterTypeById(id: number): Promise<TypeApiResponse> {
  return api
    .delete(`${METER_TYPE}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать тип счетчика
export function updateMeterType(data: TypeMeterType): Promise<TypeApiResponse> {
  return api
    .put(METER_TYPE, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}
