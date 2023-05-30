import {TypeOperationAccounting, TypeOperationAccountingFilter} from "../types";
import {URL, OPERATION_ACCOUNTING, FILTER} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить список всех учетных операций
export function getAllOperationAccounting(): Promise<TypeOperationAccounting[]> {
  try {
    return fetch(URL + OPERATION_ACCOUNTING)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные учетной операции по id
export function getOperationAccountingById(id: number): Promise<TypeOperationAccounting | undefined> {
  try {
    return fetch(URL + OPERATION_ACCOUNTING + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новую учетную операцию
export function createOperationAccounting(data: TypeOperationAccounting): void {
  try {
    fetch(URL + OPERATION_ACCOUNTING, {
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

// Удалить учетную операцию по id
export function deleteOperationAccountingById(id: number): void {
  try {
    fetch(URL + OPERATION_ACCOUNTING + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать учетную операцию
export function editOperationAccounting(data: TypeOperationAccounting): void {
  try {
    fetch(URL + OPERATION_ACCOUNTING, {
      method: 'PUT',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseEdit)
      .catch(handleError)
  } catch (error) {
    void handleCatchError(error);
  }
}

// Получить список всех отфильтрованных учетных операций
export function getAllOperationAccountingByFilter(data: TypeOperationAccountingFilter):
  Promise<TypeOperationAccounting[]> {
  try {
    return fetch(URL + OPERATION_ACCOUNTING + FILTER, {
      method: 'POST',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}