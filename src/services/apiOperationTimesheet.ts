import { TypeApiResponse, TypeOperationTimesheet } from '../types';
import { OPERATION_ACCOUNTING, OPERATION_TIMESHEET } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех сотрудников в табеле рабочего времени по id учетной операции
export function getOperationTimesheetByIdOperationAccounting(
  id: number,
): Promise<TypeOperationTimesheet[]> {
  return api
    .get(`${OPERATION_TIMESHEET}${OPERATION_ACCOUNTING}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные сотрудника из табеля учета рабочего времени по id
export function getOperationTimesheetById(
  id: number,
): Promise<TypeOperationTimesheet | undefined> {
  return api
    .get(`${OPERATION_TIMESHEET}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить сотрудника в табель учета рабочего времени
export function createOperationTimesheet(
  data: TypeOperationTimesheet,
): Promise<TypeApiResponse> {
  return api
    .post(OPERATION_TIMESHEET, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить сотрудника из табеля учета рабочего времени по id
export function deleteOperationTimesheetById(
  id: number,
): Promise<TypeApiResponse> {
  return api
    .delete(`${OPERATION_TIMESHEET}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать сотрудника в табеле учета рабочего времени
export function updateOperationTimesheet(
  data: TypeOperationTimesheet,
): Promise<TypeApiResponse> {
  return api
    .put(OPERATION_TIMESHEET, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}
