import {TypeApiResponse, TypeEmployee} from "../types";
import {EMPLOYEE} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех сотрудников
export function getAllEmployee(): Promise<TypeEmployee[]> {
  return api.get(EMPLOYEE)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные сотрудника по id
export function getEmployeeById(id: number): Promise<TypeEmployee | undefined> {
  return api.get(`${EMPLOYEE}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить нового сотрудника
export function createEmployee(data: TypeEmployee): Promise<TypeApiResponse> {
  return api.post(EMPLOYEE, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить сотрудника по id
export function deleteEmployeeById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${EMPLOYEE}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать сотрудника
export function updateEmployee(data: TypeEmployee): Promise<TypeApiResponse> {
  return api.put(EMPLOYEE, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}