import {TypeClient} from "../types";
import {API_URL, CLIENT} from "./apiEndpoints";
import {
  handleResponseGet,
  handleError,
  BASE_HEADERS,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseUpdate,
} from '../utils';

// Получить список всех клиентов
export function getAllClient(): Promise<TypeClient[]> {
  try {
    return fetch(API_URL + CLIENT, {
      credentials: 'include',
    })
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные клиента по id
export function getClientById(id: number): Promise<TypeClient | undefined> {
  try {
    return fetch(API_URL + CLIENT + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить нового клиента
export function createClient(data: TypeClient): void {
  try {
    fetch(API_URL + CLIENT, {
      method: 'POST',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseCreate)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Удалить клиента по id
export function deleteClientById(id: number): void {
  try {
    fetch(API_URL + CLIENT + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать клиента
export function updateClient(data: TypeClient): void {
  try {
    fetch(API_URL + CLIENT, {
      method: 'PUT',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseUpdate)
      .catch(handleError)
  } catch (error) {
    void handleCatchError(error);
  }
}