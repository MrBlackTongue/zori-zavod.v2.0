import {OperationType} from "../types/operationType";
import {message} from "antd";

const URL_EMPLOYEE = 'http://localhost:8081/api/operation'

// Получить список всех типов операций
export async function getAllOperations(): Promise<OperationType[]> {
  try {
    const res = await fetch(URL_EMPLOYEE);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as OperationType[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные типа операции по id
export async function getOperationById(id: number): Promise<OperationType | undefined> {
  try {
    const response = await fetch(URL_EMPLOYEE + `/${id}`);
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
export function postNewOperation(data: OperationType) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL_EMPLOYEE, config)
      .then((response) => {
        if (response.ok) {
          return message.success('Запись добавлена');
        } else {
          console.error(response.statusText);
          return message.error('Ошибка при добавлении нового типа операции');
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
    const response = await fetch(URL_EMPLOYEE + `/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (data.success) {
      return message.success('Запись удалена');
    } else {
      console.error(response.statusText);
      return message.error('Ошибка при удалении типа операции');
    }
  } catch (err) {
    console.error(err);
  }
}

// Редактировать тип операции
export function putChangeOperation(data: OperationType) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL_EMPLOYEE, config)
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