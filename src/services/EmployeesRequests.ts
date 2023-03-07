import {EmployeeTypes} from "../types";
import {message} from "antd";
import {URL, EMPLOYEE} from "./Routes";

// Получить список всех сотрудников
export async function getAllEmployees(): Promise<EmployeeTypes[]> {
  try {
    const res = await fetch(URL + EMPLOYEE);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as EmployeeTypes[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные сотрудника по id
export async function getEmployeeById(id: number): Promise<EmployeeTypes | undefined> {
  try {
    const response = await fetch(URL + EMPLOYEE + `/${id}`);
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

// Добавить нового сотрудника
export function postNewEmployee(data: EmployeeTypes) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + EMPLOYEE, config)
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

// Удалить сотрудника по id
export async function deleteEmployeeById(id: number) {
  try {
    const response = await fetch(URL + EMPLOYEE + `/${id}`, {
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

// Редактировать сотрудника
export function putChangeEmployee(data: EmployeeTypes) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + EMPLOYEE, config)
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