import { message } from 'antd';

export function handleResponseCreateMessage(response: any) {
  if (response.status === 200) {
    void message.success('Запись добавлена');
  } else {
    void message.error('Ошибка при добавлении записи');
  }
  return response.data;
}

export function handleResponseDeleteMessage(response: any) {
  if (response.status === 200) {
    void message.success('Запись удалена');
  } else {
    void message.error('Ошибка при удалении записи');
  }
  return response.data;
}

export function handleResponseUpdateMessage(response: any) {
  if (response.status === 200) {
    void message.success('Запись изменена');
  } else {
    void message.error('Ошибка при изменении записи');
  }
  return response.data;
}

export function handleRegistrationUserMessage(response: any) {
  if (response.status === 200) {
    void message.success('Пользователь добавлен');
  } else {
    void message.error('Ошибка при добавлении пользователя');
  }
  return response.data;
}

export function handleErrorResponseMessage(error: any) {
  console.error(error);

  // В зависимости от статуса ошибки, вы можете отобразить разные сообщения
  if (error.response && error.response.status === 400) {
    void message.error('Ошибка в запросе');
  } else if (error.response && error.response.status === 500) {
    void message.error('Ошибка сервера');
  } else {
    void message.error('Произошла неизвестная ошибка');
  }

  return Promise.reject(error);
}
