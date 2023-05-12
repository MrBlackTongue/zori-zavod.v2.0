import {TypeProductionProductMovement} from "../types";
import {URL, MOVEMENT, PRODUCTION, OPERATION_ACCOUNTING} from "./apiEndpoints";
import {message} from "antd";

// Получить данные производственных движений товара по id учетной операции
export async function getProductionProductMovementByIdOperationAccounting(id: number):
  Promise<TypeProductionProductMovement[] | undefined> {
  try {
    const response = await fetch(URL + MOVEMENT + PRODUCTION + OPERATION_ACCOUNTING + `/${id}`);
    if (!response.ok) {
      console.error(response.statusText);
      return Promise.reject();
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Добавить производственное движение товара
export function postNewProductionProductMovement(data: TypeProductionProductMovement) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + MOVEMENT + PRODUCTION, config)
      .then((response) => {
        if (response.ok) {
          return message.success('Запись добавлена');
        } else {
          console.error(response.statusText);
          return message.error('Ошибка при добавлении записи');
        }
      })
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
}

// Удалить производственное движение товара по id
export async function deleteProductionProductMovementById(id: number) {
  try {
    const response = await fetch(URL + MOVEMENT + PRODUCTION + `/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return message.success('Запись удалена');
    } else {
      console.error(response.statusText);
      return message.error('Ошибка при удалении записи');
    }
  } catch (err) {
    console.error(err);
    message.error('Произошла ошибка при попытке удаления записи');
  }
}