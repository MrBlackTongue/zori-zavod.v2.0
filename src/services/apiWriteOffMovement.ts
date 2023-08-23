import {TypeApiResponse, TypeWriteOffMovement} from "../types";
import {MOVEMENT, WRITE_OFF} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех движений списания товара
export function getAllWriteOffMovementByWriteOffId(id: number): Promise<TypeWriteOffMovement[] | undefined> {
  return api.get(`${MOVEMENT}${WRITE_OFF}${WRITE_OFF}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новое движение списания товара
export function createWriteOffMovement(data: TypeWriteOffMovement): Promise<TypeApiResponse> {
  return api.post(`${MOVEMENT}${WRITE_OFF}`, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить движение списания товара по id
export function deleteWriteOffMovementById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${MOVEMENT}${WRITE_OFF}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}