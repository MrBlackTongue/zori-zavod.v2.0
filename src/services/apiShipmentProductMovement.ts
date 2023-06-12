import {TypeShipmentProductMovement, TypeApiResponse} from "../types";
import {SHIPMENT, MOVEMENT} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
} from '../utils';
import {api} from "./api";

// Получить все движения товаров по id отгрузки
export function getAllProductMovementByShipmentId(id: number):
  Promise<TypeShipmentProductMovement[] | undefined> {
  return api.get(`${MOVEMENT}${SHIPMENT}${SHIPMENT}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новый товар в отгрузку
export function createShipmentProductMovement(data: TypeShipmentProductMovement): Promise<TypeApiResponse> {
  return api.post(`${MOVEMENT}${SHIPMENT}`, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить товар из отгрузки по id
export function deleteShipmentProductMovementById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${MOVEMENT}${SHIPMENT}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}