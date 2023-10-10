import {TypeApiResponse, TypeMeterRecord} from '../types';
import {METER_RECORD} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех записей счетчика
export async function getAllMeterRecord(): Promise<TypeMeterRecord[]> {
  try {
    const response = await api.get(METER_RECORD);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить запись счетчика по id
export async function getMeterRecordById(
  id: number,
): Promise<TypeMeterRecord | undefined> {
  try {
    const response = await api.get(`${METER_RECORD}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Создать новую запись счетчика
export async function createMeterRecord(
  data: TypeMeterRecord,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(METER_RECORD, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить запись счетчика по id
export async function deleteMeterRecordById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${METER_RECORD}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать запись счетчика
export async function updateMeterRecord(
  data: TypeMeterRecord,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(METER_RECORD, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
