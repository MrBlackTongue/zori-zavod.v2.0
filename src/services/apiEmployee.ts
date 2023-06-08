import {TypeEmployee} from "../types";
import {API_URL, EMPLOYEE} from "./apiEndpoints";
import {
  BASE_HEADERS,
  getAuthHeaders,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseUpdate,
} from '../utils';

// Получить список всех сотрудников
export function getAllEmployee(token: string): Promise<TypeEmployee[]> {
  try {
    return fetch(API_URL + EMPLOYEE, {
      headers: getAuthHeaders(token),
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
    return fetch(URL + EMPLOYEE + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить нового сотрудника
export function createEmployee(data: TypeEmployee): void {
  try {
    fetch(URL + EMPLOYEE, {
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

// Удалить сотрудника по id
export function deleteEmployeeById(id: number): void {
  try {
    fetch(URL + EMPLOYEE + `/${id}`, {
      method: 'DELETE',
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
    fetch(URL + EMPLOYEE, {
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