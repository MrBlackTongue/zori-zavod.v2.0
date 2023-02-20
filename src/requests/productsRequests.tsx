import {ProductType} from "../types/productType";
import {message} from "antd";

const URL_PRODUCT = 'http://localhost:8081/api/product'

const URL_GROUP = '/group'

// Получить список всех товаров
export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const res = await fetch(URL_PRODUCT);
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

// Получить данные товара по id
export async function getProductById(id: number): Promise<ProductType | undefined> {
  try {
    const response = await fetch(URL_PRODUCT + `/${id}`);
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

// Добавить новый товар
export function postNewProduct(data: ProductType) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL_PRODUCT, config)
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

// Удалить товар по id
export async function deleteProductById(id: number) {
  try {
    const response = await fetch(URL_PRODUCT + `/${id}`, {
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

// Редактировать товар
export function putChangeProduct(data: ProductType) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL_PRODUCT, config)
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

// Получить список всех товарных групп
export async function getAllProductGroups(): Promise<ProductType[]> {
  try {
    const res = await fetch(URL_PRODUCT + URL_GROUP);
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

// Получить данные товарной группы по id
export async function getProductGroupById(id: number): Promise<ProductType | undefined> {
  try {
    const response = await fetch(URL_PRODUCT + URL_GROUP + `/${id}`);
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

// Добавить новую товарную группу
export function postNewProductGroup(data: ProductType) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL_PRODUCT + URL_GROUP, config)
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

// Удалить товарную группу по id
export async function deleteProductGroupById(id: number) {
  try {
    const response = await fetch(URL_PRODUCT + URL_GROUP + `/${id}`, {
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

// Редактировать товарную группу
export function putChangeProductGroup(data: ProductType) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL_PRODUCT + URL_GROUP, config)
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