import {TypeProductGroup} from "../types";
import {API_URL, PRODUCT_GROUP, GROUP, TREE} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
  handleResponseUpdate,
} from '../utils';

// Получить список всех товарных групп
export function getAllProductGroup(): Promise<TypeProductGroup[]> {
  try {
    return fetch(API_URL + PRODUCT_GROUP + GROUP)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Получить товарную группу по id
export function getProductGroupById(id: number): Promise<TypeProductGroup | undefined> {
  try {
    return fetch(API_URL + PRODUCT_GROUP + GROUP + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить новую товарную группу
export function createProductGroup(data: TypeProductGroup): void {
  try {
    fetch(API_URL + PRODUCT_GROUP + GROUP, {
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

// Удалить товарную группу по id
export function deleteProductGroupById(id: number): void {
  try {
    fetch(API_URL + PRODUCT_GROUP + GROUP + `/${id}`, {
      method: "DELETE",
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}

// Редактировать товарную группу
export function updateProductGroup(data: TypeProductGroup): void {
  try {
    fetch(API_URL + PRODUCT_GROUP + GROUP, {
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

// Получить дерево группы товаров
export function getProductGroupTree(): Promise<TypeProductGroup[]> {
  try {
    return fetch(API_URL + PRODUCT_GROUP + GROUP + TREE)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}