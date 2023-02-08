import {ProductType} from "../types/productType";
import {message} from "antd";

const URL_EMPLOYEE = 'http://localhost:8081/api/product'

// Получить список всех единиц измерения
export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const res = await fetch(URL_EMPLOYEE);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as ProductType[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные единицы измерения по id
export async function getProductById(id: number): Promise<ProductType | undefined> {
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

// Добавить новую единицу измерения
export function postNewProduct(data: ProductType) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL_EMPLOYEE, config)
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
export async function deleteProductById(id: number) {
  try {
    const response = await fetch(URL_EMPLOYEE + `/${id}`, {
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
export function putChangeProduct(data: ProductType) {
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