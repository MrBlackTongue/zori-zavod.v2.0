import {TypeMeterType, TypeStock} from "../types";
import {URL, METER_TYPE} from "./apiEndpoints";
import {message} from "antd";

// Получение всех типов счетчика
export async function getAllMeterType(): Promise<TypeMeterType[]> {
  try {
    const response = await fetch(URL + METER_TYPE);
    if (!response.ok) {
      console.error(response.statusText);
      return Promise.reject();
    }
    return await response.json() as TypeStock[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Изменение существующего типа счетчика
export function putChangeMeterType(data: TypeMeterType) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + METER_TYPE, config)
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

// Создание нового типа счетчика
export function postNewMeterType(data: TypeMeterType) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + METER_TYPE, config)
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

// Получить тип счетчика по id
export async function getMeterTypeById(id: number): Promise<TypeMeterType | undefined> {
  try {
    const response = await fetch(URL + METER_TYPE + `/${id}`);
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

// Удаление типа счетчика по id
export async function deleteMeterTypeById(id: number) {
  try {
    const response = await fetch(URL + METER_TYPE + `/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      message.success("Запись удалена");
    } else {
      console.error(response.statusText);
      message.error("Ошибка при удалении записи");
    }
  } catch (err) {
    console.error(err);
    message.error('Произошла ошибка при попытке удаления записи');
  }
}