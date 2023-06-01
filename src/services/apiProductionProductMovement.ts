import {TypeProductionProductMovement} from "../types";
import {URL, MOVEMENT, PRODUCTION, OPERATION_ACCOUNTING} from "./apiEndpoints";
import {
  BASE_HEADERS,
  handleResponseGet,
  handleError,
  handleCatchError,
  handleResponseCreate,
  handleResponseDelete,
} from '../utils';

// Получить список всех производственных движений товара по id учетной операции
export function getProductionProductMovementByIdOperationAccounting(id: number):
  Promise<TypeProductionProductMovement[] | undefined> {
  try {
    return fetch(URL + MOVEMENT + PRODUCTION + OPERATION_ACCOUNTING + `/${id}`)
      .then(handleResponseGet)
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}

// Добавить производственное движение товара
export function createProductionProductMovement(data: TypeProductionProductMovement): void {
  try {
    fetch(URL + MOVEMENT + PRODUCTION, {
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

// Удалить производственное движение товара по id
export function deleteProductionProductMovementById(id: number): void {
  try {
    fetch(URL + MOVEMENT + PRODUCTION + `/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponseDelete)
      .catch(handleError);
  } catch (error) {
    void handleCatchError(error);
  }
}