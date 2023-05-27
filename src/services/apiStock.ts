import {TypeStock} from "../types";
import {URL, STOCK, GROUP, TITLE} from "./apiEndpoints";
import {message} from "antd";

// Получить список всех остатков со склада
export async function getAllStock(): Promise<TypeStock[]> {
  try {
    const response = await fetch(URL + STOCK);
    if (!response.ok) {
      console.error(response.statusText);
      return Promise.reject();
    }
    return await response.json() as TypeStock[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Изменение существующего остатка
export function putChangeStock(data: TypeStock) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + STOCK, config)
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

// Создание нового остатка
export function postNewStock(data: TypeStock) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + STOCK, config)
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

// Получить остаток со склада по id
export async function getStockById(id: number): Promise<TypeStock | undefined> {
  try {
    const response = await fetch(URL + STOCK + `/${id}`);
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

// Удаление  остатка по id
export async function deleteStockById(id: number) {
  try {
    const response = await fetch(URL + STOCK + `/${id}`, {
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

// Получение всех остатков по название товара
export async function getAllStockByTitle(title: string): Promise<TypeStock[]> {
  try {
    const response = await fetch(URL + STOCK + TITLE + `/${title}`);
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

// Получение всех остаков на складе по id группы товаров
export async function getStockByGroupId(id: number): Promise<TypeStock[] | undefined> {
  try {
    const response = await fetch(URL + STOCK + GROUP + `/${id}`);
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