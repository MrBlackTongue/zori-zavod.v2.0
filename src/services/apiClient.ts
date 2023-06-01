import {TypeClient} from "../types";
import {URL, CLIENT} from "./apiEndpoints";
import {
  handleResponseGet,
  handleError,
  BASE_HEADERS,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить список всех клиентов
export function getAllClient(): Promise<TypeClient[]> {
  try {
    return fetch(URL + CLIENT)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные клиента по id
export function getClientById(id: number): Promise<TypeClient | undefined> {
  try {
    return fetch(URL + CLIENT + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить нового клиента
export function createClient(data: TypeClient): void {
  try {
    fetch(URL + CLIENT, {
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
    fetch(URL + CLIENT + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать клиента
export function editClient(data: TypeClient): void {
  try {
    fetch(URL + CLIENT, {
      method: 'PUT',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(handleResponseEdit)
      .catch(handleError)
  } catch (error) {
    void handleCatchError(error);
  }
}