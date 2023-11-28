import {TypeApiResponse, TypeStoragePlace} from '../types';
import {STORAGE_PLACE} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех мест хранения
export async function getAllStoragePlace(): Promise<TypeStoragePlace[]> {
  try {
    const response = await api.get(STORAGE_PLACE);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные места хранения по id
export async function getStoragePlaceById(
  id: number,
): Promise<TypeStoragePlace | undefined> {
  try {
    const response = await api.get(`${STORAGE_PLACE}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новое место хранения
export async function createStoragePlace(
  data: TypeStoragePlace,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(STORAGE_PLACE, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить место хранения по id
export async function deleteStoragePlaceById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${STORAGE_PLACE}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать место хранения
export async function updateStoragePlace(
  data: TypeStoragePlace,
): Promise<TypeApiResponse> {
  try {
    const response = await api.put(STORAGE_PLACE, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
