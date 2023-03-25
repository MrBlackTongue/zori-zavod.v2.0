import {UnitType} from "../types/_index";
import {message} from "antd";
import {URL, UNIT} from "./apiEndpoints";

// Получить список всех единиц измерения
export async function getAllUnits(): Promise<UnitType[]> {
  try {
    const response = await fetch(URL + UNIT);
    if (!response.ok) {
      console.error(response.statusText);
      return Promise.reject();
    }
    return await response.json() as UnitType[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные единицы измерения по id
export async function getUnitById(id: number): Promise<UnitType | undefined> {
  try {
    const response = await fetch(URL + UNIT + `/${id}`);
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

// Добавить новую единицу измерения
export function postNewUnit(data: UnitType) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + UNIT, config)
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

// Удалить единицу измерения по id
export async function deleteUnitById(id: number) {
  try {
    const response = await fetch(URL + UNIT + `/${id}`, {
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

// Редактировать единицу измерения
export function putChangeUnit(data: UnitType) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + UNIT, config)
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