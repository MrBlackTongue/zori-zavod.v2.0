import {TypeOutput} from "../types";
import {URL, OUTPUT} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить список всех единиц измерения
export function getAllOutput(): Promise<TypeOutput[]> {
  try {
    return fetch(URL + OUTPUT)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные единицы измерения по id
export function getOutputById(id: number): Promise<TypeOutput | undefined> {
  try {
    return fetch(URL + OUTPUT + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новую единицу измерения
export function createOutput(data: TypeOutput): void {
  try {
    fetch(URL + OUTPUT, {
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
export function deleteOutputById(id: number): void {
  try {
    fetch(URL + OUTPUT + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать единицу изремерения
export function updateChangeOutput(data: TypeOutput): void {
  try {
    fetch(URL + OUTPUT, {
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