import {TypeApiResponse, TypeOperationTimesheet} from '../types';
import {OPERATION_ACCOUNTING, OPERATION_TIMESHEET} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех сотрудников в табеле рабочего времени по id учетной операции
export async function getOperationTimesheetByIdOperationAccounting(
  id: number,
): Promise<TypeOperationTimesheet[]> {
  try {
    const response = await api.get(
      `${OPERATION_TIMESHEET}${OPERATION_ACCOUNTING}/${id}`,
    );
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные сотрудника из табеля учета рабочего времени по id
export async function getOperationTimesheetById(
  id: number,
): Promise<TypeOperationTimesheet | undefined> {
  try {
    const response = await api.get(`${OPERATION_TIMESHEET}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить сотрудника в табель учета рабочего времени
export async function createOperationTimesheet(
  data: TypeOperationTimesheet,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(OPERATION_TIMESHEET, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить сотрудника из табеля учета рабочего времени по id
export async function deleteOperationTimesheetById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${OPERATION_TIMESHEET}/${id}`);
    return handleResponseDeleteMessage(
      response,
      // Получить список всех сотрудников в табеле рабочего времени по id учетной операции
    );
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать сотрудника в табеле учета рабочего времени
export async function updateOperationTimesheet(
  data: TypeOperationTimesheet,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(OPERATION_TIMESHEET, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
