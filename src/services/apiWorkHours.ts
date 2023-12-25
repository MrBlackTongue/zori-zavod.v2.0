import {
  TypeApiResponse,
  TypeEditingDayState,
  TypeWorkDay,
  TypeWorkHour,
} from '../types';
import { WORK_HOURS } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех сотрудников и рабочих часов
export async function getAllWorkHours(
  startDate: string,
  endDate: string,
): Promise<TypeWorkHour> {
  try {
    const response = await api.get(WORK_HOURS, {
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактирование данных о рабочем дне
export async function updateWorkHours(data: {
  duration: number | null;
  workDate: any;
  id: number | null | undefined;
  employee: { id: number };
}): Promise<TypeEditingDayState> {
  try {
    const response = await api.put<TypeApiResponse>(WORK_HOURS, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новую запись о рабочем дне
export async function createWorkHours(data: {
  duration: number | null;
  workDate: any;
  employee: { id: number };
}): Promise<TypeEditingDayState> {
  try {
    const response = await api.post(WORK_HOURS, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить запись о рабочих часах
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
