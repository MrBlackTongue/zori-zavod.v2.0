import { TypeApiResponse, TypeClient } from '../types';
import { CLIENT } from './apiEndpoints';
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import { api } from './api';

// Получить список всех клиентов
export function getAllClient(): Promise<TypeClient[]> {
  return api
    .get(CLIENT)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить данные клиента по id
export function getClientById(id: number): Promise<TypeClient | undefined> {
  return api
    .get(`${CLIENT}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить нового клиента
export function createClient(data: TypeClient): Promise<TypeApiResponse> {
  return api
    .post(CLIENT, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить клиента по id
export function deleteClientById(id: number): Promise<TypeApiResponse> {
  return api
    .delete(`${CLIENT}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать клиента
export function updateClient(data: TypeClient): Promise<TypeApiResponse> {
  return api
    .put(CLIENT, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}
