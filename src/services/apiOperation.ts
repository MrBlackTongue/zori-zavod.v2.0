import {TypeOperation} from "../types";
import {message} from "antd";
import {URL, OPERATION} from "./apiEndpoints";

// Получить список всех типов операций
export async function getAllOperations(): Promise<TypeOperation[]> {
  try {
    const res = await fetch(URL + OPERATION);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as TypeOperation[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные типа операции по id
export async function getOperationById(id: number): Promise<TypeOperation | undefined> {
  try {
    const response = await fetch(URL + OPERATION + `/${id}`);
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

// Добавить новый тип операции
export function postNewOperation(data: TypeOperation) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + OPERATION, config)
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

// Удалить тип операции по id
export async function deleteOperationById(id: number) {
  try {
    const response = await fetch(URL + OPERATION + `/${id}`, {
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

// Редактировать тип операции
export function putChangeOperation(data: TypeOperation) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + OPERATION, config)
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