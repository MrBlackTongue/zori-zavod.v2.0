import {TypeApiResponse, TypeProductionType} from "../types";
import {PRODUCTION_TYPE} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from "./api";

// Получить список типов производства
export function getAllProductionType(): Promise<TypeProductionType[]> {
  return api.get(PRODUCTION_TYPE)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные типа производства по id
export function getProductionTypeById(id: number): Promise<TypeProductionType | undefined> {
  return api.get(`${PRODUCTION_TYPE}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новый тип производства
export function createProductionType(data: TypeProductionType): Promise<TypeApiResponse> {
  return api.post(PRODUCTION_TYPE, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить тип производства по id
export function deleteProductionTypeById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${PRODUCTION_TYPE}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать тип производства
export function updateProductionType(data: TypeProductionType): Promise<TypeApiResponse> {
  return api.put(PRODUCTION_TYPE, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}