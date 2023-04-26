import {TypeOperationAccounting} from "../types";
import {message} from "antd";
import {URL, OPERATION_ACCOUNTING, FILTER} from "./apiEndpoints";

// Получить список учетных операций
export async function getAllOperationAccounting(): Promise<TypeOperationAccounting[]> {
  try {
    const res = await fetch(URL + OPERATION_ACCOUNTING);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as TypeOperationAccounting[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные учетной операции по id
export async function getOperationAccountingById(id: number): Promise<TypeOperationAccounting | undefined> {
  try {
    const response = await fetch(URL + OPERATION_ACCOUNTING + `/${id}`);
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

// Добавить новую учетную операцию
export function postNewOperationAccounting(data: TypeOperationAccounting) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + OPERATION_ACCOUNTING, config)
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

// Удалить учетную операцию по id
export async function deleteOperationAccountingById(id: number) {
  try {
    const response = await fetch(URL + OPERATION_ACCOUNTING + `/${id}`, {
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

// Редактировать учетную операцию
export function putChangeOperationAccounting(data: TypeOperationAccounting) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + OPERATION_ACCOUNTING, config)
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

// Фильтр по таблице
export function postFilterByTable(data: { date?: string; operationId?: number }) {
  try {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return fetch(URL + OPERATION_ACCOUNTING + FILTER, config)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => Promise.resolve(data));
        } else {
          console.error(response.statusText);
          return Promise.reject(response.statusText);
        }
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}