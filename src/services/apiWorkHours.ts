import { TypeApiResponse, TypeClient, TypeWorkHours } from '../types';
import { CLIENT, WORK_HOURS } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех сотрудников и рабочиих часов
export function getAllWorkHours(): Promise<TypeWorkHours[]> {
  return api
    .get(WORK_HOURS)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Удалить запись о рабочик часах
export async function deleteWorkHoursById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${WORK_HOURS}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактирование данных о рабочем дне
export async function updateWorkHours(
  data: TypeWorkHours,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(WORK_HOURS, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
