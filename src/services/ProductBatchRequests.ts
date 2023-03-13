import {ProductTypes, PurchaseType} from "../types";
import {message} from "antd";
import {PRODUCT, PRODUCT_BATCH, URL} from "./Routes";
import {ProductBatchTypes} from "../types/ProductBatchTypes";

// Получить все партии товаров

export async function getAllProductBatch(): Promise<ProductBatchTypes[]> {
  try {
    const res = await fetch(URL + PRODUCT_BATCH);
    if (!res.ok) {
      console.error(res.statusText);
      return Promise.reject();
    }
    return await res.json() as ProductBatchTypes[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Редактировать партию товара
export function putChangeProductBatch(data: ProductBatchTypes) {
  try {
    const config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT_BATCH, config)
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

// Добавить новую партию товара
export function postNewProductBatch(data: ProductBatchTypes) {
  try {
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    fetch(URL + PRODUCT_BATCH, config)
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