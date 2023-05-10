import {message} from "antd";
import {URL, SHIPMENT, MOVEMENT} from "./apiEndpoints";
import {TypeShipmentProductMovement} from "../types";

// Получить все движения товаров по id отгрузки
export async function getAllProductMovementByShipmentId(id: number): Promise<TypeShipmentProductMovement[] | undefined> {
  try {
    const response = await fetch(URL + MOVEMENT + SHIPMENT + SHIPMENT + `/${id}`);
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

// Добавить новый товар в отгрузку
export async function postNewShipmentProductMovement(data: TypeShipmentProductMovement) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    await fetch(URL + MOVEMENT + SHIPMENT, config)
      .then((response) => {
        if (response.ok) {
          return message.success('Запись добавлена');
        } else {
          console.error(response.statusText);
          return message.error('Ошибка при добавлении записи');
        }
      })
      .catch((error) => console.error(error))
  } catch (error) {
    console.error(error);
  }
}

// Удалить товар из отгрузки по id
export async function deleteShipmentProductMovementById(id: number) {
  try {
    const response = await fetch(URL + MOVEMENT + SHIPMENT + `/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (data.success) {
      return message.success('Запись удалена');
    } else {
      console.error(response.statusText);
      return message.error('Ошибка при удалении записи');
    }
  } catch (err) {
    console.error(err);
  }
}