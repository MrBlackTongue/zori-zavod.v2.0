import {TypeMeterType} from "../types";
import {URL, METER_TYPE} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить список всех типов счетчика
export function getAllMeterType(): Promise<TypeMeterType[]> {
  try {
    return fetch(URL + METER_TYPE)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные типа счетчика по id
export function getMeterTypeById(id: number): Promise<TypeMeterType | undefined> {
  try {
    return fetch(URL + METER_TYPE + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новый тип счетчика
export function createMeterType(data: TypeMeterType): void {
  try {
    fetch(URL + METER_TYPE, {
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

// Удалить тип счетчика по id
export function deleteMeterTypeById(id: number): void {
  try {
    fetch(URL + METER_TYPE + `/${id}`, {
      method: "DELETE",
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать тип счетчика
export function editMeterType(data: TypeMeterType): void {
  try {
    fetch(URL + METER_TYPE, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(handleResponseEdit)
      .catch(handleError)
  } catch (error) {
    void handleCatchError(error);
  }
}