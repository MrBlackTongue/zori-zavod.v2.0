import {TypeOperationTimesheet} from "../types";
import {URL, OPERATION_ACCOUNTING, OPERATION_TIMESHEET} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseUpdate,
} from '../utils';

// Получить список всех сотрудников в табеле рабочего времени по id учетной операции
export function getOperationTimesheetByIdOperationAccounting(id: number):
  Promise<TypeOperationTimesheet[] | undefined> {
  try {
    return fetch(URL + OPERATION_TIMESHEET + OPERATION_ACCOUNTING + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные сотрудника из табеля учета рабочего времени по id
export function getOperationTimesheetById(id: number): Promise<TypeOperationTimesheet | undefined> {
  try {
    return fetch(URL + OPERATION_TIMESHEET + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить сотрудника в табель учета рабочего времени
export function createOperationTimesheet(data: TypeOperationTimesheet): void {
  try {
    fetch(URL + OPERATION_TIMESHEET, {
      method: 'POST',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseCreate)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Удалить сотрудника из табеля учета рабочего времени по id
export function deleteOperationTimesheetById(id: number): void {
  try {
    fetch(URL + OPERATION_TIMESHEET + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать сотрудника в табеле учета рабочего времени
export function updateOperationTimesheet(data: TypeOperationTimesheet): void {
  try {
    fetch(URL + OPERATION_TIMESHEET, {
      method: 'PUT',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseUpdate)
      .catch(handleError)
  } catch (error) {
    void handleCatchError(error);
  }
}