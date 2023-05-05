import {TypeEmployee, TypeOperationTimesheet} from "../types";
import {message} from "antd";
import {URL, OPERATION_ACCOUNTING, OPERATION_TIMESHEET} from "./apiEndpoints";

// Получить данные табеля рабочего времени по id учетной операции
export async function getOperationTimesheetByIdOperationAccounting(id: number): Promise<TypeOperationTimesheet[] | undefined> {
  try {
    const response = await fetch(URL + OPERATION_TIMESHEET + OPERATION_ACCOUNTING + `/${id}`);
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

// Получить данные сотрудника из табеля учета рабочего времени по id
export async function getOperationTimesheetById(id: number): Promise<TypeEmployee | undefined> {
  try {
    const response = await fetch(URL + OPERATION_TIMESHEET + `/${id}`);
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

// Добавить табель учета рабочего времени
export function postNewOperationTimesheet(data: TypeOperationTimesheet) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + OPERATION_TIMESHEET, config)
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

// Удалить табель учета рабочего времени по id
export async function deleteOperationTimesheetById(id: number) {
  try {
    const response = await fetch(URL + OPERATION_TIMESHEET + `/${id}`, {
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

// Редактировать табель учета рабочего времени
export function putChangeOperationTimesheet(data: TypeOperationTimesheet) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + OPERATION_TIMESHEET, config)
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