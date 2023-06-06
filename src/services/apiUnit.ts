import {TypeUnit} from "../types";
import {URL, UNIT} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseUpdate,
} from '../utils';

// Получить список всех единиц измерения
export function getAllUnit(): Promise<TypeUnit[]> {
  try {
    return fetch(URL + UNIT)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные единицы измерения по id
export function getUnitById(id: number): Promise<TypeUnit | undefined> {
  try {
    return fetch(URL + UNIT + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новую единицу измерения
export function createUnit(data: TypeUnit): void {
  try {
    fetch(URL + UNIT, {
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

// Удалить единицу измерения по id
export function deleteUnitById(id: number): void {
  try {
    fetch(URL + UNIT + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать единицу измерения
export function updateUnit(data: TypeUnit): void {
  try {
    fetch(URL + UNIT, {
      method: 'PUT',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseUpdate)
      .catch(handleError)
  } catch (error) {
    void handleCatchError(error);
  }
}