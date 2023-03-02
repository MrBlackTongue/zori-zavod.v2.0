import {OutputTypes} from "../types/OutputTypes";
import {message} from "antd";

const URL_OUTPUT = 'http://localhost:8081/api/output'

// Получить список всех единиц измерения
export async function getAllOutputs(): Promise<OutputTypes[]> {
  try {
    const res = await fetch(URL_OUTPUT);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as OutputTypes[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные единицы измерения по id
export async function getOutputById(id: number): Promise<OutputTypes | undefined> {
  try {
    const response = await fetch(URL_OUTPUT + `/${id}`);
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

// Добавить новую единицу измерения
export function postNewOutput(data: OutputTypes) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL_OUTPUT, config)
      .then((response)=> {
        if (response.ok) {
          return message.success('Запись добавлена');
        } else {
          console.error(response.statusText);
          return message.error('Ошибка при добавлении записи');
        }
      })
      .catch((error)=> console.error(error))
  } catch (error) {
    console.error(error);
  }
}

// Удалить единицу измерения по id
export async function deleteOutputById(id: number) {
  try {
    const response = await fetch(URL_OUTPUT + `/${id}`, {
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

// Редактировать единицу изремерения
export function putChangeOutput(data: OutputTypes) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL_OUTPUT, config)
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