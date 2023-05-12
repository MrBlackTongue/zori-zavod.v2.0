import {TypeProduct, TypeProductGroup} from "../types";
import {URL, PRODUCT_GROUP, GROUP, ROOTS, CHILDREN, TREE} from "./apiEndpoints";
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

// Получить данные товарной группы по id
// export async function getProductGroupById(id: number): Promise<TypeProduct | undefined> {
//   try {
//     const response = await fetch(URL + PRODUCT_GROUP + GROUP + `/${id}`);
//     if (!response.ok) {
//       console.error(response.statusText);
//       return Promise.reject();
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     return Promise.reject(error);
//   }
// }

// Добавить новую товарную группу
export function postNewProductGroup(data: TypeProduct) {
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
export function putChangeProductGroup(data: TypeProduct) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT_GROUP + GROUP, config)
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

// Получить родительские группы товаров
export async function getRootsProductGroup(): Promise<TypeProduct[]> {
  try {
    const res = await fetch(URL + PRODUCT_GROUP + GROUP + ROOTS);
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

// Получить дочерние товарные группы по id родителя
export async function getChildrenProductGroup(parentId: number): Promise<TypeProduct[]> {
  try {
    const res = await fetch(URL + PRODUCT_GROUP + GROUP + CHILDREN + '/' + parentId);
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

// Получить данные товарной группы по id
export async function getProductGroupById(id: number): Promise<TypeProductGroup | undefined> {
  try {
    const response = await fetch(URL + PRODUCT_GROUP + GROUP + `/${id}`);
    if (!response.ok) {
      console.error(response.statusText);
      return Promise.reject();
    }
    const productGroup = await response.json();
    const parentResponse = await fetch(URL + PRODUCT_GROUP + GROUP + `/${productGroup.parent}`);

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