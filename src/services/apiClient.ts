import {ClientType} from "../types/_index";
import {message} from "antd";
import {URL, CLIENT} from "./apiEndpoints";

// Получить список всех клиентов
export async function getAllClients(): Promise<ClientType[]> {
    try {
        const response = await fetch(URL + CLIENT);
        if (!response.ok) {
            console.error(response.statusText);
            return Promise.reject();
        }
        return await response.json() as ClientType[];
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

// Получить данные клиента по id
export async function getClientById(id: number): Promise<ClientType | undefined> {
    try {
        const response = await fetch(URL + CLIENT + `/${id}`);
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

// Добавить нового клиента
export function postNewClient(data: ClientType) {
    try {
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        };
        fetch(URL + CLIENT, config)
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

// Удалить клиента по id
export async function deleteClientById(id: number) {
    try {
        const response = await fetch(URL + CLIENT + `/${id}`, {
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

// Редактировать клиента
export function putChangeClient(data: ClientType) {
    try {
        const config = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        };
        fetch(URL + CLIENT, config)
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