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
export async function getAllShipment(): Promise<TypeShipment[]> {
  try {
    const response = await api.get(SHIPMENT);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные отгрузки по id
export async function getShipmentById(
  id: number,
): Promise<TypeShipment | undefined> {
  try {
    const response = await api.get(`${SHIPMENT}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новую отгрузку
export async function createShipment(
  data: TypeShipment,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(SHIPMENT, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить отгрузку по id
export async function deleteShipmentById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${SHIPMENT}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать отгрузку
export async function updateShipment(
  data: TypeShipment,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(SHIPMENT, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
