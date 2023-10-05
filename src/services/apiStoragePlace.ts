import {TypeApiResponse, TypeStoragePlace} from "../types";
import {STORAGE_PLACE} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех мест хранения
export function getAllStoragePlace(): Promise<TypeStoragePlace[]> {
  return api.get(STORAGE_PLACE)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные места хранения по id
export function getStoragePlaceById(id: number): Promise<TypeStoragePlace | undefined> {
  return api.get(`${STORAGE_PLACE}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новое место хранения
export function createStoragePlace(data: TypeStoragePlace): Promise<TypeApiResponse> {
  return api.post(STORAGE_PLACE, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить место хранения по id
export function deleteStoragePlaceById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${STORAGE_PLACE}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать место хранения
export function updateStoragePlace(data: TypeStoragePlace): Promise<TypeApiResponse> {
  return api.put(STORAGE_PLACE, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}