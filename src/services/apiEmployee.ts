import {TypeApiResponse, TypeEmployee} from '../types';
import {EMPLOYEE, EMPLOYEES} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех сотрудников
export async function getAllEmployee(): Promise<TypeEmployee[]> {
  try {
    const response = await api.get(EMPLOYEES);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные сотрудника по id
export async function getEmployeeById(
  id: number,
): Promise<TypeEmployee | undefined> {
  try {
    const response = await api.get(`${EMPLOYEE}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить нового сотрудника
export async function createEmployee(
  data: TypeEmployee,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(EMPLOYEE, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить сотрудника по id
export async function deleteEmployeeById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${EMPLOYEE}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать сотрудника
export async function updateEmployee(
  data: TypeEmployee,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(EMPLOYEE, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
