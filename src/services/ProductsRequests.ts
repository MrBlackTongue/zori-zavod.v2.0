import {ProductTypes} from "../types";
import {message} from "antd";
import {URL, PRODUCT, PRODUCT_GROUP, TITLE} from "./Routes";

// Получить список всех товаров
export async function getAllProducts(): Promise<ProductTypes[]> {
  try {
    const res = await fetch(URL + PRODUCT);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as ProductTypes[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные товара по id
export async function getProductById(id: number): Promise<ProductTypes | undefined> {
  try {
    const response = await fetch(URL + PRODUCT + `/${id}`);
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
export function postNewProduct(data: ProductTypes) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT, config)
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
    const response = await fetch(URL + PRODUCT + `/${id}`, {
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
export function putChangeProduct(data: ProductTypes) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT, config)
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
export async function getAllProductGroups(): Promise<ProductTypes[]> {
  try {
    const res = await fetch(URL + PRODUCT + PRODUCT_GROUP);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as ProductTypes[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные товарной группы по id
export async function getProductGroupById(id: number): Promise<ProductTypes | undefined> {
  try {
    const response = await fetch(URL + PRODUCT + PRODUCT_GROUP + `/${id}`);
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
export function postNewProductGroup(data: ProductTypes) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT + PRODUCT_GROUP, config)
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
    const response = await fetch(URL + PRODUCT + PRODUCT_GROUP + `/${id}`, {
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
export function putChangeProductGroup(data: ProductTypes) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT + PRODUCT_GROUP, config)
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

// Поиск по товару
export async function getProductsByTitle(title: string): Promise<ProductTypes[]> {
  try {
    const response = await fetch(URL + PRODUCT + TITLE + `/${title}`);
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
