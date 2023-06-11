import {TypeApiResponse, TypeMeterRecord} from "../types";
import {METER_RECORD} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех записей счетчика
export function getAllMeterRecord(): Promise<TypeMeterRecord[]> {
  return api.get(METER_RECORD)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить запись счетчика по id
export function getMeterRecordById(id: number): Promise<TypeMeterRecord | undefined> {
  return api.get(`${METER_RECORD}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Создать новую запись счетчика
export function createMeterRecord(data: TypeMeterRecord): Promise<TypeApiResponse> {
  return api.post(METER_RECORD, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить запись счетчика по id
export function deleteMeterRecordById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${METER_RECORD}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать запись счетчика
export function updateMeterRecord(data: TypeMeterRecord): Promise<TypeApiResponse> {
  return api.put(METER_RECORD, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}