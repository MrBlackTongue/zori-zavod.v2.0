import { TypeApiResponse, TypeShipment } from '../types';
import { SHIPMENT } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех отгрузок
export function getAllShipment(): Promise<TypeShipment[]> {
  return api
    .get(SHIPMENT)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные отгрузки по id
export function getShipmentById(id: number): Promise<TypeShipment | undefined> {
  return api
    .get(`${SHIPMENT}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новую отгрузку
export function createShipment(data: TypeShipment): Promise<TypeApiResponse> {
  return api
    .post(SHIPMENT, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить отгрузку по id
export function deleteShipmentById(id: number): Promise<TypeApiResponse> {
  return api
    .delete(`${SHIPMENT}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать отгрузку
export function updateShipment(data: TypeShipment): Promise<TypeApiResponse> {
  return api
    .put(SHIPMENT, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}
