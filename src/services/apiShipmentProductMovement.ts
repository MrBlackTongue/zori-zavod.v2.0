import {URL, SHIPMENT, MOVEMENT} from "./apiEndpoints";
import {TypeShipmentProductMovement} from "../types";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
} from '../utils';

// Получить все движения товаров по id отгрузки
export function getAllProductMovementByShipmentId(id: number):
  Promise<TypeShipmentProductMovement[] | undefined> {
  try {
    return fetch(URL + MOVEMENT + SHIPMENT + SHIPMENT + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новый товар в отгрузку
export function createShipmentProductMovement(data: TypeShipmentProductMovement): void {
  try {
    fetch(URL + MOVEMENT + SHIPMENT, {
      method: 'POST',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseCreate)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Удалить товар из отгрузки по id
export function deleteShipmentProductMovementById(id: number): void {
  try {
    fetch(URL + MOVEMENT + SHIPMENT + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}