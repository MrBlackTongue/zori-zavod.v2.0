import {TypeApiResponse, TypeOperation} from "../types";
import {OPERATION} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех типов операций
export function getAllOperation(): Promise<TypeOperation[]> {
  return api.get(OPERATION)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные типа операции по id
export function getOperationById(id: number): Promise<TypeOperation | undefined> {
  return api.get(`${OPERATION}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новый тип операции
export function createOperation(data: TypeOperation): Promise<TypeApiResponse> {
  return api.post(OPERATION, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить тип операции по id
export function deleteOperationById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${OPERATION}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать тип операции
export function updateOperation(data: TypeOperation): Promise<TypeApiResponse> {
  return api.put(OPERATION, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}