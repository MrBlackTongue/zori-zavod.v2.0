import {TypeProductionArea} from "../types";
import {URL, PRODUCTION_AREA } from "./apiEndpoints";
import {message} from "antd";

// Получить список типов производства
export async function getAllProductionArea(): Promise<TypeProductionArea[]> {
  try {
    const res = await fetch(URL + PRODUCTION_AREA);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as TypeProductionArea[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные типа производства по id
export async function getProductionAreaById(id: number): Promise<TypeProductionArea | undefined> {
  try {
    const response = await fetch(URL + PRODUCTION_AREA + `/${id}`);
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
export function postNewProductionArea(data: TypeProductionArea) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCTION_AREA, config)
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
export async function deleteProductionAreaById(id: number) {
  try {
    const response = await fetch(URL + PRODUCTION_AREA + `/${id}`, {
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
export function putChangeProductionArea(data: TypeProductionArea) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCTION_AREA, config)
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