import {TypeMeterRecord} from "../types";
import {URL, METER_RECORD} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить список всех записей счетчика
export function getAllMeterRecord(): Promise<TypeMeterRecord[]> {
  try {
    return fetch(URL + METER_RECORD)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Редактировать существующую запись счетчика
export function editMeterRecord(data: TypeMeterRecord): void {
  try {
    fetch(URL + METER_RECORD, {
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

// Создать новую запись счетчика
export function createMeterRecord(data: TypeMeterRecord): void {
  try {
    fetch(URL + METER_RECORD, {
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
// Получить запись счетчика по id
export function getMeterRecordById(id: number): Promise<TypeMeterRecord | undefined> {
  try {
    return fetch(URL + METER_RECORD + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Удалить запись счетчика
export function deleteMeterRecordById(id: number): void {
  try {
    fetch(URL + METER_RECORD + `/${id}`, {
      method: "DELETE",
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}