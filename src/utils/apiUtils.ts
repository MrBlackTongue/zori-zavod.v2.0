import {message} from 'antd';

export const BASE_HEADERS = {'Content-Type': 'application/json'};

export function handleResponseGet(response: Response) {
  if (response.ok) {
    return response.json();
  } else {
    console.error(response.statusText);
    void message.error('Ошибка при выполнении запроса');
    return Promise.reject(response.statusText);
  }
}

export function handleResponseCreate(response: Response) {
  if (response.ok) {
    return message.success('Запись добавлена');
  } else {
    console.error(response.statusText);
    return message.error('Ошибка при добавлении записи');
  }
}

export function handleResponseUpdate(response: Response) {
  if (response.ok) {
    return message.success('Запись изменена');
  } else {
    console.error(response.statusText);
    return message.error('Ошибка при изменении записи');
  }
}

export function handleResponseDelete(response: Response) {
  if (response.ok) {
    return message.success('Запись удалена');
  } else {
    console.error(response.statusText);
    return message.error('Ошибка при удалении записи');
  }
}

export function handleError(error: any) {
  console.error(error);
  void message.error('Произошла ошибка при попытке выполнить запрос');
  return Promise.reject(error);
}

export function handleCatchError(error: any) {
  console.error(error);
  void message.error('Произошла ошибка при выполнении операции');
  return Promise.reject(error);
}
