import {TypeStock} from "../types";
import {URL,STOCK} from "./apiEndpoints";

// Получить список всех остатков со склада
export async function getAllStocks(): Promise<TypeStock[]> {
  try {
    const response = await fetch(URL + STOCK);
    if (!response.ok) {
      console.error(response.statusText);
      return Promise.reject();
    }
    return await response.json() as TypeStock[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Получить данные остатка по id
export async function getStockById(id: number): Promise<TypeStock[] | undefined> {
  try {
    const response = await fetch(URL + STOCK + `/${id}`);
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