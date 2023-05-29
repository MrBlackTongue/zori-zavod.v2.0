import {URL, MOVEMENT, ACCEPTANCE, PRODUCT} from "./apiEndpoints";
import {TypeAcceptance} from "../types";
import {message} from "antd";

// Получить список всех приемок товаров
export async function getAllAcceptance(): Promise<TypeAcceptance[]> {
  try {
    const res = await fetch(URL + MOVEMENT + ACCEPTANCE);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as TypeAcceptance[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Добавить новую приемку товаров
export function postNewAcceptance(data: TypeAcceptance): void {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + MOVEMENT + ACCEPTANCE, config)
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

// Удалить приемку товаров по id
export async function deleteAcceptanceById(id: number) {
  try {
    const response = await fetch(URL + MOVEMENT + ACCEPTANCE + `/${id}`, {
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

// Получить список всех отфильтрованных приемок товара по названию
export async function getAllAcceptanceByTitle(title: string): Promise<TypeAcceptance[]> {
  try {
    const response = await fetch(URL + MOVEMENT + ACCEPTANCE + PRODUCT + `/${title}`);
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