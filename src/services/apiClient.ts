import {TypeApiResponse, TypeClient} from '../types';
import {CLIENT} from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from './api';

// Получить список всех клиентов
export async function getAllClient(): Promise<TypeClient[]> {
  try {
    const response = await api.get(CLIENT);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Получить данные клиента по id
export async function getClientById(
  id: number,
): Promise<TypeClient | undefined> {
  try {
    const response = await api.get(`${CLIENT}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить нового клиента
export async function createClient(data: TypeClient): Promise<TypeApiResponse> {
  try {
    const response = await api.post(CLIENT, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить клиента по id
export async function deleteClientById(id: number): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${CLIENT}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Редактировать клиента
export async function updateClient(data: TypeClient): Promise<TypeApiResponse> {
  try {
    const response = await api.put(CLIENT, data);
    return handleResponseUpdateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
