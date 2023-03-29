import {URL, MOVEMENT, ACCEPTANCE} from "./apiEndpoints";
import {AcceptanceType} from "../types/AcceptanceType";
import {message} from "antd";

// Получение всех приемок товаров
export async function getAllAcceptances(): Promise<AcceptanceType[]> {
  try {
    const res = await fetch(URL + MOVEMENT + ACCEPTANCE);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as AcceptanceType[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Создание приемки
export function postNewAcceptance(data: AcceptanceType) {
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

// Получение приемки по id
export async function getAcceptanceById(id: number): Promise<AcceptanceType | undefined> {
  try {
    const response = await fetch(URL + MOVEMENT + ACCEPTANCE + `/${id}`);
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

// Удаление приемки по id
export async function deleteAcceptanceById(id: number) {
  try {
    const response = await fetch(URL + MOVEMENT + ACCEPTANCE + `/${id}`, {
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

// Получение приемок по названию продукта
export async function getAcceptanceByTitle(title: string): Promise<AcceptanceType[]> {
  try {
    const response = await fetch(URL + MOVEMENT + ACCEPTANCE + `/${title}`);
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