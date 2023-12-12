import { TypeApiResponse, TypeShipmentProductMovement } from '../types';
import { MOVEMENT, SHIPMENT } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
} from '../utils';
import { api } from './api';

// Получить все движения товаров по id отгрузки
export async function getAllProductMovementByShipmentId(
  id: number,
): Promise<TypeShipmentProductMovement[] | undefined> {
  try {
    const response = await api.get(`${MOVEMENT}${SHIPMENT}${SHIPMENT}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новый товар в отгрузку
export async function createShipmentProductMovement(
  data: TypeShipmentProductMovement,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(`${MOVEMENT}${SHIPMENT}`, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить товар из отгрузки по id
export async function deleteShipmentProductMovementById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${MOVEMENT}${SHIPMENT}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
