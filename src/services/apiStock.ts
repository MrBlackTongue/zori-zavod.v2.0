import {StockType} from "../types/_index";
import {URL,STOCK} from "./apiEndpoints";

// Получить список всех остатков со склада
export async function getAllStocks(): Promise<StockType[]> {
  try {
    const response = await fetch(URL + STOCK);
    if (!response.ok) {
      console.error(response.statusText);
      return Promise.reject();
    }
    return await response.json() as StockType[];
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}