import {TypePurchase} from "../types";
import {message} from "antd";
import {URL, PRODUCT, PURCHASE} from "./apiEndpoints";

// Получить все закупки
export async function getAllPurchases(): Promise<TypePurchase[]> {
  try {
    const res = await fetch(URL + PURCHASE);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as TypePurchase[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные закупки по id
export async function getPurchaseById(id: number): Promise<TypePurchase | undefined> {
  try {
    const response = await fetch(URL + PURCHASE + `/${id}`);
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

// Добавить новую закупку
export function postNewPurchase(data: TypePurchase) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PURCHASE, config)
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

// Удалить закупку по id
export async function deletePurchaseById(id: number) {
  try {
    const response = await fetch(URL + PURCHASE + `/${id}`, {
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

// Редактировать закупку
export function putChangePurchase(data: TypePurchase) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PURCHASE, config)
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
export async function getPurchaseByTitle(title: string): Promise<TypePurchase[]> {
  try {
    const response = await fetch(URL + PURCHASE + PRODUCT + `/${title}`);
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
