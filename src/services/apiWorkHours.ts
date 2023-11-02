import {
  TypeApiResponse,
  TypeEditingDayState,
  //   TypeEditingDayStatePut,
  TypeWorkDay,
  TypeWorkHour,
} from '../types';
import { WORK_HOURS } from './apiEndpoints';
import {
  handleErrorResponseMessage,
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

// Редактирование данных о рабочем дне
export async function updateWorkHours(
  data: TypeEditingDayState,
): Promise<TypeEditingDayState> {
  try {
    const response = await api.put<TypeApiResponse>(WORK_HOURS, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные рабочего дня по id
export async function getWorkHoursById(
  id: number,
): Promise<TypeWorkDay | undefined> {
  try {
    const response = await api.get<TypeWorkDay>(`${WORK_HOURS}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
