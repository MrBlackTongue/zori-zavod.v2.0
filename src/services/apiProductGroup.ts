import {TypeProduct, TypeProductGroup} from "../types";
import {URL, PRODUCT_GROUP, GROUP, TREE} from "./apiEndpoints";
import {message} from "antd";

// Получить список всех товарных групп
export async function getAllProductGroup(): Promise<TypeProduct[]> {
  try {
    const res = await fetch(URL + PRODUCT_GROUP + GROUP);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as TypeProduct[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Добавить новую товарную группу
export function postNewProductGroup(data: TypeProductGroup) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT_GROUP + GROUP, config)
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
    const response = await fetch(URL + PRODUCT_GROUP + GROUP + `/${id}`, {
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
export function putChangeProductGroup(data: TypeProductGroup, setUpdateTable: Function, updateTable: boolean) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: data.id,
        title: data.title,
        parent: data.parent?.id,  // pass id instead of object
        children: data?.children?.map(child => child.id),  // pass each child id
      }),
    };
    fetch(URL + PRODUCT_GROUP + GROUP, config)
      .then(response => {
        if (response.ok) {
          message.success('Запись изменена');
          setUpdateTable(!updateTable); // Update table after successful response
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

// Получить данные товарной группы по id
export async function getProductGroupById(id: number): Promise<TypeProductGroup | undefined> {
  try {
    const response = await fetch(URL + PRODUCT_GROUP + GROUP + `/${id}`);
    if (!response.ok) {
      console.error(response.statusText);
      return Promise.reject();
    }
    const productGroup = await response.json();
    console.log(productGroup);
    const parentResponse = await fetch(URL + PRODUCT_GROUP + GROUP + `/${productGroup.parent.id}`);


    if (!parentResponse.ok) {
      console.error(parentResponse.statusText);
      return Promise.reject();
    }
    const parentGroup = await parentResponse.json();
    return { ...productGroup, parent: parentGroup };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получение древа групп товаров
export async function getProductGroupTree(): Promise<TypeProductGroup[]> {
  try {
    const res = await fetch(URL + PRODUCT_GROUP + GROUP + TREE);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as TypeProductGroup[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}