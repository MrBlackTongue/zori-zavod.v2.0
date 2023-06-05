import {TypeEmployee} from "../types";
import {URL, EMPLOYEE} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить список всех сотрудников
export function getAllEmployee(): Promise<TypeEmployee[]> {
  try {
    return fetch(URL + EMPLOYEE)
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
      .then(handleResponseEdit)
      .catch(handleError)
  } catch (error) {
    void handleCatchError(error);
  }
}