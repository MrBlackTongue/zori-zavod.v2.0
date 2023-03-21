import {message} from "antd";
import {URL, PRODUCT, BATCH} from "./Routes";
import {ProductBatchTypes} from "../types";

// Получить все партии товаров
export async function getAllProductBatch(): Promise<ProductBatchTypes[]> {
  try {
    const res = await fetch(URL + PRODUCT + BATCH);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as ProductBatchTypes[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Редактировать партию товара
export function putChangeProductBatch(data: ProductBatchTypes) {
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

// Добавить новую партию товара
export function postNewProductBatch(data: ProductBatchTypes) {
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

// Получить данные партии товара по id
export async function getProductBatchById(id: number): Promise<ProductBatchTypes | undefined> {
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

// Удалить партию товара по id
export async function deleteProductBatchById(id: number) {
  try {
    const response = await fetch(URL + PRODUCT + BATCH + `/${id}`, {
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