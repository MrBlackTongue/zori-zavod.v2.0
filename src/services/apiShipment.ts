import {TypeShipment} from "../types";
import {message} from "antd";
import {URL, SHIPMENT} from "./apiEndpoints";

// Получить список всех отгрузок
export async function getAllShipment(): Promise<TypeShipment[]> {
  try {
    const res = await fetch(URL + SHIPMENT);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as TypeShipment[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные отгрузки по id
export async function getShipmentById(id: number): Promise<TypeShipment | undefined> {
  try {
    const response = await fetch(URL + SHIPMENT + `/${id}`);
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

// Добавить новую отгрузку
export function postNewShipment(data: TypeShipment): void {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + SHIPMENT, config)
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

// Удалить отгрузку по id
export async function deleteShipmentById(id: number) {
  try {
    const response = await fetch(URL + SHIPMENT + `/${id}`, {
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

// Редактировать отгрузку
export function putChangeShipment(data: TypeShipment): void {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + SHIPMENT, config)
      .then(response => {
        if (response.ok) {
          return message.success('Запись изменена');
        } else {
          console.error(response.statusText);
          return message.error('Ошибка при изменении записи');
        }
      })
      .catch(error => console.error(error))
  } catch (error) {
    console.error(error);
  }
}