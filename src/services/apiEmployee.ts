import {TypeEmployee} from "../types";
import {EMPLOYEE} from "./apiEndpoints";
import {
  handleCatchError,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех сотрудников
export function getAllEmployee(): Promise<TypeEmployee[]> {
  return api.get(EMPLOYEE)
    .then(response => response.data)
    .catch(error => {
      return handleCatchError(error);
    });
}

// Получить данные сотрудника по id
export function getEmployeeById(id: number): Promise<TypeEmployee | undefined> {
  return api.get(`${EMPLOYEE}/${id}`)
    .then(response => response.data)
    .catch(error => {
      return handleCatchError(error);
    });
}

// Добавить нового сотрудника
export function createEmployee(data: TypeEmployee): Promise<any> {
  return api.post(EMPLOYEE, data)
    .then(handleResponseCreateMessage)
    .catch(error => {
      return handleCatchError(error);
    });
}

// Удалить сотрудника по id
export function deleteEmployeeById(id: number): Promise<any> {
  return api.delete(`${EMPLOYEE}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(error => {
      return handleCatchError(error);
    });
}

// Редактировать сотрудника
export function updateEmployee(data: TypeEmployee): Promise<any> {
  return api.put(EMPLOYEE, data)
    .then(handleResponseUpdateMessage)
    .catch(error => {
      return handleCatchError(error);
    });
}