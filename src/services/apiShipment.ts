import {TypeShipment} from "../types";
import {URL, SHIPMENT} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить список всех отгрузок
export function getAllShipment(): Promise<TypeShipment[]> {
  try {
    return fetch(URL + SHIPMENT)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные отгрузки по id
export function getShipmentById(id: number): Promise<TypeShipment | undefined> {
  try {
    return fetch(URL + SHIPMENT + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новую отгрузку
export function createShipment(data: TypeShipment): void {
  try {
    fetch(URL + SHIPMENT, {
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

// Удалить отгрузку по id
export function deleteShipmentById(id: number): void {
  try {
    fetch(URL + SHIPMENT + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать отгрузку
export function updateShipment(data: TypeShipment): void {
  try {
    fetch(URL + SHIPMENT, {
      method: 'PUT',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseEdit)
      .catch(handleError)
  } catch (error) {
    void handleCatchError(error);
  }
}