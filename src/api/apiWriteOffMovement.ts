import {TypeApiResponse, TypeWriteOffMovement} from '../types';
import {MOVEMENT, WRITE_OFF} from './apiEndpoints';
import {handleErrorResponseMessage, handleResponseCreateMessage, handleResponseDeleteMessage,} from '../utils';
import {api} from './api';

// Получить список всех движений списания товара
export async function getAllWriteOffMovementByWriteOffId(
  id: number,
): Promise<TypeWriteOffMovement[] | undefined> {
  try {
    const response = await api.get(`${MOVEMENT}${WRITE_OFF}${WRITE_OFF}/${id}`);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Добавить новое движение списания товара
export async function createWriteOffMovement(
  data: TypeWriteOffMovement,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(`${MOVEMENT}${WRITE_OFF}`, data);
    return handleResponseCreateMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}

// Удалить движение списания товара по id
export async function deleteWriteOffMovementById(
  id: number,
): Promise<TypeApiResponse> {
  try {
    const response = await api.delete(`${MOVEMENT}${WRITE_OFF}/${id}`);
    return handleResponseDeleteMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
