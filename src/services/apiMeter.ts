import {TypeApiResponse, TypeMeter} from '../types';
import {METER} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех счетчиков
export async function getAllMeter(): Promise<TypeMeter[]> {
  try {
    const response = await api.get(METER);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные счетчика по id
export async function getMeterById(id: number): Promise<TypeMeter | undefined> {
  try {
    const response = await api.get(`${METER}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Создать новый счетчик
export async function createMeter(data: TypeMeter): Promise<TypeApiResponse> {
  try {
    const response = await api.post(METER, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить счетчик по id
export async function deleteMeterById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${METER}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать счетчик
export async function updateMeter(data: TypeMeter): Promise<TypeApiResponse> {
  try {
    const response = await api.put(METER, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
