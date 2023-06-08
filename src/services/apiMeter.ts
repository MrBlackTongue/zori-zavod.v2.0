import {TypeMeter} from "../types";
import {API_URL, METER} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseUpdate,
} from '../utils';

// Получить список всех счетчиков
export function getAllMeter(): Promise<TypeMeter[]> {
  try {
    return fetch(API_URL + METER)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные счетчика по id
export function getMeterById(id: number): Promise<TypeMeter | undefined> {
  try {
    return fetch(API_URL + METER + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Создать новый счетчик
export function createMeter(data: TypeMeter): void {
  try {
    fetch(API_URL + METER, {
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

// Удалить счетчик по id
export function deleteMeterById(id: number): void {
  try {
    fetch(API_URL + METER + `/${id}`, {
      method: "DELETE",
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать счетчик
export function updateMeter(data: TypeMeter): void {
  try {
    fetch(API_URL + METER, {
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
