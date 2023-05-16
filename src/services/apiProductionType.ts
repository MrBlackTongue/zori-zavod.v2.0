import {TypeProductionType} from "../types";
import {URL, PRODUCTION_TYPE } from "./apiEndpoints";
import {message} from "antd";

// Получить список типов производства
export async function getAllProductionType(): Promise<TypeProductionType[]> {
  try {
    const res = await fetch(URL + PRODUCTION_TYPE);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as TypeProductionType[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные типа производства по id
export async function getProductionTypeById(id: number): Promise<TypeProductionType | undefined> {
  try {
    const response = await fetch(URL + PRODUCTION_TYPE + `/${id}`);
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

// Добавить новый тип производства
export function postNewProductionType(data: TypeProductionType) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCTION_TYPE, config)
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

// Удалить тип производства по id
export async function deleteProductionTypeById(id: number) {
  try {
    const response = await fetch(URL + PRODUCTION_TYPE + `/${id}`, {
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

// Редактировать тип производства
export function putChangeProductionType(data: TypeProductionType) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCTION_TYPE, config)
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