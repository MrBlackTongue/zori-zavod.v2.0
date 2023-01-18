import {useState} from "react";
import {EmployeeType, TableParams} from "../types/types";
import {message} from "antd";


// Получить список всех сотрудников
export const getAllEmployees = (
  setData: (value: (((prevState: (EmployeeType[] | undefined)) => (EmployeeType[] | undefined)) | EmployeeType[] | undefined)) => void) => {

  fetch(`http://localhost:8081/api/employee`)
    .then((res) => res.json())
    .then((results) => {
      setData(results);
    });
};

export async function getEmployeeById(id: number,
                                      setEmployee: (value: (((prevState: (EmployeeType | null)) => (EmployeeType | null)) | EmployeeType | null)) => void) {
  try {
    const response = await fetch(`http://localhost:8081/api/employee/${id}`);
    const data = await response.json();
    setEmployee({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      salaryRate: data.salaryRate,
      hired: data.hired,
      id: data.id,
    })
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

export async function postNewEmployee(data: EmployeeType) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    const response = await fetch('http://localhost:8081/api/employee', config);
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

export const deleteEmployeeById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8081/api/employee?id=${id}`, {
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



// async function putChangeEmployee(data: EmployeeType) {
//   try {
//     const config = {
//       method: 'PUT',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(data),
//     };
//     const response = await fetch('http://localhost:8081/api/employee', config);
//     if (response.ok) {
//       console.log('Данные успешно изменены!');
//       return message.success('Запись изменена');
//     } else {
//       console.error(response.statusText);
//       return message.error('Ошибка при изменении записи');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }