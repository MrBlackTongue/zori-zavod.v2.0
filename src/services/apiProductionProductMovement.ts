import {TypeApiResponse, TypeProductionProductMovement} from "../types";
import {MOVEMENT, PRODUCTION, OPERATION_ACCOUNTING} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех производственных движений товара по id учетной операции
export function getProductionProductMovementByIdOperationAccounting(id: number):
  Promise<TypeProductionProductMovement[] | undefined> {
  return api.get(`${MOVEMENT}${PRODUCTION}${OPERATION_ACCOUNTING}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить производственное движение товара
export function createProductionProductMovement(data: TypeProductionProductMovement): Promise<TypeApiResponse> {
  return api.post(`${MOVEMENT}${PRODUCTION}`, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить производственное движение товара по id
export function deleteProductionProductMovementById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${MOVEMENT}${PRODUCTION}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}