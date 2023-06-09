import {TypeEmployee} from "../types";
import {API_URL, EMPLOYEE} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseUpdate,
} from '../utils';

// Получить список всех сотрудников
export function getAllEmployee(): Promise<TypeEmployee[]> {
  try {
    return fetch(API_URL + EMPLOYEE, {
      credentials: 'include',
    })
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные сотрудника по id
export function getEmployeeById(id: number): Promise<TypeEmployee | undefined> {
  try {
    return fetch(API_URL + EMPLOYEE + `/${id}`, {
      credentials: 'include',
    })
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить нового сотрудника
export function createEmployee(data: TypeEmployee): void {
  try {
    fetch(API_URL + EMPLOYEE, {
      method: 'POST',
      credentials: 'include',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseCreate)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Удалить сотрудника по id
export function deleteEmployeeById(id: number): void {
  try {
    fetch(API_URL + EMPLOYEE + `/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать сотрудника
export function updateEmployee(data: TypeEmployee): void {
  try {
    fetch(API_URL + EMPLOYEE, {
      method: 'PUT',
      credentials: 'include',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseUpdate)
      .catch(handleError)
  } catch (error) {
    void handleCatchError(error);
  }
}