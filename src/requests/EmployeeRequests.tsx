import {useState} from "react";
import {EmployeeType, TableParams} from "../types/employeeType";
import {message} from "antd";

const URL_EMPLOYEE = 'http://localhost:8081/api/employee'

// Получить список всех сотрудников
export const getAllEmployees = (
  setData: (value: (((prevState: (EmployeeType[] | undefined)) => (EmployeeType[] | undefined)) | EmployeeType[] | undefined)) => void) => {
  fetch(URL_EMPLOYEE)
    .then((res) => res.json())
    .then((results) => {
      setData(results);
    });
};

// Получить данные сотрудника по id
export async function getEmployeeById(id: number,
                                      setEmployee?: (value: (((prevState: (EmployeeType | null)) => (EmployeeType | null)) | EmployeeType | null)) => void) {
  try {
    const response = await fetch(URL_EMPLOYEE +`/${id}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Добавить нового сотрудника
export async function postNewEmployee(data: EmployeeType) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    const response = await fetch(URL_EMPLOYEE, config);
    if (response.ok) {
      console.log('Данные успешно отправлены!');
      return message.success('Запись добавлена');
    } else {
      console.error(response.statusText);
      return message.error('Ошибка при добавлении нового сотрудника');
    }
  } catch (error) {
    console.error(error);
  }
}

// Удалить сотрудника по id
export const deleteEmployeeById = async (id: number) => {
  try {
    const response = await fetch(URL_EMPLOYEE + `?id=${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (data.success) {
      console.log('Employee deleted successfully');
      return message.success('Запись удалена');
    } else {
      console.log('Error deleting employee');
      return message.error('Ошибка при удалении сотрудника');
    }
  } catch (err) {
    console.error(err);
  }
};

// Редактировать сотрудника
export async function putChangeEmployee(data: EmployeeType) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    const response = await fetch(URL_EMPLOYEE, config);
    if (response.ok) {
      console.log('Данные успешно изменены!');
      return message.success('Запись изменена');
    } else {
      console.error(response.statusText);
      return message.error('Ошибка при изменении записи');
    }
  } catch (error) {
    console.error(error);
  }
}