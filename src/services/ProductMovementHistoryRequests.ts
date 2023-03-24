import {ProductMovementHistoryType} from "../types";
import {PRODUCT_MOVEMENT, HISTORY, URL} from "./Routes";

// Получить всю историю движения товаров
export async function getAllProductMovementHistories(): Promise<ProductMovementHistoryType[]> {
    try {
        const res = await fetch(URL + PRODUCT_MOVEMENT + HISTORY);
        if (!res.ok) {
            console.error(res.statusText);
            return Promise.reject();
        }
        return await res.json() as ProductMovementHistoryType[];
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

// Получить всю историю движения товаров по id ячейки товара на складе
export async function getProductMovementHistoryById(id: number): Promise<ProductMovementHistoryType | undefined> {
    try {
        const response = await fetch(URL + PRODUCT_MOVEMENT + HISTORY + `/${id}`);
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