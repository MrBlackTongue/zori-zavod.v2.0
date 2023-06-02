import {TypeMeter} from "../types";
import {URL, METER} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить список всех счётчиков
export function getAllMeter(): Promise<TypeMeter[]> {
  try {
    return fetch(URL + METER)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Изменение существующего счётчика
export function editMeter(data: TypeMeter): void {
  try {
    fetch(URL + METER, {
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

// Создание нового счётчика
export function createMeter(data: TypeMeter): void {
  try {
    fetch(URL + METER, {
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

// Получить счётчик по id
export function getMeterById(id: number): Promise<TypeMeter | undefined> {
  try {
    return fetch(URL + METER + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Удаление счётчика по id
export function deleteMeterById(id: number): void {
  try {
    fetch(URL + METER + `/${id}`, {
      method: "DELETE",
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}
