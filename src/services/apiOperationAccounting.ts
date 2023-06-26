import {TypeApiResponse, TypeOperationAccounting, TypeOperationAccountingFilter} from "../types";
import {OPERATION_ACCOUNTING, FILTER} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех учетных операций
// export function getAllOperationAccounting(): Promise<TypeOperationAccounting[]> {
//   return api.get(OPERATION_ACCOUNTING)
//     .then(response => response.data)
//     .catch(handleErrorResponseMessage);
// }

// Получить данные учетной операции по id
export function getOperationAccountingById(id: number): Promise<TypeOperationAccounting | undefined> {
  return api.get(`${OPERATION_ACCOUNTING}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новую учетную операцию
export function createOperationAccounting(data: TypeOperationAccounting): Promise<TypeApiResponse> {
  return api.post(OPERATION_ACCOUNTING, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить учетную операцию по id
export function deleteOperationAccountingById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${OPERATION_ACCOUNTING}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать учетную операцию
export function updateOperationAccounting(data: TypeOperationAccounting): Promise<TypeApiResponse> {
  return api.put(OPERATION_ACCOUNTING, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}

// Получить список всех отфильтрованных учетных операций
export function getAllOperationAccountingByFilter(data: TypeOperationAccountingFilter): Promise<TypeOperationAccounting[]> {
  return api.post(`${OPERATION_ACCOUNTING}${FILTER}`, data)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}