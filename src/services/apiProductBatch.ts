import {message} from "antd";
import {URL, PRODUCT, BATCH} from "./apiEndpoints";
import {TypeProductBatch} from "../types";

// Получить все партии товаров
export async function getAllProductBatch(): Promise<TypeProductBatch[]> {
  try {
    const res = await fetch(URL + PRODUCT + BATCH);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as TypeProductBatch[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные партии товаров по id
export async function getProductBatchById(id: number): Promise<TypeProductBatch | undefined> {
  try {
    const response = await fetch(URL + PRODUCT + BATCH + `/${id}`);
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

// Добавить новую партию товаров
export function postNewProductBatch(data: TypeProductBatch): void {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT + BATCH, config)
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

// Удалить партию товаров по id
export async function deleteProductBatchById(id: number) {
  try {
    const response = await fetch(URL + PRODUCT + BATCH + `/${id}`, {
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

// Редактировать партию товаров
export function putChangeProductBatch(data: TypeProductBatch): void {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT + BATCH, config)
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