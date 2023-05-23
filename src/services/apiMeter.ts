import {TypeMeter} from "../types";
import {URL, METER} from "./apiEndpoints";
import {message} from "antd";

// Получить список всех счётчиков
export async function getAllMeter(): Promise<TypeMeter[]> {
  try {
    const response = await fetch(URL + METER);
    if (!response.ok) {
      console.error(response.statusText);
      return Promise.reject();
    }
    return await response.json() as TypeMeter[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Изменение существующего счётчика
export function putChangeMeter(data: TypeMeter) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + METER, config)
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

// Создание нового счётчика
export function postNewMeter(data: TypeMeter) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + METER, config)
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

// Получить счётчик по id
export async function getMeterById(id: number): Promise<TypeMeter | undefined> {
  try {
    const response = await fetch(URL + METER + `/${id}`);
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

// Удаление счётчика по id
export async function deleteMeterById(id: number) {
  try {
    const response = await fetch(URL + METER + `/${id}`, {
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
