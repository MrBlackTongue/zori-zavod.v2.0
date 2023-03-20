import {ProductMovementHistoryTypes} from "../types";
import {message} from "antd";
import {MOVEMENT, HISTORY, URL} from "./Routes";

// Получить всю историю движения товаров
export async function getAllProductMovementHistories(): Promise<ProductMovementHistoryTypes[]> {
    try {
        const res = await fetch(URL + MOVEMENT + HISTORY);
        if (!res.ok) {
            console.error(res.statusText);
            return Promise.reject();
        }
        return await res.json() as ProductMovementHistoryTypes[];
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

// Получить всю историю движения товаров по id ячейки товара на складе
export async function getProductMovementHistoryById(id: number): Promise<ProductMovementHistoryTypes | undefined> {
    try {
        const response = await fetch(URL + MOVEMENT + HISTORY + `/${id}`);
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