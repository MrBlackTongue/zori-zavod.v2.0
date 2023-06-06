import {TypeStock} from "../types";
import {URL, STOCK, GROUP, TITLE} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseEdit,
} from '../utils';

// Получить список всех остатков со склада
export function getAllStock(): Promise<TypeStock[]> {
  try {
    return fetch(URL + STOCK)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить данные остатка со склада по id
export function getStockById(id: number): Promise<TypeStock | undefined> {
  try {
    return fetch(URL + STOCK + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новый остаток на складе
export function createNewStock(data: TypeStock): void {
  try {
    fetch(URL + STOCK, {
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

// Удалить остаток на складе по id
export function deleteStockById(id: number): void {
  try {
    fetch(URL + STOCK + `/${id}`, {
      method: "DELETE",
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать остаток на складе
export function updateStock(data: TypeStock): void {
  try {
    fetch(URL + STOCK, {
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

// Получить список всех отфильтрованных остатков на складе по название
export function getAllStockByTitle(title: string): Promise<TypeStock[]> {
  try {
    return fetch(URL + STOCK + TITLE + `/${title}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить список всех отфильтрованных остаков на складе
export function getAllStockByFilter(id: number): Promise<TypeStock[] | undefined> {
  try {
    return fetch(URL + STOCK + GROUP + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}