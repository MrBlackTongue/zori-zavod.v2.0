import {TypeApiResponse, TypeMeterType} from '../types';
import {METER_TYPE} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех типов счетчика
export async function getAllMeterType(): Promise<TypeMeterType[]> {
  try {
    const response = await api.get(METER_TYPE);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные типа счетчика по id
export async function getMeterTypeById(
  id: number,
): Promise<TypeMeterType | undefined> {
  try {
    const response = await api.get(`${METER_TYPE}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новый тип счетчика
export async function createMeterType(
  data: TypeMeterType,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(METER_TYPE, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить тип счетчика по id
export async function deleteMeterTypeById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${METER_TYPE}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать тип счетчика
export async function updateMeterType(
  data: TypeMeterType,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(METER_TYPE, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
