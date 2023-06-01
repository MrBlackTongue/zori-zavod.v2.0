import {TypeOperation} from "../types";
import {URL, OPERATION} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить список всех типов операций
export function getAllOperation(): Promise<TypeOperation[]> {
  try {
    return fetch(URL + OPERATION)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные типа операции по id
export function getOperationById(id: number): Promise<TypeOperation | undefined> {
  try {
    return fetch(URL + OPERATION + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новый тип операции
export function createOperation(data: TypeOperation): void {
  try {
    fetch(URL + OPERATION, {
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

// Удалить тип операции по id
export function deleteOperationById(id: number): void {
  try {
    fetch(URL + OPERATION + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать тип операции
export function editOperation(data: TypeOperation): void {
  try {
    fetch(URL + OPERATION, {
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