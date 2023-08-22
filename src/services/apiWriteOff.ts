import {TypeApiResponse, TypeWriteOff} from "../types";
import {WRITE_OFF} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех списаний
export function getAllWriteOff(): Promise<TypeWriteOff[]> {
  return api.get(WRITE_OFF)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные списания по id
export function getWriteOffById(id: number): Promise<TypeWriteOff | undefined> {
  return api.get(`${WRITE_OFF}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новое списание
export function createWriteOff(data: TypeWriteOff): Promise<TypeApiResponse> {
  return api.post(WRITE_OFF, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить списание по id
export function deleteWriteOffById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${WRITE_OFF}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать списание
export function updateWriteOff(data: TypeWriteOff): Promise<TypeApiResponse> {
  return api.put(WRITE_OFF, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}