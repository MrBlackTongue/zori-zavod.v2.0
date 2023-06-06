import {TypeProductionType} from "../types";
import {URL, PRODUCTION_TYPE} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить список типов производства
export function getAllProductionType(): Promise<TypeProductionType[]> {
  try {
    return fetch(URL + PRODUCTION_TYPE)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные типа производства по id
export function getProductionTypeById(id: number): Promise<TypeProductionType | undefined> {
  try {
    return fetch(URL + PRODUCTION_TYPE + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новый тип производства
export function createProductionType(data: TypeProductionType): void {
  try {
    fetch(URL + PRODUCTION_TYPE, {
      method: 'POST',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseCreate)
      .catch(handleError);
  } catch (error) {
  }
}

// Удалить тип производства по id
export function deleteProductionTypeById(id: number): void {
  try {
    fetch(URL + PRODUCTION_TYPE + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать тип производства
export function updateProductionType(data: TypeProductionType): void {
  try {
    fetch(URL + PRODUCTION_TYPE, {
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