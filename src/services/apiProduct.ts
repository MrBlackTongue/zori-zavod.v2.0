import {TypeProduct} from "../types";
import {message} from "antd";
import {URL, PRODUCT, TITLE} from "./apiEndpoints";

// Получить список всех товаров
export async function getAllProduct(): Promise<TypeProduct[]> {
  try {
    const res = await fetch(URL + PRODUCT);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as TypeProduct[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные товара по id
export async function getProductById(id: number): Promise<TypeProduct | undefined> {
  try {
    const response = await fetch(URL + PRODUCT + `/${id}`);
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

// Добавить новый товар
export function postNewProduct(data: TypeProduct) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT, config)
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

// Удалить товар по id
export async function deleteProductById(id: number) {
  try {
    const response = await fetch(URL + PRODUCT + `/${id}`, {
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

// Редактировать товар
export function putChangeProduct(data: TypeProduct) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT, config)
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

// Поиск по товару
export async function getProductByTitle(title: string): Promise<TypeProduct[]> {
  try {
    const response = await fetch(URL + PRODUCT + TITLE + `/${title}`);
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
